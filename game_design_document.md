# Career Guidance Game: Detailed Design Document

## Executive Summary

This document presents a comprehensive design for an innovative career guidance game that combines personality assessment, strategic decision-making, and Nash Equilibrium principles. The game helps students make informed career choices by simulating real-world market dynamics and peer interactions while teaching fundamental game theory concepts.

## Game Overview

### Core Concept
Students participate in a multi-phase game where they:
1. Complete personality and skills assessments through engaging mini-games
2. Make strategic career choices considering market dynamics and peer decisions
3. Experience Nash Equilibrium as both a learning objective and natural game conclusion
4. Receive personalized career guidance based on their performance and preferences

### Educational Objectives
- **Self-Awareness**: Understanding personal strengths, preferences, and work styles
- **Market Literacy**: Comprehending supply/demand dynamics in career markets
- **Strategic Thinking**: Considering others' choices when making personal decisions
- **Game Theory Concepts**: Experiencing Nash Equilibrium and iterative dominance
- **Career Planning**: Connecting theoretical insights to practical career development

## Phase 1: Personality & Skills Assessment

### Assessment Framework
Based on research findings, we implement a hybrid approach combining Big Five personality traits with practical skill assessments:

#### Big Five Personality Dimensions
1. **Openness to Experience**: Creativity, curiosity, intellectual engagement
2. **Conscientiousness**: Organization, persistence, goal-directed behavior
3. **Extraversion**: Social energy, assertiveness, positive emotions
4. **Agreeableness**: Cooperation, trust, empathy
5. **Neuroticism**: Emotional stability, stress management

#### Skill Assessment Categories
1. **Analytical Skills**: Problem-solving, logical reasoning, data interpretation
2. **Creative Skills**: Innovation, artistic ability, design thinking
3. **Social Skills**: Communication, leadership, teamwork
4. **Technical Skills**: Digital literacy, quantitative abilities, tool proficiency
5. **Practical Skills**: Manual dexterity, spatial reasoning, mechanical aptitude

### Mini-Game Implementations

#### 1. Reaction Time Challenge
**Purpose**: Measure processing speed and attention to detail
**Mechanics**: 
- Shapes appear randomly on screen
- Players click when specific target shape appears
- Measures: Reaction time, accuracy, consistency
**Personality Indicators**: 
- Fast, accurate responses → High conscientiousness
- Consistent performance → Low neuroticism
- Pattern seeking → High openness

#### 2. Pattern Recognition Puzzle
**Purpose**: Assess analytical thinking and pattern detection
**Mechanics**:
- Present sequences of numbers, shapes, or colors
- Player identifies next element in sequence
- Progressive difficulty levels
**Personality Indicators**:
- Complex pattern recognition → High openness
- Systematic approach → High conscientiousness
- Quick intuitive responses → High extraversion

#### 3. Resource Allocation Simulation
**Purpose**: Evaluate risk tolerance and strategic thinking
**Mechanics**:
- Manage limited resources across multiple projects
- Balance risk vs. reward scenarios
- Time pressure elements
**Personality Indicators**:
- Conservative allocation → Low openness, high conscientiousness
- Aggressive risk-taking → High extraversion, low neuroticism
- Balanced approach → High agreeableness

#### 4. Social Scenario Navigation
**Purpose**: Assess interpersonal skills and emotional intelligence
**Mechanics**:
- Present workplace conflict scenarios
- Multiple choice responses with different approaches
- Branching narratives based on choices
**Personality Indicators**:
- Collaborative solutions → High agreeableness
- Direct confrontation → High extraversion, low agreeableness
- Avoidance strategies → High neuroticism

#### 5. Creative Problem Solving
**Purpose**: Measure innovation and creative thinking
**Mechanics**:
- Open-ended challenges with multiple solutions
- Time-limited brainstorming sessions
- Unusual uses for common objects
**Personality Indicators**:
- Novel solutions → High openness
- Practical applications → High conscientiousness
- Multiple ideas → High extraversion

