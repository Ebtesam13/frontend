import "./Loader.css";
import React, { useEffect } from "react";

export default function Loader() {
  useEffect(() => {
    setTimeout(() => {
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    }, 2000);
  }, []);

  return (
    <div className="Loader show" id="Loader">
      <div className="slice"></div>
    </div>
  );
}
