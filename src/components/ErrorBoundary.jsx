import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary capturó un error:', error, info)
  }

  handleReset() {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
            <span className="text-6xl block">😵</span>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Algo ha ido mal
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ha ocurrido un error inesperado. Puedes intentar volver al inicio.
            </p>
            {this.state.error && (
              <details className="text-left bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                <summary className="text-xs text-gray-400 cursor-pointer">
                  Detalles del error
                </summary>
                <p className="text-xs text-red-500 mt-2 font-mono break-all">
                  {this.state.error.message}
                </p>
              </details>
            )}
            <button
              onClick={() => this.handleReset()}
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2.5 rounded-xl transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}