import { Menu } from "lucide-react";
import Logo from "../logo";

export default function TopBar({
  setOpen,
}: {
  setOpen: (value: boolean) => void;
}) {
  return (
    <div className="md:hidden flex items-center justify-between bg-black text-white p-4">
      <Logo />

      <button onClick={() => setOpen(true)}>
        <Menu size={24} />
      </button>
    </div>
  );
}
