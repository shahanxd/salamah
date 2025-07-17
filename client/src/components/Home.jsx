// Home page component
import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
            <h1 className="text-5xl font-extrabold mb-10 text-gray-900 tracking-tight drop-shadow-lg">Salamah</h1>
            <div className="flex space-x-6">
                <Link to="/register">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Register Lost Person
                    </button>
                </Link>
                <Link to="/search">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                        Search
                    </button>
                </Link>
            </div>
            <Footer />
        </main>
    );
}
