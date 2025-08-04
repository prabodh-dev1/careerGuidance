import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  careerRoles, 
  calculateSkillFit, 
  calculatePersonalityFit, 
  calculateMarketDemand,
  calculatePayoff 
} from '../lib/gameLogic'

const CareerSelectionPhase = ({ playerProfile, gameState, onSelectCareer }) => {
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [marketData, setMarketData] = useState({})
  const [simulatedPeers, setSimulatedPeers] = useState({})

  // Simulate peer choices for demonstration
  useEffect(() => {
    const peers = {}
    const peerIds = ['peer1', 'peer2', 'peer3', 'peer4', 'peer5']
    const careers = Object.keys(careerRoles)
    
    peerIds.forEach(peerId => {
      // Simulate peer choices with some randomness and market awareness
      const randomCareer = careers[Math.floor(Math.random() * careers.length)]
      peers[peerId] = randomCareer
    })
    
    setSimulatedPeers(peers)
  }, [gameState.roundNumber])

  // Calculate market data including simulated peers
  useEffect(() => {
    const allChoices = { ...simulatedPeers }
    if (selectedCareer) {
      allChoices.player1 = selectedCareer
    }

    const newMarketData = {}
    Object.keys(careerRoles).forEach(career => {
      const demand = calculateMarketDemand(career, allChoices, gameState.roundNumber)
      const competition = Object.values(allChoices).filter(choice => choice === career).length / Object.keys(allChoices).length
      
      newMarketData[career] = {
        demand,
        competition,
        saturation: competition > 0.3 ? 'High' : competition > 0.15 ? 'Medium' : 'Low'
      }
    })
    
    setMarketData(newMarketData)
  }, [selectedCareer, simulatedPeers, gameState.roundNumber])

  const handleCareerSelect = (career) => {
    setSelectedCareer(career)
  }

  const handleConfirmSelection = () => {
    if (selectedCareer) {
      onSelectCareer(selectedCareer)
    }
  }

  const getCareerMetrics = (career) => {
    const skillFit = calculateSkillFit(playerProfile.skills, career)
    const personalityFit = calculatePersonalityFit(playerProfile.personality, career)
    const market = marketData[career] || { demand: 0.5, competition: 0.5 }
    
    return {
      skillFit,
      personalityFit,
      marketDemand: market.demand,
      competition: market.competition,
      overallFit: (skillFit + personalityFit) / 2
    }
  }

  const getFitColor = (score) => {
    if (score >= 0.8) return 'text-green-600'
    if (score >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getFitLabel = (score) => {
    if (score >= 0.8) return 'Excellent'
    if (score >= 0.6) return 'Good'
    if (score >= 0.4) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Strategic Career Selection</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Round {gameState.roundNumber} Instructions:</h3>
          <p className="text-gray-700">
            Choose a career based on your personal fit and market conditions. 
            Consider that other students are also making choices, which affects market saturation and opportunities.
            {gameState.roundNumber > 1 && " You can change your choice from previous rounds based on what you've learned."}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Career Options */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Available Careers</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(careerRoles).map(([careerKey, career]) => {
              const metrics = getCareerMetrics(careerKey)
              const isSelected = selectedCareer === careerKey
              
              return (
                <Card 
                  key={careerKey}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => handleCareerSelect(careerKey)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{career.name}</CardTitle>
                        <CardDescription>{career.category}</CardDescription>
                      </div>
                      {isSelected && (
                        <Badge variant="default">Selected</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{career.description}</p>
                    
                    {/* Fit Metrics */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Personal Fit</span>
                        <span className={`text-sm font-semibold ${getFitColor(metrics.overallFit)}`}>
                          {getFitLabel(metrics.overallFit)}
                        </span>
                      </div>
                      <Progress value={metrics.overallFit * 100} className="h-2" />
                    </div>

                    {/* Market Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-600">Market Demand</div>
                        <div className={`font-semibold ${getFitColor(metrics.marketDemand)}`}>
                          {getFitLabel(metrics.marketDemand)}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Competition</div>
                        <div className={`font-semibold ${
                          marketData[careerKey]?.saturation === 'High' ? 'text-red-600' :
                          marketData[careerKey]?.saturation === 'Medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {marketData[careerKey]?.saturation || 'Low'}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      Expected Income: ${career.baseIncome.toLocaleString()}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Market Overview & Selection Panel */}
        <div className="space-y-6">
          {/* Market Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Overview</CardTitle>
              <CardDescription>Current market conditions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(careerRoles).map(([careerKey, career]) => {
                  const peerCount = Object.values(simulatedPeers).filter(choice => choice === careerKey).length
                  const totalPeers = Object.keys(simulatedPeers).length
                  const percentage = totalPeers > 0 ? (peerCount / totalPeers) * 100 : 0
                  
                  return (
                    <div key={careerKey} className="flex justify-between items-center">
                      <span className="text-sm">{career.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-8">
                          {peerCount}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Showing choices from {Object.keys(simulatedPeers).length} other students
              </div>
            </CardContent>
          </Card>

          {/* Selection Summary */}
          {selectedCareer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{careerRoles[selectedCareer].name}</h4>
                    <p className="text-sm text-gray-600">{careerRoles[selectedCareer].description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium">Fit Analysis:</h5>
                    {(() => {
                      const metrics = getCareerMetrics(selectedCareer)
                      return (
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Skill Match:</span>
                            <span className={getFitColor(metrics.skillFit)}>
                              {Math.round(metrics.skillFit * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Personality Fit:</span>
                            <span className={getFitColor(metrics.personalityFit)}>
                              {Math.round(metrics.personalityFit * 100)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Market Demand:</span>
                            <span className={getFitColor(metrics.marketDemand)}>
                              {Math.round(metrics.marketDemand * 100)}%
                            </span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  <Button 
                    onClick={handleConfirmSelection}
                    className="w-full"
                    size="lg"
                  >
                    Confirm Career Choice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Round History */}
          {gameState.choiceHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gameState.choiceHistory.map((round, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>Round {index + 1}:</span>
                      <span className="font-medium">
                        {careerRoles[round.player1]?.name || 'No choice'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Game Theory Insight */}
          <Card className="bg-purple-50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                💡 Strategic Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                {gameState.roundNumber === 1 
                  ? "Consider both your personal fit and market demand. Popular choices may become oversaturated!"
                  : "Notice how market conditions change as more students make choices. This demonstrates real-world career market dynamics."
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CareerSelectionPhase

