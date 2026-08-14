import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  if (!notFound) {
    console.error('Route error:', error);
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-6'>
      <div className='w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
        <p className='text-sm font-medium uppercase tracking-[0.2em] text-purple-600'>
          Jubly
        </p>
        <h1 className='mt-3 text-2xl font-bold tracking-tight text-gray-900'>
          {notFound ? 'Page not found' : 'Something went wrong'}
        </h1>
        <p className='mt-3 text-sm leading-6 text-gray-600'>
          {notFound
            ? "The page you're looking for doesn't exist or may have moved."
            : 'This section hit an unexpected error. Reloading usually fixes it — if it keeps happening, please reach out to support.'}
        </p>
        <div className='mt-6 flex gap-3'>
          <button
            type='button'
            onClick={() => window.location.reload()}
            className='flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
          >
            Reload
          </button>
          <Link
            to='/'
            className='flex-1 rounded-lg bg-purple-600 py-2 text-sm font-medium text-white transition hover:bg-purple-700'
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
