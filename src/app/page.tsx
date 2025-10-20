'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Star, Users, Zap, Code, Gamepad2, Trophy, ArrowRight, Play } from 'lucide-react';

export default function LandingPage() {
  // Modern professional design with dark theme
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LearnRBX
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/auth">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
            <Star className="h-4 w-4 mr-2 text-yellow-400" />
            Trusted by 10,000+ Roblox developers worldwide
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master Roblox Scripting with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Interactive
            </span>{' '}
            Lessons
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn Lua and Roblox scripting through interactive, step-by-step lessons. 
            Complete checkpoints to unlock new content and build real games that millions can play.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <Play className="h-5 w-5 mr-2" />
                Start Learning Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                View Pricing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose LearnRBX?
            </h2>
            <p className="text-xl text-gray-300">
              Interactive learning designed like Codecademy, built for Roblox creators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Step-by-Step Learning</CardTitle>
                <CardDescription className="text-gray-300">
                  Progress through carefully structured lessons with mandatory checkpoints that ensure you master each concept
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Interactive Code Editor</CardTitle>
                <CardDescription className="text-gray-300">
                  Write and test Lua code in a real-time environment with instant feedback and syntax highlighting
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Real Roblox Projects</CardTitle>
                <CardDescription className="text-gray-300">
                  Build actual games and systems you can use in Roblox Studio and publish to millions of players
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-800/50 to-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Comprehensive Curriculum
            </h2>
            <p className="text-xl text-gray-300">
              From Lua basics to advanced Roblox scripting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-green-400 text-xl">Core Lua (Free)</CardTitle>
                    <div className="text-green-300 text-sm font-medium">Always Free</div>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  Master the fundamentals of Lua programming
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Variables and data types
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Control structures
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Functions and scope
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-400 mr-3" />
                    Tables and loops
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-400 text-xl">Roblox Fundamentals</CardTitle>
                    <div className="text-blue-300 text-sm font-medium">Premium</div>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  Learn Roblox Studio and basic scripting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                    Instances and Explorer
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                    Services and events
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                    Parts and properties
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-3" />
                    LocalScripts vs Scripts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-400 text-xl">Advanced Scripting</CardTitle>
                    <div className="text-purple-300 text-sm font-medium">Premium</div>
                  </div>
                </div>
                <CardDescription className="text-gray-300">
                  Build complex gameplay systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                    Remote Events
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                    Player management
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                    UI and effects
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-3" />
                    Game mechanics
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900/80 to-purple-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Start free, upgrade when you're ready for more
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">Free Tier</CardTitle>
                <div className="text-5xl font-bold text-green-400 mb-2">$0</div>
                <CardDescription className="text-gray-300">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Core Lua lessons</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Interactive code editor</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                    <span className="text-gray-300">Progress tracking</span>
                  </li>
                </ul>
                <Link href="/learn" className="block mt-8">
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                    Start Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md border-blue-500/50 relative hover:scale-105 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  Most Popular
                </span>
              </div>
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-white text-2xl">Pro</CardTitle>
                <div className="text-5xl font-bold text-blue-400 mb-2">
                  $15<span className="text-xl text-gray-300">/month</span>
                </div>
                <CardDescription className="text-gray-300">Full access to all content</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-gray-300">Everything in Free</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-gray-300">All Roblox tracks</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-gray-300">Capstone projects</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                    <span className="text-gray-300">Module assessments</span>
                  </li>
                </ul>
                <Link href="/pricing" className="block mt-8">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-lg">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Roblox Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators learning Roblox scripting and building amazing games
          </p>
          <Link href="/learn">
            <Button size="lg" className="text-lg px-10 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Play className="h-6 w-6 mr-3" />
              Start Learning Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  LearnRBX
                </h3>
              </div>
              <p className="text-gray-400">
                Master Roblox scripting with interactive lessons designed for all skill levels
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Learn</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/learn" className="hover:text-white transition-colors">All Tracks</Link></li>
                <li><Link href="/learn/core-lua" className="hover:text-white transition-colors">Core Lua</Link></li>
                <li><Link href="/learn/roblox-fundamentals" className="hover:text-white transition-colors">Roblox Basics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnRBX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
