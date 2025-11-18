import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./loadingPageStyle.css";
import logo from "/assets/logo.svg";

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/booking");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="loading-container">
      <article className="loading-content">
        <img className="loading-logo" src={logo} alt="logo" />
        <h1 className="loading-title">strajk</h1>
        <h2 className="loading-subtitle">bowling</h2>
      </article>
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </section>
  );
}

export default LoadingPage;
