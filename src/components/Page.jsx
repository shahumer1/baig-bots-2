import { useEffect } from 'react';
import { BaigBotsSite } from '../site.js';
import { getSystemTheme } from '../theme/theme.js';
import { GlobalEffects, Header, Hero, Marquees, Stats, Services, Solutions, Statement, Agents, Estimator, Stack, Process, Engage, Faq, Contact, Footer } from './sections.jsx';

export function Page() {
  useEffect(() => {
    const site = new BaigBotsSite();
    site.componentDidMount();
    return () => site.componentWillUnmount();
  }, []);

  return (
    <div id="bb" data-theme={getSystemTheme()} data-canvas-width="1440" data-canvas-height="8000" data-document-role="page" data-label="Website — Home">
      <GlobalEffects />
      <Header />
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
      <Contact />
      <Footer />
    </div>
  );
}
