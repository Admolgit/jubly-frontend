/* eslint-disable @typescript-eslint/no-explicit-any */

export default function SaveBar({ loading }: any) {
  return (
    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium shadow-sm transition hover:opacity-90">
      {loading ? "Updating..." : "Save Changes"}
    </button>
  );
}
