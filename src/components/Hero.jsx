import { church } from "../config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [muted, setMuted] = useState(true);
  const [audioError, setAudioError] = useState('');
  const baseVideoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 2;
  const nextVdRef = useRef(null);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const active = hasClicked ? nextVdRef.current : baseVideoRef.current;
    for (const video of [baseVideoRef.current, nextVdRef.current]) {
      if (!video) continue;
      video.muted = video !== active || muted;
      if (video !== active || reduced) video.pause();
    }
  }, [muted, hasClicked, currentIndex, reduced]);

  async function toggleAudio() {
    const video = hasClicked ? nextVdRef.current : baseVideoRef.current;
    if (!video) return;
    try { video.muted = !muted; await video.play(); setMuted(!muted); setAudioError(''); }
    catch { video.muted = true; setMuted(true); setAudioError('Áudio indisponível no momento.'); }
  }

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos - 1 || !church.videos.some(video => video.src)) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const handleMiniVdClick = () => {
    if (!church.videos[currentIndex % totalVideos].src) return;
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1,
          ease: "power1.inOut",
          onStart: () => { if (!reduced) nextVdRef.current?.play()?.catch(() => {}); },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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

  const getVideoSrc = (index) => church.videos[index - 1].src || undefined;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
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
        <div>
          {getVideoSrc((currentIndex % totalVideos) + 1) && <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                  onError={() => setLoading(false)}
                  poster={church.cover || church.logo}
                  playsInline
                />
              </div>
            </VideoPreview>
          </div>}

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
                  onError={() => setLoading(false)}
                  poster={church.cover || church.logo}
                  playsInline
          />
          <video
            ref={baseVideoRef}
            src={getVideoSrc(currentIndex)}
            autoPlay={!reduced}
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
                  onError={() => setLoading(false)}
                  poster={church.cover || church.logo}
                  playsInline
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          DO REINO
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              FAZEDORES
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Fé que acolhe. Amor que serve. <br /> Um lugar para caminhar juntos.
            </p>

            <Button
              id="watch-trailer"
              title="Conheça a igreja"
              href="#about"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
            <button onClick={toggleAudio} disabled={!getVideoSrc(currentIndex)} aria-pressed={!muted} className="mt-5 font-general text-xs uppercase text-blue-100">{muted ? 'Ativar áudio' : 'Silenciar'}</button>
            {audioError && <p role="status" className="mt-3 text-xs text-blue-100">{audioError}</p>}
            {!getVideoSrc(currentIndex) && <p className="mt-3 font-general text-xs text-blue-100">Vídeos oficiais em preparação.</p>}
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
