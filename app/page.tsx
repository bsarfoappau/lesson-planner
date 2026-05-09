'use client';

import Link from 'next/link';
import { BookOpen, Zap, Users, FileText, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Lesson Planner</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Lesson Plans in <span className="text-indigo-600">Seconds</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional lesson plan documents automatically. Upload your template,
            fill in the details, and download your customized DOCX file instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:border-gray-400 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Powerful Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
            <Zap className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Generate lesson plans in seconds, not hours. Let automation handle the repetitive work.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
            <FileText className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Custom Templates
            </h3>
            <p className="text-gray-600">
              Use your own DOCX template. We populate it with your lesson data automatically.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
            <Users className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Multi-Lesson
            </h3>
            <p className="text-gray-600">
              Add unlimited lessons with objectives, activities, and custom content for each.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition">
            <BookOpen className="w-12 h-12 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cloud Sync
            </h3>
            <p className="text-gray-600">
              All your lessons saved in the cloud. Access from anywhere, anytime, on any device.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Your Template
            </h3>
            <p className="text-gray-600">
              Create or upload your DOCX lesson plan template with your preferred structure.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Fill in Your Lessons
            </h3>
            <p className="text-gray-600">
              Enter lesson titles, objectives, activities, and content through our simple form.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Download & Share
            </h3>
            <p className="text-gray-600">
              Get your populated DOCX file instantly. Share with colleagues or print directly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Save Hours of Planning?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join teachers who are already using Lesson Planner to automate their lesson planning.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Create Your Account Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 text-white font-bold mb-4">
                <BookOpen className="w-6 h-6" />
                Lesson Planner
              </div>
              <p className="text-sm">Automate your lesson planning workflow.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Lesson Planner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
