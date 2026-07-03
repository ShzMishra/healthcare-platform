import { Link } from "react-router-dom";
import { HeartPulse, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="footer-v2">

      <div className="container footer-grid">

        {/* BRAND */}
        <div className="footer-brand">
          <div className="footer-logo">
            <HeartPulse size={22} />
            <span>GenZ Healthcare</span>
          </div>

          <p>
            Trusted healthcare services, diagnostics and appointments across India.
            Fast, reliable and verified providers at your fingertips.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3>Quick Links</h3>

          <Link to="/services">Services</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* SERVICES */}
        <div>
          <h3>Services</h3>

          <Link to="/services">Doctor Appointment</Link>
          <Link to="/services">Lab Tests</Link>
          <Link to="/services">Home Collection</Link>
          <Link to="/services">Health Records</Link>
        </div>

        {/* CONTACT */}
        <div>
          <h3>Contact</h3>

          <p><Phone size={14} /> +91 90000 00000</p>
          <p><Mail size={14} /> support@genzhealthcare.com</p>
          <p><MapPin size={14} /> India</p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 GenZ Healthcare. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;