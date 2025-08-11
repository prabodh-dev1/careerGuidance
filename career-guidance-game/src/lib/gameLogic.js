// Career Guidance Game - Core Logic Implementation

// Career roles database with attributes
export const careerRoles = {
  software_engineer: {
    name: 'Software Engineer',
    category: 'Technology',
    baseDemand: 0.8,
    baseIncome: 85000,
    requiredSkills: {
      analytical: 0.8,
      technical: 0.9,
      creative: 0.6,
      social: 0.4,
      practical: 0.5
    },
    personalityFit: {
      openness: 0.7,
      conscientiousness: 0.8,
      extraversion: 0.3,
      agreeableness: 0.5,
      neuroticism: -0.3
    },
    marketVolatility: 0.2,
    growthPotential: 0.9,
    workLifeBalance: 0.7,
    description: 'Design and develop software applications and systems'
  },
  data_scientist: {
    name: 'Data Scientist',
    category: 'Technology',
    baseDemand: 0.9,
    baseIncome: 95000,
    requiredSkills: {
      analytical: 0.9,
      technical: 0.8,
      creative: 0.5,
      social: 0.4,
      practical: 0.6
    },
    personalityFit: {
      openness: 0.8,
      conscientiousness: 0.9,
      extraversion: 0.3,
      agreeableness: 0.4,
      neuroticism: -0.4
    },
    marketVolatility: 0.3,
    growthPotential: 0.95,
    workLifeBalance: 0.6,
    description: 'Analyze complex data to extract insights and drive decisions'
  },
  marketing_manager: {
    name: 'Marketing Manager',
    category: 'Business',
    baseDemand: 0.7,
    baseIncome: 75000,
    requiredSkills: {
      analytical: 0.6,
      technical: 0.4,
      creative: 0.8,
      social: 0.9,
      practical: 0.5
    },
    personalityFit: {
      openness: 0.7,
      conscientiousness: 0.7,
      extraversion: 0.8,
      agreeableness: 0.6,
      neuroticism: -0.2
    },
    marketVolatility: 0.4,
    growthPotential: 0.7,
    workLifeBalance: 0.5,
    description: 'Develop and execute marketing strategies to promote products'
  },
  teacher: {
    name: 'Teacher',
    category: 'Education',
    baseDemand: 0.6,
    baseIncome: 55000,
    requiredSkills: {
      analytical: 0.5,
      technical: 0.3,
      creative: 0.7,
      social: 0.9,
      practical: 0.6
    },
    personalityFit: {
      openness: 0.6,
      conscientiousness: 0.8,
      extraversion: 0.7,
      agreeableness: 0.9,
      neuroticism: -0.3
    },
    marketVolatility: 0.1,
    growthPotential: 0.4,
    workLifeBalance: 0.8,
    description: 'Educate and inspire students in academic subjects'
  },
  nurse: {
    name: 'Nurse',
    category: 'Healthcare',
    baseDemand: 0.85,
    baseIncome: 70000,
    requiredSkills: {
      analytical: 0.6,
      technical: 0.5,
      creative: 0.4,
      social: 0.8,
      practical: 0.9
    },
    personalityFit: {
      openness: 0.5,
      conscientiousness: 0.9,
      extraversion: 0.6,
      agreeableness: 0.8,
      neuroticism: -0.4
    },
    marketVolatility: 0.1,
    growthPotential: 0.8,
    workLifeBalance: 0.6,
    description: 'Provide healthcare and support to patients'
  },
  graphic_designer: {
    name: 'Graphic Designer',
    category: 'Creative',
    baseDemand: 0.5,
    baseIncome: 50000,
    requiredSkills: {
      analytical: 0.4,
      technical: 0.6,
      creative: 0.95,
      social: 0.5,
      practical: 0.7
    },
    personalityFit: {
      openness: 0.9,
      conscientiousness: 0.6,
      extraversion: 0.5,
      agreeableness: 0.5,
      neuroticism: 0.1
    },
    marketVolatility: 0.5,
    growthPotential: 0.6,
    workLifeBalance: 0.7,
    description: 'Create visual designs for digital and print media'
  }
};

