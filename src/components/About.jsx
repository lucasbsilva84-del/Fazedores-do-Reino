import { church } from "../config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Bem-vindo à Fazedores do Reino
        </p>

        <AnimatedTitle
          title="Uma fé que <br /> nos faz caminhar juntos"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>Um lugar para pertencer, crescer e servir.</p>
          <p className="text-gray-500">
            Uma comunidade de fé em Jesus, acolhimento e comunhão.
            Aqui, cada história encontra espaço e o amor se transforma em serviço.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <video
            src={church.videos[0].src}
            poster={church.cover || undefined}
            aria-label="Vídeo da comunidade Fazedores do Reino"
            autoPlay={!matchMedia('(prefers-reduced-motion: reduce)').matches}
            controls={matchMedia('(prefers-reduced-motion: reduce)').matches}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute left-0 top-0 size-full object-cover"
          >Seu navegador não suporta a reprodução deste vídeo.</video>
        </div>
      </div>
    </div>
  );
};

export default About;
