import { Hero } from '../components/Hero.jsx';
import { Marquees } from '../components/Marquees.jsx';
import { Stats } from '../components/Stats.jsx';
import { Services } from '../components/Services.jsx';
import { Solutions } from '../components/Solutions.jsx';
import { Statement } from '../components/Statement.jsx';
import { Agents } from '../components/Agents.jsx';
import { Estimator } from '../components/Estimator.jsx';
import { Process } from '../components/Process.jsx';
import { Engage } from '../components/Engage.jsx';
import { Faq } from '../components/Faq.jsx';

export function HomePage() {
  return <>
    <Hero />
    <Marquees />
    <Stats />
    <Services />
    <Solutions />
    <Statement />
    <Agents />
    <Estimator />
    <Process />
    <Engage />
    <Faq />
  </>;
}
