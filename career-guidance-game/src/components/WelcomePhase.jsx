import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

const WelcomePhase = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Career Guidance Game
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Strategic Career Planning with Game Theory
        </p>
        <div className="flex justify-center space-x-2 mb-8">
          <Badge variant="secondary">Nash Equilibrium</Badge>
          <Badge variant="secondary">Personality Assessment</Badge>
          <Badge variant="secondary">Market Dynamics</Badge>
          <Badge variant="secondary">Strategic Thinking</Badge>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              🎯 What You'll Learn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Understand your personality and skills through engaging mini-games</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Learn how market dynamics affect career opportunities</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Experience Nash Equilibrium in career choice scenarios</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Develop strategic thinking for career planning</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              🎮 How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  1
                </div>
                <span>Complete personality and skills assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  2
                </div>
                <span>Make strategic career choices over multiple rounds</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  3
                </div>
                <span>Observe market dynamics and peer interactions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                  4
                </div>
                <span>Reach Nash Equilibrium and reflect on insights</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>🧠 Game Theory Concepts</CardTitle>
          <CardDescription>
            This game demonstrates key concepts from game theory applied to career planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                ⚖️
              </div>
              <h3 className="font-semibold mb-2">Nash Equilibrium</h3>
              <p className="text-sm text-gray-600">
                A stable state where no player can improve by changing their strategy alone
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                📊
              </div>
              <h3 className="font-semibold mb-2">Market Dynamics</h3>
              <p className="text-sm text-gray-600">
                How supply and demand in career markets affect opportunities and competition
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                🎯
              </div>
              <h3 className="font-semibold mb-2">Strategic Thinking</h3>
              <p className="text-sm text-gray-600">
                Considering others' choices when making your own decisions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="px-8 py-3 text-lg"
        >
          Start Your Career Journey
        </Button>
        <p className="text-sm text-gray-500 mt-4">
          Estimated time: 15-20 minutes
        </p>
      </div>
    </div>
  )
}

export default WelcomePhase

