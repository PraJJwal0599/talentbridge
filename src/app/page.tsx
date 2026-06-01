"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  location: z.string().optional(),
  interests: z.string().min(10, { message: "Please tell us more about your interests and goals" }),
});

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  TalentBridge
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                About
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Services
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Helping International Talent Find Success in Germany
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              We connect international students, job seekers, and professionals with opportunities in Germany through job guidance, interview preparation, HR connections, and affordable German language courses.
            </p>
            <div className="flex justify-center flex-wrap gap-4">
              <Link href="#" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium">
                Learn More
              </Link>
              <Link href="#" className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            How We Help
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Job Search Guidance */}
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="flex items-center justify-center mb-4 h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2 1.1 0 2 .9 2 2v4l-3-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Job Search Guidance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find relevant job opportunities for students, job seeker visa holders, and professionals in Germany's competitive market.
              </p>
            </div>
            
            {/* Interview Preparation */}
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="flex items-center justify-center mb-4 h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Interview Preparation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Build confidence with mock interviews, feedback, and coaching tailored to German interview styles.
              </p>
            </div>
            
            {/* HR Connections */}
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="flex items-center justify-center mb-4 h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                HR Connections
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Network directly with HR professionals and recruiters who understand the value of international talent.
              </p>
            </div>
            
            {/* German Courses */}
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
              <div className="flex items-center justify-center mb-4 h-12 w-12 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.042A8.967 8.967 0 006 12c0 2.762.88 5.296 2.233 7.405l1.487-1.487a3 3 0 114.242-4.242L12 14.708V6.042zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                German Language Courses
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access affordable German courses (A1-B2 levels) from experienced external teachers to improve your integration and job prospects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-indigo-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tell us about your background and goals, and we'll reach out to discuss how we can help you succeed in Germany.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${errors.name ? "border-red-500 dark:border-red-400" : ""}`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${errors.email ? "border-red-500 dark:border-red-400" : ""}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Location (City, Country)
              </label>
              <input
                type="text"
                id="location"
                {...register("location")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                placeholder="Where are you currently located?"
              />
            </div>
            
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What are you interested in? (Select all that apply)
              </label>
              <textarea
                id="interests"
                {...register("interests")}
                rows={4}
                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 ${errors.interests ? "border-red-500 dark:border-red-400" : ""}`}
                placeholder="e.g., Job search guidance, Interview preparation, German courses, HR connections, etc."
              />
              {errors.interests && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.interests.message}
                </p>
              )}
            </div>
            
            {formStatus === "loading" && (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sending...
                </span>
              </div>
            )}
            
            {formStatus === "error" && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-4 mb-4">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errorMessage || "An error occurred. Please try again."}
                </p>
              </div>
            )}
            
            {formStatus === "success" && (
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4 mb-4">
                <p className="text-sm text-green-600 dark:text-green-400">
                  Thank you! We've received your information and will be in touch shortly.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Sending..." : "Get Started"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-200 mb-4">
                TalentBridge
              </h3>
              <p className="text-sm text-gray-400">
                Connecting international talent with opportunities in Germany
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-200 mb-3">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-gray-200 transition-colors">Job Guidance</Link></li>
                <li><Link href="#" className="hover:text-gray-200 transition-colors">Interview Prep</Link></li>
                <li><Link href="#" className="hover:text-gray-200 transition-colors">HR Connections</Link></li>
                <li><Link href="#" className="hover:text-gray-200 transition-colors">German Courses</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-200 mb-3">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-gray-200 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-gray-200 transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-gray-200 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-200 mb-3">
                Connect
              </h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.007 2.007a4.5 4.5 0 00-6.364 6.364L2 9v11h11l3.636-3.636a4.5 4.5 0 00-6.364-6.364L2 9V4l10 10z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.761.88 5.296 2.233 7.405l1.487-1.487a3 3 0 114.242-4.242L12 14.708V6.042zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Instagram</span>
                </a>
                <a href="#" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-200 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.591-1.555-4.303 0-7.79 3.493-7.79 7.793 0 .608.069 1.202.19 1.772-6.488-.324-12.239-3.435-16.224-8.152a7.96 7.96 0 002.255 10.504c-.216.404-.335.846-.335 1.283 0 2.736 1.955 5.021 4.539 5.547a7.922 7.922 0 01-3.97-1.37c-1.386 1.93-2.223 4.338-2.223 6.84 0 4.765 3.401 8.761 7.911 9.66a7.933 7.933 0 01-3.97 2.08A7.96 7.96 0 0012 22c7.793 0 12.054-6.462 12.054-12.054 0-.184-.005-.368-.014-.551A7.942 7.942 0 0023.954 4.569z" />
                  </svg>
                  <span>Twitter/X</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-600 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TalentBridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
