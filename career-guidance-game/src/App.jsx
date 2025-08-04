import { useState, useEffect } from 'react'
import { GameState } from './lib/gameLogic'
import WelcomePhase from './components/WelcomePhase'
import AssessmentPhase from './components/AssessmentPhase'
import CareerSelectionPhase from './components/CareerSelectionPhase'
import EquilibriumPhase from './components/EquilibriumPhase'
import ReflectionPhase from './components/ReflectionPhase'
import GameHeader from './components/GameHeader'
import './App.css'

function App() {
  const [gameState, setGameState] = useState(new GameState())
  const [playerProfile, setPlayerProfile] = useState(null)

  // Update game state
  const updateGameState = (newState) => {
    setGameState(new GameState())
    Object.assign(gameState, newState)
    setGameState({ ...gameState })
  }

  // Handle phase transitions
  const advancePhase = () => {
    const newGameState = { ...gameState }
    newGameState.advancePhase()
    setGameState(newGameState)
  }

  // Handle player profile completion
  const completeAssessment = (profile) => {
    setPlayerProfile(profile)
    gameState.setCurrentPlayer('player1', profile)
    advancePhase()
  }

  // Handle career selection
  const selectCareer = (career) => {
    const choices = { player1: career }
    gameState.addChoiceRound(choices)
    
    // Check for equilibrium or advance round
    if (gameState.checkEquilibriumConditions()) {
      advancePhase() // Go to equilibrium phase
    } else if (gameState.roundNumber < gameState.maxRounds) {
      gameState.advanceRound()
      setGameState({ ...gameState })
    } else {
      advancePhase() // Go to equilibrium phase
    }
  }

  // Render current phase
  const renderCurrentPhase = () => {
    switch (gameState.currentPhase) {
      case 'welcome':
        return <WelcomePhase onStart={advancePhase} />
      
      case 'assessment':
        return <AssessmentPhase onComplete={completeAssessment} />
      
      case 'career_selection':
        return (
          <CareerSelectionPhase
            playerProfile={playerProfile}
            gameState={gameState}
            onSelectCareer={selectCareer}
          />
        )
      
      case 'equilibrium':
        return (
          <EquilibriumPhase
            gameState={gameState}
            playerProfile={playerProfile}
            onContinue={advancePhase}
          />
        )
      
      case 'reflection':
        return (
          <ReflectionPhase
            gameState={gameState}
            playerProfile={playerProfile}
            onRestart={() => {
              setGameState(new GameState())
              setPlayerProfile(null)
            }}
          />
        )
      
      default:
        return <WelcomePhase onStart={advancePhase} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {gameState.currentPhase !== 'welcome' && (
          <GameHeader gameState={gameState} />
        )}
        
        <main className="mt-8">
          {renderCurrentPhase()}
        </main>
      </div>
    </div>
  )
}

export default App