### Scoring Algorithm

#### Behavioral Analysis Metrics
```python
def calculate_personality_scores(player_data):
    scores = {
        'openness': 0,
        'conscientiousness': 0,
        'extraversion': 0,
        'agreeableness': 0,
        'neuroticism': 0
    }
    
    # Reaction Time Analysis
    reaction_consistency = calculate_consistency(player_data['reaction_times'])
    scores['neuroticism'] += (1 - reaction_consistency) * 0.3
    scores['conscientiousness'] += reaction_consistency * 0.2
    
    # Pattern Recognition Analysis
    pattern_complexity = analyze_pattern_preferences(player_data['patterns'])
    scores['openness'] += pattern_complexity * 0.4
    
    # Resource Allocation Analysis
    risk_tolerance = calculate_risk_tolerance(player_data['allocations'])
    scores['openness'] += risk_tolerance * 0.3
    scores['neuroticism'] += (1 - risk_tolerance) * 0.2
    
    # Social Scenario Analysis
    cooperation_score = analyze_social_choices(player_data['social_responses'])
    scores['agreeableness'] += cooperation_score * 0.5
    scores['extraversion'] += calculate_assertiveness(player_data['social_responses']) * 0.3
    
    # Creative Problem Solving Analysis
    creativity_score = evaluate_creativity(player_data['creative_solutions'])
    scores['openness'] += creativity_score * 0.3
    
    # Normalize scores to 0-1 range
    return normalize_scores(scores)
```

#### Skill Assessment Integration
```python
def assess_skills(personality_scores, mini_game_performance):
    skills = {
        'analytical': 0,
        'creative': 0,
        'social': 0,
        'technical': 0,
        'practical': 0
    }
    
    # Combine personality traits with performance data
    skills['analytical'] = (
        personality_scores['conscientiousness'] * 0.4 +
        mini_game_performance['pattern_recognition'] * 0.6
    )
    
    skills['creative'] = (
        personality_scores['openness'] * 0.5 +
        mini_game_performance['creative_problem_solving'] * 0.5
    )
    
    skills['social'] = (
        personality_scores['extraversion'] * 0.3 +
        personality_scores['agreeableness'] * 0.3 +
        mini_game_performance['social_scenarios'] * 0.4
    )
    
    skills['technical'] = (
        personality_scores['conscientiousness'] * 0.3 +
        mini_game_performance['reaction_time'] * 0.3 +
        mini_game_performance['pattern_recognition'] * 0.4
    )
    
    skills['practical'] = (
        (1 - personality_scores['neuroticism']) * 0.3 +
        mini_game_performance['resource_allocation'] * 0.4 +
        personality_scores['conscientiousness'] * 0.3
    )
    
    return skills
```

## Phase 2: Strategic Career Selection

### Career Role Database

#### Role Categories and Attributes
Each career role includes the following attributes:

```python
career_roles = {
    'software_engineer': {
        'name': 'Software Engineer',
        'category': 'Technology',
        'base_demand': 0.8,
        'base_income': 85000,
        'required_skills': {
            'analytical': 0.8,
            'technical': 0.9,
            'creative': 0.6,
            'social': 0.4,
            'practical': 0.5
        },
        'personality_fit': {
            'openness': 0.7,
            'conscientiousness': 0.8,
            'extraversion': 0.3,
            'agreeableness': 0.5,
            'neuroticism': -0.3
        },
        'market_volatility': 0.2,
        'growth_potential': 0.9,
        'work_life_balance': 0.7
    },
    # Additional roles...
}
```

### Dynamic Market Simulation

