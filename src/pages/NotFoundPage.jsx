import { PageIntro } from '../components/InnerPageParts.jsx';

export function NotFoundPage() { return <main id="top" className="inner-page"><PageIntro scene="not-found" eyebrow="Page not found" title="This page isn't here." description="Use the navigation to find a service or industry."/><div className="wrap inner-not-found"><a className="btn btn-primary" href="/"><span>Back to Home</span></a></div></main>; }
