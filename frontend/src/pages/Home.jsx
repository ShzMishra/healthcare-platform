import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Stethoscope,
  TestTube,
  House,
  FileText,
  ShieldCheck,
  Clock,
  Users,
  Search,
  Building2
} from "lucide-react";

import { useLocation } from "../location/LocationContext";
import { useState } from "react";

function Home() {

  const { location } = useLocation();

  const services = [
    {
      icon: <Stethoscope size={26} />,
      title: "Doctor Appointment",
      text: "Book verified doctors easily."
    },
    {
      icon: <TestTube size={26} />,
      title: "Lab Tests",
      text: "Find trusted diagnostic services."
    },
    {
      icon: <House size={26} />,
      title: "Home Sample Collection",
      text: "Safe blood collection at your home."
    },
    {
      icon: <FileText size={26} />,
      title: "Digital Reports",
      text: "Manage your healthcare reports."
    }
  ];

  const [search, setSearch] = useState("");

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("doctor");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const [providers, setProviders] = useState([]);

  const suggestions = [
    { type: "doctor", name: "General Physician near you" },
    { type: "doctor", name: "Cardiologist in Nashik" },
    { type: "lab", name: "Blood Test at Home" },
    { type: "lab", name: "Full Body Checkup" },
    { type: "hospital", name: "Multi-speciality Hospitals" },
  ];

  const filteredSuggestions = suggestions.filter(
    (item) =>
        item.type === activeFilter &&
        item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>

      {/* ================= HERO (UPGRADED) ================= */}
      <section className="hero-v2">

        <div className="container hero-grid">

          <div className="hero-left">

            <h1>
              Smart Healthcare <br />
              <span>at your fingertips</span>
            </h1>

            <p>
              Book doctors, lab tests and home healthcare services instantly from verified providers in your area.
            </p>

            {location && (
              <p className="location-text">
                📍 Available in {location.city}
              </p>
            )}

            <div className="hero-actions">

              <Link to="/services" className="primary-btn">
                Explore Services
              </Link>

              <Link to="/login" className="secondary-btn">
                Get Started
              </Link>

            </div>

          </div>

          <div className="hero-right">

            <div className="hero-card">
              <ShieldCheck size={30} />
              <h3>Verified Doctors</h3>
              <p>All providers are verified for safety</p>
            </div>

            <div className="hero-card">
              <Clock size={30} />
              <h3>Quick Booking</h3>
              <p>Appointments in just a few clicks</p>
            </div>

            <div className="hero-card">
              <Users size={30} />
              <h3>Trusted by Users</h3>
              <p>Growing healthcare network</p>
            </div>

          </div>
          
          <div className="smart-search">

            {/* FILTERS */}
            <div className="search-filters">
                <button
                className={activeFilter === "doctor" ? "active" : ""}
                onClick={() => setActiveFilter("doctor")}
                >
                <Stethoscope size={16} /> Doctor
                </button>

                <button
                className={activeFilter === "lab" ? "active" : ""}
                onClick={() => setActiveFilter("lab")}
                >
                <TestTube size={16} /> Lab
                </button>

                <button
                className={activeFilter === "hospital" ? "active" : ""}
                onClick={() => setActiveFilter("hospital")}
                >
                <Building2 size={16} /> Hospital
                </button>
            </div>

            {/* INPUT */}
            <div className="search-box-v2">
                <Search className="search-icon" size={18} />

                <input
                type="text"
                placeholder={`Search ${activeFilter}...`}
                value={query}
                onChange={async (e) => {
                  const value = e.target.value;

                  setQuery(value);
                  setOpen(true);

                  if (!value.trim()) {
                    setProviders([]);
                    return;
                  }

                  try {
                    const res = await axios.get(
                      `http://localhost:5000/api/providers/search?query=${value}`
                    );

                    setProviders(res.data);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                onFocus={() => setOpen(true)}
                />

                <button className="search-btn">Search</button>
            </div>

            {/* DROPDOWN */}
            {open && query && (
              <div className="search-dropdown-v2">

                {providers.length > 0 ? (

                  providers.map((provider) => (
                    <div
                      key={provider.id}
                      className="suggestion-item"
                      onClick={() => navigate("/login")}
                    >
                     <strong>{provider.name}</strong>

                    <p>
                      {provider.type}
                      {provider.city && ` • ${provider.city}`}
                    </p>
                    </div>
                  ))

                ) : (

                  <div className="suggestion-item">
                    No providers found
                  </div>

                )}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">

        <div className="container stats-grid">

          <div className="stat-box">
            <h2>10k+</h2>
            <p>Patients Served</p>
          </div>

          <div className="stat-box">
            <h2>100+</h2>
            <p>Verified Hospitals</p>
          </div>

          <div className="stat-box">
            <h2>500+</h2>
            <p>Verified Doctors</p>
          </div>

          <div className="stat-box">
            <h2>100+</h2>
            <p>Diagnostic Labs</p>
          </div>

          <div className="stat-box">
            <h2>24/7</h2>
            <p>Support</p>
          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}
      <section className="services-section">

        <div className="container">

          <h2 className="section-title">Our Services</h2>

          <p className="section-subtitle">
            Complete healthcare solutions in one platform
          </p>

          <div className="service-grid">

            {services.map((item, index) => (

              <Link
                to="/services"
                key={index}
                className="service-card premium-card clickable-card"
              >

                <div className="service-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>

              </Link>

            ))}

          </div>

        </div>

      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section">

        <div className="container">

          <h2 className="section-title">How it works</h2>

          <div className="how-grid">

            <div className="how-card">
              <h3>1. Search</h3>
              <p>Find doctors, labs or services near you</p>
            </div>

            <div className="how-card">
              <h3>2. Book</h3>
              <p>Choose time slot and confirm appointment</p>
            </div>

            <div className="how-card">
              <h3>3. Get Care</h3>
              <p>Visit or get home healthcare service</p>
            </div>

          </div>

        </div>

      </section>

      {/* ================= TRUST ================= */}
      <section className="trust-section">

        <div className="container">

          <h2>Why choose GenZ Healthcare?</h2>

          <p>
            Verified providers • Transparent pricing • Fast booking • Home healthcare support
          </p>

        </div>

      </section>

    </>
  );
}

export default Home;