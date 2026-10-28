export function HomeIntroduction() {
  return <section className="home-intro" id="about" aria-labelledby="about-heading">
    <div className="wrap home-intro-grid">
      <p className="home-section-index">02 / ABOUT THE WORK</p>
      <div className="home-intro-main">
        <p className="home-kicker" data-home-reveal="">The thinking behind the build</p>
        <h2 id="about-heading" data-home-reveal="">Technology should make complex work feel <em>simple.</em></h2>
        <div className="home-intro-bottom">
          <p data-home-reveal="">We design and develop connected software, automation and AI solutions around the way a business actually operates. From the first workflow to the finished experience, every part has a purpose.</p>
          <a href="/services" className="btn btn-primary home-services-btn" data-magnet="" data-press="" aria-label="Explore all services"><span>Explore services</span><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
    <div className="home-intro-rule" aria-hidden="true" />
  </section>;
}
