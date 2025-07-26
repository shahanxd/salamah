export default function About() {
  return (
    <div className="card fade-in container" style={{ marginTop: '4rem', textAlign: 'center', background: 'var(--card)' }}>
      <h2 style={{ fontFamily: 'JetBrains Mono Variable', fontWeight: 700, fontSize: 32, color: 'var(--primary)', marginBottom: 24 }}>About Salamah</h2>
      <p style={{ fontSize: 18, color: 'var(--foreground)', opacity: 0.8 }}>
        Salamah is a platform to help reconnect and protect displaced persons. Our mission is to provide a secure, minimal, and beautiful experience for all users.
      </p>
    </div>
  );
}
