type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-lg bg-blue-600 py-2 text-white
      hover:bg-blue-700 transition disabled:opacity-50
      ${className}`}
    />
  );
}
