// Footer component
const Footer = () => (
  <footer style={{ width: '100%', textAlign: 'center', marginTop: '4rem', padding: '2rem 0', color: 'var(--foreground)', opacity: 0.7, fontSize: 18, letterSpacing: '0.04em', fontFamily: 'JetBrains Mono Variable', background: 'var(--card)', borderTop: '1px solid var(--border)' }}>
    Protect, reconnect, and serve the displaced with dignity.<br />
    <span style={{ fontSize: 14, opacity: 0.7 }}>© {new Date().getFullYear()} Salamah</span>
  </footer>
);

export default Footer;
