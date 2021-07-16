import * as React from "react";

const Footer = () => (
  <footer className="mt-16 container mx-auto space-y-6">
    <h2>Contact Us</h2>

    <p>
      Made as part of <a href="https://chingu.io">Chingu&apos;s </a> 31st
      voyage.
    </p>
    <p>Our team:</p>
    <ul className="flex flex-row space-x-8">
      <li>Jim</li>
      <li>Anjana</li>
      <li>Kapre</li>
      <li>Ken</li>
      <li>Max</li>
      <li>Michael</li>
      <li>Joel</li>
    </ul>
    <p className="text-center">© Chingu v31 bears-team-02</p>
  </footer>
);

export default Footer;
