import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChartNoAxesColumnIncreasing, Mail, Megaphone, Monitor, Search, Smartphone, X } from 'lucide-react';
import desktopBackground from './assets/key2biz-background.png';
import mobileBackground from './assets/key2biz-mobile-background.png';
import './App.css';

const services = [
  { name: 'Application Development', Icon: Smartphone, theme: 'blue', angle: -90 },
  { name: 'Website Development', Icon: Monitor, theme: 'purple', angle: -18 },
  { name: 'Digital Marketing', Icon: Megaphone, theme: 'peach', angle: 54 },
  { name: 'SEO', Icon: Search, theme: 'mint', angle: 126 },
  { name: 'Performance Marketing', Icon: ChartNoAxesColumnIncreasing, theme: 'yellow', angle: 198 },
];

const socialItems = [
  { key: 'instagram-main', label: 'Instagram – TheKey2Biz', src: '/assets/instagram-logo1.png', href: 'https://www.instagram.com/thekey2biz?stkn=MTFsaXo5cmE5eW1q' },
  { key: 'instagram-official', label: 'Instagram – TheKey2Biz Official', src: '/assets/instagram-logo2.png', href: 'https://instagram.com/thekey2biz.official?rpxt=MXgxZjk1bzR0N21vcw%3D%3D' },
  { key: 'youtube', label: 'YouTube – TheKey2Biz', src: '/assets/youtube-logo.png', href: 'https://youtube.com/@thekey2biz?si=dNJSSIQCX4Xcv39S' },
  { key: 'telegram', label: 'Telegram – TheKey2Biz', src: '/assets/telegram-logo.png', href: 'https://t.me/thekey2bizz' },
];

const logoImageSrc = '/assets/key2biz-logo.png';
const laptopImageSrc = '/assets/laptop.png';

function Logo() {
  const [imageMissing, setImageMissing] = useState(false);
  return (
    <a className="brand" href="#top" aria-label="Key2Biz home">
      {!imageMissing && logoImageSrc && (
        <img className="brand-image" src={logoImageSrc} alt="Key2Biz Logo" onError={() => setImageMissing(true)} />
      )}
      {(imageMissing || !logoImageSrc) && <span className="brand-placeholder"><span className="brand-mark">K</span><span>Key2Biz</span></span>}
    </a>
  );
}

function SocialPopup({ open, onClose, popupRef }) {
  if (!open) return null;
  return (
    <div className="social-popup" id="social-links-popup" ref={popupRef} role="dialog" aria-label="Connect with Key2Biz">
      <button className="popup-close" onClick={onClose} aria-label="Close social links"><X size={16} /></button>
      <div className="social-list">
        {socialItems.map((item) => {
          return (
            <a key={item.key} className="social-link" href={item.href}
              target="_blank" rel="noopener noreferrer"
              aria-label={item.label}>
              <span className="social-icon">
                <img src={item.src} alt="" />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function Header({ open, onToggle, buttonRef, popupRef, onClose }) {
  return (
    <header className="site-header">
      <Logo />
      <div className="header-action-wrap">
        <button ref={buttonRef} className="talk-button header-talk" type="button" aria-expanded={open} aria-controls="social-links-popup" aria-haspopup="dialog" onClick={onToggle}>
          Let’s Talk <ArrowUpRight size={17} strokeWidth={2.2} aria-hidden="true" />
        </button>
        <SocialPopup open={open} onClose={onClose} popupRef={popupRef} />
      </div>
    </header>
  );
}

function Laptop() {
  return (
    <div className="laptop-art">
      <img className="laptop-image" src={laptopImageSrc} alt="Key2Biz Laptop" />
    </div>
  );
}

function OrbitServices() {
  return (
    <div className="orbit-system" role="group" aria-label="Key2Biz services">
      <span className="orbit-particle particle-one" aria-hidden="true" /><span className="orbit-particle particle-two" aria-hidden="true" /><span className="orbit-particle particle-three" aria-hidden="true" />
      <div className="orbit-rotator">
        {services.map(({ name, Icon, theme, angle }) => (
          <div className="orbit-position" key={name} style={{ '--angle': `${angle}deg` }}>
            <div className="orbit-anchor">
              <div className="orbit-counter">
                <div className={`service-card service-${theme}`}>
                  <span className="service-icon"><Icon size={21} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span className="service-name">{name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactCard() {
  return (
    <aside className="contact-card" aria-label="Contact Key2Biz">
      <span className="contact-icon"><Mail size={20} strokeWidth={1.8} aria-hidden="true" /></span>
      <div className="contact-details">
        <h2>CONTACT US</h2>
        <span className="contact-label">Mail to:</span>
        <a href="mailto:muthupriya09022003@gmail.com">muthupriya09022003@gmail.com</a>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <main id="top" className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" />YOUR DIGITAL PARTNER</div>
        <h1>Ideas to<br /><span>Real Growth</span></h1>
        <p>We build digital solutions — from applications and websites to marketing, SEO and performance campaigns.</p>
        <ContactCard />
      </div>
      <section className="visual-stage" aria-label="Key2Biz digital services orbiting a laptop">
        <div className="orbit-ring" aria-hidden="true" />
        <OrbitServices />
        <Laptop />
      </section>
    </main>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const headerButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointer = (event) => {
      if (!popupRef.current?.contains(event.target) && !headerButtonRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        lastTriggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const toggleFromHeader = () => {
    if (open) setOpen(false);
    else { lastTriggerRef.current = headerButtonRef.current; setOpen(true); }
  };

  return (
    <div className="page-shell" style={{ '--desktop-background': `url(${desktopBackground})`, '--mobile-background': `url(${mobileBackground})` }}>
      <Header open={open} onToggle={toggleFromHeader} buttonRef={headerButtonRef} popupRef={popupRef} onClose={() => setOpen(false)} />
      <Hero />
    </div>
  );
}
