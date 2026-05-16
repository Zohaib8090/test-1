'use client';

import Link from "next/link";
import { GraduationCap, Globe, Users, Share2, MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#050507] to-[#0f0f13] text-white mt-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">
                SkillBridge
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect Skills, Build Opportunities. The leading student marketplace for university services.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Quick Links</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link href="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
              <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link href="/profile" className="hover:text-primary transition-colors">Profile</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Support</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Connect With Us</h4>
            <div className="flex gap-4">
              {[Globe, Users, Share2, MessageSquare, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-all duration-300 flex items-center justify-center border border-white/5">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          <p>&copy; 2026 SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
