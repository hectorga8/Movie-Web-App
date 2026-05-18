import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', background: '#1a1a1a', color: 'white', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#ff5555' }}>CineBox Error Crítico</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px', background: 'black', padding: '20px', borderRadius: '8px' }}>
            <summary style={{ cursor: 'pointer', fontSize: '18px', color: '#ff8888', marginBottom: '10px' }}>Ver detalles del error</summary>
            {this.state.error && this.state.error.toString()}
            <br /><br />
            {this.state.errorInfo ? this.state.errorInfo.componentStack : 'Cargando stack trace...'}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
