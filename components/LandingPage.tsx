"use client";

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Play, CheckCircle2, Brain, Workflow, DollarSign } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#1f2937]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="shrink-0">
              <span className="text-xl font-bold text-white">ScrapeFlow</span>
            </div>

            {/* Nav Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-[#6b7280] hover:text-white transition-colors text-sm">
                Features
              </Link>
              <Link href="#use-cases" className="text-[#6b7280] hover:text-white transition-colors text-sm">
                Use Cases
              </Link>
              <Link href="#community" className="text-[#6b7280] hover:text-white transition-colors text-sm">
                Community
              </Link>
              <Link href="#pricing" className="text-[#6b7280] hover:text-white transition-colors text-sm">
                Pricing
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <button className="hidden sm:inline-flex items-center px-4 py-2 border border-[#1f2937] rounded-md text-sm font-medium text-white hover:bg-[#111111] transition-colors">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center px-4 py-2 bg-[#22c55e] rounded-md text-sm font-medium text-white hover:bg-[#16a34a] transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center mb-8">
            <Link 
              href="#docs" 
              className="inline-flex items-center px-4 py-2 rounded-full border border-[#1f2937] bg-[#111111] text-[#22c55e] text-sm hover:border-[#22c55e] transition-colors"
            >
              ✦ See our documentation →
            </Link>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Web <span className="text-[#22c55e]">Scraping</span> made Easy.
            <br />
            Automate with <span className="text-[#22c55e]">Drag and Drop</span> Workflows
          </h1>

          {/* Subtext */}
          <p className="text-[#6b7280] text-base sm:text-lg max-w-3xl mx-auto mb-10">
            ScrapeFlow empowers you to automate web data extraction with no coding required. 
            Create custom scraping workflows, monitor web pages, and transform your data.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <SignUpButton mode="modal">
              <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-[#22c55e] rounded-md text-base font-medium text-white hover:bg-[#16a34a] transition-colors">
                Get Started Now
              </button>
            </SignUpButton>
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-[#1f2937] rounded-md text-base font-medium text-white hover:bg-[#111111] transition-colors">
              <Play className="w-4 h-4 mr-2" />
              How it Works
            </button>
          </div>

          {/* Product Screenshot */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative rounded-lg overflow-hidden border border-[#1f2937] shadow-2xl shadow-[#22c55e]/10">
              <Image
                src="/scrapeflow_banner.png"
                alt="ScrapeFlow Dashboard"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-[#22c55e] text-sm font-medium mb-4 tracking-wide uppercase">
              The features
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Built for <span className="text-[#22c55e]">Real World</span> Web Scraping Needs
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#111111] rounded-lg p-6 border border-[#1f2937] hover:border-[#22c55e] transition-colors">
              <div className="w-12 h-12 bg-[#22c55e]/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Increased Productivity</h3>
              <p className="text-[#6b7280] text-sm">
                Automate complex web scraping tasks and save more time by focusing on insights
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#111111] rounded-lg p-6 border border-[#1f2937] hover:border-[#22c55e] transition-colors">
              <div className="w-12 h-12 bg-[#22c55e]/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Powered Workflows</h3>
              <p className="text-[#6b7280] text-sm">
                Leverage AI to manage and manipulate your data using the extraction phase automatically
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#111111] rounded-lg p-6 border border-[#1f2937] hover:border-[#22c55e] transition-colors">
              <div className="w-12 h-12 bg-[#22c55e]/10 rounded-lg flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automated Workflows</h3>
              <p className="text-[#6b7280] text-sm">
                Build automated sequences that run on your specific or double-trigger logics
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#111111] rounded-lg p-6 border border-[#1f2937] hover:border-[#22c55e] transition-colors">
              <div className="w-12 h-12 bg-[#22c55e]/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cost Transparency</h3>
              <p className="text-[#6b7280] text-sm">
                Transparent pricing with clear usage breakdowns so you always know your data ROI
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code-Free Scraping Feature Highlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Left */}
            <div className="order-2 lg:order-1">
              <div className="bg-[#111111] rounded-lg p-6 border border-[#1f2937]">
                <Image
                  src="/scrapeflow_image.png"
                  alt="Code-Free Scraping Interface"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Text Right */}
            <div className="order-1 lg:order-2">
              <p className="text-[#22c55e] text-sm font-medium mb-4 tracking-wide uppercase">
                Scrape smarter, not harder
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Code-Free Scraping. <span className="text-[#22c55e]">Limitless Automation.</span>
              </h2>
              <p className="text-[#6b7280] text-lg mb-8">
                Drag-and-drop scraping workflows with zero code. Use smart widgets to automate 
                navigation, clicks, data extraction, and decision logic with a drag-and-drop editor 
                in your browser.
              </p>
              <Link 
                href="#start" 
                className="inline-flex items-center text-[#22c55e] font-medium hover:text-[#16a34a] transition-colors"
              >
                Start Free Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#111111] rounded-lg p-8 sm:p-12 border border-[#22c55e]/30 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="text-[#22c55e]">Take Control</span> of Your Web Scraping?
            </h2>
            <p className="text-[#6b7280] text-lg mb-8 max-w-2xl mx-auto">
              Sign up today and launch your first scraping workflow with 100 free credits. 
              No credit card is needed.
            </p>
            <SignUpButton mode="modal">
              <button className="inline-flex items-center justify-center px-8 py-3 bg-[#22c55e] rounded-md text-base font-medium text-white hover:bg-[#16a34a] transition-colors">
                Start Free Trial
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#1f2937] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <span className="text-xl font-bold text-white mb-4 block">ScrapeFlow</span>
              <p className="text-[#6b7280] text-sm">
                Automate your web scraping with drag-and-drop workflows.
              </p>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-[#6b7280] hover:text-white text-sm transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#use-cases" className="text-[#6b7280] hover:text-white text-sm transition-colors">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#community" className="text-[#6b7280] hover:text-white text-sm transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-[#6b7280] hover:text-white text-sm transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#terms" className="text-[#6b7280] hover:text-white text-sm transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className="text-[#6b7280] hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Connect</h3>
              <div className="flex space-x-4">
                <a 
                  href="#twitter" 
                  className="text-[#6b7280] hover:text-[#22c55e] transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a 
                  href="#github" 
                  className="text-[#6b7280] hover:text-[#22c55e] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="#linkedin" 
                  className="text-[#6b7280] hover:text-[#22c55e] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#1f2937] flex flex-col sm:flex-row justify-between items-center text-[#6b7280] text-sm">
            <p className="mb-4 sm:mb-0">© ScrapeFlow, all rights reserved.</p>
            <div className="flex items-center space-x-6">
              <span>Designed by ScrapeFlow Team</span>
              <Link href="#privacy" className="hover:text-white transition-colors">
                Do not sell info
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