// Personality assessment scoring
export function calculatePersonalityScores(assessmentData) {
  const scores = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0
  };

  // Reaction time analysis
  if (assessmentData.reactionTimes) {
    const consistency = calculateConsistency(assessmentData.reactionTimes);
    scores.neuroticism += (1 - consistency) * 0.3;
    scores.conscientiousness += consistency * 0.2;
  }

  // Pattern recognition analysis
  if (assessmentData.patternComplexity) {
    scores.openness += assessmentData.patternComplexity * 0.4;
  }

  // Resource allocation analysis
  if (assessmentData.riskTolerance !== undefined) {
    scores.openness += assessmentData.riskTolerance * 0.3;
    scores.neuroticism += (1 - assessmentData.riskTolerance) * 0.2;
  }

  // Social scenario analysis
  if (assessmentData.cooperationScore !== undefined) {
    scores.agreeableness += assessmentData.cooperationScore * 0.5;
  }

  if (assessmentData.assertiveness !== undefined) {
    scores.extraversion += assessmentData.assertiveness * 0.3;
  }

  // Creative problem solving
  if (assessmentData.creativityScore !== undefined) {
    scores.openness += assessmentData.creativityScore * 0.3;
  }

  // Normalize scores to 0-1 range
  return normalizeScores(scores);
}

// Skill assessment integration
export function assessSkills(personalityScores, miniGamePerformance) {
  const skills = {
    analytical: 0,
    creative: 0,
    social: 0,
    technical: 0,
    practical: 0
  };

  // Combine personality traits with performance data
  skills.analytical = (
    personalityScores.conscientiousness * 0.4 +
    (miniGamePerformance.patternRecognition || 0.5) * 0.6
  );

  skills.creative = (
    personalityScores.openness * 0.5 +
    (miniGamePerformance.creativeProblemSolving || 0.5) * 0.5
  );

  skills.social = (
    personalityScores.extraversion * 0.3 +
    personalityScores.agreeableness * 0.3 +
    (miniGamePerformance.socialScenarios || 0.5) * 0.4
  );

  skills.technical = (
    personalityScores.conscientiousness * 0.3 +
    (miniGamePerformance.reactionTime || 0.5) * 0.3 +
    (miniGamePerformance.patternRecognition || 0.5) * 0.4
  );

  skills.practical = (
    (1 - personalityScores.neuroticism) * 0.3 +
    (miniGamePerformance.resourceAllocation || 0.5) * 0.4 +
    personalityScores.conscientiousness * 0.3
  );

  return skills;
}

// Market demand calculation
export function calculateMarketDemand(role, playerChoices) {
  const baseDemand = careerRoles[role].baseDemand;
  
  // Calculate saturation based on player choices
  const totalPlayers = Object.keys(playerChoices).length;
  const roleChoosers = Object.values(playerChoices).filter(choice => choice === role).length;
  const saturationFactor = totalPlayers > 0 ? roleChoosers / totalPlayers : 0;
  
  // Apply saturation penalty
  const saturationPenalty = Math.min(saturationFactor * 2, 0.8); // Max 80% penalty
  
  // Add market volatility (simplified random factor)
  const volatility = careerRoles[role].marketVolatility;
  const marketFluctuation = (Math.random() - 0.5) * volatility;
  
  // Calculate final demand
  const adjustedDemand = baseDemand * (1 - saturationPenalty) + marketFluctuation;
  
  return Math.max(0.1, Math.min(1.0, adjustedDemand)); // Clamp between 0.1 and 1.0
}

