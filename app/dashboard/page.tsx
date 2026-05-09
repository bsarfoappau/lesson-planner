'use client';

import { useState } from 'react';
import { Menu, LogOut, Settings, Plus, Upload, X } from 'lucide-react';
import { Tabs, TabContent } from '@/components/Tabs';
import Link from 'next/link';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('form');
  const [userName] = useState('John Doe');

  const tabs = [
    { id: 'form', label: 'Create from Form', icon: <Plus className="w-4 h-4" /> },
    { id: 'upload', label: 'Upload Draft', icon: <Upload className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Lesson Planner</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-6 space-y-4">
          <Link
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
          >
            My Lessons
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg"
          >
            Templates
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between p-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <div className="flex items-center gap-4">
              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
                    {userName.charAt(0)}
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <Link
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 first:rounded-t-lg"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 last:rounded-b-lg text-left">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'form' && (
                <TabContent>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Create Lesson Plan from Form
                    </h3>
                    <form className="space-y-6">
                      {/* Title and Subject */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lesson Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Introduction to Algebra"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Mathematics"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Grade and Duration */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Grade Level
                          </label>
                          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option>Select grade level</option>
                            <option>K-2</option>
                            <option>3-5</option>
                            <option>6-8</option>
                            <option>9-12</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Duration (minutes)
                          </label>
                          <input
                            type="number"
                            placeholder="45"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Learning Objectives */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Learning Objectives
                        </label>
                        <textarea
                          rows={4}
                          placeholder="List the key learning objectives for this lesson..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      {/* Submit Buttons */}
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        >
                          Generate DOCX
                        </button>
                        <button
                          type="reset"
                          className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                          Clear
                        </button>
                      </div>
                    </form>
                  </div>
                </TabContent>
              )}

              {activeTab === 'upload' && (
                <TabContent>
                  <div className="p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Upload Draft Document
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 transition cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-900 font-semibold mb-2">
                        Drag and drop your DOCX file here
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        or click to browse from your computer
                      </p>
                      <input
                        type="file"
                        accept=".docx"
                        className="hidden"
                        id="file-input"
                      />
                      <label
                        htmlFor="file-input"
                        className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
                      >
                        Select File
                      </label>
                    </div>
                  </div>
                </TabContent>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