#### Market Demand Calculation
```python
def calculate_market_demand(role, player_choices, round_number):
    base_demand = career_roles[role]['base_demand']
    
    # Calculate saturation based on player choices
    total_players = len(player_choices)
    role_choosers = sum(1 for choice in player_choices if choice == role)
    saturation_factor = role_choosers / total_players if total_players > 0 else 0
    
    # Apply saturation penalty
    saturation_penalty = min(saturation_factor * 2, 0.8)  # Max 80% penalty
    
    # Add market volatility
    volatility = career_roles[role]['market_volatility']
    market_fluctuation = random.normal(0, volatility)
    
    # Calculate final demand
    adjusted_demand = base_demand * (1 - saturation_penalty) + market_fluctuation
    
    return max(0.1, min(1.0, adjusted_demand))  # Clamp between 0.1 and 1.0
```

#### Income Prediction Model
```python
def predict_income(role, market_demand, skill_fit, personality_fit):
    base_income = career_roles[role]['base_income']
    
    # Market demand multiplier
    demand_multiplier = 0.5 + (market_demand * 1.5)  # Range: 0.5 to 2.0
    
    # Skill fit bonus
    skill_bonus = 1 + (skill_fit - 0.5)  # Range: 0.5 to 1.5
    
    # Personality fit bonus
    personality_bonus = 1 + (personality_fit - 0.5) * 0.3  # Range: 0.85 to 1.15
    
    predicted_income = base_income * demand_multiplier * skill_bonus * personality_bonus
    
    return round(predicted_income, -3)  # Round to nearest thousand
```

### Payoff Function Design

#### Comprehensive Payoff Calculation
Based on research findings and the original concept, we implement a multi-factor payoff function:

```python
def calculate_payoff(player_id, role_choice, all_choices, player_profiles):
    player_profile = player_profiles[player_id]
    
    # 1. Skill Fit Score (0-1)
    skill_fit = calculate_skill_fit(player_profile['skills'], role_choice)
    
    # 2. Personality Fit Score (0-1)
    personality_fit = calculate_personality_fit(player_profile['personality'], role_choice)
    
    # 3. Market Demand Score (0-1)
    market_demand = calculate_market_demand(role_choice, all_choices, current_round)
    
    # 4. Competition Penalty (0-1)
    competition_level = calculate_competition(role_choice, all_choices)
    
    # 5. Additional Factors
    work_life_balance = career_roles[role_choice]['work_life_balance']
    growth_potential = career_roles[role_choice]['growth_potential']
    
    # Weighted payoff calculation
    payoff = (
        skill_fit * 0.25 +
        personality_fit * 0.20 +
        market_demand * 0.25 +
        (1 - competition_level) * 0.15 +
        work_life_balance * 0.10 +
        growth_potential * 0.05
    )
    
    return payoff
```

#### Skill Fit Calculation
```python
def calculate_skill_fit(player_skills, role):
    required_skills = career_roles[role]['required_skills']
    
    fit_scores = []
    for skill, required_level in required_skills.items():
        player_level = player_skills.get(skill, 0)
        
        # Calculate fit using gaussian function
        # Perfect fit when player_level = required_level
        fit = math.exp(-((player_level - required_level) ** 2) / 0.2)
        fit_scores.append(fit)
    
    return sum(fit_scores) / len(fit_scores)
```

#### Personality Fit Calculation
```python
def calculate_personality_fit(player_personality, role):
    personality_requirements = career_roles[role]['personality_fit']
    
    fit_score = 0
    total_weight = 0
    
    for trait, required_level in personality_requirements.items():
        player_level = player_personality.get(trait, 0)
        weight = abs(required_level)  # Use absolute value as weight
        
        if required_level > 0:
            # Positive requirement: higher is better
            fit = min(player_level / required_level, 1.0) if required_level > 0 else 1.0
        else:
            # Negative requirement: lower is better
            fit = max(1 + required_level - player_level, 0.0)
        
        fit_score += fit * weight
        total_weight += weight
    
    return fit_score / total_weight if total_weight > 0 else 0.5
```

### Nash Equilibrium Detection

