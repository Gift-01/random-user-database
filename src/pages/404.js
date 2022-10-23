import React from "react";
import "./404.css";

const Error404Page = () => {
  return (
    <div className="error-page">
      <span class="material-symbols-outlined">
        sentiment_extremely_dissatisfied
      </span>
      <h1>404</h1>
      <h2>Something went wrong!</h2>
      <p>The resource requested could not be found on this server.</p>
    </div>
  );
};

export default Error404Page;
