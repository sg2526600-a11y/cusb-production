// ─── Error Boundary ───────────────────────────────────────────────────────────
// Catches rendering errors in the component tree.
// Wrap page-level or feature-level subtrees to isolate failures gracefully.

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children:  ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?:   Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Wire up your error-reporting service here (e.g. Sentry)
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          style={{
            minHeight: '40vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--ink)',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🏛️</span>
          <h2 style={{ fontFamily: '"EB Garamond", serif', fontSize: '1.5rem' }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: '.9rem', color: 'var(--is)', maxWidth: '40ch' }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: 'var(--m)',
              color: '#fff',
              border: 'none',
              padding: '.6rem 1.4rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '.9rem',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ─── HOC convenience wrapper ──────────────────────────────────────────────────

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const Wrapped = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  Wrapped.displayName = `withErrorBoundary(${Component.displayName ?? Component.name})`;
  return Wrapped;
}
