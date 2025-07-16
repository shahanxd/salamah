// Textarea component
export default function Textarea({ ...props }) {
  return <textarea className="w-full p-4 text-2xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" {...props} />;
}
