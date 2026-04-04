export default function Spinner({
  size = "md",
  color = "blue",
}: {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "gray" | "white";
}) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const colorMap = {
    blue: "border-gray-200 border-t-blue-600",
    gray: "border-gray-200 border-t-gray-600",
    white: "border-white/30 border-t-white",
  };

  return (
    <div
      className={`animate-spin rounded-full ${sizeMap[size]} ${colorMap[color]}`}
    />
  );
}