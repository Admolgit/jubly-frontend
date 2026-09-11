# Client reviews

The dashboard completion handler and the email completion approval page open the
review modal only after successful approval confirms `COMPLETED`. The dashboard
also checks the completed booking list if an approval response omits status.
Completion remains successful if that follow-up read fails. Email approval still
works without authentication, and the review modal opens without sign-in.
Review submission uses the public `POST /reviews/:clientId` route, with clientId
from the completion details or approval response. The public completion flow
does not require the booking-review GET to succeed before submission.

Completed dashboard bookings fetch their review and show Leave a Review or
Reviewed. Failed review-status reads show a retry action rather than assuming
there is no review. Submission sends only bookingId, rating and a nonempty,
trimmed optional comment in the body, with clientId in the URL. Duplicate responses disable submission and invalidate
review caches. Successful submissions refresh booking and vendor review queries.

## Response assumptions to verify with the backend

The brief specifies URLs and request fields but does not provide response JSON.
The new API module follows the existing application's `data` envelope:

- Booking review: `{ data: Review | null }`.
- Create review: `{ data: Review }`.
- Completion details or approval response include `clientId` for the public POST.
- Vendor reviews: `{ data: { reviews: Review[], averageRating: number | null,
  totalReviews: number } }`. Average and count are for all vendor reviews, not
  just the current page. Pagination uses page and limit (10).
- Public reviews contain id, rating, optional comment, createdAt, customer
  displayName/name (or customerName), and service.name (or serviceName).
- Public vendor.id is the identifier accepted by the vendor reviews endpoint.

Only customer display names are rendered; customer emails, phone numbers and
identifiers are never displayed. These shapes need a live backend smoke test;
automated tests use representative fixtures because no live credentials or
response examples were supplied.

Vendor card summaries were skipped: existing listing contracts do not establish
rating/count fields. No listing endpoint or booking/payment/authentication
business logic was changed.

Run `npm test`, `npm run build`, and targeted ESLint on the changed source files.
Tests cover approval timing and failure in both entry points, status confirmation,
required rating, optional comments, duplicate and other errors, concurrent submit
protection, dismissal, review-later states, public empty/populated lists, and actual
RTK Query cache invalidation using mocked HTTP responses.
