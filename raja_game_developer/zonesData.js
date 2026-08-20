/**
 * Zone & Quest Definitions for ProbQuest
 * Covers 15 syllabus topics across Unit I (Discrete) & Unit II (Continuous)
 */

export const ZONES = [
  // --- UNIT I: Discrete Random Variables ---
  {
    id: 'z1',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Treasure Chest Odds',
    concept: 'Basic Probability & Sample Space',
    icon: 'Chest',
    mechanicTitle: 'Treasure Chest Draw',
    mechanicDesc: 'Predict item draw frequencies from legendary vs common chests. Run Monte Carlo draws to observe relative frequency converge to theoretical probability P(E) = n(E)/n(S).',
    badgeName: 'Fortune Seeker',
    badgeIcon: 'Sparkles',
    xpReward: 150,
    formula: 'P(A) = \\frac{|A|}{|S|}, \\quad 0 \\le P(A) \\le 1',
    explainer: {
      headline: 'Understanding Sample Spaces & Basic Probability',
      body: 'Probability quantifies the likelihood of an outcome. The sample space S is the set of all possible outcomes. The probability of event A is the ratio of favorable outcomes |A| to total outcomes |S|. As trial count grows large (Law of Large Numbers), empirical relative frequency approaches true theoretical probability.',
      example: 'In a chest with 3 Gold Coins and 7 Silver Coins, P(Gold) = 3 / (3 + 7) = 0.30 (or 30%).'
    },
    defaultParams: { gold: 3, silver: 7, draws: 100 },
    quiz: [
      {
        question: 'A chest contains 4 Emeralds, 6 Rubies, and 10 Diamonds. What is the theoretical probability of drawing an Emerald on a single pick?',
        options: ['0.20 (20%)', '0.30 (30%)', '0.40 (40%)', '0.50 (50%)'],
        correct: 0,
        explanation: 'Total items |S| = 4 + 6 + 10 = 20. Favorable outcomes |Emerald| = 4. P(Emerald) = 4/20 = 0.20.'
      },
      {
        question: 'If you draw an item from a fair 52-card deck, what is P(Drawing an Ace or a King)?',
        options: ['2/52', '4/52', '8/52 (2/13)', '16/52'],
        correct: 2,
        explanation: 'There are 4 Aces and 4 Kings in a deck. Favorable outcomes = 8. P(Ace or King) = 8/52 = 2/13 ~ 15.38%.'
      },
      {
        question: 'Which principle states that as the number of random trials increases, the empirical relative frequency converges to the theoretical probability?',
        options: ['Bayes Theorem', 'Law of Large Numbers', 'Central Limit Theorem', 'Chebyshev Inequality'],
        correct: 1,
        explanation: 'The Law of Large Numbers (LLN) guarantees that sample averages approach expected values as sample size grows.'
      },
      {
        question: 'If P(A) = 0.35, what is the probability of the complement event P(A\')?',
        options: ['0.35', '0.65', '1.35', '0.00'],
        correct: 1,
        explanation: 'P(A\') = 1 - P(A) = 1 - 0.35 = 0.65.'
      },
      {
        question: 'In a roll of two fair 6-sided dice, how many total outcomes are in the sample space S?',
        options: ['12', '36', '18', '24'],
        correct: 1,
        explanation: 'Each die has 6 outcomes. Total outcomes |S| = 6 × 6 = 36.'
      }
    ]
  },
  {
    id: 'z2',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Detective Board',
    concept: 'Conditional Probability P(A|B)',
    icon: 'Search',
    mechanicTitle: 'Evidence Filtering',
    mechanicDesc: 'Filter suspect profiles by discovered clues (e.g. left-handed, wearing boots). Recalculate suspect probability given evidence P(A|B) = P(A ∩ B) / P(B).',
    badgeName: 'Master Sleuth',
    badgeIcon: 'ShieldAlert',
    xpReward: 200,
    formula: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0',
    explainer: {
      headline: 'Shrinking the Sample Space with Evidence',
      body: 'Conditional probability P(A|B) measures the probability of event A given that event B has already occurred. Event B acts as a new restricted sample space.',
      example: 'Out of 20 suspects, 8 are wearing boots. 2 of those 8 are guilty. Given a suspect wears boots (B), P(Guilty|Boots) = 2 / 8 = 0.25.'
    },
    defaultParams: { totalSuspects: 20, bootsCount: 8, guiltyWithBoots: 2 },
    quiz: [
      {
        question: 'Given P(A ∩ B) = 0.12 and P(B) = 0.40, calculate P(A|B).',
        options: ['0.30', '0.48', '0.28', '0.12'],
        correct: 0,
        explanation: 'P(A|B) = P(A ∩ B) / P(B) = 0.12 / 0.40 = 0.30.'
      },
      {
        question: 'In a class of 100 students, 60 take Math, 40 take Physics, and 25 take both. If a randomly chosen student takes Physics, what is the probability they also take Math?',
        options: ['0.25', '0.625 (25/40)', '0.416 (25/60)', '0.50'],
        correct: 1,
        explanation: 'P(Math|Physics) = P(Math ∩ Physics) / P(Physics) = 25 / 40 = 0.625.'
      },
      {
        question: 'If events A and B are mutually exclusive (cannot occur together), what is P(A|B) assuming P(B) > 0?',
        options: ['1.0', '0.5', '0.0', 'P(A)'],
        correct: 2,
        explanation: 'For mutually exclusive events, P(A ∩ B) = 0, so P(A|B) = 0 / P(B) = 0.'
      },
      {
        question: 'The multiplication rule for conditional probability states that P(A ∩ B) equals:',
        options: ['P(A) + P(B)', 'P(A|B) × P(B)', 'P(A) / P(B)', 'P(A|B) + P(B|A)'],
        correct: 1,
        explanation: 'P(A ∩ B) = P(A|B) × P(B) = P(B|A) × P(A).'
      },
      {
        question: 'If P(B) = 0.5 and P(A ∩ B) = 0.35, what percentage of condition B outcomes fall into event A?',
        options: ['35%', '50%', '70%', '85%'],
        correct: 2,
        explanation: 'P(A|B) = 0.35 / 0.50 = 0.70 = 70%.'
      }
    ]
  },
  {
    id: 'z3',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Two Dice Duel',
    concept: 'Event Independence',
    icon: 'Dices',
    mechanicTitle: 'Independence Tester',
    mechanicDesc: 'Simulate pairs of events (e.g. Die 1 is even, Sum is 7). Test if P(A ∩ B) = P(A) × P(B) to determine if event outcomes are independent.',
    badgeName: 'Dichotomy Master',
    badgeIcon: 'Zap',
    xpReward: 200,
    formula: 'P(A \\cap B) = P(A) \\cdot P(B) \\iff A \\text{ and } B \\text{ are independent}',
    explainer: {
      headline: 'Testing Independence vs Dependence',
      body: 'Two events A and B are independent if the occurrence of B gives zero additional information about the occurrence of A. Mathematically, P(A|B) = P(A), which implies P(A ∩ B) = P(A) × P(B).',
      example: 'Rolling Die 1 = 4 (P = 1/6) and Rolling Die 2 = 5 (P = 1/6). Joint P = 1/36 = (1/6)*(1/6). Independent!'
    },
    defaultParams: { trials: 1000 },
    quiz: [
      {
        question: 'Event A has P(A) = 0.4 and Event B has P(B) = 0.5. If A and B are independent, what is P(A ∩ B)?',
        options: ['0.90', '0.20', '0.10', '0.45'],
        correct: 1,
        explanation: 'For independent events, P(A ∩ B) = P(A) × P(B) = 0.4 × 0.5 = 0.20.'
      },
      {
        question: 'If P(A) = 0.3, P(B) = 0.6, and P(A ∩ B) = 0.18, are events A and B independent?',
        options: ['Yes, because 0.3 × 0.6 = 0.18', 'No, because P(A ∩ B) > 0', 'Impossible to tell', 'Only if A and B are mutually exclusive'],
        correct: 0,
        explanation: 'P(A) × P(B) = 0.3 × 0.6 = 0.18 = P(A ∩ B), fulfilling the independence condition.'
      },
      {
        question: 'Which statement is TRUE regarding mutual exclusivity and independence for non-zero probability events?',
        options: ['Mutually exclusive events are always independent', 'Mutually exclusive events can NEVER be independent', 'They mean the exact same thing', 'Independence implies P(A ∩ B) = 0'],
        correct: 1,
        explanation: 'If A & B are mutually exclusive, P(A ∩ B) = 0. But P(A)P(B) > 0, so 0 ≠ P(A)P(B). Thus they cannot be independent.'
      },
      {
        question: 'Flipping a fair coin 3 times: Event A = "1st flip is Heads", Event B = "2nd flip is Tails". Are A and B independent?',
        options: ['Independent', 'Dependent', 'Conditionally Dependent', 'Mutually Exclusive'],
        correct: 0,
        explanation: 'Coin flips have no memory; the outcome of flip 1 does not affect flip 2.'
      },
      {
        question: 'If P(A|B) = P(A), then P(B|A) is equal to:',
        options: ['1 - P(A)', 'P(B)', 'P(A) × P(B)', '0'],
        correct: 1,
        explanation: 'Independence is symmetrical: P(A|B) = P(A) implies P(B|A) = P(B).'
      }
    ]
  },
  {
    id: 'z4',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Medical Diagnosis Lab',
    concept: "Bayes' Theorem",
    icon: 'Activity',
    mechanicTitle: 'False-Positive Belief Updater',
    mechanicDesc: 'Simulate a medical screening. Adjust disease prevalence (prior), test sensitivity, and false positive rate to see how dramatic positive test results update belief P(Disease | +Test).',
    badgeName: 'Bayesian Tactician',
    badgeIcon: 'BrainCircuit',
    xpReward: 250,
    formula: 'P(A|B) = \\frac{P(B|A)P(A)}{P(B|A)P(A) + P(B|A\')(1 - P(A))}',
    explainer: {
      headline: 'Updating Prior Beliefs with New Data',
      body: "Bayes' Theorem updates the probability of a hypothesis A given evidence B. Even with a 99% accurate test, if a disease is extremely rare (low prior P(A)), most positive results will still be false positives!",
      example: 'Disease prevalence = 1%, Test accuracy = 95%, False Positive = 5%. P(Disease|+ Test) ≈ 16.1%!'
    },
    defaultParams: { prior: 0.01, sensitivity: 0.95, falsePositive: 0.05 },
    quiz: [
      {
        question: 'A rare condition affects 1 in 1,000 people (0.1%). A test is 99% sensitive and has a 5% false positive rate. If a person tests positive, what is the approximate P(Disease|+ Test)?',
        options: ['99%', '50%', '1.9%', '94.1%'],
        correct: 2,
        explanation: 'P(Disease) = 0.001, P(+|D) = 0.99, P(+|~D) = 0.05. Numerator = 0.99×0.001 = 0.00099. Denominator = 0.00099 + 0.05×0.999 = 0.05094. P = 0.00099 / 0.05094 ≈ 0.0194 (1.9%).'
      },
      {
        question: 'In Bayes\' Theorem, P(A) is known as the _____, and P(A|B) is the _____.',
        options: ['Posterior; Prior', 'Prior; Posterior', 'Likelihood; Evidence', 'Marginal; Conditional'],
        correct: 1,
        explanation: 'P(A) is the prior belief before seeing evidence. P(A|B) is the updated posterior probability.'
      },
      {
        question: 'What happens to the posterior probability P(A|B) as the prior probability P(A) increases?',
        options: ['It decreases', 'It stays unchanged', 'It increases', 'It drops to zero'],
        correct: 2,
        explanation: 'A higher initial prior P(A) directly boosts the numerator in Bayes\' formula, raising the posterior probability.'
      },
      {
        question: 'Test Sensitivity measures:',
        options: ['P(Positive Test | Disease Present)', 'P(Disease Present | Positive Test)', 'P(Negative Test | No Disease)', 'P(False Positive)'],
        correct: 0,
        explanation: 'Sensitivity is the True Positive rate: the probability that the test is positive given the subject actually has the disease.'
      },
      {
        question: 'If a test has 100% Specificity, what is its False Positive Rate P(+Test | No Disease)?',
        options: ['100%', '50%', '0%', 'Depends on prevalence'],
        correct: 2,
        explanation: 'Specificity = 1 - False Positive Rate. 100% Specificity means 0% False Positives.'
      }
    ]
  },
  {
    id: 'z5',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Loot Table Builder',
    concept: 'Discrete Random Variables, PMF & CDF',
    icon: 'PackageCheck',
    mechanicTitle: 'Loot Rarity Probability Plotter',
    mechanicDesc: 'Assign probabilities to discrete loot item rarities (Common, Rare, Epic, Legendary). Watch the Probability Mass Function (PMF) and Cumulative Distribution Function (CDF) update in real time.',
    badgeName: 'Rarity Architect',
    badgeIcon: 'BarChart3',
    xpReward: 200,
    formula: 'F(x) = P(X \\le x) = \\sum_{x_i \\le x} p(x_i), \\quad \\sum p(x_i) = 1',
    explainer: {
      headline: 'PMF vs CDF for Discrete Variables',
      body: 'A Discrete Random Variable X takes isolated values. The PMF p(x) gives the exact probability P(X = x). The CDF F(x) gives accumulated probability P(X ≤ x). A valid PMF must sum to 1.0.',
      example: 'For die rolls: PMF p(x) = 1/6 for x ∈ {1..6}. CDF F(3) = P(X ≤ 3) = 3/6 = 0.50.'
    },
    defaultParams: { pCommon: 0.50, pRare: 0.30, pEpic: 0.15, pLegendary: 0.05 },
    quiz: [
      {
        question: 'For a discrete RV X, if PMF values are p(1)=0.2, p(2)=0.5, p(3)=0.3, what is F(2) = P(X ≤ 2)?',
        options: ['0.2', '0.5', '0.7', '1.0'],
        correct: 2,
        explanation: 'F(2) = p(1) + p(2) = 0.2 + 0.5 = 0.7.'
      },
      {
        question: 'Which of the following is a REQUIRED property of any valid Probability Mass Function p(x)?',
        options: ['p(x) can be negative', '∑ p(x) = 1 and 0 ≤ p(x) ≤ 1 for all x', 'p(x) must be continuous', 'F(x) decreases as x increases'],
        correct: 1,
        explanation: 'All probabilities must be non-negative and sum to exactly 1 over the full sample space.'
      },
      {
        question: 'The Cumulative Distribution Function F(x) of a discrete random variable is always:',
        options: ['Decreasing step function', 'Non-decreasing step function', 'Linear smooth curve', 'Bell-shaped curve'],
        correct: 1,
        explanation: 'CDF accumulates probability, so F(x) stays constant or jumps upward at discrete values of x.'
      },
      {
        question: 'Given F(3) = 0.65 and F(4) = 0.85, what is p(4) = P(X = 4)?',
        options: ['0.20', '0.65', '0.85', '1.50'],
        correct: 0,
        explanation: 'p(4) = F(4) - F(3) = 0.85 - 0.65 = 0.20.'
      },
      {
        question: 'As x approaches +∞, what value does the CDF F(x) approach?',
        options: ['0', '0.5', '1.0', 'Infinity'],
        correct: 2,
        explanation: 'CDF accumulates total probability across all outcomes, reaching a maximum of 1.0.'
      }
    ]
  },
  {
    id: 'z6',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Fair Game or Not?',
    concept: 'Expected Value E[X] & Variance Var(X)',
    icon: 'Scale',
    mechanicTitle: 'Wager Expectation Simulator',
    mechanicDesc: 'Evaluate wagers in a simulated wheel/dice arena. Calculate expected winnings E[X] = ∑ x p(x) and risk variance Var(X) to determine if a game is mathematically fair.',
    badgeName: 'Risk Analyst',
    badgeIcon: 'TrendingUp',
    xpReward: 220,
    formula: 'E[X] = \\sum x_i p(x_i), \\quad Var(X) = E[X^2] - (E[X])^2',
    explainer: {
      headline: 'Quantifying Expected Winnings & Risk',
      body: 'The Expected Value E[X] represents the long-run average outcome per game. A "fair game" has E[X] = 0. Variance Var(X) measures volatility around E[X]. High variance means high risk!',
      example: 'Win $10 (prob 0.2) or Lose $2 (prob 0.8): E[X] = 10(0.2) + (-2)(0.8) = +$0.40. Favorable!'
    },
    defaultParams: { winAmt: 10, winProb: 0.25, loseAmt: 3 },
    quiz: [
      {
        question: 'A coin game pays $5 for Heads (prob 0.5) and costs $4 for Tails (prob 0.5). What is the Expected Value E[X]?',
        options: ['+$0.50', '+$1.00', '-$0.50', '$0.00'],
        correct: 0,
        explanation: 'E[X] = (+5)(0.5) + (-4)(0.5) = 2.50 - 2.00 = +$0.50.'
      },
      {
        question: 'What defines a "fair game" in probability theory?',
        options: ['Expected Value E[X] = 0', 'Variance Var(X) = 0', 'P(Win) = 0.50', 'Win payout equals bet cost'],
        correct: 0,
        explanation: 'A game is fair if net expected payout E[X] is zero (neither player nor house has an edge).'
      },
      {
        question: 'If E[X] = 4 and E[X^2] = 25, what is the Variance Var(X)?',
        options: ['21', '9', '16', '5'],
        correct: 1,
        explanation: 'Var(X) = E[X^2] - (E[X])^2 = 25 - (4)^2 = 25 - 16 = 9.'
      },
      {
        question: 'If a random variable Y is defined as Y = 3X + 2, what is E[Y] in terms of E[X]?',
        options: ['E[X]', '3 E[X] + 2', '9 E[X] + 2', '3 E[X]'],
        correct: 1,
        explanation: 'By linearity of expectation, E[aX + b] = a E[X] + b.'
      },
      {
        question: 'Standard Deviation σ is calculated as:',
        options: ['Var(X)^2', '√Var(X)', 'E[X] / 2', 'E[X^2]'],
        correct: 1,
        explanation: 'Standard deviation σ is the positive square root of the variance.'
      }
    ]
  },
  {
    id: 'z7',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Archery Trials',
    concept: 'Binomial Distribution B(n, p)',
    icon: 'Target',
    mechanicTitle: 'Volley Simulator',
    mechanicDesc: 'Adjust shot count n and hit probability p. Fire arrows at targets and overlay the theoretical Binomial curve onto the live hit frequency histogram.',
    badgeName: 'Sharpshooter',
    badgeIcon: 'Award',
    xpReward: 250,
    formula: 'P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad E[X] = np, \\quad Var(X) = np(1-p)',
    explainer: {
      headline: 'Fixed Trials, Two Outcomes: Binomial Model',
      body: 'The Binomial distribution models the number of successes k in n independent Bernoulli trials, each with constant success probability p.',
      example: 'Shoot n = 10 arrows with hit chance p = 0.6. Expected hits E[X] = 10 × 0.6 = 6 hits.'
    },
    defaultParams: { n: 10, p: 0.60, targetK: 6 },
    quiz: [
      {
        question: 'What is the expected number of hits when firing n = 20 arrows with a hit probability p = 0.35?',
        options: ['5', '7', '10', '14'],
        correct: 1,
        explanation: 'E[X] = n × p = 20 × 0.35 = 7.'
      },
      {
        question: 'Which of the following is NOT a requirement for a Binomial Experiment?',
        options: ['Fixed number of trials n', 'Each trial has only 2 outcomes (Success/Failure)', 'Trials are dependent on previous outcomes', 'Probability of success p remains constant'],
        correct: 2,
        explanation: 'Binomial trials MUST be independent of one another.'
      },
      {
        question: 'For n = 4 and p = 0.5, what is P(X = 4 hits)?',
        options: ['0.0625 (1/16)', '0.25 (1/4)', '0.50 (1/2)', '0.125 (1/8)'],
        correct: 0,
        explanation: 'P(X = 4) = 4C4 × (0.5)^4 × (0.5)^0 = 1 × 0.0625 × 1 = 0.0625.'
      },
      {
        question: 'What is the variance Var(X) of a Binomial RV with n = 50 and p = 0.2?',
        options: ['10', '8', '16', '4'],
        correct: 1,
        explanation: 'Var(X) = n p (1-p) = 50 × 0.2 × 0.8 = 8.'
      },
      {
        question: 'If success probability p = 0.5, the shape of the Binomial PMF is:',
        options: ['Right-skewed', 'Left-skewed', 'Perfectly Symmetric', 'Uniform'],
        correct: 2,
        explanation: 'When p = 0.5, success and failure are equally likely, making the Binomial distribution symmetric around np.'
      }
    ]
  },
  {
    id: 'z8',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'Call Center Rush',
    concept: 'Poisson Distribution Poisson(λ)',
    icon: 'PhoneCall',
    mechanicTitle: 'Arrival Rate Predictor',
    mechanicDesc: 'Model incoming customer calls in a fixed time window. Adjust average rate λ and observe call arrival frequency vs theoretical Poisson curve.',
    badgeName: 'Queue Master',
    badgeIcon: 'Clock',
    xpReward: 250,
    formula: 'P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}, \\quad E[X] = \\lambda, \\quad Var(X) = \\lambda',
    explainer: {
      headline: 'Modelling Rare Random Arrivals in Time',
      body: 'The Poisson distribution models the count of events occurring in a fixed interval of time or space, given a constant average arrival rate λ.',
      example: 'If an average of λ = 4 calls arrive per minute, P(X = 4) = 4^4 * e^(-4) / 4! ≈ 19.5%.'
    },
    defaultParams: { lambda: 4, targetK: 4 },
    quiz: [
      {
        question: 'If calls arrive at an average rate of λ = 3 per hour, what is the Variance Var(X) of the call count?',
        options: ['1.5', '3.0', '9.0', '√3'],
        correct: 1,
        explanation: 'For a Poisson distribution, Mean and Variance are both equal to λ. Var(X) = 3.0.'
      },
      {
        question: 'A Poisson process assumes that events occur:',
        options: ['At fixed uniform intervals', 'Independently at a constant average rate', 'In clusters with increasing rates', 'Only in pairs'],
        correct: 1,
        explanation: 'Poisson processes assume independent arrivals at a constant average rate over time.'
      },
      {
        question: 'If λ = 2 calls per 10 minutes, what is λ for a 30-minute interval?',
        options: ['2', '4', '6', '12'],
        correct: 2,
        explanation: 'Poisson rate scales linearly with interval length: 2 calls / 10 min × 3 = 6 calls / 30 min.'
      },
      {
        question: 'What is P(X = 0) for a Poisson RV with average rate λ = 1?',
        options: ['0.00', '0.368 (1/e)', '0.50', '1.00'],
        correct: 1,
        explanation: 'P(X = 0) = (1^0 × e^-1) / 0! = 1/e ≈ 0.3679.'
      },
      {
        question: 'Under what conditions does the Binomial B(n, p) approximate a Poisson distribution?',
        options: ['Large n, small p, such that np = λ is moderate', 'Small n, large p', 'n = p = 0.5', 'Large n, large p'],
        correct: 0,
        explanation: 'Poisson is the limit of Binomial as n → ∞ and p → 0 with np = λ.'
      }
    ]
  },
  {
    id: 'z9',
    unit: 1,
    unitTitle: 'Unit I — Discrete Random Variables',
    title: 'First Strike',
    concept: 'Geometric Distribution Geo(p)',
    icon: 'Flame',
    mechanicTitle: 'Critical Hit Waiting Time',
    mechanicDesc: 'Predict which attempt will yield the 1st critical hit given crit chance p. View the memoryless decaying probability curve.',
    badgeName: 'Persistence Hero',
    badgeIcon: 'Zap',
    xpReward: 250,
    formula: 'P(X = k) = (1-p)^{k-1} p, \\quad E[X] = \\frac{1}{p}, \\quad Var(X) = \\frac{1-p}{p^2}',
    explainer: {
      headline: 'Waiting for the First Success',
      body: 'The Geometric distribution models the number of trials k required to get the very first success in repeated Bernoulli trials. It possesses the memoryless property.',
      example: 'If crit chance p = 0.20 (20%), expected attempts until 1st crit E[X] = 1 / 0.20 = 5 attempts.'
    },
    defaultParams: { pCrit: 0.20, targetAttempt: 3 },
    quiz: [
      {
        question: 'If a game weapon has a 10% (p = 0.10) critical hit chance, how many attacks are expected on average to land the first critical hit?',
        options: ['5', '10', '20', '100'],
        correct: 1,
        explanation: 'E[X] = 1 / p = 1 / 0.10 = 10 attempts.'
      },
      {
        question: 'What is P(X = 3) for a Geometric RV with success probability p = 0.20?',
        options: ['0.128', '0.200', '0.080', '0.320'],
        correct: 0,
        explanation: 'P(X = 3) = (1 - 0.20)^(3-1) × 0.20 = (0.80)^2 × 0.20 = 0.64 × 0.20 = 0.128.'
      },
      {
        question: 'The "memoryless property" of the Geometric distribution means that P(X > s + t | X > s) equals:',
        options: ['P(X > t)', 'P(X > s)', 'P(X > s + t)', '0'],
        correct: 0,
        explanation: 'Previous failed attempts do not increase or decrease future success probability.'
      },
      {
        question: 'What is the Cumulative Distribution Function F(k) = P(X ≤ k) for Geo(p)?',
        options: ['p^k', '1 - (1-p)^k', '(1-p)^k', 'k × p'],
        correct: 1,
        explanation: 'P(X ≤ k) = 1 - P(all k trials fail) = 1 - (1-p)^k.'
      },
      {
        question: 'As success probability p increases towards 1.0, what happens to E[X]?',
        options: ['Increases to infinity', 'Approaches 1', 'Approaches 0', 'Stays constant'],
        correct: 1,
        explanation: 'If p = 1, success occurs on trial 1 with E[X] = 1/1 = 1.'
      }
    ]
  },

  // --- UNIT II: Continuous Random Variables ---
  {
    id: 'z10',
    unit: 2,
    unitTitle: 'Unit II — Continuous Random Variables',
    title: 'River Depth Explorer',
    concept: 'Continuous RVs, PDF & CDF',
    icon: 'Waves',
    mechanicTitle: 'Continuous Sensor Probe',
    mechanicDesc: 'Measure continuous river sensor values (depth, temperature). Select range [a, b] to compute interval probability as area under the PDF curve.',
    badgeName: 'Hydro Surveyor',
    badgeIcon: 'Compass',
    xpReward: 250,
    formula: 'P(a \\le X \\le b) = \\int_{a}^{b} f(x) dx = F(b) - F(a)',
    explainer: {
      headline: 'Transitioning from Discrete to Continuous',
      body: 'For continuous RVs, the probability of any exact single point P(X = x) is zero! Probabilities are computed over intervals as area under the Probability Density Function f(x).',
      example: 'P(4.0 ≤ Depth ≤ 6.0 meters) is the integral of f(x) from 4.0 to 6.0.'
    },
    defaultParams: { minVal: 2, maxVal: 8, rangeA: 4, rangeB: 6 },
    quiz: [
      {
        question: 'For any continuous random variable X, what is the exact point probability P(X = 5.0)?',
        options: ['1.0', '0.5', '0.0', 'f(5.0)'],
        correct: 2,
        explanation: 'Point probabilities for continuous variables are always zero because single points have zero area under the PDF curve.'
      },
      {
        question: 'The total area under any valid Probability Density Function f(x) over (-∞, +∞) must equal:',
        options: ['0.0', '0.5', '1.0', 'Infinity'],
        correct: 2,
        explanation: 'The total integrated probability across all possible continuous outcomes is 1.0.'
      },
      {
        question: 'How is the PDF f(x) related to the CDF F(x)?',
        options: ['f(x) is the derivative F\'(x)', 'f(x) is the integral of F(x)', 'f(x) = F(x)^2', 'They are unrelated'],
        correct: 0,
        explanation: 'By the Fundamental Theorem of Calculus, f(x) = d/dx [F(x)].'
      },
      {
        question: 'If F(6) = 0.85 and F(4) = 0.35, what is P(4 ≤ X ≤ 6)?',
        options: ['0.50', '1.20', '0.30', '0.85'],
        correct: 0,
        explanation: 'P(4 ≤ X ≤ 6) = F(6) - F(4) = 0.85 - 0.35 = 0.50.'
      },
      {
        question: 'For continuous variables, why is P(a < X < b) equal to P(a ≤ X ≤ b)?',
        options: ['Because endpoints contribute zero additional probability area', 'Because continuous functions are rounded', 'It is not equal', 'Only true for symmetric PDFs'],
        correct: 0,
        explanation: 'Including or excluding discrete endpoint values does not change the integral area.'
      }
    ]
  },
  {
    id: 'z11',
    unit: 2,
    unitTitle: 'Unit II — Continuous Random Variables',
    title: 'Balance the Beam',
    concept: 'Continuous Mean & Variance',
    icon: 'Maximize2',
    mechanicTitle: 'Center of Mass Fulcrum',
    mechanicDesc: 'Visually balance a shaped continuous PDF on a fulcrum to locate mean μ = ∫ x f(x) dx. Adjust width to observe variance spread.',
    badgeName: 'Equilibrium Master',
    badgeIcon: 'Sliders',
    xpReward: 280,
    formula: 'E[X] = \\int_{-\\infty}^{\\infty} x f(x) dx, \\quad Var(X) = \\int_{-\\infty}^{\\infty} (x-\\mu)^2 f(x) dx',
    explainer: {
      headline: 'The Mean as Center of Gravity',
      body: 'In continuous distributions, Expected Value E[X] is the physical center of mass of the PDF area. Variance measures the rotational moment of inertia (spread) around the fulcrum.',
      example: 'A symmetric PDF centered at x = 10 has fulcrum mean μ = 10.'
    },
    defaultParams: { shape: 'triangular', center: 10, spread: 4 },
    quiz: [
      {
        question: 'The Expected Value E[X] of a continuous RV with PDF f(x) corresponds physically to the density shape\'s:',
        options: ['Peak height', 'Center of mass (Fulcrum point)', 'Total perimeter', 'Rightmost boundary'],
        correct: 1,
        explanation: 'E[X] = ∫ x f(x) dx represents the centroid or center of gravity of the probability density curve.'
      },
      {
        question: 'If a continuous PDF f(x) is perfectly symmetric around x = c, what is E[X]?',
        options: ['0', 'c', 'c / 2', '1'],
        correct: 1,
        explanation: 'Symmetry guarantees that the center of mass lies exactly at the center of symmetry c.'
      },
      {
        question: 'Which integral represents the Variance Var(X) of a continuous RV?',
        options: ['∫ x f(x) dx', '∫ (x - μ)² f(x) dx', '∫ f(x)² dx', '∫ x² dx'],
        correct: 1,
        explanation: 'Var(X) = E[(X - μ)²] = ∫ (x - μ)² f(x) dx.'
      },
      {
        question: 'If X has mean μ = 5 and Var(X) = 4, what is E[X²]?',
        options: ['29', '21', '25', '9'],
        correct: 0,
        explanation: 'Var(X) = E[X²] - μ² => 4 = E[X²] - 25 => E[X²] = 29.'
      },
      {
        question: 'Scaling a continuous variable Y = 2X multiplies Var(Y) by a factor of:',
        options: ['2', '4', '√2', '8'],
        correct: 1,
        explanation: 'Var(aX) = a² Var(X). Here 2² = 4.'
      }
    ]
  },
  {
    id: 'z12',
    unit: 2,
    unitTitle: 'Unit II — Continuous Random Variables',
    title: 'Spinner Wheel Lab',
    concept: 'Uniform Continuous Distribution U(a, b)',
    icon: 'Disc',
    mechanicTitle: 'Continuous Spinner Wheel',
    mechanicDesc: 'Spin a continuous high-precision dial. Every outcome in [a, b] is equally likely. Calculate P(a ≤ X ≤ b) from arc segment length ratios.',
    badgeName: 'Wheel Specialist',
    badgeIcon: 'RotateCw',
    xpReward: 250,
    formula: 'f(x) = \\frac{1}{b-a}, \\quad E[X] = \\frac{a+b}{2}, \\quad Var(X) = \\frac{(b-a)^2}{12}',
    explainer: {
      headline: 'Flat Density: Equal Likelihood everywhere in [a, b]',
      body: 'The Continuous Uniform distribution U(a, b) models a scenario where all sub-intervals of equal length within [a, b] are equally probable.',
      example: 'A spinner landing between 0° and 360°. P(90° ≤ X ≤ 180°) = (180-90)/360 = 25%.'
    },
    defaultParams: { a: 0, b: 360, selectA: 90, selectB: 180 },
    quiz: [
      {
        question: 'For a uniform continuous RV U(2, 10), what is the PDF height f(x) for x ∈ [2, 10]?',
        options: ['1/8 (0.125)', '1/10 (0.10)', '1/2 (0.50)', '8.0'],
        correct: 0,
        explanation: 'f(x) = 1 / (b - a) = 1 / (10 - 2) = 1/8 = 0.125.'
      },
      {
        question: 'What is the expected value E[X] of U(4, 20)?',
        options: ['10', '12', '16', '8'],
        correct: 1,
        explanation: 'E[X] = (a + b) / 2 = (4 + 20) / 2 = 12.'
      },
      {
        question: 'Calculate P(5 ≤ X ≤ 8) for U(0, 10).',
        options: ['0.30', '0.50', '0.80', '0.20'],
        correct: 0,
        explanation: 'P(5 ≤ X ≤ 8) = (8 - 5) / (10 - 0) = 3 / 10 = 0.30.'
      },
      {
        question: 'What is the variance Var(X) of U(0, 12)?',
        options: ['12', '144', '12 (144/12)', '6'],
        correct: 2,
        explanation: 'Var(X) = (b - a)² / 12 = 12² / 12 = 144 / 12 = 12.'
      },
      {
        question: 'The CDF F(x) of U(a, b) for x between a and b is:',
        options: ['f(x)', '(x - a) / (b - a)', '(b - x) / (b - a)', '1.0'],
        correct: 1,
        explanation: 'F(x) increases linearly from 0 at x = a to 1 at x = b: F(x) = (x - a) / (b - a).'
      }
    ]
  },
  {
    id: 'z13',
    unit: 2,
    unitTitle: 'Unit II — Continuous Random Variables',
    title: 'Waiting Room',
    concept: 'Exponential Distribution Exp(λ)',
    icon: 'Hourglass',
    mechanicTitle: 'Arrival Interval Timer',
    mechanicDesc: 'Simulate bus or emergency room waiting times. Adjust rate λ to calculate waiting probabilities P(T ≤ t) on a decaying exponential curve.',
    badgeName: 'Chrono Guardian',
    badgeIcon: 'Timer',
    xpReward: 280,
    formula: 'f(t) = \\lambda e^{-\\lambda t}, \\quad F(t) = 1 - e^{-\\lambda t}, \\quad E[T] = \\frac{1}{\\lambda}',
    explainer: {
      headline: 'Modelling Continuous Time Until Event',
      body: 'The Exponential distribution Exp(λ) models elapsed time between independent Poisson events. It is the ONLY continuous distribution with the memoryless property.',
      example: 'If buses arrive at λ = 0.2/min (average wait 5 mins), P(Wait ≤ 3 min) = 1 - e^(-0.6) ≈ 45.1%.'
    },
    defaultParams: { lambda: 0.2, waitT: 3 },
    quiz: [
      {
        question: 'If customer calls arrive at rate λ = 0.1 per minute, what is the expected waiting time E[T]?',
        options: ['1 minute', '5 minutes', '10 minutes', '100 minutes'],
        correct: 2,
        explanation: 'E[T] = 1 / λ = 1 / 0.1 = 10 minutes.'
      },
      {
        question: 'Which unique property is shared strictly between the Geometric (discrete) and Exponential (continuous) distributions?',
        options: ['Memoryless Property', 'Uniform Density', 'Symmetric Bell Shape', 'Zero Variance'],
        correct: 0,
        explanation: 'Both distributions feature the memoryless property: P(T > s + t | T > s) = P(T > t).'
      },
      {
        question: 'For Exp(λ = 0.5), what is P(T > 2)?',
        options: ['1 - e^(-1)', 'e^(-1) ≈ 0.368', '1 - e^(-2)', '0.50'],
        correct: 1,
        explanation: 'P(T > t) = e^(-λt) = e^(-0.5 × 2) = e^(-1) ≈ 0.3679.'
      },
      {
        question: 'What is the standard deviation σ of an Exponential RV Exp(λ)?',
        options: ['λ', '1 / λ', '1 / λ²', '√λ'],
        correct: 1,
        explanation: 'Var(T) = 1 / λ², so standard deviation σ = √(1 / λ²) = 1 / λ.'
      },
      {
        question: 'If events occur as a Poisson process with rate λ, the time between consecutive arrivals follows:',
        options: ['Normal distribution', 'Uniform distribution', 'Exponential distribution Exp(λ)', 'Binomial distribution'],
        correct: 2,
        explanation: 'Inter-arrival times in Poisson processes are strictly exponentially distributed.'
      }
    ]
  },
  {
    id: 'z14',
    unit: 2,
    unitTitle: 'Unit II — Continuous Random Variables',
    title: 'Bell Curve Archery',
    concept: 'Normal Distribution N(μ, σ²)',
    icon: 'Target',
    mechanicTitle: 'Z-Score Bell Curve Shader',
    mechanicDesc: 'Calibrate target marksmanship with mean μ and standard deviation σ. Shade Z-score probability regions under the live Gaussian bell curve.',
    badgeName: 'Gaussian Paragon',
    badgeIcon: 'Award',
    xpReward: 300,
    formula: 'f(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}, \\quad Z = \\frac{X - \\mu}{\\sigma}',
    explainer: {
      headline: 'The Master Curve of Statistics',
      body: 'The Normal (Gaussian) distribution is symmetric and bell-shaped. The Empirical Rule states that 68% of data falls within 1σ, 95% within 2σ, and 99.7% within 3σ.',
      example: 'Target score ~ N(μ=100, σ=15). Score X = 115 gives Z = (115-100)/15 = +1.0σ.'
    },
    defaultParams: { mean: 100, stdDev: 15, rangeMin: 85, rangeMax: 115 },
    quiz: [
      {
        question: 'According to the Empirical Rule (68-95-99.7 rule), approximately what percentage of normal data lies within ±1 standard deviation of the mean?',
        options: ['50%', '68%', '95%', '99.7%'],
        correct: 1,
        explanation: 'Approximately 68.27% of observations fall within μ ± 1σ.'
      },
      {
        question: 'Calculate the Z-score for an observation X = 85 from a normal distribution with μ = 70 and σ = 10.',
        options: ['+1.5', '-1.5', '+1.0', '+0.85'],
        correct: 0,
        explanation: 'Z = (X - μ) / σ = (85 - 70) / 10 = 15 / 10 = +1.5.'
      },
      {
        question: 'What is the mean μ and variance σ² of the Standard Normal Distribution N(0, 1)?',
        options: ['μ = 1, σ² = 0', 'μ = 0, σ² = 1', 'μ = 0, σ² = 0', 'μ = 100, σ² = 15'],
        correct: 1,
        explanation: 'The Standard Normal distribution has a mean of 0 and a variance of 1.'
      },
      {
        question: 'If Z = 0, what is the value of the CDF Φ(0)?',
        options: ['0.00', '0.50', '1.00', '0.68'],
        correct: 1,
        explanation: 'Since the normal curve is symmetric around Z = 0, exactly 50% of area lies to the left of the mean.'
      },
      {
        question: 'The Central Limit Theorem (CLT) states that the sum/average of n independent RVs approaches a Normal distribution as n grows large:',
        options: ['Only if original variables are normal', 'Regardless of the shape of the original distribution', 'Only for uniform variables', 'Never'],
        correct: 1,
        explanation: 'The Central Limit Theorem guarantees asymptotic normality for sample averages regardless of underlying population shape.'
      }
    ]
  }
];
