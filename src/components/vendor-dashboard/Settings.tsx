import Input from "../ui/Input";

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your business profile and payout preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.7fr_0.3fr]">
        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Business Information</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="Business Name" placeholder="Jubly Beauty" />
              <Input label="Category" placeholder="Makeup Artist" />
              <Input label="Email" placeholder="hello@jubly.com" />
              <Input label="Phone" placeholder="+234 803 000 0000" />
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-sm font-medium">Bio</label>
              <textarea
                placeholder="Tell clients about your services"
                className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Business Address</h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="Address" placeholder="12 Allen Avenue" />
              <Input label="City" placeholder="Lagos" />
              <Input label="State" placeholder="Lagos" />
              <Input label="Country" placeholder="Nigeria" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Profile Photo</h3>
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="h-24 w-24 rounded-full bg-gray-100" />
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Upload Photo
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Payout Details</h3>
            <div className="mt-4 space-y-3">
              <Input label="Bank Name" placeholder="Jubly Bank" />
              <Input label="Account Number" placeholder="0123456789" />
              <Input label="Account Name" placeholder="Jubly Beauty" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          Cancel
        </button>
        <button className="rounded-lg bg-blue-700 px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800">
          Save Changes
        </button>
      </div>
    </div>
  );
}
