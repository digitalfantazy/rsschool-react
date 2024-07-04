import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error) {
      console.log(error.message);
      return { hasError: true };
    }
    return { hasError: false };
  }

  handleError = () => {
    throw new Error('Test error');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={this.handleError}>Throw Error</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
