export default function Contact() {
  return (
    <div className="card fade-in container" style={{ marginTop: '4rem', textAlign: 'center', background: 'var(--card)' }}>
      <h2 style={{ fontFamily: 'JetBrains Mono Variable', fontWeight: 700, fontSize: 32, color: 'var(--primary)', marginBottom: 24 }}>Contact Us</h2>
      <p style={{ fontSize: 18, color: 'var(--foreground)', opacity: 0.8 }}>
        For support or inquiries, email us at <a href="mailto:support@salamah.com" style={{ color: 'var(--primary)' }}>support@salamah.com</a>.
      </p>
    </div>
  );
}
