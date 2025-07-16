// Select component
export default function Select({ children, ...props }) {
  return <select className="w-full p-4 text-2xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" {...props}>{children}</select>;
}
