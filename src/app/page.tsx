"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]{7,20}$/.test(val), {
      message: "Please enter a valid phone number",
    }),
  location: z.string().optional(),
  interests: z
    .string()
    .min(10, { message: "Please tell us more about your interests and goals" }),
});

const services = [
  {
    title: "Interview Preparation",
    description:
      "Mock interviews and targeted coaching shaped around German employer culture — so you walk in genuinely ready.",
    gradient: "from-[#f97316] to-[#fbbf24]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Portfolio & LinkedIn Optimization",
    description:
      "A personal landing page, an optimized LinkedIn profile, and a portfolio that makes recruiters stop scrolling.",
    gradient: "from-[#a855f7] to-[#ec4899]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "HR Connections",
    description:
      "Direct access to HR professionals and internal contacts at German companies — the warm introductions that change everything.",
    gradient: "from-[#06b6d4] to-[#3b82f6]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Job Placement Support",
    description:
      "We leverage our network to set up targeted meetings and interviews at the exact companies you're pursuing.",
    gradient: "from-[#10b981] to-[#06b6d4]",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit");
      }

      setFormStatus("success");
      reset();
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to submit. Please try again.");
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090e] text-[#fafafa]">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "rgba(9,9,14,0.8)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl tracking-tight">
            Talent<span className="gradient-text">Bridge</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#services"
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-white/50 hover:text-white transition-colors"
            >
              Contact
            </Link>
            <Link href="#contact" className="btn-primary text-sm px-5 py-2.5 rounded-full">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Ambient orbs */}
        <div
          className="animate-orb-1 absolute top-[-15%] right-[-8%] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb-2 absolute bottom-[-12%] left-[-5%] w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-orb-3 absolute top-[35%] left-[38%] w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center w-full">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium"
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.22)",
              color: "#fbbf24",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#f97316] inline-block"
              style={{ boxShadow: "0 0 8px #f97316" }}
            />
            Helping international talent land jobs in Germany
          </div>

          <h1
            className="font-display font-bold leading-[1.07] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)" }}
          >
            Your move to Germany
            <br />
            <span className="gradient-text">starts here.</span>
          </h1>

          <p
            className="mb-10 mx-auto max-w-xl leading-relaxed text-white/50"
            style={{ fontSize: "1.1rem" }}
          >
            We help international students and professionals break into the
            German job market — with real coaching, genuine connections, and
            support that actually moves the needle.
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            <Link
              href="#services"
              className="btn-ghost text-sm px-7 py-3.5 rounded-full"
            >
              See how it works
            </Link>
            <Link
              href="#contact"
              className="btn-primary text-sm px-7 py-3.5 rounded-full"
            >
              Get Started — it&apos;s free
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #09090e)",
          }}
        />
      </section>

      {/* Services */}
      <section id="services" className="py-28 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-4 text-[#f97316]">
              What we offer
            </p>
            <h2
              className="font-display font-bold tracking-tight text-[#fafafa]"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)" }}
            >
              Everything you need to land
              <br />
              your dream role in Germany
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="glass-card glass-card-lift rounded-2xl p-8 group">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-[14px] bg-gradient-to-br ${s.gradient} mb-5 text-white`}
                >
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-[#fafafa]">
                  {s.title}
                </h3>
                <p className="leading-relaxed text-[15px] text-white/40">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 relative z-10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.07), transparent)",
          }}
        />

        <div className="relative max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] mb-4 text-[#f97316]">
              Let&apos;s talk
            </p>
            <h2
              className="font-display font-bold tracking-tight mb-4 text-[#fafafa]"
              style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.7rem)" }}
            >
              Ready to make your move?
            </h2>
            <p className="text-white/40">
              Tell us about yourself and we&apos;ll reach out personally to map
              your path forward.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    Full Name <span className="text-[#f97316]">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm${errors.name ? " error" : ""}`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    Email <span className="text-[#f97316]">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm${errors.email ? " error" : ""}`}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    Phone{" "}
                    <span className="text-white/25">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className={`input-field w-full px-4 py-3 rounded-xl text-sm${errors.phone ? " error" : ""}`}
                    placeholder="+49 123 4567890"
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/50">
                    Location{" "}
                    <span className="text-white/25">(optional)</span>
                  </label>
                  <input
                    type="text"
                    {...register("location")}
                    className="input-field w-full px-4 py-3 rounded-xl text-sm"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white/50">
                  Goals & interests <span className="text-[#f97316]">*</span>
                </label>
                <textarea
                  {...register("interests")}
                  rows={4}
                  className={`input-field w-full px-4 py-3 rounded-xl text-sm resize-none${errors.interests ? " error" : ""}`}
                  placeholder="Tell us what you're looking for — interview coaching, LinkedIn help, job placement, HR connections..."
                />
                {errors.interests && (
                  <p className="mt-1.5 text-xs text-red-400">
                    {errors.interests.message}
                  </p>
                )}
              </div>

              {formStatus === "error" && (
                <div
                  className="px-4 py-3 rounded-xl text-sm text-red-400"
                  style={{
                    background: "rgba(239,68,68,0.09)",
                    border: "1px solid rgba(239,68,68,0.22)",
                  }}
                >
                  {errorMessage || "Something went wrong. Please try again."}
                </div>
              )}

              {formStatus === "success" && (
                <div
                  className="px-4 py-3 rounded-xl text-sm text-emerald-400"
                  style={{
                    background: "rgba(16,185,129,0.09)",
                    border: "1px solid rgba(16,185,129,0.22)",
                  }}
                >
                  You&apos;re in! We&apos;ll reach out personally within 24 hours.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send my details →"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <div className="font-display font-bold text-xl mb-3">
                Talent<span className="gradient-text">Bridge</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs text-white/40">
                Helping international talent find their footing in Germany — one
                genuine connection at a time.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] mb-4 text-white/30">
                Services
              </h4>
              <ul className="space-y-3 text-sm text-white/40">
                {[
                  "Interview Preparation",
                  "Portfolio & LinkedIn",
                  "HR Connections",
                  "Job Placement",
                ].map((s) => (
                  <li key={s}>
                    <Link
                      href="#services"
                      className="hover:text-white transition-colors"
                    >
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] mb-4 text-white/30">
                Connect
              </h4>
              <ul className="space-y-3 text-sm text-white/40">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-12 pt-8 text-center text-xs text-white/20"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            © {new Date().getFullYear()} TalentBridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