#### Equilibrium Criteria
```python
def detect_nash_equilibrium(player_choices, player_profiles, improvement_threshold=0.05):
    """
    Detect if current state represents a Nash Equilibrium
    """
    equilibrium_violations = 0
    
    for player_id, current_choice in player_choices.items():
        current_payoff = calculate_payoff(player_id, current_choice, player_choices, player_profiles)
        
        # Check if player can improve by switching to any other role
        best_alternative_payoff = current_payoff
        best_alternative = current_choice
        
        for alternative_role in career_roles.keys():
            if alternative_role != current_choice:
                # Simulate switching to alternative
                temp_choices = player_choices.copy()
                temp_choices[player_id] = alternative_role
                
                alternative_payoff = calculate_payoff(player_id, alternative_role, temp_choices, player_profiles)
                
                if alternative_payoff > best_alternative_payoff:
                    best_alternative_payoff = alternative_payoff
                    best_alternative = alternative_role
        
        # Check if improvement is significant
        improvement = best_alternative_payoff - current_payoff
        if improvement > improvement_threshold:
            equilibrium_violations += 1
    
    # Nash Equilibrium if no player can significantly improve
    is_equilibrium = equilibrium_violations == 0
    stability_score = 1 - (equilibrium_violations / len(player_choices))
    
    return {
        'is_equilibrium': is_equilibrium,
        'stability_score': stability_score,
        'violations': equilibrium_violations,
        'total_players': len(player_choices)
    }
```

#### Convergence Tracking
```python
def track_convergence(choice_history):
    """
    Track how choices evolve toward equilibrium over multiple rounds
    """
    if len(choice_history) < 2:
        return {'convergence_rate': 0, 'stability_trend': 'unknown'}
    
    # Calculate choice stability across rounds
    stability_scores = []
    for round_idx in range(1, len(choice_history)):
        previous_choices = choice_history[round_idx - 1]
        current_choices = choice_history[round_idx]
        
        # Count unchanged choices
        unchanged = sum(1 for player_id in current_choices 
                       if current_choices[player_id] == previous_choices.get(player_id))
        
        stability = unchanged / len(current_choices)
        stability_scores.append(stability)
    
    # Calculate convergence rate
    if len(stability_scores) >= 2:
        convergence_rate = stability_scores[-1] - stability_scores[0]
    else:
        convergence_rate = 0
    
    # Determine trend
    if len(stability_scores) >= 3:
        recent_trend = stability_scores[-1] - stability_scores[-2]
        if recent_trend > 0.1:
            trend = 'converging'
        elif recent_trend < -0.1:
            trend = 'diverging'
        else:
            trend = 'stable'
    else:
        trend = 'developing'
    
    return {
        'convergence_rate': convergence_rate,
        'stability_trend': trend,
        'current_stability': stability_scores[-1] if stability_scores else 0,
        'stability_history': stability_scores
    }
```


## Phase 3: Nash Equilibrium Highlight

### Educational Presentation

#### Equilibrium Announcement System
```python
def present_equilibrium_achievement(equilibrium_data, choice_history):
    """
    Create educational presentation when Nash Equilibrium is reached
    """
    presentation = {
        'title': 'Congratulations! You\'ve Reached a Nash Equilibrium!',
        'explanation': generate_equilibrium_explanation(equilibrium_data),
        'visualizations': create_equilibrium_visualizations(choice_history),
        'key_insights': extract_learning_insights(choice_history),
        'next_steps': 'reflection_phase'
    }
    
    return presentation

def generate_equilibrium_explanation(equilibrium_data):
    stability_percentage = round(equilibrium_data['stability_score'] * 100)
    
    explanation = f"""
    A Nash Equilibrium occurs when no player can improve their outcome by 
    unilaterally changing their strategy. In your career choice game:
    
    • {stability_percentage}% of players are in their optimal position
    • No one can improve by switching careers alone
    • This represents a stable market distribution
    • Real career markets often reach similar equilibrium states
    
    This demonstrates how individual rational choices lead to collective stability!
    """
    
    return explanation
```

#### Visualization Components

