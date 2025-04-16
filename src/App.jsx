import HealthScoreVisualizer from './components/HealthScoreVisualizer'

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Water Health Score System</h1>
        <p className="text-center text-gray-600 mt-2">
          Visualizing the scoring system for evaluating bottled water quality
        </p>
      </header>
      
      <main>
        <HealthScoreVisualizer />
      </main>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 InSight Water Quality Assessment Tool</p>
      </footer>
    </div>
  )
}

export default App