// Skill fit calculation
export function calculateSkillFit(playerSkills, role) {
  const requiredSkills = careerRoles[role].requiredSkills;
  
  const fitScores = [];
  for (const [skill, requiredLevel] of Object.entries(requiredSkills)) {
    const playerLevel = playerSkills[skill] || 0;
    
    // Calculate fit using gaussian function
    // Perfect fit when playerLevel = requiredLevel
    const fit = Math.exp(-Math.pow(playerLevel - requiredLevel, 2) / 0.2);
    fitScores.push(fit);
  }
  
  return fitScores.reduce((sum, score) => sum + score, 0) / fitScores.length;
}

// Personality fit calculation
export function calculatePersonalityFit(playerPersonality, role) {
  const personalityRequirements = careerRoles[role].personalityFit;
  
  let fitScore = 0;
  let totalWeight = 0;
  
  for (const [trait, requiredLevel] of Object.entries(personalityRequirements)) {
    const playerLevel = playerPersonality[trait] || 0;
    const weight = Math.abs(requiredLevel); // Use absolute value as weight
    
    let fit;
    if (requiredLevel > 0) {
      // Positive requirement: higher is better
      fit = requiredLevel > 0 ? Math.min(playerLevel / requiredLevel, 1.0) : 1.0;
    } else {
      // Negative requirement: lower is better
      fit = Math.max(1 + requiredLevel - playerLevel, 0.0);
    }
    
    fitScore += fit * weight;
    totalWeight += weight;
  }
  
  return totalWeight > 0 ? fitScore / totalWeight : 0.5;
}

// Competition level calculation
export function calculateCompetition(role, playerChoices) {
  const totalPlayers = Object.keys(playerChoices).length;
  const roleChoosers = Object.values(playerChoices).filter(choice => choice === role).length;
  
  return totalPlayers > 0 ? roleChoosers / totalPlayers : 0;
}

// Comprehensive payoff calculation
export function calculatePayoff(playerId, roleChoice, allChoices, playerProfiles) {
  const playerProfile = playerProfiles[playerId];
  
  // Calculate component scores
  const skillFit = calculateSkillFit(playerProfile.skills, roleChoice);
  const personalityFit = calculatePersonalityFit(playerProfile.personality, roleChoice);
  const marketDemand = calculateMarketDemand(roleChoice, allChoices);
  const competitionLevel = calculateCompetition(roleChoice, allChoices);
  
  // Additional factors
  const workLifeBalance = careerRoles[roleChoice].workLifeBalance;
  const growthPotential = careerRoles[roleChoice].growthPotential;
  
  // Weighted payoff calculation
  const payoff = (
    skillFit * 0.25 +
    personalityFit * 0.20 +
    marketDemand * 0.25 +
    (1 - competitionLevel) * 0.15 +
    workLifeBalance * 0.10 +
    growthPotential * 0.05
  );
  
  return payoff;
}

// Nash equilibrium detection
export function detectNashEquilibrium(playerChoices, playerProfiles, improvementThreshold = 0.05) {
  let equilibriumViolations = 0;
  
  for (const [playerId, currentChoice] of Object.entries(playerChoices)) {
    const currentPayoff = calculatePayoff(playerId, currentChoice, playerChoices, playerProfiles);
    
    // Check if player can improve by switching to any other role
    let bestAlternativePayoff = currentPayoff;
    
    for (const alternativeRole of Object.keys(careerRoles)) {
      if (alternativeRole !== currentChoice) {
        // Simulate switching to alternative
        const tempChoices = { ...playerChoices, [playerId]: alternativeRole };
        const alternativePayoff = calculatePayoff(playerId, alternativeRole, tempChoices, playerProfiles);
        
        if (alternativePayoff > bestAlternativePayoff) {
          bestAlternativePayoff = alternativePayoff;
        }
      }
    }
    
    // Check if improvement is significant
    const improvement = bestAlternativePayoff - currentPayoff;
    if (improvement > improvementThreshold) {
      equilibriumViolations++;
    }
  }
  
  // Nash Equilibrium if no player can significantly improve
  const isEquilibrium = equilibriumViolations === 0;
  const stabilityScore = 1 - (equilibriumViolations / Object.keys(playerChoices).length);
  
  return {
    isEquilibrium,
    stabilityScore,
    violations: equilibriumViolations,
    totalPlayers: Object.keys(playerChoices).length
  };
}