##### 1. Choice Distribution Over Time
```python
def create_choice_evolution_chart(choice_history):
    """
    Generate line chart showing how career choices evolved over rounds
    """
    rounds = list(range(len(choice_history)))
    career_counts = {}
    
    for round_data in choice_history:
        for career in career_roles.keys():
            if career not in career_counts:
                career_counts[career] = []
            
            count = sum(1 for choice in round_data.values() if choice == career)
            career_counts[career].append(count)
    
    return {
        'type': 'line_chart',
        'x_axis': rounds,
        'y_axis': 'Number of Students',
        'title': 'Career Choice Evolution',
        'series': career_counts,
        'annotations': mark_equilibrium_point(choice_history)
    }
```

##### 2. Market Saturation Heatmap
```python
def create_saturation_heatmap(final_choices, player_profiles):
    """
    Generate heatmap showing market saturation vs. demand
    """
    saturation_data = {}
    
    for career in career_roles.keys():
        choosers = sum(1 for choice in final_choices.values() if choice == career)
        total_players = len(final_choices)
        saturation = choosers / total_players if total_players > 0 else 0
        
        market_demand = calculate_market_demand(career, final_choices, final_round=True)
        
        saturation_data[career] = {
            'saturation': saturation,
            'demand': market_demand,
            'balance_score': market_demand - saturation,
            'student_count': choosers
        }
    
    return {
        'type': 'heatmap',
        'data': saturation_data,
        'title': 'Market Balance Analysis',
        'color_scale': 'red_green',  # Red = oversaturated, Green = undersaturated
        'annotations': True
    }
```

##### 3. Individual Payoff Analysis
```python
def create_payoff_breakdown(player_id, final_choices, player_profiles):
    """
    Show detailed breakdown of individual player's payoff components
    """
    player_choice = final_choices[player_id]
    
    components = {
        'skill_fit': calculate_skill_fit(player_profiles[player_id]['skills'], player_choice),
        'personality_fit': calculate_personality_fit(player_profiles[player_id]['personality'], player_choice),
        'market_demand': calculate_market_demand(player_choice, final_choices, final_round=True),
        'competition_level': calculate_competition(player_choice, final_choices),
        'work_life_balance': career_roles[player_choice]['work_life_balance'],
        'growth_potential': career_roles[player_choice]['growth_potential']
    }
    
    total_payoff = calculate_payoff(player_id, player_choice, final_choices, player_profiles)
    
    return {
        'type': 'radar_chart',
        'components': components,
        'total_score': total_payoff,
        'title': f'Your Career Fit Analysis: {career_roles[player_choice]["name"]}',
        'recommendations': generate_improvement_suggestions(components)
    }
```

## Phase 4: Reflection and Guidance

### Personalized Career Recommendations

#### Top 3 Career Matches Algorithm
```python
def generate_top_career_matches(player_profile, market_conditions):
    """
    Generate top 3 career recommendations based on comprehensive analysis
    """
    career_scores = {}
    
    for career, details in career_roles.items():
        # Calculate comprehensive fit score
        skill_fit = calculate_skill_fit(player_profile['skills'], career)
        personality_fit = calculate_personality_fit(player_profile['personality'], career)
        market_score = market_conditions.get(career, {}).get('demand', 0.5)
        
        # Weight factors for recommendation (different from game payoff)
        recommendation_score = (
            skill_fit * 0.35 +           # Higher weight on personal fit
            personality_fit * 0.35 +     # for recommendations
            market_score * 0.20 +        # Lower weight on market
            details['growth_potential'] * 0.10
        )
        
        career_scores[career] = {
            'score': recommendation_score,
            'skill_fit': skill_fit,
            'personality_fit': personality_fit,
            'market_demand': market_score,
            'growth_potential': details['growth_potential'],
            'predicted_income': predict_income(career, market_score, skill_fit, personality_fit)
        }
    
    # Sort by score and return top 3
    sorted_careers = sorted(career_scores.items(), key=lambda x: x[1]['score'], reverse=True)
    
    return {
        'top_matches': sorted_careers[:3],
        'analysis_date': datetime.now().isoformat(),
        'confidence_level': calculate_recommendation_confidence(sorted_careers[:3])
    }
```

