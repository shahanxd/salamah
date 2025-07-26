import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Footer from './Footer';

export default function Home() {
  return (
    <main className="fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--background)', color: 'var(--foreground)' }}>
      <nav style={{ width: '100%', maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', background: 'transparent' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Shield size={32} color="var(--primary)" />
          <span style={{ fontFamily: 'JetBrains Mono Variable', fontWeight: 700, fontSize: 24, color: 'var(--primary)' }}>Salamah</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link to="/about" style={{ color: 'var(--foreground)', opacity: 0.7, fontSize: 16 }}>About</Link>
          <Link to="/contact" style={{ color: 'var(--foreground)', opacity: 0.7, fontSize: 16 }}>Contact</Link>
        </div>
      </nav>
      <section className="card fade-in" style={{ maxWidth: 480, width: '100%', margin: '3rem auto', padding: '3rem 2rem', borderRadius: 'var(--radius)', textAlign: 'center', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)', background: 'var(--card)', animation: 'none' }}>
        <h1 style={{
          fontFamily: 'Roboto, JetBrains Mono Variable',
          fontWeight: 900,
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          marginBottom: 12,
          color: 'var(--primary)',
          letterSpacing: '0.04em',
          textShadow: '0 2px 24px rgba(59,130,246,0.18)',
          lineHeight: 1.1,
          background: 'linear-gradient(90deg, var(--primary), var(--foreground))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>Salamah</h1>
        <p style={{
          fontSize: 24,
          color: 'var(--foreground)',
          opacity: 0.85,
          marginBottom: 36,
          fontWeight: 500,
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
          letterSpacing: '0.02em',
        }}>
          Reuniting families, restoring hope. Effortlessly report, search, and find missing persons with security and dignity.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Link to="/register">
            <button className="btn fade-in" style={{ width: '100%' }}>Register Lost Person</button>
          </Link>
          <Link to="/search">
            <button className="btn fade-in" style={{ width: '100%' }}>Search</button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
