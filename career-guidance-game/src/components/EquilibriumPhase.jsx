import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { careerRoles, detectNashEquilibrium } from '../lib/gameLogic'

const EquilibriumPhase = ({ gameState, onContinue }) => {
  const [equilibriumData, setEquilibriumData] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (gameState.choiceHistory.length > 0) {
      const lastChoices = gameState.choiceHistory[gameState.choiceHistory.length - 1]
      const equilibrium = detectNashEquilibrium(lastChoices, gameState.players)
      setEquilibriumData(equilibrium)
    }
  }, [gameState])

  const getCareerDistribution = () => {
    if (gameState.choiceHistory.length === 0) return {}
    
    const lastChoices = gameState.choiceHistory[gameState.choiceHistory.length - 1]
    const distribution = {}
    
    Object.keys(careerRoles).forEach(career => {
      distribution[career] = Object.values(lastChoices).filter(choice => choice === career).length
    })
    
    return distribution
  }

  const getChoiceEvolution = () => {
    return gameState.choiceHistory.map((round, index) => ({
      round: index + 1,
      choices: round
    }))
  }

  const distribution = getCareerDistribution()
  const totalPlayers = Object.values(distribution).reduce((sum, count) => sum + count, 0)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Achievement Banner */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Nash Equilibrium Achieved!</h1>
          <p className="text-xl opacity-90">
            The market has reached a stable state where no one wants to change careers
          </p>
          {equilibriumData && (
            <div className="mt-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Stability Score: {Math.round(equilibriumData.stabilityScore * 100)}%
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Career Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Final Career Distribution</CardTitle>
            <CardDescription>
              How students distributed across different careers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(careerRoles).map(([careerKey, career]) => {
                const count = distribution[careerKey] || 0
                const percentage = totalPlayers > 0 ? (count / totalPlayers) * 100 : 0
                
                return (
                  <div key={careerKey} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{career.name}</span>
                      <span className="text-sm text-gray-600">
                        {count} student{count !== 1 ? 's' : ''} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Choice Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>Your Journey</CardTitle>
            <CardDescription>
              How your choices evolved over the rounds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getChoiceEvolution().map((round, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {round.round}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {careerRoles[round.choices.player1]?.name || 'No choice'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {careerRoles[round.choices.player1]?.category}
                    </div>
                  </div>
                  {index === getChoiceEvolution().length - 1 && (
                    <Badge variant="default">Final Choice</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nash Equilibrium Explanation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🧠 Understanding Nash Equilibrium</span>
            <Button 
              variant="outline" 
              onClick={() => setShowExplanation(!showExplanation)}
            >
              {showExplanation ? 'Hide' : 'Show'} Explanation
            </Button>
          </CardTitle>
        </CardHeader>
        {showExplanation && (
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">What is Nash Equilibrium?</h3>
                <p className="text-gray-700">
                  A Nash Equilibrium occurs when no player can improve their outcome by 
                  unilaterally changing their strategy. In your career choice game, this means 
                  no student can get a better result by switching to a different career alone.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Why Did This Happen?</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• <strong>Market Saturation:</strong> Popular careers became crowded, reducing their attractiveness</p>
                  <p>• <strong>Personal Fit:</strong> Students gravitated toward careers matching their skills and personality</p>
                  <p>• <strong>Strategic Thinking:</strong> Considering what others might choose led to better positioning</p>
                  <p>• <strong>Collective Stability:</strong> The final distribution represents a stable market state</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Real-World Applications</h3>
                <p className="text-gray-700">
                  This same principle applies to actual career markets. When too many people 
                  enter a popular field, competition increases and opportunities decrease. 
                  Understanding these dynamics helps you make more strategic career decisions.
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Key Insight</h4>
                <p className="text-blue-700">
                  The "best" career choice isn't just about personal preference—it's about 
                  finding the optimal balance between your abilities, interests, and market opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Market Analysis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Market Analysis</CardTitle>
          <CardDescription>
            Insights about market dynamics and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-2">
                {Object.entries(distribution).filter(([, count]) => count > totalPlayers * 0.3).length}
              </div>
              <div className="text-sm text-gray-600">Oversaturated Markets</div>
              <div className="text-xs text-gray-500 mt-1">
                {Object.entries(distribution)
                  .filter(([, count]) => count > totalPlayers * 0.3)
                  .map(([career]) => careerRoles[career].name)
                  .join(', ') || 'None'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {Object.entries(distribution).filter(([, count]) => count < totalPlayers * 0.1 && count > 0).length}
              </div>
              <div className="text-sm text-gray-600">Emerging Opportunities</div>
              <div className="text-xs text-gray-500 mt-1">
                {Object.entries(distribution)
                  .filter(([, count]) => count < totalPlayers * 0.1 && count > 0)
                  .map(([career]) => careerRoles[career].name)
                  .join(', ') || 'None'}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {gameState.roundNumber}
              </div>
              <div className="text-sm text-gray-600">Rounds to Equilibrium</div>
              <div className="text-xs text-gray-500 mt-1">
                Market stabilized after {gameState.roundNumber} round{gameState.roundNumber !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Strategic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-600">✓ What Worked Well</h3>
              <ul className="space-y-2 text-sm">
                <li>• Students found careers matching their personality and skills</li>
                <li>• Market forces naturally distributed students across careers</li>
                <li>• Strategic thinking led to better individual outcomes</li>
                <li>• The system reached stability without central planning</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-blue-600">💡 Key Learnings</h3>
              <ul className="space-y-2 text-sm">
                <li>• Popular doesn't always mean optimal for you</li>
                <li>• Market timing matters in career decisions</li>
                <li>• Personal fit is crucial for long-term success</li>
                <li>• Considering others' choices improves your strategy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={onContinue} size="lg" className="px-8">
          Continue to Personal Recommendations
        </Button>
      </div>
    </div>
  )
}

export default EquilibriumPhase

