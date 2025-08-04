import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { careerRoles, generateCareerRecommendations } from '../lib/gameLogic'

const ReflectionPhase = ({ gameState, playerProfile, onRestart }) => {
  const [recommendations, setRecommendations] = useState(null)
  const [activeTab, setActiveTab] = useState('recommendations')

  useEffect(() => {
    if (playerProfile) {
      // Generate market conditions based on final game state
      const marketConditions = {}
      if (gameState.choiceHistory.length > 0) {
        const lastChoices = gameState.choiceHistory[gameState.choiceHistory.length - 1]
        Object.keys(careerRoles).forEach(career => {
          const count = Object.values(lastChoices).filter(choice => choice === career).length
          const total = Object.keys(lastChoices).length
          const saturation = total > 0 ? count / total : 0
          marketConditions[career] = {
            demand: Math.max(0.1, 1 - saturation * 1.5), // Higher saturation = lower demand
            saturation
          }
        })
      }

      const recs = generateCareerRecommendations(playerProfile, marketConditions)
      setRecommendations(recs)
    }
  }, [playerProfile, gameState])

  const getPersonalityInsights = () => {
    const personality = playerProfile.personality
    const insights = []

    if (personality.openness > 0.7) {
      insights.push({
        trait: 'High Openness',
        description: 'You enjoy new experiences and creative challenges',
        careers: ['Creative fields', 'Research', 'Innovation roles']
      })
    }

    if (personality.conscientiousness > 0.7) {
      insights.push({
        trait: 'High Conscientiousness',
        description: 'You are organized, reliable, and goal-oriented',
        careers: ['Management', 'Healthcare', 'Finance']
      })
    }

    if (personality.extraversion > 0.7) {
      insights.push({
        trait: 'High Extraversion',
        description: 'You gain energy from social interactions',
        careers: ['Sales', 'Teaching', 'Public relations']
      })
    }

    if (personality.agreeableness > 0.7) {
      insights.push({
        trait: 'High Agreeableness',
        description: 'You value cooperation and helping others',
        careers: ['Social work', 'Counseling', 'Team leadership']
      })
    }

    if (personality.neuroticism < 0.3) {
      insights.push({
        trait: 'Emotional Stability',
        description: 'You handle stress well and remain calm under pressure',
        careers: ['Emergency services', 'High-pressure roles', 'Leadership']
      })
    }

    return insights
  }

  const getSkillHighlights = () => {
    const skills = playerProfile.skills
    return Object.entries(skills)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([skill, score]) => ({
        skill: skill.charAt(0).toUpperCase() + skill.slice(1),
        score,
        description: getSkillDescription(skill)
      }))
  }

  const getSkillDescription = (skill) => {
    const descriptions = {
      analytical: 'Strong problem-solving and logical reasoning abilities',
      creative: 'Innovative thinking and artistic expression capabilities',
      social: 'Excellent communication and interpersonal skills',
      technical: 'Proficiency with tools, technology, and systems',
      practical: 'Hands-on problem solving and implementation skills'
    }
    return descriptions[skill] || 'Valuable professional skill'
  }

  const getDevelopmentAreas = () => {
    const skills = playerProfile.skills
    return Object.entries(skills)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 2)
      .map(([skill, score]) => ({
        skill: skill.charAt(0).toUpperCase() + skill.slice(1),
        score,
        suggestions: getSkillDevelopmentSuggestions(skill)
      }))
  }

  const getSkillDevelopmentSuggestions = (skill) => {
    const suggestions = {
      analytical: ['Take logic and critical thinking courses', 'Practice with puzzles and brain teasers', 'Learn data analysis tools'],
      creative: ['Join art or design classes', 'Practice brainstorming techniques', 'Explore different creative mediums'],
      social: ['Join clubs or volunteer organizations', 'Practice public speaking', 'Take communication workshops'],
      technical: ['Learn programming or digital tools', 'Take online technical courses', 'Work on hands-on projects'],
      practical: ['Engage in hands-on projects', 'Learn trade skills', 'Practice problem-solving in real situations']
    }
    return suggestions[skill] || ['Seek relevant learning opportunities', 'Practice regularly', 'Find mentors in this area']
  }

  const personalityInsights = getPersonalityInsights()
  const skillHighlights = getSkillHighlights()
  const developmentAreas = getDevelopmentAreas()

  const tabs = [
    { id: 'recommendations', label: 'Career Matches', icon: '🎯' },
    { id: 'personality', label: 'Personality', icon: '🧠' },
    { id: 'skills', label: 'Skills', icon: '💪' },
    { id: 'development', label: 'Growth Plan', icon: '📈' }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Your Personalized Career Guide</h1>
        <p className="text-xl text-gray-600">
          Based on your assessment and game experience, here are your personalized insights and recommendations
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'recommendations' && recommendations && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🏆 Your Top Career Matches</CardTitle>
              <CardDescription>
                Careers that best align with your personality, skills, and market opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.topMatches.map(([careerKey, data], index) => {
                  const career = careerRoles[careerKey]
                  return (
                    <Card key={careerKey} className={`${index === 0 ? 'ring-2 ring-gold-400 bg-yellow-50' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{career.name}</CardTitle>
                            <CardDescription>{career.category}</CardDescription>
                          </div>
                          {index === 0 && <Badge variant="default">Best Match</Badge>}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600">{career.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Match</span>
                            <span className="font-semibold">{Math.round(data.score * 100)}%</span>
                          </div>
                          <Progress value={data.score * 100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-gray-600">Skill Fit</div>
                            <div className="font-semibold">{Math.round(data.skillFit * 100)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Personality Fit</div>
                            <div className="font-semibold">{Math.round(data.personalityFit * 100)}%</div>
                          </div>
                        </div>

                        <div className="text-sm">
                          <div className="text-gray-600">Expected Income</div>
                          <div className="font-semibold">${career.baseIncome.toLocaleString()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📚 Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Immediate Actions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Research your top career matches in detail</li>
                    <li>• Connect with professionals in these fields</li>
                    <li>• Look for internship or shadowing opportunities</li>
                    <li>• Join relevant clubs or organizations</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Long-term Planning</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Plan your academic coursework accordingly</li>
                    <li>• Develop skills identified as important</li>
                    <li>• Build a network in your chosen field</li>
                    <li>• Gain relevant experience through projects</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'personality' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🧠 Your Personality Profile</CardTitle>
              <CardDescription>
                Understanding your personality traits and how they relate to career success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Personality Traits</h3>
                  <div className="space-y-4">
                    {Object.entries(playerProfile.personality).map(([trait, score]) => (
                      <div key={trait} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="capitalize">{trait.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-semibold">{Math.round(score * 100)}%</span>
                        </div>
                        <Progress value={score * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Key Insights</h3>
                  <div className="space-y-4">
                    {personalityInsights.map((insight, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800">{insight.trait}</h4>
                        <p className="text-sm text-blue-700 mb-2">{insight.description}</p>
                        <div className="text-xs text-blue-600">
                          <strong>Good for:</strong> {insight.careers.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>💪 Your Skill Profile</CardTitle>
              <CardDescription>
                Your strongest abilities and how they apply to different careers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Top Skills</h3>
                  <div className="space-y-4">
                    {skillHighlights.map((skill, index) => (
                      <div key={index} className="bg-green-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-green-800">{skill.skill}</h4>
                          <Badge variant="secondary">{Math.round(skill.score * 100)}%</Badge>
                        </div>
                        <p className="text-sm text-green-700">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">All Skills Overview</h3>
                  <div className="space-y-3">
                    {Object.entries(playerProfile.skills).map(([skill, score]) => (
                      <div key={skill} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="capitalize">{skill}</span>
                          <span className="font-semibold">{Math.round(score * 100)}%</span>
                        </div>
                        <Progress value={score * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'development' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📈 Your Growth Plan</CardTitle>
              <CardDescription>
                Areas for development and specific steps to enhance your career readiness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Development Opportunities</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {developmentAreas.map((area, index) => (
                      <div key={index} className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">{area.skill}</h4>
                        <div className="text-sm text-orange-700 mb-3">
                          Current Level: {Math.round(area.score * 100)}%
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Suggestions:</div>
                          <ul className="text-xs text-orange-600 space-y-1">
                            {area.suggestions.map((suggestion, idx) => (
                              <li key={idx}>• {suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Action Plan</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">This Month</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li>• Complete career research on top matches</li>
                          <li>• Join one relevant club or organization</li>
                          <li>• Start developing your weakest skill</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Next 3 Months</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li>• Network with professionals in your field</li>
                          <li>• Apply for relevant internships</li>
                          <li>• Take courses to build key skills</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">This Year</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-2">
                          <li>• Gain hands-on experience in your field</li>
                          <li>• Build a portfolio of relevant work</li>
                          <li>• Reassess and refine your career goals</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Game Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>🎮 Game Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">Mini-Games Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{gameState.roundNumber}</div>
              <div className="text-sm text-gray-600">Rounds Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {recommendations ? recommendations.topMatches.length : 0}
              </div>
              <div className="text-sm text-gray-600">Career Matches Found</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">Profile Completeness</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Button onClick={onRestart} variant="outline" className="mr-4">
          Play Again
        </Button>
        <Button onClick={() => window.print()} className="mr-4">
          Save Results
        </Button>
        <Button onClick={() => {
          const data = {
            personality: playerProfile.personality,
            skills: playerProfile.skills,
            recommendations: recommendations?.topMatches.map(([career, data]) => ({
              career: careerRoles[career].name,
              score: Math.round(data.score * 100)
            }))
          }
          navigator.clipboard.writeText(JSON.stringify(data, null, 2))
          alert('Results copied to clipboard!')
        }}>
          Share Results
        </Button>
      </div>
    </div>
  )
}

export default ReflectionPhase

