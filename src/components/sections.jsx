import parse, { domToReact } from 'html-react-parser';
import { DrawCircleText } from './DrawCircleText.jsx';
import { AutomationImpactChart } from './AutomationImpactChart.jsx';
import globalEffectsHtml from './markup/GlobalEffects.html?raw';
import headerHtml from './markup/Header.html?raw';
import heroHtml from './markup/Hero.html?raw';
import marqueesHtml from './markup/Marquees.html?raw';
import statsHtml from './markup/Stats.html?raw';
import servicesHtml from './markup/Services.html?raw';
import solutionsHtml from './markup/Solutions.html?raw';
import statementHtml from './markup/Statement.html?raw';
import agentsHtml from './markup/Agents.html?raw';
import estimatorHtml from './markup/Estimator.html?raw';
import stackHtml from './markup/Stack.html?raw';
import processHtml from './markup/Process.html?raw';
import engageHtml from './markup/Engage.html?raw';
import faqHtml from './markup/Faq.html?raw';
import contactHtml from './markup/Contact.html?raw';
import footerHtml from './markup/Footer.html?raw';

function markupComponent(html) {
  return function Section() { return parse(html); };
}

export const GlobalEffects = markupComponent(globalEffectsHtml);
export const Header = markupComponent(headerHtml);
export const Hero = markupComponent(heroHtml);
export const Marquees = markupComponent(marqueesHtml);
export const Stats = markupComponent(statsHtml);
export const Services = markupComponent(servicesHtml);
export const Solutions = markupComponent(solutionsHtml);
export const Statement = markupComponent(statementHtml);
export function Agents() {
  return parse(agentsHtml, {
    replace(node) {
      if (node.attribs?.['data-automation-impact'] !== undefined) {
        return <AutomationImpactChart />;
      }
      if (node.attribs?.['data-circle-heading'] !== undefined) {
        return <DrawCircleText targetWord="busywork">{domToReact(node.children)}</DrawCircleText>;
      }
    }
  });
}
export const Estimator = markupComponent(estimatorHtml);
export const Stack = markupComponent(stackHtml);
export const Process = markupComponent(processHtml);
export const Engage = markupComponent(engageHtml);
export const Faq = markupComponent(faqHtml);
export const Contact = markupComponent(contactHtml);
export const Footer = markupComponent(footerHtml);
