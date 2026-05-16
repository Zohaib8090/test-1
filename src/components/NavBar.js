'use client';

import Link from "next/link";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from 'react';

export default function NavBar({ transparent = false }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent && !isOpen ? 'bg-transparent' : 'bg-[#050507]/80 backdrop-blur-lg border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">
              SkillBridge
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/marketplace" className="text-foreground/80 hover:text-white transition-colors font-medium">
              Marketplace
            </Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-white transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/profile" className="text-foreground/80 hover:text-white transition-colors font-medium">
              Profile
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block px-5 py-2 text-foreground/80 hover:text-white transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
            >
              Sign Up
            </Link>
            <button className="md:hidden p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link href="/marketplace" className="text-foreground/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Marketplace
            </Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
            <Link href="/profile" className="text-foreground/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
            <Link href="/login" className="text-foreground/80 hover:text-white transition-colors font-medium" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
