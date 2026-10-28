import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Modelo from "./components/Modelo";
import Button from "./components/Button";
import { church } from './config';
import { TiLocationArrow } from "react-icons/ti";

function App() {
  const isVR = location.pathname.startsWith('/vr');
  const isModelo = location.pathname.startsWith('/modelo');
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      {isVR ? <section className="min-h-screen bg-black px-5 py-40 text-blue-50 md:px-10"><p className="font-general text-sm uppercase">Fazedores do Reino · VR 360°</p><h1 className="hero-heading my-10">Em breve</h1><p className="max-w-md font-circular-web">A experiência está em preparação. Precisamos de panoramas equiretangulares reais 2:1 ou modelo GLB/GLTF autorizado e integração do visualizador. Nenhuma foto comum é apresentada como VR.</p><a className="mt-10 inline-block font-general text-sm" href="/">Voltar à igreja ↗</a></section> : isModelo ? <Modelo /> : <>
      <Hero />
      <About />
      <Features />
      <Story />
      <section id="informacoes" className="bg-black px-5 py-20 text-blue-50 md:px-10"><div className="container mx-auto grid gap-10 md:grid-cols-3"><div id="lideranca"><h2 className="bento-title">Liderança</h2>{church.leaders.length ? church.leaders.map(person => <p className="mt-3 font-circular-web" key={person.name}>{person.name} · {person.role}</p>) : <p className="mt-3 font-circular-web">Nomes e apresentações da liderança e dos pastores serão publicados após confirmação.</p>}</div><div id="agenda"><h2 className="bento-title">Agenda</h2>{church.events.length ? church.events.map(event => <p className="mt-3 font-circular-web" key={event.title}>{event.title} · {event.date} · {event.location}</p>) : <p className="mt-3 font-circular-web">Datas e horários dos encontros em confirmação.</p>}</div><div id="localizacao"><h2 className="bento-title">Células</h2><p className="mt-3 font-circular-web">{church.city} · {church.address || 'Endereço da igreja em confirmação.'}</p>{church.cells.length ? church.cells.map(cell => <p className="mt-3 font-circular-web" key={cell.name}>{cell.name} · {cell.location} · {cell.schedule}</p>) : <p className="mt-3 font-circular-web">Locais e horários das células em confirmação.</p>}</div><div className="mt-2 flex justify-start md:col-span-3 md:justify-center"><Button title="Modelo" rightIcon={<TiLocationArrow />} href="/modelo/" containerClass="bg-yellow-300 flex items-center justify-center gap-1" /></div></div></section>
      <Contact />
      </>}
      <Footer />
    </main>
  );
}

export default App;
