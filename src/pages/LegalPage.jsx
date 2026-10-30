import { useEffect, useRef, useState } from 'react';

const termsSections = [
  {
    id: 'using-the-site', title: 'Using this website',
    paragraphs: [
      'This website introduces Baig Bots and the services we offer. You may browse it and contact us about a project. Please use it lawfully and do not attempt to disrupt, misuse or gain unauthorised access to the site or its systems.',
      'The information here is general and may change as our services develop. We aim to keep it accurate, but a page on this site is not a project proposal or a promise to deliver a particular result.',
    ],
  },
  {
    id: 'enquiries', title: 'Enquiries and proposals',
    paragraphs: [
      'Submitting information in the on-page enquiry preview does not send it to us or create a client relationship. To start a conversation, email us using the address below.',
      'Any scope, timeline, price, deliverables, intellectual property rights and support arrangements for paid work will be set out in a separate written agreement. That agreement takes precedence for the project it covers.',
    ],
  },
  {
    id: 'site-content', title: 'Content and intellectual property',
    paragraphs: [
      'The site design, text, branding and original materials are owned by Baig Bots or used with permission, unless stated otherwise. You may view them for your own evaluation of our services. Please ask before reusing, publishing or modifying them for another purpose.',
      'Names, marks and materials belonging to third parties remain the property of their respective owners.',
    ],
  },
  {
    id: 'external-links', title: 'External links',
    paragraphs: [
      'This site may link to third-party websites. Those sites have their own content, terms and privacy practices. We do not control them and recommend reviewing their policies before using them.',
    ],
  },
  {
    id: 'availability', title: 'Availability and responsibility',
    paragraphs: [
      'We may update, pause or remove parts of this site. We cannot guarantee uninterrupted access or that every page is free of errors. To the extent permitted by applicable law, Baig Bots is not responsible for losses arising solely from reliance on general website information or temporary site unavailability.',
      'Nothing here limits any right or responsibility that cannot legally be limited.',
    ],
  },
  {
    id: 'terms-changes', title: 'Changes and questions',
    paragraphs: [
      'We may revise these website terms as the site changes. The version displayed here applies to your use of the site at that time. For a question about these terms, contact us at contact@baigbots.com.',
    ],
  },
];

const privacySections = [
  {
    id: 'information', title: 'Information involved',
    paragraphs: [
      'If you email Baig Bots, we receive your email address and whatever name, business details or project information you choose to include. The quick enquiry form currently provides a preview in your browser only; pressing “Preview enquiry” does not send its contents to us. The footer newsletter field currently checks the address format but does not register a subscription.',
      'The site stores your light or dark theme preference in your browser’s local storage. Standard technical request information may also be handled by the services that host and deliver the website.',
    ],
  },
  {
    id: 'purpose', title: 'Why we use information',
    paragraphs: [
      'We use messages you send us to respond, discuss requirements, prepare a possible proposal and keep a record of the conversation. We use the theme preference only to remember your display choice on this device.',
      'Where applicable privacy law requires a legal basis, responding to a requested discussion may involve steps before a contract or our legitimate interest in handling business enquiries. Any separate client project will have its own agreed data-handling arrangements where needed.',
    ],
  },
  {
    id: 'sharing', title: 'Sharing and service providers',
    paragraphs: [
      'We do not sell enquiry information. Email and website hosting providers may process the information needed to deliver messages and operate the site. We may also disclose information when required by law or to protect legal rights.',
      'If a project later involves other providers, the relevant proposal or agreement should describe those arrangements.',
    ],
  },
  {
    id: 'retention', title: 'Retention and security',
    paragraphs: [
      'We keep correspondence for as long as reasonably needed to handle the enquiry, maintain appropriate business records and meet applicable obligations. The theme preference remains in your browser until you clear site storage or change it.',
      'We take reasonable steps to protect information, but no internet transmission or storage method is completely secure. Please avoid sending sensitive data in an initial enquiry unless we have agreed a suitable way to receive it.',
    ],
  },
  {
    id: 'choices', title: 'Your choices and rights',
    paragraphs: [
      'You can change the site theme using the header control and clear its saved preference through your browser settings. You may contact us to ask about personal information you have emailed us, request correction or deletion, or raise a privacy concern. Rights vary under applicable law and some records may need to be retained.',
      'We will review requests and respond using the contact details you provide.',
    ],
  },
  {
    id: 'privacy-changes', title: 'Updates and contact',
    paragraphs: [
      'We will update this page if the site’s data practices change, including when an enquiry or newsletter submission service becomes available. For privacy questions, email contact@baigbots.com.',
    ],
  },
];

