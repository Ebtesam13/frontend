import "./_404_page.css";
import React from "react";
import { Link } from "react-router-dom";

export default function _404_page() {
  return (
    <div className="_404_page">
      <section className="section">
        <h3>404</h3>
        <h4>Look like you're lost</h4>
        <p>the page you are looking for not avaible!</p>
        <Link to="/admin/dashboard" className="link_404">
          Go to Dashboard
        </Link>
      </section>
    </div>
  );
}
