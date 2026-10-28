import { church } from "../config";
import AnimatedTitle from "./AnimatedTitle";


const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="Fazedores do Reino" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src={church.photos.worship || church.logo}
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src={church.photos.events || church.logo}
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src={church.photos.community || church.logo}
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src={church.photos.church || church.logo}
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Faça parte desta caminhada
          </p>

          <AnimatedTitle
            title="Uma fé viva. <br /> Um lugar para <br /> caminhar juntos."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <p className="mt-10 max-w-sm font-circular-web text-sm">Canais oficiais em confirmação. O envio de mensagens pelo site ainda não está configurado.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
