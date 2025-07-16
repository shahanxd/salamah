// Input component
export default function Input({ ...props }) {
  return <input className="w-full p-4 text-2xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" {...props} />;
}
