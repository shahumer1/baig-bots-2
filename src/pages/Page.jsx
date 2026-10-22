import { useEffect } from 'react';
import { BaigBotsSite } from '../site.js';
import { getSavedTheme } from '../theme/theme.js';
import { GlobalEffects } from '../components/GlobalEffects.jsx';
import { Header } from '../components/Header.jsx';
import { Contact } from '../components/Contact.jsx';
import { Footer } from '../components/Footer.jsx';
import { allServices } from '../components/serviceData.js';
import { innerIndustries, innerServices } from '../components/innerData.js';
import { HomePage } from './HomePage.jsx';
import { ServicesIndex } from './ServicesPage.jsx';
import { OtherPage } from './OtherServicesPage.jsx';
import { ServiceDetail } from './ServiceDetailPage.jsx';
import { IndustriesPage } from './IndustriesPage.jsx';
import { IndustryDetail } from './IndustryDetailPage.jsx';
import { ContactLanding } from './ContactPage.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';

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
      {page.kind === 'home' && <HomePage />}
      {page.kind === 'services' && <ServicesIndex />}
      {page.kind === 'other' && <OtherPage />}
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
