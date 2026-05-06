export default function HelpCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {/* Text */}
      <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>

      <p className="mt-2 text-sm text-gray-500">
        Learn more about managing your availability.
      </p>

      {/* Link */}
      <a
        href="#"
        className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
      >
        View Guide
        <span className="ml-1">↗</span>
      </a>

      {/* Illustration */}
      <div className="mt-5 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 p-6 flex items-center justify-center">
        <div className="relative">
          {/* Calendar */}
          <div className="w-24 h-20 rounded-xl bg-white shadow-md flex flex-col items-center justify-center">
            <div className="w-full h-6 bg-purple-400 rounded-t-xl" />
            <div className="grid grid-cols-4 gap-1 p-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-200 rounded" />
              ))}
            </div>
          </div>

          {/* Clock */}
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-purple-400 rounded-full relative">
              <div className="absolute w-[2px] h-2 bg-purple-400 top-[4px] left-1/2 -translate-x-1/2" />
              <div className="absolute w-[2px] h-3 bg-purple-400 top-[6px] left-1/2 rotate-45 origin-bottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
