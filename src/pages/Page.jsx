import { lazy, Suspense, useEffect } from 'react';
import { getSavedTheme } from '../theme/theme.js';
import { GlobalEffects } from '../components/GlobalEffects.jsx';
import { KineticGrid } from '../components/KineticGrid.jsx';
import { Header } from '../components/Header.jsx';
import { Contact } from '../components/Contact.jsx';
import { Footer } from '../components/Footer.jsx';
import { allServices } from '../components/serviceData.js';
import { innerIndustries, innerServices } from '../components/innerData.js';

// Server rendering keeps pages synchronous for the route smoke test. In the
// browser, only the module for the current route is downloaded and parsed.
const serverPages = import.meta.env.SSR ? {
  HomePage: (await import('./HomePage.jsx')).HomePage,
  ServicesIndex: (await import('./ServicesPage.jsx')).ServicesIndex,
  OtherPage: (await import('./OtherServicesPage.jsx')).OtherPage,
  ServiceDetail: (await import('./ServiceDetailPage.jsx')).ServiceDetail,
  IndustriesPage: (await import('./IndustriesPage.jsx')).IndustriesPage,
  IndustryDetail: (await import('./IndustryDetailPage.jsx')).IndustryDetail,
  ContactLanding: (await import('./ContactPage.jsx')).ContactLanding,
  LegalPage: (await import('./LegalPage.jsx')).LegalPage,
  NotFoundPage: (await import('./NotFoundPage.jsx')).NotFoundPage,
} : null;
const routeComponent = (name, importer) => import.meta.env.SSR
  ? serverPages[name]
  : lazy(() => importer().then((module) => ({ default: module[name] })));
const HomePage = routeComponent('HomePage', () => import('./HomePage.jsx'));
const ServicesIndex = routeComponent('ServicesIndex', () => import('./ServicesPage.jsx'));
const OtherPage = routeComponent('OtherPage', () => import('./OtherServicesPage.jsx'));
const ServiceDetail = routeComponent('ServiceDetail', () => import('./ServiceDetailPage.jsx'));
const IndustriesPage = routeComponent('IndustriesPage', () => import('./IndustriesPage.jsx'));
const IndustryDetail = routeComponent('IndustryDetail', () => import('./IndustryDetailPage.jsx'));
const ContactLanding = routeComponent('ContactLanding', () => import('./ContactPage.jsx'));
const LegalPage = routeComponent('LegalPage', () => import('./LegalPage.jsx'));
const NotFoundPage = routeComponent('NotFoundPage', () => import('./NotFoundPage.jsx'));

function getPage(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home', title: 'Home' };
  if (path === '/services') return { kind: 'services', title: 'All Services' };
  if (path === '/services/other') return { kind: 'other', title: 'Other Services' };
  if (path === '/industries') return { kind: 'industries', title: 'Industries' };
  if (path === '/contact') return { kind: 'contact', title: 'Contact Us' };
  if (path === '/terms-and-conditions' || path === '/terms') return { kind: 'legal', title: 'Terms & Conditions', document: 'terms' };
  if (path === '/privacy-policy' || path === '/privacy') return { kind: 'legal', title: 'Privacy Policy', document: 'privacy' };
  const industry = innerIndustries.find((item) => path === `/industries/${item.slug}`);
  if (industry) return { kind: 'industry-detail', title: industry.title, industry };
  const service = [...innerServices, ...allServices].find((item) => path === `/services/${item.slug}`);
  if (service) return { kind: 'detail', title: service.title, service };
  return { kind: 'not-found', title: 'Page Not Found' };
}

function PageEffects({ page }) {
  useEffect(() => {
    let disposed = false;
    let site;
    let anchorFrame = null;
    import('../site.js').then(({ BaigBotsSite }) => {
      if (disposed) return;
      site = new BaigBotsSite();
      site.componentDidMount();
      anchorFrame = window.requestAnimationFrame(() => {
        if (window.location.hash) {
          try {
            document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ block: 'start', behavior: 'instant' });
          } catch (_) { /* Ignore malformed URL fragments. */ }
        } else if (Number.isFinite(window.__bbInitialScrollY)) {
          window.scrollTo({ top: window.__bbInitialScrollY, behavior: 'instant' });
          delete window.__bbInitialScrollY;
        }
      });
    });
    return () => { disposed = true; if (anchorFrame !== null) window.cancelAnimationFrame(anchorFrame); site?.componentWillUnmount(); };
  }, []);
  return null;
}

export function Page() {
  const page = getPage(typeof window === 'undefined' ? '/' : window.location.pathname);
  useEffect(() => { document.title = page.kind === 'home' ? 'Baig Bots — Digital Solutions' : `${page.title} — Baig Bots`; }, []);

  return (
    <div id="bb" className={page.kind === 'home' ? 'home-page' : undefined} data-theme={getSavedTheme()} data-canvas-width="1440" data-canvas-height="8000" data-document-role="page" data-label={`Website — ${page.title}`}>
      <GlobalEffects />
      <KineticGrid sitewide />
      <Header inner={page.kind !== 'home'} />
      <Suspense fallback={<main className="inner-page" style={{ minHeight: '75vh' }} />}>
        {page.kind === 'home' && <HomePage />}
        {page.kind === 'services' && <ServicesIndex />}
        {page.kind === 'other' && <OtherPage />}
        {page.kind === 'detail' && <ServiceDetail service={page.service} />}
        {page.kind === 'industries' && <IndustriesPage />}
        {page.kind === 'industry-detail' && <IndustryDetail industry={page.industry} />}
        {page.kind === 'not-found' && <NotFoundPage />}
        {page.kind === 'contact' && <ContactLanding />}
        {page.kind === 'legal' && <LegalPage document={page.document} />}
        <PageEffects page={page} />
      </Suspense>
      {page.kind !== 'detail' && page.kind !== 'legal' && <Contact inner={page.kind !== 'home'} />}
      <Footer inner={page.kind !== 'home'} />
    </div>
  );
}
