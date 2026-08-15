import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 px-6'>
          <div className='w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
            <p className='text-sm font-medium uppercase tracking-[0.2em] text-purple-600'>
              Jubly
            </p>
            <h1 className='mt-3 text-2xl font-bold tracking-tight text-gray-900'>
              Something went wrong
            </h1>
            <p className='mt-3 text-sm leading-6 text-gray-600'>
              We hit an unexpected error. Reloading usually fixes it — if it
              keeps happening, please reach out to support.
            </p>
            <button
              type='button'
              onClick={() => window.location.reload()}
              className='mt-6 w-full rounded-lg bg-purple-600 py-2 text-white transition hover:bg-purple-700'
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
