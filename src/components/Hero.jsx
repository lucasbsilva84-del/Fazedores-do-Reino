
import { church } from "../config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [muted, setMuted] = useState(true);
  const [audioError, setAudioError] = useState("");
  const [loading, setLoading] = useState(true);

  const baseVideoRef = useRef(null);
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Usa o segundo vídeo de church.videos
  const videoSrc = church.videos[1]?.src || undefined;

  useEffect(() => {
    const video = baseVideoRef.current;
    if (!video) return;

    video.muted = muted;

    if (reduced) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [muted, reduced]);

  async function toggleAudio() {
    const video = baseVideoRef.current;
    if (!video) return;

    try {
      video.muted = !muted;
      await video.play();
      setMuted(!muted);
      setAudioError("");
    } catch {
      video.muted = true;
      setMuted(true);
      setAudioError("Áudio indisponível no momento.");
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  useGSAP(() => {
    if (reduced) return;

    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {videoSrc ? (
          <video
            ref={baseVideoRef}
            src={videoSrc}
            autoPlay={!reduced}
            loop
            muted={muted}
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={() => setLoading(false)}
            onError={() => setLoading(false)}
            poster={church.cover || church.logo}
            playsInline
          />
        ) : (
          <div className="absolute inset-0 bg-blue-75" />
        )}

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          DO REINO
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              FAZEDORES
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Fé que acolhe. Amor que serve. <br />
              Um lugar para caminhar juntos.
            </p>

            <Button
              id="watch-trailer"
              title="Conheça a igreja"
              href="#about"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />

            <button
              onClick={toggleAudio}
              disabled={!videoSrc}
              aria-pressed={!muted}
              className="mt-5 font-general text-xs uppercase text-blue-100"
            >
              {muted ? "Ativar áudio" : "Silenciar"}
            </button>

            {audioError && (
              <p role="status" className="mt-3 text-xs text-blue-100">
                {audioError}
              </p>
            )}

            {!videoSrc && (
              <p className="mt-3 font-general text-xs text-blue-100">
                Vídeos oficiais em preparação.
              </p>
            )}
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        DO REINO
      </h1>
    </div>
  );
};

export default Hero;
