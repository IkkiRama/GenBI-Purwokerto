import { createContext, useContext, useEffect, useRef, useState } from "react";

const PlayerContext = createContext<any>(null);

export const usePlayer = () => useContext(PlayerContext);

export const GlobalPlayerProvider = ({ children }: any) => {
    const mainRef = useRef<any>(null);
    const miniRef = useRef<any>(null);

    const mainPlayer = useRef<any>(null);
    const miniPlayer = useRef<any>(null);

    const [videoId, setVideoId] = useState<string | null>(null);
    const [isMini, setIsMini] = useState(false);
    const [time, setTime] = useState(0);
    const [ready, setReady] = useState(false);

    // ===== LOAD YT API =====
    useEffect(() => {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        //@ts-ignore
        window.onYouTubeIframeAPIReady = () => {
            initPlayers();
        };
    }, []);

    // ===== INIT PLAYERS =====
    const initPlayers = () => {
        //@ts-ignore
        mainPlayer.current = new YT.Player("main-player", {
            height: "100%",
            width: "100%",
            playerVars: { controls: 0, rel: 0 },
            events: {
                onReady: () => setReady(true),
                onStateChange: handleMainState,
            },
        });

        //@ts-ignore
        miniPlayer.current = new YT.Player("mini-player", {
            height: "100%",
            width: "100%",
            playerVars: { controls: 0, rel: 0 },
            events: {
                onStateChange: handleMiniState,
            },
        });
    };

    // ===== STATE SYNC =====
    const handleMainState = (e: any) => {
        if (e.data === 1) {
            trackTime(mainPlayer);
        }
    };

    const handleMiniState = (e: any) => {
        if (e.data === 1) {
            trackTime(miniPlayer);
        }
    };

    const trackTime = (player: any) => {
        setInterval(() => {
            if (!player.current) return;
            const t = player.current.getCurrentTime();
            setTime(t);
        }, 500);
    };

    // ===== LOAD VIDEO =====
    const loadVideo = (id: string) => {
        setVideoId(id);

        mainPlayer.current?.loadVideoById(id);
        miniPlayer.current?.loadVideoById(id);
    };

    // ===== SCROLL SWITCH =====
    useEffect(() => {
        const handleScroll = () => {
            const rect = mainRef.current?.getBoundingClientRect();

            if (!rect) return;

            if (rect.top < -200 && !isMini) {
                // 👉 ke mini
                const t = mainPlayer.current.getCurrentTime();

                mainPlayer.current.pauseVideo();
                miniPlayer.current.seekTo(t);
                miniPlayer.current.playVideo();

                setIsMini(true);
            }

            if (rect.top >= -200 && isMini) {
                // 👉 balik ke main
                const t = miniPlayer.current.getCurrentTime();

                miniPlayer.current.pauseVideo();
                mainPlayer.current.seekTo(t);
                mainPlayer.current.playVideo();

                setIsMini(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMini]);

    return (
        <PlayerContext.Provider value={{ loadVideo }}>

            {children}

            {/* MAIN PLAYER */}
            <div
                ref={mainRef}
                className={`
                    transition-all duration-500
                    ${isMini ? "opacity-0 scale-95" : "opacity-100 scale-100"}
                `}
            >
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
                    <div id="main-player" />
                </div>
            </div>

            {/* MINI PLAYER */}
            <div
                className={`
                    fixed bottom-5 right-5 w-80 z-50
                    transition-all duration-500
                    ${isMini ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
                `}
            >
                <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
                    <div id="mini-player" className="aspect-video" />
                </div>
            </div>

        </PlayerContext.Provider>
    );
};
