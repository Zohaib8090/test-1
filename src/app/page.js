'use client';

import Link from "next/link";
import {
  Sparkles,
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Sparkles,
      title: "Skill Marketplace",
      description: "Browse and offer services from tutoring to design work"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and verified transactions for all services"
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description: "Book services quickly with real-time availability"
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Connect with thousands of talented students"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      avatar: "SJ",
      rating: 5,
      text: "SkillBridge helped me find amazing tutors and even start my own freelance design services!"
    },
    {
      name: "Michael Chen",
      role: "Business Major",
      avatar: "MC",
      rating: 5,
      text: "The platform is so easy to use. I've booked multiple services and every experience was great."
    },
    {
      name: "Emma Williams",
      role: "Engineering Student",
      avatar: "EW",
      rating: 5,
      text: "Love how I can both offer my coding skills and find help with other subjects. Win-win!"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Students" },
    { icon: BookOpen, value: "5,000+", label: "Services Offered" },
    { icon: Award, value: "50+", label: "Universities" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative pt-20 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/5 via-transparent to-[#3b82f6]/5" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7c3aed]/10 to-[#3b82f6]/10 border border-[#7c3aed]/20 mb-8">
              <Sparkles className="w-4 h-4 text-[#7c3aed]" />
              <span className="text-sm font-medium text-[#7c3aed]">The Future of Student Services</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent leading-[1.1] tracking-tight">
              Connect Skills, Build Opportunities
            </h1>

            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              The ultimate marketplace for university students to offer and discover services.
              From tutoring to design, find everything you need in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 font-semibold"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/marketplace"
                className="px-8 py-4 bg-white/5 text-foreground rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg backdrop-blur-sm font-semibold"
              >
                Browse Services
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/5 text-center hover:border-primary/30 transition-all duration-300">
                  <Icon className="w-8 h-8 text-[#7c3aed] mx-auto mb-3" />
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SkillBridge?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to succeed as a student entrepreneur</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-card/30 border border-white/5 hover:border-primary/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Your Profile", desc: "Sign up with your university email and showcase your skills" },
              { step: "2", title: "Browse or Offer Services", desc: "Find services you need or list your own expertise" },
              { step: "3", title: "Connect & Collaborate", desc: "Book services, complete transactions, and build your reputation" }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-card/30 p-10 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  <CheckCircle2 className="w-6 h-6 text-primary absolute top-8 right-8 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of satisfied students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card/30 border border-white/5 shadow-xl hover:border-primary/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center text-white font-bold shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 mb-20">
        <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] rounded-[3rem] p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Get Started?</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join SkillBridge today and unlock endless opportunities within your campus community.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#7c3aed] rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-bold text-lg"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
