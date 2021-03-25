import React from "react";

//footer, common to all pages
export default function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div>
        <div className="container text-center text-md-left pt-5">
          Add info here
        </div>
      </div>
      <div
        className="footer-copyright text-center py-3"
        style={{ color: "black" }}
      >
        © 2021 Copyright
      </div>
    </footer>
  );
}
