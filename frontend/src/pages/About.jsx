import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container page about-premium">

      {/* HERO SECTION */}
      <section className="about-hero-premium">
        <div className="hero-badge">GenZ Healthcare</div>

        <h1>
          Healthcare built for the <span>modern world</span>
        </h1>

        <p>
          We are redefining healthcare access by connecting patients with
          verified doctors, clinics, hospitals, and diagnostic services —
          instantly and transparently.
        </p>

        <div className="hero-stats">
          <div>
            <h3>10K+</h3>
            <span>Patients Served</span>
          </div>
          <div>
            <h3>500+</h3>
            <span>Doctors</span>
          </div>
          <div>
            <h3>100+</h3>
            <span>Labs & Hospitals</span>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="about-grid">

        <div className="about-card-premium">
          <h2>Our Mission</h2>
          <p>
            To make healthcare accessible, fast, and trustworthy by removing
            traditional barriers between patients and providers.
          </p>
        </div>

        <div className="about-card-premium">
          <h2>Our Vision</h2>
          <p>
            To build India’s most reliable digital healthcare ecosystem where
            booking a doctor or lab test is as easy as ordering food.
          </p>
        </div>

        <div className="about-card-premium">
          <h2>What We Do</h2>
          <ul>
            <li> Verified Doctors & Providers</li>
            <li> Instant Appointment Booking</li>
            <li> Lab Tests & Home Collection</li>
            <li> Secure Patient Records</li>
            <li> City-based Availability System</li>
          </ul>
        </div>

        <div className="about-card-premium highlight">
          <h2>Why Choose Us</h2>
          <p>
            We focus on trust, speed, and simplicity. Every provider is verified,
            every booking is transparent, and every experience is designed for
            patients first.
          </p>
        </div>

      </section>

      {/* BOTTOM CTA */}
      <section className="about-cta">
        <h2>Start your healthcare journey today</h2>
        <p>Find trusted doctors and book appointments in seconds.</p>

        <div className="about-actions">

            <Link to="/Services" className="primary-btn">
                Find Doctors
            </Link>
        </div>
      </section>

    </div>
  );
}

export default About;