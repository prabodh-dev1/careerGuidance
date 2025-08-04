import { Progress } from '@/components/ui/progress'

const GameHeader = ({ gameState }) => {
  const phases = [
    { id: 'assessment', name: 'Assessment', icon: '🧠' },
    { id: 'career_selection', name: 'Career Selection', icon: '🎯' },
    { id: 'equilibrium', name: 'Equilibrium', icon: '⚖️' },
    { id: 'reflection', name: 'Reflection', icon: '💭' }
  ]

  const currentPhaseIndex = phases.findIndex(phase => phase.id === gameState.currentPhase)
  const progress = ((currentPhaseIndex + 1) / phases.length) * 100

  return (
    <header className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Career Guidance Game
        </h1>
        <div className="text-sm text-gray-600">
          {gameState.currentPhase === 'career_selection' && (
            <span>Round {gameState.roundNumber} of {gameState.maxRounds}</span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-between">
        {phases.map((phase, index) => (
          <div
            key={phase.id}
            className={`flex flex-col items-center space-y-1 ${
              index <= currentPhaseIndex
                ? 'text-blue-600'
                : 'text-gray-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index <= currentPhaseIndex
                  ? 'bg-blue-100 border-2 border-blue-600'
                  : 'bg-gray-100 border-2 border-gray-300'
              }`}
            >
              {index < currentPhaseIndex ? '✓' : phase.icon}
            </div>
            <span className="text-xs font-medium">{phase.name}</span>
          </div>
        ))}
      </div>
    </header>
  )
}

export default GameHeader

