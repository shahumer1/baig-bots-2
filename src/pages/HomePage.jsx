import { HomeStory } from '../components/HomeStory.jsx';
import { HomeVision } from '../components/HomeVision.jsx';
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
    <HomeStory />
    <HomeVision />
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
