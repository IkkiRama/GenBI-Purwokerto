import { useEffect, useRef, useState } from "react";

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: any;
    }
}

const CustomPlayer = ({ videoId }: any) => {
    const playerRef = useRef<any>(null);
    const intervalRef = useRef<any>(null);
    const isInit = useRef(false);

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const [volume, setVolume] = useState(100);
    const [muted, setMuted] = useState(false);

    // ===== LOAD API (ONCE) =====
    useEffect(() => {
        if (window.YT) return;

        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
    }, []);

    // ===== INIT PLAYER =====
    useEffect(() => {
        if (!videoId) return;

        const createPlayer = () => {
            if (isInit.current) return; // ❗ penting banget
            isInit.current = true;

            playerRef.current = new window.YT.Player("yt-player", {
                videoId,
                playerVars: {
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                },
                events: {
                    onReady: (e: any) => {
                        setDuration(e.target.getDuration());
                        e.target.setVolume(volume);
                    },
                    onStateChange: (e: any) => {
                        if (e.data === 1) {
                            setPlaying(true);

                            clearInterval(intervalRef.current);
                            intervalRef.current = setInterval(() => {
                                const t = e.target.getCurrentTime();
                                const d = e.target.getDuration();

                                setCurrentTime(t);
                                setDuration(d);
                                setProgress((t / d) * 100);
                            }, 300);
                        }

                        if (e.data === 2) {
                            setPlaying(false);
                        }
                    }
                }
            });
        };

        if (window.YT && window.YT.Player) {
            createPlayer();
        } else {
            window.onYouTubeIframeAPIReady = createPlayer;
        }

        return () => {
            clearInterval(intervalRef.current);

            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }

            isInit.current = false; // reset kalau ganti video
        };
    }, [videoId]);

    // ===== CONTROLS =====
    const togglePlay = () => {
        if (!playerRef.current) return;

        playing
            ? playerRef.current.pauseVideo()
            : playerRef.current.playVideo();
    };

    const handleSeek = (e: any) => {
        if (!playerRef.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        playerRef.current.seekTo(percent * duration);
    };

    const handleVolume = (e: any) => {
        const val = Number(e.target.value);
        setVolume(val);
        playerRef.current?.setVolume(val);
    };

    const toggleMute = () => {
        if (!playerRef.current) return;

        muted
            ? playerRef.current.unMute()
            : playerRef.current.mute();

        setMuted(!muted);
    };

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="w-full">
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">

                <div id="yt-player" className="w-full h-full" />

                {/* CENTER PLAY */}
                {!playing && (
                    <div
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    >
                        <div className="bg-white/80 p-4 rounded-full text-2xl">
                            ▶
                        </div>
                    </div>
                )}

                {/* CONTROLS */}
                <div className="
                    absolute bottom-4 right-4
                    flex items-center gap-3
                    bg-black/70 backdrop-blur-md
                    px-4 py-2 rounded-xl
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                ">

                    <button onClick={togglePlay} className="text-white">
                        {playing ? "⏸" : "▶"}
                    </button>

                    <span className="text-white text-xs">
                        {formatTime(currentTime)}
                    </span>

                    <div
                        className="w-32 h-1 bg-gray-500 rounded cursor-pointer"
                        onClick={handleSeek}
                    >
                        <div
                            className="h-1 bg-blue-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <button onClick={toggleMute} className="text-white">
                        {muted ? "🔇" : "🔊"}
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolume}
                        className="w-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomPlayer;
