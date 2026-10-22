import { useEffect, useRef } from 'react';
import { innerIndustries, innerServices, innerServicePath } from './innerData.js';

const serviceLinks = [
  { title: 'All Services', href: '/services' },
  ...innerServices.map((service) => ({ title: service.title, href: innerServicePath(service) })),
  { title: 'Other', href: '/services/other' },
];

const industryLinks = [
  { title: 'All Industries', href: '/industries' },
  ...innerIndustries.map((industry) => ({ title: industry.title, href: `/industries/${industry.slug}` })),
];

function NavDropdown({ label, links, mobile = false }) {
  return <details className={mobile ? 'nav-services-mobile' : 'nav-services'}>
    <summary><span data-scr="">{label}</span><svg aria-hidden="true" className="nav-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m3 5 4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></summary>
    <div className="nav-service-list">
      {links.map(({ title, href }) => <a key={href} href={href}>{title}</a>)}
    </div>
  </details>;
}

export function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    const closeDropdowns = (event) => {
      headerRef.current?.querySelectorAll('details[open]').forEach((dropdown) => {
        if (!dropdown.contains(event.target)) dropdown.open = false;
      });
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        headerRef.current?.querySelectorAll('details[open]').forEach((dropdown) => { dropdown.open = false; });
      }
    };

    document.addEventListener('pointerdown', closeDropdowns);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeDropdowns);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return <header ref={headerRef} className="nav on-dark" data-nav="">
    <div className="wrap nav-in">
      <a className="brand" href="/" aria-label="Baig Bots — home">
        <span className="blg" aria-hidden="true"><i className="lg-s"></i><i className="lg-ss"></i><i className="lg-r"></i><i className="lg-rs"></i><i className="lg-sh"></i></span>
        <span className="brand-txt"><b>Baig Bots</b><i>Digital Solutions</i></span>
      </a>
      <nav className="links" aria-label="Primary">
        <a href="/" data-scr="">Home</a>
        <NavDropdown label="Services" links={serviceLinks}/>
        <NavDropdown label="Industries" links={industryLinks}/>
        <a href="/contact" data-scr="">Contact Us</a>
      </nav>
      <div className="nav-actions">
        <a className="btn btn-primary btn-sm" href="/contact" data-magnet="" data-press=""><span>Start a project</span></a>
        <button className="theme-toggle" type="button" data-theme-toggle="" aria-label="Switch to dark theme" aria-pressed="false" title="Dark theme">
          <svg className="theme-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.1 15.7A8.5 8.5 0 0 1 8.3 3.9 8.5 8.5 0 1 0 20.1 15.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"></path></svg>
          <svg className="theme-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7"></circle><path d="M12 2V4M12 20V22M4.93 4.93L6.35 6.35M17.65 17.65L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.35 17.65M17.65 6.35L19.07 4.93" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"></path></svg>
        </button>
        <button className="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" data-menu="">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><path d="M4 9H22M4 17H22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path></svg>
        </button>
      </div>
    </div>
    <nav className="mobile-panel" data-panel="" aria-label="Mobile primary">
      <a href="/">Home</a>
      <NavDropdown label="Services" links={serviceLinks} mobile/>
      <NavDropdown label="Industries" links={industryLinks} mobile/>
      <a href="/contact">Contact Us</a>
    </nav>
  </header>;
}
