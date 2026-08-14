import { BASE } from '../../app/api';

export interface CompletionReviewData {
  bookingId: string;
  status: string;
  serviceName: string;
  vendorName: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  canAct: boolean;
}

interface Envelope<T> {
  status: number;
  message?: string;
  data: T;
  meta?: unknown;
}

async function callPublicEndpoint<T>(
  path: string,
  options: RequestInit,
): Promise<Envelope<T>> {
  let response: Response;

  try {
    response = await fetch(`${BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    throw new Error('This link is invalid or has expired.');
  }

  const body = await response.json().catch(() => null);

  if (!response.ok || !body) {
    throw new Error(body?.message || 'This link is invalid or has expired.');
  }

  return body as Envelope<T>;
}

export const getCompletionReview = (token: string) =>
  callPublicEndpoint<CompletionReviewData>(
    `/booking/completion/review?token=${encodeURIComponent(token)}`,
    { method: 'GET' },
  );

export const approveCompletion = (token: string) =>
  callPublicEndpoint<Partial<CompletionReviewData>>(
    '/booking/completion/approve',
    { method: 'POST', body: JSON.stringify({ token }) },
  );

export const rejectCompletion = (token: string, reason?: string) =>
  callPublicEndpoint<Partial<CompletionReviewData>>(
    '/booking/completion/reject',
    {
      method: 'POST',
      body: JSON.stringify({ token, reason: reason?.trim() || undefined }),
    },
  );
