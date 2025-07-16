// Home page component
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-900 tracking-tight drop-shadow-lg">Salamah</h1>
      <div className="flex space-x-6">
        <Link to="/register">
          <Button color="blue">Register Lost Person</Button>
        </Link>
        <Link to="/search">
          <Button color="green">Search</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

// Button component
function Button({ children, color }) {
  const base = "px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg text-white transition-all duration-200 focus:outline-none focus:ring-4";
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-300"
  };
  return <button className={`${base} ${colors[color]}`}>{children}</button>;
}