export function LegalPage({ document: documentType }) {
  const isPrivacy = documentType === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const sections = isPrivacy ? privacySections : termsSections;
  const relatedPath = isPrivacy ? '/terms-and-conditions' : '/privacy-policy';
  const relatedTitle = isPrivacy ? 'Terms & Conditions' : 'Privacy Policy';
  const summary = isPrivacy
    ? 'This notice describes the website’s current behaviour. Project-specific handling of client data can be agreed separately.'
    : 'These terms cover this website. Paid services are governed by the separate agreement accepted for that work.';
  const heroNote = isPrivacy
    ? 'What information is involved, how it is used, and the choices you have.'
    : 'Website use, project enquiries, and where separate agreements begin.';
  const [activeId, setActiveId] = useState(sections[0].id);
  const progressRef = useRef(null);

  useEffect(() => {
    const article = document.getElementById('legal-content');
    const sectionElements = sections.map(({ id }) => document.getElementById(id));
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * .34;
      let currentId = sections[0].id;

      sectionElements.forEach((element, index) => {
        if (element?.getBoundingClientRect().top <= readingLine) {
          currentId = sections[index].id;
        }
      });
      setActiveId((previous) => previous === currentId ? previous : currentId);

      if (article && progressRef.current) {
        const top = article.getBoundingClientRect().top + window.scrollY;
        const bottom = article.getBoundingClientRect().bottom + window.scrollY;
        const travel = Math.max(1, bottom - top - window.innerHeight * .5);
        const amount = Math.min(1, Math.max(0, (window.scrollY + readingLine - top) / travel));
        progressRef.current.style.transform = `scaleY(${amount})`;
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [documentType]);

  const sectionLinks = sections.map((section, index) => (
    <a
      key={section.id}
      href={`#${section.id}`}
      className={activeId === section.id ? 'is-active' : undefined}
      aria-current={activeId === section.id ? 'location' : undefined}
    >
      <span>{String(index + 1).padStart(2, '0')}</span>
      {section.title}
    </a>
  ));

  return (
    <main id="top" className="inner-page legal-page">
      <header className="legal-hero wrap">
        <div className="legal-hero-copy">
          <p className="eyebrow">
            <span className="dot" />
            BAIG BOTS / LEGAL
          </p>
          <h1>{title}<span>.</span></h1>
          <p className="legal-hero-tagline">
            {isPrivacy ? 'Your data. Clearly explained.' : 'Clear terms. Better together.'}
          </p>
          <p className="legal-lead">
            {isPrivacy
              ? 'How information is handled when you visit this site or get in touch with Baig Bots.'
              : 'The ground rules for using this website and starting a conversation with Baig Bots.'}
          </p>
        </div>
        <div className="legal-hero-aside">
          <div className="legal-hero-aside-top">
            <span>DOCUMENT / 0{isPrivacy ? '2' : '1'}</span>
            <span>{String(sections.length).padStart(2, '0')} SECTIONS</span>
          </div>
          <p className="legal-hero-aside-label">IN BRIEF</p>
          <p>{heroNote}</p>
          <a href="#legal-content">Read the document <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <div className="legal-layout wrap">
        <aside className="legal-sidebar" aria-label={`${title} sections`}>
          <p className="legal-side-label">CONTENTS / {String(sections.length).padStart(2, '0')}</p>
          <nav className="legal-desktop-index">
            <span className="legal-reading-track" aria-hidden="true"><span ref={progressRef} /></span>
            {sectionLinks}
          </nav>
          <details className="legal-mobile-index">
            <summary>
              <span>Browse sections <small>NOW READING / {sections.find(({ id }) => id === activeId)?.title}</small></span>
              <b aria-hidden="true">+</b>
            </summary>
            <nav>{sectionLinks}</nav>
          </details>
          <div className="legal-side-switch">
            <span>ALSO READ</span>
            <a href={relatedPath}>{relatedTitle}</a>
          </div>
        </aside>

        <article className="legal-main" id="legal-content">
          <div className="legal-document-head">
            <span>BAIG BOTS / WEBSITE INFORMATION</span>
            <span>0{isPrivacy ? '2' : '1'} / 02</span>
          </div>
          <p className="legal-preface">{summary}</p>
          {sections.map((section, index) => (
            <section
              className={`legal-card${activeId === section.id ? ' is-current' : ''}`}
              id={section.id}
              key={section.id}
            >
              <div className="legal-card-index">
                {String(index + 1).padStart(2, '0')} <span>/</span> {String(sections.length).padStart(2, '0')}
              </div>
              <div className="legal-card-body">
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
          <div className="legal-contact">
            <div>
              <span>NEED CLARITY?</span>
              <h2>Let's talk it through.</h2>
              <p>For questions about this page, email our team directly.</p>
            </div>
            <a className="btn btn-primary" href="mailto:contact@baigbots.com">
              <span>contact@baigbots.com</span>
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}

