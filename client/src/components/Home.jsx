import { Link } from 'react-router-dom';
import {
  Shield,
  Clock,
  Users,
  UserPlus,
  Search,
  Heart,
} from 'lucide-react';
import Footer from './Footer';
import Button from './Button'; // ✅ your custom button

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse-glow animation-delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-gradient-glow blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-xl font-mono font-bold">Salamah</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </button>
          <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-6 py-24 sm:py-32">
        <div className="max-w-4xl w-full mx-auto space-y-12 animate-fade-in">
          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Salamah
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A unified platform to report and search for lost individuals —
              <span className="text-accent font-semibold"> fast, secure, and accessible</span>
            </p>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span>Secure & private</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber" />
              <span>Community powered</span>
            </div>
          </div>

          {/* CTA Buttons (Now using your Button) */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-10">
            <Link to="/register">
              <Button variant="primary">
                <UserPlus className="w-5 h-5" />
                Register Lost Person
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="secondary">
                <Search className="w-5 h-5" />
                Search Database
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 space-y-6">
            <p className="text-sm text-muted-foreground">
              Trusted by families worldwide
            </p>
            <div className="flex justify-center items-center gap-10 text-muted-foreground/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-xs">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100%</div>
                <div className="text-xs">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber">∞</div>
                <div className="text-xs">Hope</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
