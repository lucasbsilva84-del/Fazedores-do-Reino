import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { church as c } from './config';
gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const query = matchMedia('(prefers-reduced-motion: reduce)'); const update = () => setReduced(query.matches); query.addEventListener('change', update); return () => query.removeEventListener('change', update); }, []);
  return reduced;
}

function Photo({ src, alt, label, className = '' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`photo ${className}`}>{src && !failed ? <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="photo-placeholder"><span className="orbit" /><span>{label || 'Fé que nos aproxima'}</span><small>Um espaço para nossas histórias</small></div>}</div>;
}

function Hero({ reduced }) {
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState({});
  const [loading, setLoading] = useState(Boolean(c.videos[0].src));
  const [busy, setBusy] = useState(false);
  const [audioError, setAudioError] = useState('');
  const layers = useRef([]), videos = useRef([]), root = useRef();
  useEffect(() => { const timeout = setTimeout(() => setLoading(false), 5000); return () => clearTimeout(timeout); }, []);
  useEffect(() => {
    videos.current.forEach((video, index) => { if (!video) return; video.muted = muted || index !== active; if (index === active && !reduced) video.play().catch(() => setLoading(false)); else video.pause(); });
  }, [active, muted, reduced]);
  useEffect(() => () => layers.current.forEach(layer => layer && gsap.killTweensOf(layer)), []);
  function change() {
    if (busy) return;
    const next = 1 - active, layer = layers.current[next];
    setBusy(true);
    gsap.set(layer, { zIndex: 2, clipPath: 'inset(32% 35% 32% 35% round 24px)' });
    const video = videos.current[next];
    if (video && !reduced) { video.muted = true; video.play().catch(() => {}); }
    gsap.to(layer, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: reduced ? 0 : 1.2, ease: 'power3.inOut', onComplete: () => {
      gsap.set(layers.current[active], { zIndex: 0 }); gsap.set(layer, { zIndex: 1 }); setActive(next); setBusy(false);
    } });
  }
  async function toggleAudio() {
    const video = videos.current[active];
    if (!video || failed[active]) return;
    try { video.muted = !muted; await video.play(); setMuted(!muted); setAudioError(''); } catch { video.muted = true; setMuted(true); setAudioError('Não foi possível reproduzir o áudio. Tente novamente.'); }
  }
  return <section className="hero" ref={root} aria-label="Abertura cinematográfica">
    <div className="hero-frame" data-hero-frame>
      {c.videos.map((item, i) => <div className="hero-layer" key={i} ref={el => layers.current[i] = el} style={{ zIndex: i === 0 ? 1 : 0 }}>
        <Photo src={c.cover} alt="Comunidade Fazedores do Reino" label="Fazedores do Reino" />
        {item.src && !failed[i] && <video ref={el => videos.current[i] = el} src={item.src} poster={c.cover || undefined} autoPlay={!reduced} loop muted playsInline preload={i === 0 ? 'auto' : 'metadata'} style={{ '--position': item.position, '--mobile-position': item.mobilePosition }} onLoadedData={() => setLoading(false)} onError={() => { setFailed(prev => ({ ...prev, [i]: true })); setLoading(false); }} />}
      </div>)}
      <div className="hero-shade" />
      <div className="hero-copy"><p className="eyebrow">Fé viva. Portas abertas.</p><h1>Fazedores<span>do Reino<span className="title-dot">.</span></span></h1><div className="hero-bottom"><p>Um lugar para pertencer.<br />Uma vida para servir.</p><a className="pill" href="#igreja">Conheça nossa comunidade ↗</a></div></div>
      <div className="hero-controls"><button onClick={change} disabled={busy} aria-label={`Alternar para vídeo ${2 - active}`}><span className="play-mark">↗</span><span>Próxima história <b>0{2 - active}</b></span></button><button onClick={toggleAudio} disabled={!c.videos[active].src || failed[active]} aria-pressed={!muted}>{muted ? 'Ativar áudio' : 'Silenciar'}</button></div>
      <p className="media-status" role="status">{loading ? 'Preparando a abertura…' : !c.videos[active].src || failed[active] ? 'Abertura em preparação · vídeos oficiais em breve' : `História 0${active + 1}`}{audioError && ` · ${audioError}`}</p>
      <span className="hero-side">Caxias do Sul / RS · Role para descobrir ↓</span>
    </div>
  </section>;
}

