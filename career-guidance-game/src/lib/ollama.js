export async function generateCreativeChallenges(previous = []) {
  const avoid = previous.length
    ? ` Avoid these problems: ${previous.join(' | ')}.`
    : ''
  const prompt = `Generate 3 concise creative problem-solving challenges as a JSON array. Each item should have "problem" and "timeLimit" in seconds.${avoid} Return only valid JSON.`

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-oss-20b',
        prompt,
        stream: false
      })
    })
    const data = await res.json()
    return JSON.parse(data.response)
  } catch (err) {
    console.error('Failed to fetch creative challenges', err)
    throw err
  }
}

export async function generateReactionTargets(previous = []) {
  const avoid = previous.length ? ` Exclude these: ${previous.join(' ')}.` : ''
  const prompt = `Generate 5 distinct emoji characters to use as target symbols in a reaction time game.${avoid} Return them as a JSON array of strings.`

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-oss-20b',
        prompt,
        stream: false
      })
    })
    const data = await res.json()
    return JSON.parse(data.response)
  } catch (err) {
    console.error('Failed to fetch reaction targets', err)
    throw err
  }
}

export async function generatePatternQuestions(previous = []) {
  const avoid = previous.length
    ? ` Avoid these sequences: ${previous.join(' | ')}.`
    : ''
  const prompt = `Generate 5 numeric pattern recognition questions as a JSON array. Each item should have "sequence" (array of numbers), "answer" (number), and "options" (array of 4 numbers including the answer).${avoid} Return only valid JSON.`

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-oss-20b',
        prompt,
        stream: false
      })
    })
    const data = await res.json()
    return JSON.parse(data.response)
  } catch (err) {
    console.error('Failed to fetch pattern questions', err)
    throw err
  }
}

export async function evaluateSolutions(problem, solutions) {
  const prompt = `You are evaluating answers to a creative challenge. Problem: "${problem}". Solutions: ${JSON.stringify(solutions)}. Rate the overall relevance and quality of these solutions on a 0 to 1 scale and respond with JSON {"relevance": number, "quality": number}.`

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-oss-20b',
        prompt,
        stream: false
      })
    })
    const data = await res.json()
    return JSON.parse(data.response)
  } catch (err) {
    console.error('Failed to evaluate solutions', err)
    return { relevance: 0, quality: 0 }
  }
}