#### Market Insights Generation
```python
def generate_market_insights(final_choices, choice_history):
    """
    Provide insights about market dynamics and opportunities
    """
    insights = {
        'oversaturated_markets': [],
        'emerging_opportunities': [],
        'stable_markets': [],
        'volatile_markets': []
    }
    
    for career in career_roles.keys():
        # Calculate market metrics
        final_saturation = calculate_saturation(career, final_choices)
        demand_trend = calculate_demand_trend(career, choice_history)
        volatility = calculate_market_volatility(career, choice_history)
        
        # Categorize markets
        if final_saturation > 0.3:  # More than 30% of students
            insights['oversaturated_markets'].append({
                'career': career,
                'saturation': final_saturation,
                'recommendation': 'Consider specialization or related fields'
            })
        elif final_saturation < 0.1 and demand_trend > 0:  # Less than 10% but growing
            insights['emerging_opportunities'].append({
                'career': career,
                'saturation': final_saturation,
                'growth_rate': demand_trend,
                'recommendation': 'Strong opportunity for early entrants'
            })
        elif volatility < 0.1:  # Low volatility
            insights['stable_markets'].append({
                'career': career,
                'stability_score': 1 - volatility,
                'recommendation': 'Reliable long-term choice'
            })
        elif volatility > 0.3:  # High volatility
            insights['volatile_markets'].append({
                'career': career,
                'volatility_score': volatility,
                'recommendation': 'Monitor market trends carefully'
            })
    
    return insights
```

#### Resource Recommendation Engine
```python
def recommend_development_resources(player_profile, career_matches):
    """
    Suggest specific courses, internships, and skills to develop
    """
    recommendations = {
        'immediate_actions': [],
        'skill_development': [],
        'experience_opportunities': [],
        'networking_suggestions': []
    }
    
    for match in career_matches['top_matches']:
        career = match[0]
        fit_data = match[1]
        
        # Identify skill gaps
        skill_gaps = identify_skill_gaps(player_profile['skills'], career)
        
        # Generate specific recommendations
        for skill, gap_size in skill_gaps.items():
            if gap_size > 0.2:  # Significant gap
                resources = get_skill_development_resources(skill, career)
                recommendations['skill_development'].extend(resources)
        
        # Suggest relevant experiences
        experience_recs = get_experience_recommendations(career, player_profile)
        recommendations['experience_opportunities'].extend(experience_recs)
        
        # Networking suggestions
        networking_recs = get_networking_suggestions(career)
        recommendations['networking_suggestions'].extend(networking_recs)
    
    # Remove duplicates and prioritize
    for category in recommendations:
        recommendations[category] = prioritize_and_deduplicate(recommendations[category])
    
    return recommendations
```

## User Interface Design

### Design Principles

#### 1. Progressive Disclosure
- Start with simple concepts and gradually introduce complexity
- Hide advanced features until players are ready
- Provide optional deep-dive explanations for interested users

#### 2. Visual Clarity
- Clean, uncluttered interface focusing on core decisions
- Consistent color coding for different game phases
- Clear visual hierarchy with appropriate typography

#### 3. Immediate Feedback
- Real-time updates of market conditions
- Visual confirmation of player choices
- Progress indicators throughout the game

#### 4. Accessibility
- Support for screen readers and keyboard navigation
- High contrast mode for visual impairments
- Multiple language support

### Interface Components

#### Main Game Dashboard
```html
<div class="game-dashboard">
    <header class="game-header">
        <div class="phase-indicator">
            <span class="phase active">Assessment</span>
            <span class="phase">Career Selection</span>
            <span class="phase">Equilibrium</span>
            <span class="phase">Reflection</span>
        </div>
        <div class="player-info">
            <span class="player-name">Player Name</span>
            <span class="round-counter">Round 1 of 4</span>
        </div>
    </header>
    
    <main class="game-content">
        <!-- Dynamic content based on current phase -->
    </main>
    
    <aside class="game-sidebar">
        <div class="market-overview">
            <h3>Market Conditions</h3>
            <!-- Real-time market data -->
        </div>
        <div class="peer-activity">
            <h3>Peer Choices</h3>
            <!-- Anonymized peer choice data -->
        </div>
    </aside>
</div>
```

