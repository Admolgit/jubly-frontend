import { useState } from "react";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Calendar,
  CreditCard,
  Shield,
  Users,
  Bell,
  ShoppingBasket,
  HelpCircle,
  Calendar1,
  ListStart,
} from "lucide-react";

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      icon: ListStart,
      category: "Getting Started",
      questions: [
        {
          q: "What is Jubly?",
          a: "Jubly is a service booking and vendor management platform that helps clients discover, book, and manage appointments with service providers while helping vendors manage bookings, payments, calendars, and client relationships.",
        },
        {
          q: "Who can use Jubly?",
          a: "Jubly is designed for both clients seeking services and vendors offering professional services such as beauty, wellness, photography, fitness, consulting, and more.",
        },
        {
          q: "Do I need an account to book a service?",
          a: "Yes. Creating an account helps manage bookings, payments, notifications, appointment history, and communication with vendors.",
        },
      ],
    },
    {
      icon: Calendar,
      category: "Bookings & Scheduling",
      questions: [
        {
          q: "How do I book a service?",
          a: "Browse vendors, select a service, choose an available date and time, complete payment if required, and confirm your booking.",
        },
        {
          q: "Can I reschedule a booking?",
          a: "Yes. Rescheduling depends on vendor availability and any rescheduling policies configured by the vendor.",
        },
        {
          q: "Can I cancel a booking?",
          a: "Yes. Cancellation availability and refund eligibility depend on the vendor's cancellation policy and how close the appointment is.",
        },
        {
          q: "How do I know my booking is confirmed?",
          a: "A booking is confirmed once payment is successfully processed and the booking status shows as CONFIRMED.",
        },
        {
          q: "What do booking statuses mean?",
          a: "Booking statuses may include Pending, Confirmed, Completed, Rescheduled, Cancelled, or Failed depending on the booking lifecycle.",
        },
      ],
    },
    {
      icon: CreditCard,
      category: "Payments & Refunds",
      questions: [
        {
          q: "What payment methods does Jubly support?",
          a: "Payment methods may include debit cards, credit cards, bank transfers, wallets, and other methods supported by integrated payment providers.",
        },
        {
          q: "Are my payments secure?",
          a: "Yes. Payments are processed through secure third-party payment providers and sensitive payment information is not stored directly by Jubly.",
        },
        {
          q: "How do refunds work?",
          a: "Refund eligibility depends on vendor policies, booking status, cancellation timing, and payment processor requirements.",
        },
        {
          q: "How long do refunds take?",
          a: "Refund processing times vary depending on banks and payment providers and may take several business days.",
        },
        {
          q: "Why was my payment unsuccessful?",
          a: "Payment failures can occur due to insufficient funds, bank restrictions, network issues, expired cards, or payment provider downtime.",
        },
      ],
    },
    {
      icon: Users,
      category: "Vendor Accounts",
      questions: [
        {
          q: "How do I become a vendor?",
          a: "Create a vendor account, complete your profile, provide required business information, and submit verification documents if requested.",
        },
        {
          q: "Do vendors need approval?",
          a: "Some vendor accounts may require approval or verification before accepting bookings or receiving settlements.",
        },
        {
          q: "How do vendors receive payments?",
          a: "Payments may be settled automatically to connected bank accounts or payout destinations after successful booking completion.",
        },
        {
          q: "Can vendors create multiple services?",
          a: "Yes. Vendors can create, edit, organize, and manage multiple service offerings from their dashboard.",
        },
      ],
    },
    {
      icon: Calendar1,
      category: "Calendar Integration",
      questions: [
        {
          q: "Can I connect my Google Calendar?",
          a: "Yes. Jubly supports Google Calendar integration to help synchronize bookings and manage availability.",
        },
        {
          q: "Will bookings automatically appear on my calendar?",
          a: "Yes. Connected calendar integrations can automatically create events for confirmed bookings.",
        },
        {
          q: "Will guests receive calendar invitations?",
          a: "Yes. When configured, calendar invitations and updates may be sent to attendees automatically.",
        },
        {
          q: "What happens if a booking is rescheduled?",
          a: "Calendar events are updated automatically when supported integrations are enabled.",
        },
      ],
    },
    {
      icon: Bell,
      category: "Notifications",
      questions: [
        {
          q: "What notifications does Jubly send?",
          a: "Jubly can send booking confirmations, reminders, payment receipts, security alerts, account updates, and promotional messages.",
        },
        {
          q: "Can I control notification preferences?",
          a: "Yes. Users can enable or disable email, SMS, push notifications, and digest summaries from settings.",
        },
        {
          q: "Why am I still receiving some emails after disabling notifications?",
          a: "Critical security, legal, account, and transaction-related notifications may still be sent regardless of preferences.",
        },
      ],
    },
    {
      icon: Shield,
      category: "Account & Security",
      questions: [
        {
          q: "How do I change my password?",
          a: "Navigate to Account Settings and use the Change Password section to update your credentials.",
        },
        {
          q: "Can I update my profile information?",
          a: "Yes. Users and vendors can update profile details from their account settings.",
        },
        {
          q: "How do I delete my account?",
          a: "Contact support or use account management options where available. Certain information may be retained for legal and compliance purposes.",
        },
        {
          q: "How does Jubly protect my data?",
          a: "Jubly uses secure authentication, encrypted communications, access controls, and monitoring systems to protect user information.",
        },
      ],
    },
    {
      icon: ShoppingBasket,
      category: "Marketplace & Services",
      questions: [
        {
          q: "How are vendors displayed on Jubly?",
          a: "Vendor visibility may depend on profile completeness, approval status, service quality, activity, ratings, and platform policies.",
        },
        {
          q: "Can I leave reviews for vendors?",
          a: "Where available, clients may submit reviews and ratings based on completed services.",
        },
        {
          q: "How does Jubly handle fraudulent activity?",
          a: "Jubly actively monitors platform activity and may investigate suspicious bookings, payments, chargebacks, and account behavior.",
        },
      ],
    },
    {
      icon: HelpCircle,
      category: "Technical Support",
      questions: [
        {
          q: "The platform is not loading correctly. What should I do?",
          a: "Try refreshing the page, clearing browser cache, checking your internet connection, or contacting support.",
        },
        {
          q: "I didn't receive a booking confirmation email.",
          a: "Check your spam folder, verify your email address, and ensure notifications are enabled.",
        },
        {
          q: "How do I contact support?",
          a: "You can contact Jubly support through the help center, support portal, or official communication channels available on the platform.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map((section) => ({
    ...section,
    questions: section.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase()),
    ),
  }));

  return (
    <div className="min-h-screen bg-[#0F0223] text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />

        <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-pink-500/20 blur-[150px]" />

        <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
          <span className="inline-flex rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            Help Center
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold">
            How can we help
            <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              you today?
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg">
            Find answers about bookings, payments, vendors, notifications,
            calendar integrations, and account management.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
              <Search size={20} className="text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for answers..."
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-5 gap-4">
          {faqs.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.category}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 hover:border-purple-500/40 transition cursor-pointer"
              >
                <Icon className="text-purple-400 mb-4" size={24} />

                <h3 className="font-semibold">{item.category}</h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-6">
          {filteredFaqs.map((section) => (
            <div
              key={section.category}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-white/10">
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>

              <div>
                {section.questions.map((faq) => {
                  const isOpen = open === faq.q;

                  return (
                    <div
                      key={faq.q}
                      className="border-b border-white/5 last:border-0"
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : faq.q)}
                        className="w-full flex items-center justify-between px-8 py-6 text-left"
                      >
                        <span className="font-medium">{faq.q}</span>

                        <ChevronDown
                          className={`transition ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-8 pb-6 text-gray-400 leading-7">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-pink-900/30 p-10">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-purple-500/20 blur-[120px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-bold">Still have questions?</h3>

              <p className="mt-3 text-gray-300">
                Our support team is available to help with bookings, payments,
                vendor accounts, and technical issues.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-medium">
              <MessageCircle size={18} />
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
