# Career Guidance Game: Strategic Career Planning with Game Theory

An interactive educational game that applies game theory principles, particularly Nash Equilibrium, to help students make informed career choices while understanding market dynamics and competition.

## 🎯 Project Overview

The Career Guidance Game is an innovative educational tool that combines:
- **Personality Assessment**: Mini-games and scenarios to assess personality traits and skills
- **Strategic Decision-Making**: Multi-round career selection with real-time market feedback
- **Game Theory Concepts**: Nash Equilibrium visualization and explanation
- **Personalized Recommendations**: Career suggestions based on assessment and gameplay

## 📁 Project Structure

```
careerGuidance/
├── career-guidance-game/           # React prototype application
│   ├── src/                       # Source code
│   │   ├── components/            # React components
│   │   ├── lib/                   # Game logic and utilities
│   │   └── App.jsx               # Main application component
│   ├── package.json              # Dependencies and scripts
│   └── vite.config.js            # Vite configuration
├── career_guidance_game_presentation/  # HTML presentation slides
├── upload/                       # Image assets and search results
├── final_game_design_document.md # Comprehensive design document
├── game_analysis.md             # Initial game concept analysis
├── game_design_document.md      # Detailed game mechanics
├── research_findings.md         # Research on game theory in education
├── todo.md                      # Project progress tracking
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Running the Prototype

1. Navigate to the prototype directory:
   ```bash
   cd career-guidance-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Viewing the Presentation

Open any of the HTML files in the `career_guidance_game_presentation/` directory in a web browser to view the presentation slides.

## 🎮 Game Phases

### 1. Entry Phase: Personality & Skills Assessment
- **Mini-Games**: Reaction time tests, pattern recognition, resource allocation
- **Scenario-Based Questions**: Workplace situations and decision-making scenarios
- **Assessment Output**: Comprehensive personality and skills profile

### 2. Decision Phase: Strategic Career Selection
- **Career Cards**: Interactive cards showing market demand, competition, and fit scores
- **Market Dynamics**: Real-time updates based on player choices
- **Multiple Rounds**: Strategic decision-making over several iterations

### 3. Nash Equilibrium Highlight Phase
- **Equilibrium Detection**: Automatic detection when stable state is reached
- **Visualization**: Graphs showing career distribution evolution
- **Educational Content**: Explanation of Nash Equilibrium concepts

### 4. Reflection Phase
- **Personalized Recommendations**: Top career matches based on gameplay
- **Market Insights**: Analysis of competition and opportunities
- **Development Plan**: Resources and next steps for career exploration

## 🧮 Core Algorithms

### Payoff Function
```
Payoff = (SkillFit × Weight1) + (MarketDemand × Weight2) - (RoleCompetition × Weight3)
```

### Nash Equilibrium Detection
The game detects equilibrium when no player can improve their payoff by switching careers and the distribution remains stable.

### Career Recommendation
```
RecommendationScore = (PersonalityFit × 0.4) + (SkillFit × 0.4) + (MarketOpportunity × 0.2)
```

## 🛠️ Technical Implementation

- **Frontend**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and bundling
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React useState and useEffect hooks
- **Visualization**: Custom chart components and D3.js

## 📊 Assessment System

### Personality Dimensions (Big Five Model)
- Openness to experience
- Conscientiousness
- Extraversion
- Agreeableness
- Neuroticism (emotional stability)

### Skill Categories
- Analytical
- Creative
- Social
- Technical
- Practical

## 🎯 Career Roles Database

The game includes 10 diverse career roles:
1. Software Developer
2. Marketing Manager
3. Financial Analyst
4. Healthcare Provider
5. Creative Designer
6. Project Manager
7. Research Scientist
8. Teacher/Educator
9. Entrepreneur
10. Legal Professional

## 🔧 Known Issues

- Import path configuration needs resolution
- Button click handlers require debugging
- State management optimization needed for complex interactions

## 🚀 Future Development

### Technical Improvements
- Implement Redux or Context API for robust state management
- Add comprehensive unit and integration tests
- Enhance accessibility and mobile optimization

### Feature Enhancements
- Expand assessment with additional mini-games
- Connect to real career market data APIs
- Implement multiplayer mode for classroom use
- Add progress saving and detailed PDF reports

### Educational Extensions
- Develop teacher guides for classroom integration
- Add more game theory concepts beyond Nash Equilibrium
- Create follow-up activities based on game results

## 📚 Documentation

- **[Final Game Design Document](final_game_design_document.md)**: Comprehensive project documentation
- **[Game Analysis](game_analysis.md)**: Initial concept analysis
- **[Research Findings](research_findings.md)**: Game theory in education research
- **[Project Progress](todo.md)**: Development tracking

## 🎓 Educational Value

This game teaches students:
- Strategic thinking in career planning
- Understanding of market dynamics and competition
- Game theory concepts applied to real-world decisions
- Self-awareness through personality and skills assessment
- Data-driven decision making

## 🤝 Contributing

This project was developed as an educational prototype. For contributions or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is developed for educational purposes. Please refer to the license file for usage terms.

## 📞 Contact

For questions about the game design or implementation, please refer to the comprehensive documentation in the repository.

---

*Built with ❤️ for educational innovation and strategic career planning*

