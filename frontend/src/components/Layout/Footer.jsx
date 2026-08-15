import React from 'react'
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { footercompanyLinks, footerProductLinks } from "../../static/data.jsx";

const socialLinks = [
  { icon: AiFillFacebook, href: "https://facebook.com" },
  { icon: AiOutlineTwitter, href: "https://twitter.com" },
  { icon: AiFillInstagram, href: "https://instagram.com" },
  { icon: AiFillYoutube, href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#16164e] text-white">
      {/* Link columns */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 sm:px-8 px-4 py-16 sm:text-left text-center">
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-3xl font-bold italic bg-white/10 rounded px-4 py-3 tracking-widest">
            Markit
          </h1>
          <p className="mt-4 text-gray-400 text-sm max-w-[220px]">
            Trusted Market place for shops and customers. You exprience our priority.
          </p>
          <div className="flex items-center gap-4 mt-5">
            {socialLinks.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#56d879] transition duration-300"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h1 className="mb-3 font-semibold">Company</h1>
          <ul className="space-y-2">
            {footerProductLinks.map((link, i) => (
              <li key={i}>
                <Link
                  className="text-gray-400 hover:text-[#56d879] duration-300 text-sm"
                  to={link.link || "#"}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="mb-3 font-semibold">Shop</h1>
          <ul className="space-y-2">
            {footercompanyLinks.map((link, i) => (
              <li key={i}>
                <Link
                  className="text-gray-400 hover:text-[#56d879] duration-300 text-sm"
                  to={link.link || "#"}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h1 className="mb-3 font-semibold">
            <span className="text-[#56d879]">Subscribe</span> to our newsletter
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Get news, events and offers straight to your inbox.
          </p>
          <div className="flex flex-col w-full max-w-[260px] gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email..."
              className="bg-white text-gray-800 w-full py-2.5 rounded px-3 focus:outline-none focus:ring-2 focus:ring-[#56d879]"
            />
            <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white w-full">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-4 sm:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <span>&copy; {new Date().getFullYear()} Markit. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-[#56d879] duration-300">Terms</Link>
            <span className="text-gray-600">|</span>
            <Link to="/privacy" className="hover:text-[#56d879] duration-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}