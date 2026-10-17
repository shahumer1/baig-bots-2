import { useEffect } from 'react';
import { BaigBotsSite } from '../site.js';
import { getSavedTheme } from '../theme/theme.js';
import { GlobalEffects } from './GlobalEffects.jsx';
import { Header } from './Header.jsx';
import { Hero } from './Hero.jsx';
import { Marquees } from './Marquees.jsx';
import { Stats } from './Stats.jsx';
import { Services } from './Services.jsx';
import { Solutions } from './Solutions.jsx';
import { Statement } from './Statement.jsx';
import { Agents } from './Agents.jsx';
import { Estimator } from './Estimator.jsx';
import { Process } from './Process.jsx';
import { Engage } from './Engage.jsx';
import { Faq } from './Faq.jsx';
import { Contact } from './Contact.jsx';
import { Footer } from './Footer.jsx';
import { ContactLanding, IndustriesPage, IndustryDetail, NotFoundPage, ServiceDetail, ServicesIndex } from './ContentPages.jsx';
import { allServices } from './serviceData.js';
import { innerIndustries, innerServices } from './innerData.js';

function getPage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home', title: 'Home' };
  if (path === '/services') return { kind: 'services', title: 'All Services' };
  if (path === '/services/other') return { kind: 'other', title: 'Other Services' };
  if (path === '/industries') return { kind: 'industries', title: 'Industries' };
  if (path === '/contact') return { kind: 'contact', title: 'Contact Us' };
  const industry = innerIndustries.find((item) => path === `/industries/${item.slug}`);
  if (industry) return { kind: 'industry-detail', title: industry.title, industry };
  const service = [...innerServices, ...allServices].find((item) => path === `/services/${item.slug}`);
  if (service) return { kind: 'detail', title: service.title, service };
  return { kind: 'not-found', title: 'Page Not Found' };
}

export function Page() {
  const page = getPage(typeof window === 'undefined' ? '/' : window.location.pathname);
  useEffect(() => {
    document.title = page.kind === 'home' ? 'Baig Bots — Digital Solutions' : `${page.title} — Baig Bots`;
    const site = new BaigBotsSite();
    site.componentDidMount();
    const anchorFrame = page.kind === 'industry-detail' && window.location.hash
      ? window.requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ block: 'start', behavior: 'instant' }))
      : null;
    return () => { if (anchorFrame !== null) window.cancelAnimationFrame(anchorFrame); site.componentWillUnmount(); };
  }, []);

  return (
    <div id="bb" data-theme={getSavedTheme()} data-canvas-width="1440" data-canvas-height="8000" data-document-role="page" data-label={`Website — ${page.title}`}>
      <GlobalEffects />
      <Header inner={page.kind !== 'home'} />
      {page.kind === 'home' && <>
        <Hero />
        <Marquees />
        <Stats />
        <Services />
        <Solutions />
        <Statement />
        <Agents />
        <Estimator />
        {/* <Stack /> — keep the Technology section available, but hide it on the home page. */}
        <Process />
        <Engage />
        <Faq />
      </>}
      {page.kind === 'services' && <ServicesIndex />}
      {page.kind === 'other' && <ServicesIndex category="other" />}
      {page.kind === 'detail' && <ServiceDetail service={page.service} />}
      {page.kind === 'industries' && <IndustriesPage />}
      {page.kind === 'industry-detail' && <IndustryDetail industry={page.industry} />}
      {page.kind === 'not-found' && <NotFoundPage />}
      {page.kind === 'contact' && <ContactLanding />}
      {page.kind !== 'detail' && <Contact inner={page.kind !== 'home'} />}
      <Footer inner={page.kind !== 'home'} />
    </div>
  );
}