#### Career Selection Interface
```html
<div class="career-selection">
    <div class="career-grid">
        <div class="career-card" data-career="software_engineer">
            <div class="career-header">
                <h3>Software Engineer</h3>
                <span class="category">Technology</span>
            </div>
            <div class="career-metrics">
                <div class="metric">
                    <label>Market Demand</label>
                    <div class="meter">
                        <div class="fill" style="width: 80%"></div>
                    </div>
                    <span class="value">High</span>
                </div>
                <div class="metric">
                    <label>Competition</label>
                    <div class="meter">
                        <div class="fill warning" style="width: 60%"></div>
                    </div>
                    <span class="value">Medium</span>
                </div>
                <div class="metric">
                    <label>Your Fit</label>
                    <div class="meter">
                        <div class="fill success" style="width: 85%"></div>
                    </div>
                    <span class="value">Excellent</span>
                </div>
            </div>
            <div class="career-details">
                <p class="income">Expected Income: $85,000</p>
                <p class="growth">Growth Potential: High</p>
                <button class="select-career">Select This Career</button>
            </div>
        </div>
        <!-- Additional career cards... -->
    </div>
</div>
```

#### Equilibrium Visualization
```html
<div class="equilibrium-display">
    <div class="achievement-banner">
        <h2>🎉 Nash Equilibrium Achieved!</h2>
        <p>The market has reached a stable state where no one wants to change careers.</p>
    </div>
    
    <div class="visualization-container">
        <div class="chart-section">
            <h3>Career Distribution Over Time</h3>
            <canvas id="evolution-chart"></canvas>
        </div>
        <div class="chart-section">
            <h3>Market Balance Analysis</h3>
            <canvas id="saturation-heatmap"></canvas>
        </div>
    </div>
    
    <div class="insights-panel">
        <h3>Key Insights</h3>
        <ul class="insight-list">
            <li>Technology careers reached 35% saturation</li>
            <li>Healthcare showed emerging opportunities</li>
            <li>Creative fields remained stable throughout</li>
        </ul>
    </div>
</div>
```

## Game Flow and State Management

### State Machine Design
```python
class GameState:
    def __init__(self):
        self.current_phase = 'assessment'
        self.round_number = 1
        self.max_rounds = 4
        self.players = {}
        self.choice_history = []
        self.equilibrium_achieved = False
        
    def advance_phase(self):
        phase_order = ['assessment', 'career_selection', 'equilibrium', 'reflection']
        current_index = phase_order.index(self.current_phase)
        
        if current_index < len(phase_order) - 1:
            self.current_phase = phase_order[current_index + 1]
            return True
        return False
    
    def advance_round(self):
        if self.round_number < self.max_rounds:
            self.round_number += 1
            return True
        return False
    
    def check_equilibrium_conditions(self):
        if self.current_phase == 'career_selection' and len(self.choice_history) >= 2:
            equilibrium_data = detect_nash_equilibrium(
                self.choice_history[-1], 
                self.players
            )
            
            if equilibrium_data['is_equilibrium'] or self.round_number >= self.max_rounds:
                self.equilibrium_achieved = True
                return True
        return False
```

