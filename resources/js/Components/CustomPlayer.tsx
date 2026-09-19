import {
  Maximize,
  Pause,
  Play,
  RotateCcw,
  Volume1,
  Volume2,
  VolumeX,
} from 'lucide-react';
import {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface CustomPlayerProps {
  videoId?: string;
  onEnd?: () => void;
}

let youtubeApiPromise: Promise<void> | null = null;

const loadYouTubeAPI = (): Promise<void> => {
  if (
    typeof window !== 'undefined' &&
    window.YT?.Player
  ) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    const previousCallback =
      window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    if (!existingScript) {
      const script = document.createElement('script');

      script.src =
        'https://www.youtube.com/iframe_api';
      script.async = true;

      document.head.appendChild(script);
    }
  });

  return youtubeApiPromise;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(
    (totalSeconds % 3600) / 60,
  );
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(
    2,
    '0',
  )}`;
};

const CustomPlayer = ({
  videoId,
  onEnd,
}: CustomPlayerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeTargetRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const progressIntervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const onEndRef = useRef(onEnd);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  const stopProgressTimer = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgressTimer = useCallback(() => {
    stopProgressTimer();

    progressIntervalRef.current = setInterval(() => {
      const player = playerRef.current;

      if (!player?.getCurrentTime) return;

      const time = Number(player.getCurrentTime()) || 0;
      const totalDuration =
        Number(player.getDuration()) || 0;

      setCurrentTime(time);
      setDuration(totalDuration);
    }, 250);
  }, [stopProgressTimer]);

  useEffect(() => {
    if (!videoId || !iframeTargetRef.current) return;

    let cancelled = false;

    setReady(false);
    setPlaying(false);
    setEnded(false);
    setCurrentTime(0);
    setDuration(0);

    loadYouTubeAPI().then(() => {
      if (
        cancelled ||
        !iframeTargetRef.current ||
        !window.YT?.Player
      ) {
        return;
      }

      playerRef.current = new window.YT.Player(
        iframeTargetRef.current,
        {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              if (cancelled) return;

              const videoDuration =
                Number(event.target.getDuration()) || 0;

              event.target.setVolume(volume);

              setDuration(videoDuration);
              setReady(true);
            },

            onStateChange: (event: any) => {
              if (cancelled) return;

              const PlayerState =
                window.YT.PlayerState;

              if (event.data === PlayerState.PLAYING) {
                setPlaying(true);
                setEnded(false);
                startProgressTimer();
              }

              if (event.data === PlayerState.PAUSED) {
                setPlaying(false);
                stopProgressTimer();
              }

              if (event.data === PlayerState.BUFFERING) {
                setPlaying(false);
              }

              if (event.data === PlayerState.ENDED) {
                setPlaying(false);
                setEnded(true);
                stopProgressTimer();

                const totalDuration =
                  Number(event.target.getDuration()) || 0;

                setCurrentTime(totalDuration);

                /*
                 * Langsung panggil item berikutnya agar rekomendasi
                 * YouTube tidak sempat ditampilkan.
                 */
                onEndRef.current?.();
              }
            },

            onError: (event: any) => {
              console.error(
                'YouTube Player error:',
                event.data,
              );
            },
          },
        },
      );
    });

    return () => {
      cancelled = true;
      stopProgressTimer();

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = null;
    };
  }, [
    videoId,
    startProgressTimer,
    stopProgressTimer,
  ]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === containerRef.current,
      );
    };

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      );
    };
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;

    if (!ready || !player) return;

    if (ended) {
      player.seekTo(0, true);
      setEnded(false);
      player.playVideo();
      return;
    }

    if (playing) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSeek = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (!ready || !playerRef.current || duration <= 0) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const percentage = Math.min(
      Math.max(
        (event.clientX - rect.left) / rect.width,
        0,
      ),
      1,
    );

    const nextTime = percentage * duration;

    playerRef.current.seekTo(nextTime, true);
    setCurrentTime(nextTime);
  };

  const handleVolume = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextVolume = Number(event.target.value);

    setVolume(nextVolume);
    playerRef.current?.setVolume(nextVolume);

    if (nextVolume === 0) {
      playerRef.current?.mute();
      setMuted(true);
    } else {
      playerRef.current?.unMute();
      setMuted(false);
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;

    if (!ready || !player) return;

    if (muted || volume === 0) {
      const restoredVolume = volume === 0 ? 50 : volume;

      setVolume(restoredVolume);
      player.setVolume(restoredVolume);
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    const container = containerRef.current;

    if (!container) return;

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen gagal:', error);
    }
  };

  const progress =
    duration > 0
      ? Math.min((currentTime / duration) * 100, 100)
      : 0;

  const volumeIcon = () => {
    if (muted || volume === 0) {
      return <VolumeX size={21} />;
    }

    if (volume <= 50) {
      return <Volume1 size={21} />;
    }

    return <Volume2 size={21} />;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => {
        if (playing) setShowControls(false);
      }}
      onMouseMove={() => setShowControls(true)}
      className="
        group relative aspect-video w-full
        overflow-hidden rounded-xl bg-black
        shadow-lg
      "
    >
      {/*
        pointer-events-none mencegah klik pada judul,
        logo, Watch Later, Share, dan link YouTube.
      */}
      <div
        ref={iframeTargetRef}
        className="
          pointer-events-none absolute inset-0
          h-full w-full
          [&_iframe]:h-full [&_iframe]:w-full
        "
      />

      {/* Overlay area untuk play/pause */}
      <button
        type="button"
        aria-label={playing ? 'Jeda video' : 'Putar video'}
        onClick={togglePlay}
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
      />

      {/* Loading */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      )}

      {/* Tombol play tengah */}
      {ready && !playing && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div
            className="
              flex h-16 w-16 items-center justify-center
              rounded-full bg-black/70 text-white
              shadow-xl backdrop-blur-sm
              transition-transform group-hover:scale-105
            "
          >
            {ended ? (
              <RotateCcw size={30} />
            ) : (
              <Play
                size={30}
                fill="currentColor"
                className="ml-1"
              />
            )}
          </div>
        </div>
      )}

      {/* Gradient agar kontrol terbaca */}
      <div
        className={`
          pointer-events-none absolute inset-x-0 bottom-0 z-20
          h-32 bg-gradient-to-t from-black/90 to-transparent
          transition-opacity duration-200
          ${
            showControls || !playing
              ? 'opacity-100'
              : 'opacity-0'
          }
        `}
      />

      {/* Custom control bar */}
      <div
        className={`
          absolute inset-x-0 bottom-0 z-30
          px-3 pb-3 transition-all duration-200
          sm:px-4 sm:pb-4
          ${
            showControls || !playing
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-3 opacity-0'
          }
        `}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          role="slider"
          aria-label="Posisi video"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(currentTime)}
          onClick={handleSeek}
          className="
            group/progress relative mb-3
            h-4 cursor-pointer
          "
        >
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/35 transition-all group-hover/progress:h-1.5">
            <div
              className="relative h-full rounded-full bg-blue-500"
              style={{ width: `${progress}%` }}
            >
              <span
                className="
                  absolute right-0 top-1/2
                  h-3.5 w-3.5
                  -translate-y-1/2 translate-x-1/2
                  scale-0 rounded-full bg-blue-500
                  transition-transform
                  group-hover/progress:scale-100
                "
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white">
          {/* Play/pause */}
          <button
            type="button"
            aria-label={playing ? 'Jeda' : 'Putar'}
            onClick={togglePlay}
            disabled={!ready}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full transition hover:bg-white/15
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {playing ? (
              <Pause size={22} fill="currentColor" />
            ) : (
              <Play
                size={22}
                fill="currentColor"
                className="ml-0.5"
              />
            )}
          </button>

          {/* Volume dengan slider vertikal ketika hover */}
          <div className="group/volume relative flex items-center">
            <div
              className="
                invisible absolute bottom-full left-1/2
                mb-1 -translate-x-1/2
                opacity-0 transition-all duration-150
                group-hover/volume:visible
                group-hover/volume:opacity-100
                group-focus-within/volume:visible
                group-focus-within/volume:opacity-100
              "
            >
              <div
                className="
                  flex h-28 w-10 items-center
                  justify-center rounded-lg
                  bg-black/85 shadow-lg backdrop-blur
                "
              >
                <input
                  aria-label="Volume"
                  type="range"
                  min="0"
                  max="100"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  className="
                    h-1 w-20 -rotate-90
                    cursor-pointer accent-blue-500
                  "
                />
              </div>
            </div>

            <button
              type="button"
              aria-label={muted ? 'Aktifkan suara' : 'Bisukan'}
              onClick={toggleMute}
              disabled={!ready}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full transition hover:bg-white/15
                disabled:opacity-50
              "
            >
              {volumeIcon()}
            </button>
          </div>

          {/* Waktu */}
          <span className="select-none text-xs font-medium text-white/90 sm:text-sm">
            {formatTime(currentTime)}
            <span className="mx-1 text-white/50">/</span>
            {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Fullscreen */}
          <button
            type="button"
            aria-label={
              isFullscreen
                ? 'Keluar dari layar penuh'
                : 'Layar penuh'
            }
            onClick={toggleFullscreen}
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full transition hover:bg-white/15
            "
          >
            <Maximize size={21} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPlayer;
