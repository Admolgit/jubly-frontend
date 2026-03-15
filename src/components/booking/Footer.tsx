function Footer({
  user,
}: {
  user: {
    businessName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
  };
}) {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Business Info */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            {user?.businessName}
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Professional services you can trust. Book appointments easily and
            manage your schedule seamlessly.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>

          <p className="text-sm">
            📍 {user?.city}, {user?.state}, {user?.country}
          </p>

          <p className="text-sm mt-1">📞 {user?.phone}</p>

          <p className="text-sm mt-1">✉️ {user?.email}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>

            <li>
              <a href="#portfolio" className="hover:text-white">
                Portfolio
              </a>
            </li>

            <li>
              <a href="#booking" className="hover:text-white">
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} {user?.businessName}. All rights
          reserved.
        </p>

        <p className="mt-1">
          Powered by <span className="text-white font-medium">Jubly</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
