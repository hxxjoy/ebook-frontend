import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 w-full">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 网站介绍 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
            This is an online e-book website that provides high-quality e-book resources, allowing you to enjoy the pleasure of reading anytime, anywhere.
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <ul className="space-y-2 text-sm">
              <li>Email: Hugo@opus.com</li>
              <li>Phone: +86 123 4567 8901</li>
              <li>Address: xxx</li>
            </ul>
          </div>

          {/* 社交媒体 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} opus.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
