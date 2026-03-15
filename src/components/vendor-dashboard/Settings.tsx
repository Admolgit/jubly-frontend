export function Settings() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <input
        placeholder="Business Name"
        className="border p-3 rounded w-full"
      />
      <textarea placeholder="Bio" className="border p-3 rounded w-full" />

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
        Save Changes
      </button>
    </div>
  );
}