### Data Persistence Strategy
```python
class GameDataManager:
    def __init__(self, database_connection):
        self.db = database_connection
    
    def save_player_profile(self, player_id, profile_data):
        """Save personality and skill assessment results"""
        query = """
        INSERT INTO player_profiles (player_id, personality_scores, skill_scores, assessment_date)
        VALUES (?, ?, ?, ?)
        """
        self.db.execute(query, (
            player_id,
            json.dumps(profile_data['personality']),
            json.dumps(profile_data['skills']),
            datetime.now().isoformat()
        ))
    
    def save_choice_data(self, game_session_id, round_number, choices):
        """Save career choices for each round"""
        for player_id, choice in choices.items():
            query = """
            INSERT INTO choice_history (game_session_id, player_id, round_number, career_choice, timestamp)
            VALUES (?, ?, ?, ?, ?)
            """
            self.db.execute(query, (
                game_session_id,
                player_id,
                round_number,
                choice,
                datetime.now().isoformat()
            ))
    
    def save_equilibrium_data(self, game_session_id, equilibrium_results):
        """Save Nash equilibrium analysis results"""
        query = """
        INSERT INTO equilibrium_results (game_session_id, stability_score, rounds_to_equilibrium, final_distribution)
        VALUES (?, ?, ?, ?)
        """
        self.db.execute(query, (
            game_session_id,
            equilibrium_results['stability_score'],
            equilibrium_results['rounds_to_equilibrium'],
            json.dumps(equilibrium_results['final_distribution'])
        ))
```

## Technical Implementation Architecture

### System Components

#### 1. Frontend (React.js)
- **Component Structure**: Modular components for each game phase
- **State Management**: Redux for complex state management
- **Real-time Updates**: WebSocket connection for live market data
- **Visualization**: D3.js for interactive charts and graphs

#### 2. Backend (Flask/Python)
- **API Endpoints**: RESTful API for game operations
- **Game Logic**: Core algorithms for payoff calculation and equilibrium detection
- **Database**: PostgreSQL for persistent data storage
- **Real-time Communication**: Socket.IO for live updates

#### 3. Database Schema
```sql
-- Player profiles table
CREATE TABLE player_profiles (
    player_id VARCHAR(50) PRIMARY KEY,
    personality_scores JSON,
    skill_scores JSON,
    assessment_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Game sessions table
CREATE TABLE game_sessions (
    session_id VARCHAR(50) PRIMARY KEY,
    session_name VARCHAR(100),
    max_players INTEGER,
    current_phase VARCHAR(20),
    current_round INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Choice history table
CREATE TABLE choice_history (
    id SERIAL PRIMARY KEY,
    game_session_id VARCHAR(50),
    player_id VARCHAR(50),
    round_number INTEGER,
    career_choice VARCHAR(50),
    payoff_score DECIMAL(5,3),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_session_id) REFERENCES game_sessions(session_id),
    FOREIGN KEY (player_id) REFERENCES player_profiles(player_id)
);

-- Equilibrium results table
CREATE TABLE equilibrium_results (
    id SERIAL PRIMARY KEY,
    game_session_id VARCHAR(50),
    stability_score DECIMAL(5,3),
    rounds_to_equilibrium INTEGER,
    final_distribution JSON,
    insights JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_session_id) REFERENCES game_sessions(session_id)
);
```

#### 4. API Endpoints
```python
# Flask API routes
@app.route('/api/assessment/start', methods=['POST'])
def start_assessment():
    """Initialize personality and skills assessment"""
    pass

@app.route('/api/assessment/submit', methods=['POST'])
def submit_assessment():
    """Process assessment results and generate profile"""
    pass

@app.route('/api/game/join', methods=['POST'])
def join_game():
    """Add player to game session"""
    pass

@app.route('/api/game/choose-career', methods=['POST'])
def choose_career():
    """Submit career choice for current round"""
    pass

@app.route('/api/game/market-data', methods=['GET'])
def get_market_data():
    """Get current market conditions and peer choices"""
    pass

@app.route('/api/game/equilibrium-check', methods=['GET'])
def check_equilibrium():
    """Check if Nash equilibrium has been reached"""
    pass

@app.route('/api/recommendations/generate', methods=['POST'])
def generate_recommendations():
    """Generate personalized career recommendations"""
    pass
```

This comprehensive design document provides the foundation for implementing a sophisticated career guidance game that successfully combines educational objectives with engaging gameplay mechanics.