function App() {
  const reduced = useReducedMotion(), scope = useRef();
  const [menu, setMenu] = useState(false);
  const isVR = window.location.pathname.replace(/\/$/, '') === '/vr';
  useEffect(() => {
    if (reduced || isVR) return;
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach(el => gsap.from(el, { y: 65, rotationX: 8, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
      gsap.to('[data-hero-frame]', { clipPath: 'polygon(8% 0%, 95% 5%, 88% 94%, 0% 100%)', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.fromTo('.about-art', { clipPath: 'inset(12% 22% round 180px)' }, { clipPath: 'inset(0% 0% round 12px)', ease: 'none', scrollTrigger: { trigger: '.about-art', start: 'top 85%', end: 'center center', scrub: 1 } });
      gsap.utils.toArray('[data-parallax]').forEach(el => gsap.to(el, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } }));
    }, scope);
    return () => context.revert();
  }, [reduced, isVR]);
  function tilt(event) {
    if (reduced || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    gsap.to(event.currentTarget, { rotationY: ((event.clientX - box.left) / box.width - .5) * 9, rotationX: -((event.clientY - box.top) / box.height - .5) * 9, transformPerspective: 1000, duration: .4 });
  }
  const nav = [['igreja', 'A igreja'], ['lideranca', 'Liderança'], ['ministerios', 'Ministérios'], ['agenda', 'Agenda'], ['galeria', 'Comunidade'], ['localizacao', 'Onde estamos'], ['contato', 'Contato']];
  return <div ref={scope}><a className="skip" href="#conteudo">Pular para o conteúdo</a><header><a className="brand" href="/" aria-label="Fazedores do Reino, início"><img src={c.logo} alt="Logo Fazedores do Reino" /><span>Fazedores<br />do Reino</span></a><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="navigation">{menu ? 'Fechar' : 'Menu'} ☰</button><nav id="navigation" className={menu ? 'open' : ''}>{nav.map(([id, title]) => <a key={id} href={`${isVR ? '/' : ''}#${id}`} onClick={() => setMenu(false)}>{title}</a>)}<a className="vr-link" href="/vr/">VR 360° ↗</a></nav></header>
    <main id="conteudo">{isVR ? <section className="vr-page"><p className="eyebrow">Um novo olhar</p><h1>Conheça.<br />Explore.<br /><em>Esteja perto.</em></h1><p>A experiência 360° está em preparação.</p><p>Precisamos de fotografias panorâmicas equiretangulares 2:1 dos ambientes, autorizadas pela igreja, ou de um modelo 3D em GLB/GLTF. O visualizador será integrado após receber e validar esse material.</p><p>Nenhuma imagem comum está sendo apresentada como VR.</p><a className="pill" href="/">Voltar à comunidade ↗</a></section> : <>
    <Hero reduced={reduced} />
    <section id="igreja" className="about section-pad"><p className="eyebrow" data-reveal>01 / Nossa essência</p><h2 data-reveal>O Reino acontece<br />quando <em>caminhamos juntos.</em></h2><p className="intro" data-reveal>Somos Fazedores do Reino. Uma comunidade para viver a fé em Jesus, acolher pessoas e transformar amor em serviço. Há lugar para sua história aqui.</p><div className="about-art" data-parallax><Photo src={c.photos.church} alt="Igreja Fazedores do Reino" label="Pertencer. Crescer. Servir." /><div className="art-caption"><span>Uma fé que ganha vida</span><span>Dentro e fora das paredes ↗</span></div></div><div className="values" data-reveal><p><b>Fé</b>Uma caminhada com Jesus, um dia de cada vez.</p><p><b>Comunhão</b>Gente que acolhe, escuta e caminha junto.</p><p><b>Serviço</b>Amor que se torna presença e cuidado.</p></div></section>
    <section id="lideranca" className="leadership section-pad"><div data-reveal><p className="eyebrow">02 / Cuidado e direção</p><h2>Gente que cuida<br />de <em>gente.</em></h2></div><div data-reveal>{c.leaders.length ? c.leaders.map(person => <article className="leader" key={person.name}>{person.photo && <Photo src={person.photo} alt={person.name} />}<h3>{person.name}</h3><p>{person.role}</p><p>{person.bio}</p></article>) : <div className="pending"><span>↗</span><h3>Liderança e pastores</h3><p>Em breve, conheça quem caminha com a nossa comunidade. Nomes, funções e apresentações serão publicados após confirmação.</p></div>}</div></section>
    <section id="ministerios" className="ministries section-pad"><div className="section-heading" data-reveal><p className="eyebrow">03 / Dons que se encontram</p><h2>Fé em<br /><em>movimento.</em></h2><p>Cada pessoa tem algo para compartilhar.<br />Juntos, fazemos parte de algo maior.</p></div><div className="bento">{[['Louvor', 'Vozes e corações unidos para adorar a Deus.', c.photos.worship, '01'], ['Introdutores', 'O cuidado começa com um sorriso. Acolher também é servir.', c.photos.welcome, '02'], ['Comunhão', 'Compartilhar a vida. Fortalecer a fé. Caminhar em família.', c.photos.community, '03']].map(([title, description, src, number]) => <article key={title} className="ministry-card" data-reveal onPointerMove={tilt} onPointerLeave={event => gsap.to(event.currentTarget, { rotationX: 0, rotationY: 0, duration: .5 })}><Photo src={src} alt={`Ministério de ${title}`} label={title} /><div className="card-copy"><span>{number} / Servir com amor</span><h3>{title}</h3><p>{description}</p><a href="#contato" aria-label={`Saiba mais sobre ${title}`}>Quero participar ↗</a></div></article>)}</div></section>
    <section id="agenda" className="agenda section-pad"><p className="eyebrow" data-reveal>04 / Encontros que aproximam</p><h2 data-reveal>Reserve espaço<br />para <em>estar junto.</em></h2>{c.events.length ? c.events.map(event => <article className="event" key={`${event.title}-${event.date}`}><time>{event.date}</time><h3>{event.title}</h3><p>{event.description}</p><p>{event.location}</p></article>) : <div className="event" data-reveal><span>Agenda</span><h3>Nossos próximos encontros</h3><p>Datas, horários e locais serão divulgados após confirmação. Fale com a comunidade para saber mais.</p></div>}{c.serviceTimes.map(time => <p key={time}>{time}</p>)}</section>
    <section id="galeria" className="gallery section-pad"><p className="eyebrow" data-reveal>05 / Nossa comunidade</p><h2 data-reveal>Histórias reais.<br /><em>Laços eternos.</em></h2><div className="gallery-grid">{c.gallery.length ? c.gallery.map(photo => <figure key={photo.src} data-reveal><Photo src={photo.src} alt={photo.alt} /><figcaption>{photo.caption}</figcaption></figure>) : <><Photo className="gallery-wide" src={c.photos.community} alt="Comunidade reunida" label="A vida é melhor em comunhão." /><Photo src={c.photos.events} alt="Encontros da comunidade" label="Memórias que vamos construir." /><p className="gallery-note">Nossas fotos oficiais estarão aqui em breve.</p></>}</div></section>
    <section id="localizacao" className="location section-pad"><p className="eyebrow" data-reveal>06 / Perto de você</p><h2 data-reveal>O amor encontra<br /><em>um lugar.</em></h2><div className="location-grid" data-reveal><article><h3>{c.city}</h3><p>{c.address || 'Endereço da igreja em confirmação.'}</p>{c.mapsUrl && <a className="pill" href={c.mapsUrl} target="_blank" rel="noreferrer">Como chegar ↗</a>}</article><article><h3>Células</h3><p>Pequenos encontros. Grandes conexões.</p>{c.cells.length ? c.cells.map(cell => <p key={cell.name}>{cell.name} · {cell.location} · {cell.schedule}</p>) : <p>Locais, responsáveis e horários serão informados após confirmação.</p>}</article></div></section>
    <section id="contato" className="contact section-pad"><p className="eyebrow" data-reveal>07 / Vamos conversar</p><h2 data-reveal>Sua história<br />tem lugar <em>aqui.</em></h2><p>Quer conhecer a igreja, participar de um ministério ou encontrar uma célula? Vamos caminhar juntos.</p><div className="contact-links">{c.email && <a className="pill" href={`mailto:${c.email}`}>Enviar e-mail ↗</a>}{c.whatsapp && <a className="pill" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer">Conversar no WhatsApp ↗</a>}</div>{!c.email && !c.whatsapp && <p className="contact-status">Canais oficiais de contato em confirmação. O envio de mensagens pelo site ainda não está configurado.</p>}</section>
    </>}</main><footer><img src={c.logo} alt="Fazedores do Reino" /><p>Fé que acolhe. Amor que serve.</p><a href={isVR ? '/' : '#conteudo'}>Voltar ao início ↑</a><small>Estudo local com base em <a href="https://github.com/adrianhajdin/award-winning-website">Adrian Hajdin / JavaScript Mastery</a>. Referência de design: <a href="https://zentry.com">Zentry</a>.</small></footer></div>;
}
export default App;
