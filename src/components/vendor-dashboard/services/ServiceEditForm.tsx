/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Clock3,
  DollarSign,
  LayoutGrid,
  Sparkles,
  Tag,
  FileText,
  ChevronDown,
} from "lucide-react";

export default function EditServiceForm({
  editForm,
  handleEditChange,
  handleUpdateService,
  setOpenEdit,
  updating,
  vendor
}: any) {
  return (
    <div>
      <div className="space-y-8 px-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Service Name */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#111827]">
              Service Name <span className="text-red-500">*</span>
            </label>

            <div className="flex h-12 items-center gap-4 rounded-2xl border border-[#7C6CFF] bg-white px-5 shadow-[0_0_0_4px_rgba(124,108,255,0.08)]">
              <Tag className="h-5 w-5 text-[#6B7280]" />

              <input
                value={editForm.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
                placeholder={editForm.name}
                disabled={true}
                className="w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#111827]">
              Price <span className="text-red-500">*</span>
            </label>

            <div className="flex h-12 items-center gap-4 rounded-2xl border border-[#E4E7EC] bg-white px-5 transition focus-within:border-[#7C6CFF]">
              <DollarSign className="h-5 w-5 text-[#6B7280]" />

              <input
                value={editForm.price}
                onChange={(e) => handleEditChange("price", e.target.value)}
                placeholder="NGN 10,000"
                className="w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#111827]">
              Duration
            </label>

            <div className="flex h-12 items-center justify-between rounded-2xl border border-[#E4E7EC] bg-white px-5">
              <div className="flex items-center gap-4">
                <Clock3 className="h-5 w-5 text-[#6B7280]" />

                <input
                  value={editForm.durationMins}
                  onChange={(e) =>
                    handleEditChange("durationMins", e.target.value)
                  }
                  placeholder="90 min"
                  className="w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#111827]">
              Category <span className="text-red-500"></span>
            </label>

            <div className="flex h-12 items-center justify-between rounded-2xl border border-[#E4E7EC] bg-white px-5">
              <div className="flex items-center gap-4">
                <LayoutGrid className="h-5 w-5 text-[#6B7280]" />

                <input
                  value={editForm.category}
                  onChange={(e) => handleEditChange("category", e.target.value)}
                  placeholder={vendor.category}
                  disabled={true}
                  className="w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#98A2B3]"
                />
              </div>

              <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-[#111827]">
            Description
          </label>

          <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5">
            <div className="flex items-start gap-4">
              <FileText className="mt-1 h-5 w-5 text-[#6B7280]" />

              <textarea
                value={editForm.description}
                onChange={(e) =>
                  handleEditChange("description", e.target.value)
                }
                rows={5}
                placeholder="Describe the service..."
                className="w-full resize-none bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-4 border-t border-[#F2F4F7] px-8 py-7">
        <button
          type="button"
          onClick={() => setOpenEdit(false)}
          className="h-10 rounded-2xl border border-[#E4E7EC] bg-white px-8 text-sm font-medium text-[#111827] transition hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={handleUpdateService}
          disabled={updating}
          className="flex h-10 items-center gap-3 rounded-2xl bg-gradient-to-r from-[#5B3DF5] to-[#6D5DFB] px-10 text-sm font-semibold text-white shadow-lg shadow-[#6D5DFB]/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />

          {updating ? "Saving..." : "Save Service"}
        </button>
      </div>
    </div>
  );
}
