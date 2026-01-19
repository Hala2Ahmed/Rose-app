"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**==================================
 * Footer navigation links configuration
 ====================================*/
const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/occasions", label: "Occasions" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/faq", label: "FAQs" },
];

/**==================================
 * Footer Component
 * Renders:
 * - Brand logo and copyright
 * - Navigation links
 * - Newsletter subscription form
 ==================================*/
function Footer() {
  return (
    /*====================== Footer wrapper ===================== */
    <footer className="bg-zinc-800 opacity-100 dark:bg-zinc-900">
      <div className="mx-auto px-8 py-10">
        {/* ======================Main footer grid layout ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-4 h-full">
          {/* ======================== Brand logo & app information ======================= */}
          <div className="flex flex-col items-center justify-center gap-2 md:col-span-1">
            <Image
              src="/assets/brands/logo.png"
              alt="Rose Logo"
              width={220}
              height={250}
              className="object-contain"
            />

            <div className="text-center leading-tight">
              <p className="text-lg text-softPink-300 font-semibold">
                Rose E-Commerce App
              </p>
              <p className="text-sm text-zinc-400">
                © 2025 All rights reserved
              </p>
            </div>
          </div>

          {/* =================================Footer navigation links section =================== */}
          <div className="flex flex-col justify-start md:col-span-2">
            <h3 className="font-semibold text-lg text-softPink-300 mb-2">
              Discover our website
            </h3>

            <ul className="text-zinc-300 font-primary space-y-0">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-zinc-100 transition-colors hover:text-softPink-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================== subscription section=========================== */}
          <div className="flex flex-col justify-start md:col-span-1 gap-4">
            <div>
              <h3 className="font-semibold text-softPink-300 text-xl">
                Get <span className="text-maroon-50">20%</span> OFF Discount
                Coupon
              </h3>

              <p className="text-sm text-zinc-500 leading-tight mb-3">
                By subscribing to our newsletter
              </p>
            </div>

            {/*============================== Subscription form ==========================*/}
            <form className="flex items-center bg-zinc-600 rounded-full overflow-hidden">
              {/*============== Email input============ */}
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-zinc-400 focus:outline-none"
              />

              {/*============== Submit button ============*/}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-maroon-50 text-maroon-700 px-5 py-2.5 text-sm font-medium rounded-full transition-colors hover:bg-maroon-100 dark:bg-softPink-300 dark:text-zinc-900 dark:hover:bg-softPink-400"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
