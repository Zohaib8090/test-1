'use client';

import Link from "next/link";
import { Mail, Lock, GraduationCap, ArrowRight } from "lucide-react";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card/40 backdrop-blur-2xl rounded-[2.5rem] p-10 shadow-2xl border border-white/10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-2xl ring-4 ring-primary/20">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground font-medium">Sign in to your SkillBridge account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-foreground font-bold text-sm mb-3 uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@university.edu"
                  className="w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground font-bold text-sm mb-3 uppercase tracking-widest">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm font-bold">
              <label className="flex items-center gap-3 text-muted-foreground cursor-pointer hover:text-foreground transition-colors group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 rounded-lg border-2 border-white/10 checked:border-primary checked:bg-primary transition-all cursor-pointer"
                  />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                Remember me
              </label>
              <a href="#" className="text-primary hover:text-white transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm mt-8 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? 'Signing In...' : 'Sign In'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-white/5">
            <p className="text-muted-foreground text-sm font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:text-white transition-colors font-bold uppercase tracking-widest text-xs ml-2">
                Sign up for free
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <Link href="/" className="text-muted-foreground hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              ← Back to home
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-muted-foreground/50 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" />
          <span>Secure login • University verified</span>
        </div>
      </div>
    </div>
  );
}
