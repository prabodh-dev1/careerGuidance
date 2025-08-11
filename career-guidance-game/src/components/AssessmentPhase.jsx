import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { calculatePersonalityScores, assessSkills } from '../lib/gameLogic'
import {
  generateCreativeChallenges,
  generateReactionTargets,
  generatePatternQuestions,
  evaluateSolutions
} from '@/lib/ollama'

const usedReactionTargets = []
const usedPatternSequences = []
const usedCreativeProblems = []

const AssessmentPhase = ({ onComplete }) => {
  const [currentMiniGame, setCurrentMiniGame] = useState(0)
  const [assessmentData, setAssessmentData] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)

  const miniGames = [
    {
      id: 'reaction_time',
      title: 'Reaction Time Challenge',
      description: 'Click when you see the target shape appear',
      icon: '⚡',
      component: ReactionTimeGame
    },
    {
      id: 'pattern_recognition',
      title: 'Pattern Recognition',
      description: 'Identify the next element in the sequence',
      icon: '🧩',
      component: PatternRecognitionGame
    },
    {
      id: 'resource_allocation',
      title: 'Resource Management',
      description: 'Allocate limited resources across projects',
      icon: '📊',
      component: ResourceAllocationGame
    },
    {
      id: 'social_scenarios',
      title: 'Social Scenarios',
      description: 'Navigate workplace situations',
      icon: '👥',
      component: SocialScenariosGame
    },
    {
      id: 'creative_problem_solving',
      title: 'Creative Thinking',
      description: 'Find innovative solutions to challenges',
      icon: '💡',
      component: CreativeProblemSolvingGame
    }
  ]

  const progress = ((currentMiniGame + 1) / miniGames.length) * 100

  const handleMiniGameComplete = (gameId, results) => {
    setAssessmentData(prev => ({
      ...prev,
      [gameId]: results
    }))

    if (currentMiniGame < miniGames.length - 1) {
      setCurrentMiniGame(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleCompleteAssessment = () => {
    // Process assessment data
    const personalityScores = calculatePersonalityScores(assessmentData)
    const skillScores = assessSkills(personalityScores, assessmentData)

    const profile = {
      personality: personalityScores,
      skills: skillScores,
      assessmentData
    }

    onComplete(profile)
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Assessment Complete! 🎉</CardTitle>
            <CardDescription>
              We've analyzed your responses to create your personalized profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Mini-Games Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Profile Accuracy</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Your Profile Includes:</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline">Personality Traits</Badge>
                <Badge variant="outline">Skill Assessments</Badge>
                <Badge variant="outline">Work Preferences</Badge>
                <Badge variant="outline">Career Aptitudes</Badge>
              </div>
            </div>

            <Button onClick={handleCompleteAssessment} size="lg" className="w-full">
              Continue to Career Selection
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const CurrentGameComponent = miniGames[currentMiniGame].component

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Personality & Skills Assessment</h2>
          <Badge variant="secondary">
            {currentMiniGame + 1} of {miniGames.length}
          </Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {miniGames.map((game, index) => (
            <div
              key={game.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap ${
                index === currentMiniGame
                  ? 'bg-blue-100 text-blue-800'
                  : index < currentMiniGame
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <span>{game.icon}</span>
              <span className="text-sm font-medium">{game.title}</span>
              {index < currentMiniGame && <span className="text-xs">✓</span>}
            </div>
          ))}
        </div>
      </div>

      <CurrentGameComponent
        onComplete={(results) => handleMiniGameComplete(miniGames[currentMiniGame].id, results)}
        gameInfo={miniGames[currentMiniGame]}
      />
    </div>
  )
}

// Mini-game components
const ReactionTimeGame = ({ onComplete, gameInfo }) => {
  const [isActive, setIsActive] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [reactionTimes, setReactionTimes] = useState([])
  const [round, setRound] = useState(0)
  const [showTarget, setShowTarget] = useState(false)

  const defaultTargets = ['🎯', '⭐', '🔥', '⚡', '💥']
  const [targets, setTargets] = useState(defaultTargets)
  const maxRounds = targets.length

  useEffect(() => {
    async function loadTargets() {
      try {
        const fetched = await generateReactionTargets(usedReactionTargets)
        if (Array.isArray(fetched) && fetched.length > 0) {
          setTargets(fetched)
          usedReactionTargets.push(...fetched)
        }
      } catch {
        // keep default targets on error
      }
    }
    loadTargets()
  }, [])

  useEffect(() => {
    if (round < maxRounds) {
      const timeout = setTimeout(() => {
        setShowTarget(true)
        setStartTime(Date.now())
        setIsActive(true)
      }, Math.random() * 3000 + 1000) // Random delay 1-4 seconds

      return () => clearTimeout(timeout)
    }
  }, [round, maxRounds])

  const handleClick = () => {
    if (isActive && showTarget) {
      const reactionTime = Date.now() - startTime
      setReactionTimes(prev => [...prev, reactionTime])
      setIsActive(false)
      setShowTarget(false)
      setRound(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (round >= maxRounds) {
      const avgReactionTime = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length
      const consistency = 1 - (Math.max(...reactionTimes) - Math.min(...reactionTimes)) / avgReactionTime
      
      onComplete({
        reactionTimes,
        averageReactionTime: avgReactionTime,
        consistency: Math.max(0, consistency)
      })
    }
  }, [round, reactionTimes, onComplete, maxRounds])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {gameInfo.icon} {gameInfo.title}
        </CardTitle>
        <CardDescription>{gameInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-6">
          <div className="text-lg">
            Round {round + 1} of {maxRounds}
          </div>
          
          <div 
            className={`w-64 h-64 mx-auto rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200 flex items-center justify-center ${
              showTarget 
                ? 'bg-red-500 border-red-600' 
                : 'bg-gray-100 border-gray-300 hover:bg-gray-200'
            }`}
            onClick={handleClick}
          >
            {showTarget ? (
              <div className="text-white text-4xl">{targets[round]}</div>
            ) : (
              <div className="text-gray-500">
                {isActive ? 'Wait for the target...' : 'Click when you see the target!'}
              </div>
            )}
          </div>

          {reactionTimes.length > 0 && (
            <div className="text-sm text-gray-600">
              Last reaction time: {reactionTimes[reactionTimes.length - 1]}ms
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const PatternRecognitionGame = ({ onComplete, gameInfo }) => {
  const [currentPattern, setCurrentPattern] = useState(0)
  const [score, setScore] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const defaultPatterns = [
    { sequence: [2, 4, 6, 8], answer: 10, options: [9, 10, 11, 12] },
    { sequence: [1, 4, 9, 16], answer: 25, options: [20, 25, 30, 36] },
    { sequence: [3, 6, 12, 24], answer: 48, options: [36, 42, 48, 54] },
    { sequence: [1, 1, 2, 3, 5], answer: 8, options: [6, 7, 8, 9] },
    { sequence: [100, 50, 25, 12.5], answer: 6.25, options: [5, 6.25, 7.5, 10] }
  ]
  const [patterns, setPatterns] = useState(defaultPatterns)

  useEffect(() => {
    async function loadPatterns() {
      try {
        const generated = await generatePatternQuestions(usedPatternSequences)
        if (Array.isArray(generated) && generated.length > 0) {
          setPatterns(generated)
          usedPatternSequences.push(...generated.map(p => p.sequence.join(',')))
        }
      } catch {
        // keep default patterns on error
      }
    }
    loadPatterns()
  }, [])

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === patterns[currentPattern].answer
    if (isCorrect) {
      setScore(prev => prev + 1)
    }

    if (currentPattern < patterns.length - 1) {
      setCurrentPattern(prev => prev + 1)
    } else {
      setIsCompleted(true)
      onComplete({
        score,
        totalQuestions: patterns.length,
        patternComplexity: score / patterns.length
      })
    }
  }

  if (isCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pattern Recognition Complete!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {score}/{patterns.length}
            </div>
            <div className="text-gray-600">Patterns Identified Correctly</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const pattern = patterns[currentPattern]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {gameInfo.icon} {gameInfo.title}
        </CardTitle>
        <CardDescription>{gameInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-lg mb-4">
              Question {currentPattern + 1} of {patterns.length}
            </div>
            
            <div className="text-xl mb-6">
              What comes next in this sequence?
            </div>
            
            <div className="flex justify-center items-center space-x-4 mb-6">
              {pattern.sequence.map((num, index) => (
                <div key={index} className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-semibold">
                  {num}
                </div>
              ))}
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">
                ?
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {pattern.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(option)}
                  className="h-12"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ResourceAllocationGame = ({ onComplete, gameInfo }) => {
  const [allocations, setAllocations] = useState({ projectA: 33, projectB: 33, projectC: 34 })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projects = [
    { id: 'projectA', name: 'Safe Investment', risk: 'Low', reward: 'Moderate' },
    { id: 'projectB', name: 'Balanced Portfolio', risk: 'Medium', reward: 'Good' },
    { id: 'projectC', name: 'High Growth', risk: 'High', reward: 'Excellent' }
  ]

  const handleAllocationChange = (projectId, value) => {
    const newAllocations = { ...allocations, [projectId]: parseInt(value) }
    
    // Ensure total doesn't exceed 100
    const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0)
    if (total <= 100) {
      setAllocations(newAllocations)
    }
  }

  const handleSubmit = () => {
    const total = Object.values(allocations).reduce((sum, val) => sum + val, 0)
    if (total === 100) {
      setIsSubmitted(true)
      
      // Calculate risk tolerance based on allocation
      const riskTolerance = (allocations.projectC * 0.01) + (allocations.projectB * 0.005)
      
      onComplete({
        allocations,
        riskTolerance: Math.min(1, riskTolerance),
        resourceAllocation: riskTolerance
      })
    }
  }

  const total = Object.values(allocations).reduce((sum, val) => sum + val, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {gameInfo.icon} {gameInfo.title}
        </CardTitle>
        <CardDescription>
          You have 100 points to allocate across three projects. How would you distribute them?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{project.name}</div>
                  <div className="text-sm text-gray-600">
                    Risk: {project.risk} | Reward: {project.reward}
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  {allocations[project.id]}%
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={allocations[project.id]}
                onChange={(e) => handleAllocationChange(project.id, e.target.value)}
                className="w-full"
                disabled={isSubmitted}
              />
            </div>
          ))}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total Allocation:</span>
              <span className={`text-lg font-bold ${total === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {total}%
              </span>
            </div>
            
            {!isSubmitted && (
              <Button 
                onClick={handleSubmit} 
                disabled={total !== 100}
                className="w-full"
              >
                {total === 100 ? 'Submit Allocation' : `Need ${100 - total} more points`}
              </Button>
            )}
            
            {isSubmitted && (
              <div className="text-center text-green-600 font-semibold">
                ✓ Allocation Submitted Successfully
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const SocialScenariosGame = ({ onComplete, gameInfo }) => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [responses, setResponses] = useState([])

  const scenarios = [
    {
      situation: "Your team is behind on a project deadline. A colleague suggests cutting corners on quality to meet the deadline.",
      options: [
        { text: "Agree to cut corners to meet the deadline", cooperation: 0.2, assertiveness: 0.3 },
        { text: "Suggest finding a middle ground with minor quality adjustments", cooperation: 0.8, assertiveness: 0.6 },
        { text: "Firmly oppose cutting quality and propose extending the deadline", cooperation: 0.4, assertiveness: 0.9 },
        { text: "Offer to work extra hours to maintain quality and meet deadline", cooperation: 0.9, assertiveness: 0.5 }
      ]
    },
    {
      situation: "During a team meeting, you disagree with a popular decision that you believe is flawed.",
      options: [
        { text: "Stay quiet to avoid conflict", cooperation: 0.6, assertiveness: 0.1 },
        { text: "Voice your concerns diplomatically", cooperation: 0.8, assertiveness: 0.7 },
        { text: "Strongly argue against the decision", cooperation: 0.2, assertiveness: 0.9 },
        { text: "Ask questions to help others see the flaws", cooperation: 0.7, assertiveness: 0.6 }
      ]
    },
    {
      situation: "A new team member is struggling and making mistakes that affect everyone's work.",
      options: [
        { text: "Report the issues to management", cooperation: 0.3, assertiveness: 0.6 },
        { text: "Offer to help and mentor the new member", cooperation: 0.9, assertiveness: 0.4 },
        { text: "Discuss the issues directly with the team member", cooperation: 0.6, assertiveness: 0.8 },
        { text: "Work around the issues without addressing them", cooperation: 0.4, assertiveness: 0.2 }
      ]
    }
  ]

  const handleResponse = (option) => {
    setResponses(prev => [...prev, option])
    
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1)
    } else {
      // Calculate average cooperation and assertiveness
      const avgCooperation = responses.concat([option]).reduce((sum, resp) => sum + resp.cooperation, 0) / scenarios.length
      const avgAssertiveness = responses.concat([option]).reduce((sum, resp) => sum + resp.assertiveness, 0) / scenarios.length
      
      onComplete({
        responses: responses.concat([option]),
        cooperationScore: avgCooperation,
        assertiveness: avgAssertiveness,
        socialScenarios: (avgCooperation + avgAssertiveness) / 2
      })
    }
  }

  const scenario = scenarios[currentScenario]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {gameInfo.icon} {gameInfo.title}
        </CardTitle>
        <CardDescription>
          How would you handle these workplace situations?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              Scenario {currentScenario + 1} of {scenarios.length}
            </Badge>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-800">{scenario.situation}</p>
          </div>
          
          <div className="space-y-3">
            {scenario.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleResponse(option)}
                className="w-full text-left h-auto p-4 justify-start"
              >
                {option.text}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const CreativeProblemSolvingGame = ({ onComplete, gameInfo }) => {
  const defaultChallenges = [
    {
      problem: "How many different uses can you think of for a paperclip?",
      timeLimit: 60,
      type: "divergent"
    },
    {
      problem: "Design a solution to help people remember to water their plants.",
      timeLimit: 90,
      type: "design"
    },
    {
      problem: "What would you do if you were stuck in an elevator with strangers?",
      timeLimit: 60,
      type: "social"
    }
  ]

  const [challenges, setChallenges] = useState(defaultChallenges)
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [solutions, setSolutions] = useState([])
  const [currentSolution, setCurrentSolution] = useState('')
  const [timeLeft, setTimeLeft] = useState(defaultChallenges[0].timeLimit)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    async function loadChallenges() {
      try {
        const generated = await generateCreativeChallenges(usedCreativeProblems)
        if (Array.isArray(generated) && generated.length > 0) {
          setChallenges(generated)
          setTimeLeft(generated[0].timeLimit)
          usedCreativeProblems.push(...generated.map(c => c.problem))
        }
      } catch {
        // keep default challenges on error
      }
    }
    loadChallenges()
  }, [])

  const handleTimeUp = useCallback(async () => {
    setIsActive(false)

    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
      setTimeLeft(challenges[currentChallenge + 1].timeLimit)
      setSolutions([])
    } else {
      const totalSolutions = solutions.length
      const creativityScore = Math.min(1, totalSolutions / 10)

      let relevance = 0
      let quality = 0
      try {
        const evaluation = await evaluateSolutions(challenges[currentChallenge].problem, solutions)
        relevance = evaluation.relevance ?? 0
        quality = evaluation.quality ?? 0
      } catch {
        // ignore evaluation errors
      }

      const peerComparisonScore = Math.min(1, (relevance + quality) / 2)

      onComplete({
        totalSolutions,
        creativityScore,
        relevanceScore: relevance,
        qualityScore: quality,
        peerComparisonScore,
        peerComparisonNote: 'System assessed - not final',
        creativeProblemSolving: creativityScore
      })
    }
  }, [challenges, currentChallenge, onComplete, solutions])

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      handleTimeUp()
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, handleTimeUp])

  const startChallenge = () => {
    setIsActive(true)
  }

  const addSolution = () => {
    if (currentSolution.trim()) {
      setSolutions(prev => [...prev, currentSolution.trim()])
      setCurrentSolution('')
    }
  }

  const challenge = challenges[currentChallenge]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {gameInfo.icon} {gameInfo.title}
        </CardTitle>
        <CardDescription>
          Think creatively and come up with as many solutions as possible!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              Challenge {currentChallenge + 1} of {challenges.length}
            </Badge>
            
            <div className="text-2xl font-bold mb-2">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-gray-800 font-medium">{challenge.problem}</p>
          </div>
          
          {!isActive && timeLeft === challenge.timeLimit && (
            <Button onClick={startChallenge} className="w-full" size="lg">
              Start Challenge
            </Button>
          )}
          
          {isActive && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentSolution}
                  onChange={(e) => setCurrentSolution(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSolution()}
                  placeholder="Type your solution here..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button onClick={addSolution}>Add</Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                <div className="text-sm font-medium mb-2">
                  Solutions ({solutions.length}):
                </div>
                {solutions.map((solution, index) => (
                  <div key={index} className="text-sm text-gray-600 mb-1">
                    {index + 1}. {solution}
                  </div>
                ))}
                {solutions.length === 0 && (
                  <div className="text-gray-400 text-sm">No solutions yet...</div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AssessmentPhase

