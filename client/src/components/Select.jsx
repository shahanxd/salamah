// Select component
export default function SelectComponent(props) {
  if (!props) {
    throw new Error('props is null');
  }
  if (!props.children) {
    throw new Error('props.children is null');
  }
  return (
    <select
      className="w-full p-4 text-2xl rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
      {...props}
    >
      {props.children}
    </select>
  );
}
