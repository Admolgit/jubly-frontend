import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] py-14 mt-8">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-600">
            Jubly Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Terms of Service
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
            These Terms of Service govern your access to and use of Jubly,
            including all features, websites, applications, APIs, booking
            systems, payment services, dashboards, and integrations provided by
            the platform.
          </p>

          <div className="mt-6 inline-flex rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
            Last updated: May 2026
          </div>
        </div>

        <div className="space-y-8">
          <TermsCard title="1. Acceptance of Terms">
            <p>
              By accessing or using Jubly, you agree to be bound by these Terms
              of Service and all applicable laws, policies, and regulations.
            </p>

            <p>
              If you do not agree with these terms, you must discontinue use of
              the platform immediately.
            </p>
          </TermsCard>

          <TermsCard title="2. About Jubly">
            <p>
              Jubly is a booking and vendor management platform that enables
              users to discover vendors, schedule services, manage appointments,
              process payments, communicate with clients, and operate
              marketplace-style service businesses.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Online service booking</li>
              <li>Vendor onboarding and management</li>
              <li>Scheduling and calendar integrations</li>
              <li>Payment processing and settlements</li>
              <li>Client relationship management</li>
              <li>Analytics and operational dashboards</li>
              <li>Notifications and reminders</li>
            </ul>
          </TermsCard>

          <TermsCard title="3. Eligibility">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                You must be at least 18 years old or the legal age in your
                jurisdiction.
              </li>
              <li>
                You must provide accurate registration information at all times.
              </li>
              <li>
                Vendors must have legal authority to provide listed services.
              </li>
              <li>
                You may not use Jubly if prohibited under applicable laws.
              </li>
            </ul>
          </TermsCard>

          <TermsCard title="4. Account Registration">
            <SectionTitle title="4.1 User Accounts" />

            <p>
              Users may register through email authentication, third-party
              authentication providers, or other supported methods.
            </p>

            <SectionTitle title="4.2 Account Responsibility" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Maintaining account confidentiality</li>
              <li>Protecting login credentials</li>
              <li>Monitoring account activity</li>
              <li>Reporting unauthorized access immediately</li>
            </ul>

            <SectionTitle title="4.3 Verification Requirements" />

            <p>
              Certain features may require email verification, phone
              verification, identity checks, KYC verification, or business
              verification before access is granted.
            </p>
          </TermsCard>

          <TermsCard title="5. Vendor Terms">
            <SectionTitle title="5.1 Vendor Obligations" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Provide accurate service information</li>
              <li>Maintain truthful pricing and availability</li>
              <li>Honor confirmed bookings</li>
              <li>Deliver services professionally</li>
              <li>Comply with local business laws</li>
            </ul>

            <SectionTitle title="5.2 Vendor Approval" />

            <p>
              Jubly may review vendors before enabling marketplace visibility,
              settlements, booking acceptance, or public listings.
            </p>

            <SectionTitle title="5.3 Vendor Restrictions" />

            <ul className="list-disc space-y-2 pl-6">
              <li>No fraudulent conduct</li>
              <li>No misleading advertising</li>
              <li>No payment circumvention</li>
              <li>No abusive conduct toward users</li>
            </ul>
          </TermsCard>

          <TermsCard title="6. Client Terms">
            <ul className="list-disc space-y-2 pl-6">
              <li>Provide accurate booking details</li>
              <li>Respect vendor schedules and policies</li>
              <li>Complete valid payments</li>
              <li>Avoid fraudulent disputes or abuse</li>
              <li>Communicate respectfully with vendors</li>
            </ul>
          </TermsCard>

          <TermsCard title="7. Booking Terms">
            <SectionTitle title="7.1 Booking Requests" />

            <p>
              Bookings may include service selection, appointment scheduling,
              vendor assignment, payment authorization, and booking
              confirmations.
            </p>

            <SectionTitle title="7.2 Booking Confirmation" />

            <p>
              A booking becomes confirmed after successful payment processing
              and any required vendor approval.
            </p>

            <SectionTitle title="7.3 Rescheduling & Cancellation" />

            <p>
              Rescheduling and cancellation are subject to vendor policies,
              booking windows, payment rules, and platform restrictions.
            </p>

            <SectionTitle title="7.4 Booking Completion" />

            <p>
              Completed bookings indicate services were delivered and payment
              settlement processes may continue.
            </p>
          </TermsCard>

          <TermsCard title="8. Payments & Transactions">
            <SectionTitle title="8.1 Payment Providers" />

            <p>
              Jubly may use third-party processors including Paystack, Stripe,
              and other supported providers.
            </p>

            <SectionTitle title="8.2 Payment Authorization" />

            <p>
              Users authorize Jubly and payment providers to process charges,
              refunds, settlements, verification checks, and transaction
              monitoring.
            </p>

            <SectionTitle title="8.3 Marketplace Payments" />

            <ul className="list-disc space-y-2 pl-6">
              <li>Vendor subaccounts</li>
              <li>Split payments</li>
              <li>Automated settlements</li>
              <li>Platform commissions</li>
            </ul>

            <SectionTitle title="8.4 Failed Transactions" />

            <p>
              Jubly is not responsible for failures caused by banks, processors,
              insufficient funds, network outages, or provider limitations.
            </p>
          </TermsCard>

          <TermsCard title="9. Refunds & Chargebacks">
            <p>
              Refund eligibility depends on booking status, vendor policies,
              fraud investigations, payment provider rules, and service
              completion status.
            </p>

            <p className="mt-4">
              Users agree to attempt dispute resolution through Jubly support
              before initiating chargebacks.
            </p>
          </TermsCard>

          <TermsCard title="10. Notifications & Communications">
            <p>Jubly may send:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Booking confirmations</li>
              <li>Payment receipts</li>
              <li>Security alerts</li>
              <li>Reminder notifications</li>
              <li>Marketing communications</li>
              <li>Operational updates</li>
            </ul>

            <p className="mt-4">
              Notifications may be delivered through email, SMS, push
              notifications, or in-app alerts.
            </p>
          </TermsCard>

          <TermsCard title="11. Calendar & Third-Party Integrations">
            <p>
              Jubly may integrate with services such as Google Calendar,
              Outlook, and other third-party providers.
            </p>

            <p className="mt-4">
              Jubly is not responsible for outages, sync delays, API
              limitations, or failures caused by third-party services.
            </p>
          </TermsCard>

          <TermsCard title="12. User Content">
            <SectionTitle title="12.1 Ownership" />

            <p>
              Users retain ownership of uploaded content, including images,
              descriptions, messages, logos, and documents.
            </p>

            <SectionTitle title="12.2 Platform License" />

            <p>
              By uploading content, users grant Jubly a non-exclusive license to
              host, display, process, reproduce, and store content for platform
              operations.
            </p>
          </TermsCard>

          <TermsCard title="13. Prohibited Activities">
            <ul className="list-disc space-y-2 pl-6">
              <li>Fraudulent activity</li>
              <li>Impersonation</li>
              <li>Uploading malicious software</li>
              <li>Reverse engineering the platform</li>
              <li>Payment abuse</li>
              <li>Scraping or harvesting user data</li>
              <li>Violating intellectual property rights</li>
              <li>Illegal activity</li>
            </ul>
          </TermsCard>

          <TermsCard title="14. Data & Privacy">
            <p>
              Jubly may collect account information, booking records,
              transaction data, analytics, uploaded files, and operational
              information necessary to provide platform services.
            </p>

            <p className="mt-4">
              Users acknowledge that no platform can guarantee absolute
              security, although reasonable safeguards are implemented.
            </p>
          </TermsCard>

          <TermsCard title="15. Platform Availability">
            <p>
              Jubly does not guarantee uninterrupted access to the platform.
            </p>

            <p className="mt-4">
              Downtime may occur due to maintenance, infrastructure issues,
              internet outages, security incidents, or third-party failures.
            </p>
          </TermsCard>

          <TermsCard title="16. Fraud Prevention">
            <p>
              Jubly may monitor activity, verify transactions, investigate
              suspicious behavior, restrict accounts temporarily, or reverse
              transactions where necessary to protect users and maintain
              platform integrity.
            </p>
          </TermsCard>

          <TermsCard title="17. Intellectual Property">
            <p>
              All Jubly software, branding, platform systems, designs, and
              related assets remain the intellectual property of Jubly unless
              otherwise stated.
            </p>

            <p className="mt-4">
              Users may not reproduce, distribute, copy, or exploit platform
              assets without permission.
            </p>
          </TermsCard>

          <TermsCard title="18. API & Developer Access">
            <ul className="list-disc space-y-2 pl-6">
              <li>API keys must remain confidential</li>
              <li>Rate limits must be respected</li>
              <li>Automated abuse is prohibited</li>
              <li>Access may be revoked at any time</li>
            </ul>
          </TermsCard>

          <TermsCard title="19. Suspension & Termination">
            <p>
              Jubly may suspend or terminate accounts for fraud, abuse, security
              risks, illegal activity, repeated violations, or failure to comply
              with these Terms.
            </p>

            <p className="mt-4">
              Users may request account deletion subject to legal obligations,
              disputes, and outstanding financial obligations.
            </p>
          </TermsCard>

          <TermsCard title="20. Disclaimer of Warranties">
            <p>
              Jubly is provided on an “as is” and “as available” basis without
              warranties of any kind, express or implied.
            </p>
          </TermsCard>

          <TermsCard title="21. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, Jubly is not liable for:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Lost profits or revenue</li>
              <li>Business interruptions</li>
              <li>Vendor-client disputes</li>
              <li>Missed appointments</li>
              <li>Third-party failures</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </TermsCard>

          <TermsCard title="22. Indemnification">
            <p>
              Users agree to indemnify and hold Jubly harmless from claims,
              liabilities, losses, or damages arising from misuse of the
              platform, policy violations, uploaded content, or unlawful
              conduct.
            </p>
          </TermsCard>

          <TermsCard title="23. Changes to Terms">
            <p>
              Jubly may modify these Terms at any time. Continued use of the
              platform after updates become effective constitutes acceptance of
              the revised Terms.
            </p>
          </TermsCard>

          <TermsCard title="24. Governing Law">
            <p>
              These Terms are governed by applicable laws within the
              jurisdictions where Jubly operates.
            </p>
          </TermsCard>

          <TermsCard title="25. Contact Information">
            <p>
              For legal inquiries, disputes, support, or questions regarding
              these Terms, users may contact Jubly through official support
              channels available on the platform.
            </p>
          </TermsCard>
        </div>
      </div>
    </div>
  );
}

function TermsCard({
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
