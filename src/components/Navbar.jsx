import gsap from 'gsap';
import { useWindowScroll } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import { church } from '../config';
const items = [['ministerios', 'Ministérios'], ['story', 'Comunidade'], ['about', 'A igreja'], ['contact', 'Contato']];
export default function NavBar() {
  const ref = useRef(null), last = useRef(0);
  const { y } = useWindowScroll();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    ref.current.classList.toggle('floating-nav', y > 0);
    const tween = gsap.to(ref.current, { y: y > last.current && !open ? -100 : 0, opacity: y > last.current && !open ? 0 : 1, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .2 });
    last.current = y;
    return () => tween.kill();
  }, [y, open]);
  const prefix = location.pathname.startsWith('/vr') ? '/' : '';
  return <div ref={ref} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"><header className="absolute top-1/2 w-full -translate-y-1/2"><nav className="flex size-full items-center justify-between p-4"><div className="flex items-center gap-7"><a href="/" aria-label="Fazedores do Reino, início"><img src={church.logo} alt="Fazedores do Reino" className="w-10" /></a><Button title="A igreja" rightIcon={<TiLocationArrow />} href={`${prefix}#about`} containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1" /></div><div className="flex h-full items-center"><div className="hidden md:block">{items.map(([id, label]) => <a key={id} href={`${prefix}#${id}`} className="nav-hover-btn">{label}</a>)}<a href="/vr/" className="nav-hover-btn">VR 360°</a></div><button className="ml-10 text-xs text-blue-50 md:hidden" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Fechar' : 'Menu'}</button></div></nav>{open && <div id="mobile-menu" className="flex flex-col gap-5 rounded-lg bg-black p-5 text-xs text-blue-50 md:hidden">{items.map(([id, label]) => <a key={id} href={`${prefix}#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a href="/vr/">VR 360°</a></div>}</header></div>;
}