// Helper functions
function calculateConsistency(reactionTimes) {
  if (!reactionTimes || reactionTimes.length < 2) return 0.5;
  
  const mean = reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length;
  const variance = reactionTimes.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / reactionTimes.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Lower standard deviation = higher consistency
  return Math.max(0, 1 - (standardDeviation / mean));
}

function normalizeScores(scores) {
  const normalized = {};
  for (const [trait, score] of Object.entries(scores)) {
    normalized[trait] = Math.max(0, Math.min(1, score));
  }
  return normalized;
}

// Generate career recommendations
export function generateCareerRecommendations(playerProfile, marketConditions) {
  const careerScores = {};
  
  for (const [career, details] of Object.entries(careerRoles)) {
    // Calculate comprehensive fit score
    const skillFit = calculateSkillFit(playerProfile.skills, career);
    const personalityFit = calculatePersonalityFit(playerProfile.personality, career);
    const marketScore = marketConditions[career]?.demand || 0.5;
    
    // Weight factors for recommendation (different from game payoff)
    const recommendationScore = (
      skillFit * 0.35 +           // Higher weight on personal fit
      personalityFit * 0.35 +     // for recommendations
      marketScore * 0.20 +        // Lower weight on market
      details.growthPotential * 0.10
    );
    
    careerScores[career] = {
      score: recommendationScore,
      skillFit,
      personalityFit,
      marketDemand: marketScore,
      growthPotential: details.growthPotential,
      details
    };
  }
  
  // Sort by score and return top 3
  const sortedCareers = Object.entries(careerScores)
    .sort(([,a], [,b]) => b.score - a.score)
    .slice(0, 3);
  
  return {
    topMatches: sortedCareers,
    analysisDate: new Date().toISOString()
  };
}

// Game state management
export class GameState {
  constructor() {
    this.currentPhase = 'welcome';
    this.roundNumber = 1;
    this.maxRounds = 4;
    this.players = {};
    this.choiceHistory = [];
    this.equilibriumAchieved = false;
    this.currentPlayer = null;
    this.rooms = [];
    this.playerRooms = {};
  }

  setCurrentPlayer(playerId, profile) {
    this.currentPlayer = playerId;
    this.players[playerId] = profile;
    return this.assignPlayerToRoom(playerId);
  }

  assignPlayerToRoom(playerId) {
    let room = this.rooms.find(r => r.players.length < 10);
    if (!room) {
      room = { id: `room${this.rooms.length + 1}`, players: [] };
      this.rooms.push(room);
    }
    room.players.push(playerId);
    this.playerRooms[playerId] = room.id;
    return room.id;
  }

  advancePhase() {
    const phaseOrder = ['welcome', 'assessment', 'career_selection', 'equilibrium', 'reflection'];
    const currentIndex = phaseOrder.indexOf(this.currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      this.currentPhase = phaseOrder[currentIndex + 1];
      return true;
    }
    return false;
  }

  advanceRound() {
    if (this.roundNumber < this.maxRounds) {
      this.roundNumber++;
      return true;
    }
    return false;
  }

  addChoiceRound(choices) {
    this.choiceHistory.push({ ...choices });
  }

  checkEquilibriumConditions() {
    if (this.currentPhase === 'career_selection' && this.choiceHistory.length >= 2) {
      const equilibriumData = detectNashEquilibrium(
        this.choiceHistory[this.choiceHistory.length - 1],
        this.players
      );
      
      if (equilibriumData.isEquilibrium || this.roundNumber >= this.maxRounds) {
        this.equilibriumAchieved = true;
        return true;
      }
    }
    return false;
  }
}

