import React from "react";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen py-14 mt-8">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-600">
            Jubly Policies
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Policies & Platform Guidelines
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
            These Policies & Platform Guidelines explain how Jubly operates, the
            rules governing the use of our services, and the expectations for
            all users, vendors, clients, administrators, and partners using the
            platform.
          </p>

          <div className="mt-6 inline-flex rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
            Last updated: May 2026
          </div>
        </div>

        <div className="space-y-8">
          {/* SECTION */}
          <PolicyCard title="1. About Jubly">
            <p>
              Jubly is a service booking and vendor management platform designed
              to help businesses and professionals manage appointments,
              bookings, payments, client relationships, scheduling,
              notifications, and service operations.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Online service bookings</li>
              <li>Vendor discovery and scheduling</li>
              <li>Payment processing</li>
              <li>Client management</li>
              <li>Booking reminders and notifications</li>
              <li>Calendar integrations</li>
              <li>Analytics and dashboard insights</li>
              <li>Vendor onboarding and verification</li>
              <li>Transaction and settlement management</li>
              <li>Marketplace-style service operations</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="2. User Eligibility">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Users must be at least 18 years old or the legal age in their
                jurisdiction.
              </li>
              <li>Accurate registration information must be provided.</li>
              <li>Users are responsible for account security.</li>
              <li>The platform must be used lawfully and responsibly.</li>
              <li>
                Vendors must have authority to operate a business where
                applicable.
              </li>
            </ul>
          </PolicyCard>

          <PolicyCard title="3. Account Registration & Security">
            <SectionTitle title="3.1 Account Creation" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Email and password authentication</li>
              <li>Third-party authentication providers</li>
              <li>Future supported authentication methods</li>
            </ul>

            <SectionTitle title="3.2 Verification" />

            <p>
              Certain features may require identity verification, email
              confirmation, phone verification, KYC compliance, or business
              verification before access is granted.
            </p>
          </PolicyCard>

          <PolicyCard title="4. Vendor Policies">
            <SectionTitle title="4.1 Vendor Responsibilities" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Provide legitimate services</li>
              <li>Maintain accurate listings and pricing</li>
              <li>Honor confirmed bookings</li>
              <li>Communicate professionally</li>
              <li>Comply with local business regulations</li>
            </ul>

            <SectionTitle title="4.2 Vendor Approval" />

            <p>
              Jubly may review and approve vendors before enabling public
              listings, settlements, booking acceptance, or marketplace
              visibility.
            </p>

            <SectionTitle title="4.3 Vendor Conduct" />

            <ul className="list-disc space-y-2 pl-6">
              <li>No fraudulent or deceptive practices</li>
              <li>No abuse of clients or users</li>
              <li>No manipulation of ratings or reviews</li>
              <li>No circumvention of Jubly payment systems</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="5. Client Policies">
            <ul className="list-disc space-y-2 pl-6">
              <li>Provide accurate booking information</li>
              <li>Respect vendor schedules and policies</li>
              <li>Make valid payments</li>
              <li>Avoid fraudulent disputes or abuse</li>
              <li>Communicate respectfully</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="6. Booking Policies">
            <SectionTitle title="6.1 Booking Creation" />

            <p>
              Bookings may include service selection, date scheduling, payment
              authorization, vendor assignment, and booking confirmation.
            </p>

            <SectionTitle title="6.2 Booking Confirmation" />

            <p>
              A booking becomes confirmed when payment succeeds and vendor
              approval requirements are satisfied.
            </p>

            <SectionTitle title="6.3 Rescheduling" />

            <p>
              Rescheduling depends on vendor availability, booking windows, and
              applicable restrictions.
            </p>

            <SectionTitle title="6.4 Cancellations" />

            <p>
              Cancellation fees may apply depending on vendor policies, timing,
              and payment provider rules.
            </p>

            <SectionTitle title="6.5 Completion Status" />

            <p>
              Completed bookings indicate services were delivered and settlement
              processes may proceed.
            </p>
          </PolicyCard>

          <PolicyCard title="7. Payment Policies">
            <SectionTitle title="7.1 Payment Processing" />

            <p>
              Jubly may use third-party processors including Paystack, Stripe,
              and other supported payment providers.
            </p>

            <SectionTitle title="7.2 Marketplace & Split Payments" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Vendor subaccounts</li>
              <li>Split payments</li>
              <li>Automated settlements</li>
              <li>Platform commissions</li>
            </ul>

            <SectionTitle title="7.3 Refunds" />

            <p>
              Refund eligibility depends on vendor cancellation rules, booking
              status, fraud reviews, and service completion state.
            </p>

            <SectionTitle title="7.4 Failed Payments" />

            <p>
              Jubly is not responsible for failures caused by banks, payment
              providers, downtime, insufficient funds, or network issues.
            </p>
          </PolicyCard>

          <PolicyCard title="8. Notifications & Communications">
            <p>Jubly may send:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Booking confirmations</li>
              <li>Payment receipts</li>
              <li>Reminder notifications</li>
              <li>Security alerts</li>
              <li>Product updates</li>
              <li>Marketing communications</li>
            </ul>

            <p className="mt-4">
              Notifications may be delivered through email, SMS, push
              notifications, or in-app alerts.
            </p>
          </PolicyCard>

          <PolicyCard title="9. Calendar Integrations">
            <p>
              Jubly may integrate with third-party providers such as Google
              Calendar and Outlook Calendar.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Automatic event creation</li>
              <li>Availability synchronization</li>
              <li>Conflict detection</li>
              <li>Reminder syncing</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="10. Data & Privacy">
            <SectionTitle title="10.1 Information Collected" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Name and contact information</li>
              <li>Booking and transaction records</li>
              <li>Usage analytics</li>
              <li>Uploaded documents</li>
              <li>Business verification details</li>
            </ul>

            <SectionTitle title="10.2 Use of Data" />

            <p>
              Data may be used to operate the platform, improve services,
              process payments, prevent fraud, and comply with legal
              obligations.
            </p>

            <SectionTitle title="10.3 Data Security" />

            <p>
              Jubly implements authentication controls, encrypted
              communications, access restrictions, and infrastructure monitoring
              to help protect user data.
            </p>
          </PolicyCard>

          <PolicyCard title="11. Prohibited Activities">
            <ul className="list-disc space-y-2 pl-6">
              <li>Fraudulent activity</li>
              <li>Impersonation</li>
              <li>Payment abuse</li>
              <li>Uploading malicious software</li>
              <li>Scraping or harvesting data</li>
              <li>Reverse engineering the platform</li>
              <li>Violating intellectual property rights</li>
              <li>Illegal activities</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="12. Content & Intellectual Property">
            <SectionTitle title="12.1 User Content" />

            <p>
              Users retain ownership of uploaded content but grant Jubly a
              license to host, display, process, and store content necessary for
              platform operations.
            </p>

            <SectionTitle title="12.2 Platform Ownership" />

            <p>
              Jubly software, branding, systems, designs, and platform assets
              remain the intellectual property of Jubly unless otherwise stated.
            </p>
          </PolicyCard>

          <PolicyCard title="13. Availability & Downtime">
            <p>
              Jubly strives to maintain reliable service but does not guarantee
              uninterrupted platform availability.
            </p>

            <p className="mt-4">
              Downtime may occur due to maintenance, infrastructure issues,
              third-party failures, or security incidents.
            </p>
          </PolicyCard>

          <PolicyCard title="14. Fraud Prevention & Security Monitoring">
            <p>
              Jubly may monitor platform activity to detect fraud, prevent
              abuse, verify transactions, and maintain marketplace integrity.
            </p>
          </PolicyCard>

          <PolicyCard title="15. Chargebacks & Disputes">
            <p>
              Users agree to attempt resolution through Jubly support before
              initiating payment disputes or chargebacks.
            </p>
          </PolicyCard>

          <PolicyCard title="16. API & Developer Usage">
            <ul className="list-disc space-y-2 pl-6">
              <li>API keys must remain confidential</li>
              <li>Rate limits must be respected</li>
              <li>Automated abuse is prohibited</li>
              <li>API access may be revoked at any time</li>
            </ul>
          </PolicyCard>

          <PolicyCard title="17. Limitation of Liability">
            <p>
              Jubly is not liable for indirect damages, business interruption,
              vendor disputes, missed appointments, payment provider failures,
              or third-party outages to the extent permitted by law.
            </p>
          </PolicyCard>

          <PolicyCard title="18. Indemnification">
            <p>
              Users agree to indemnify and hold Jubly harmless from claims
              arising from misuse of the platform, policy violations, fraud, or
              disputes.
            </p>
          </PolicyCard>

          <PolicyCard title="19. Account Suspension & Termination">
            <p>
              Jubly may suspend or terminate accounts for fraud, abuse, illegal
              activity, repeated violations, or security risks.
            </p>
          </PolicyCard>

          <PolicyCard title="20. Changes to Policies">
            <p>
              Jubly may update these policies periodically. Continued use of the
              platform after changes become effective constitutes acceptance of
              the revised policies.
            </p>
          </PolicyCard>

          <PolicyCard title="21. Governing Law">
            <p>
              These policies are governed by applicable laws within the
              jurisdictions where Jubly operates.
            </p>
          </PolicyCard>

          <PolicyCard title="22. Contact & Support">
            <p>
              For support, disputes, or legal inquiries, users may contact Jubly
              through official platform support channels.
            </p>
          </PolicyCard>

          <PolicyCard title="23. Feature-Specific Policies">
            <SectionTitle title="23.1 Dashboard Analytics" />

            <p>
              Analytics and reporting features are informational and may contain
              delays or approximations.
            </p>

            <SectionTitle title="23.2 Client Management" />

            <p>
              Vendors are responsible for lawful handling of client data
              obtained through Jubly.
            </p>

            <SectionTitle title="23.3 Booking Timeline & Status Tracking" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Booking Created</li>
              <li>Payment Confirmed</li>
              <li>Scheduled</li>
              <li>Completed</li>
              <li>Cancelled</li>
            </ul>

            <SectionTitle title="23.4 File & Document Uploads" />

            <p>
              Users may upload verification documents, portfolio images,
              identity documents, and business assets where permitted.
            </p>
          </PolicyCard>

          <PolicyCard title="24. Marketplace Integrity">
            <p>
              Jubly may moderate listings, review suspicious activity, remove
              risky vendors, and enforce quality standards to maintain a trusted
              marketplace environment.
            </p>
          </PolicyCard>

          <PolicyCard title="25. Acceptance of Policies">
            <p>
              By using Jubly, you acknowledge that you have read, understood,
              and agreed to these Policies & Platform Guidelines.
            </p>
          </PolicyCard>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold text-gray-900">{title}</h2>

      <div className="space-y-4 text-[15px] leading-7 text-gray-600">
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="pt-2 text-lg font-semibold text-gray-900">{title}</h3>;
}
