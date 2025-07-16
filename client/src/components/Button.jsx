// Button component
export default function Button({ children, color = "blue", ...props }) {
  const base = "px-8 py-4 text-2xl font-semibold rounded-xl shadow-lg text-white transition-all duration-200 focus:outline-none focus:ring-4";
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300",
    green: "bg-green-600 hover:bg-green-700 focus:ring-green-300"
  };
  return <button className={`${base} ${colors[color]}`} {...props}>{children}</button>;
}
