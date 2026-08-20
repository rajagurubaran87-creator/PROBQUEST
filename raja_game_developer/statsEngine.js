/**
 * Isomorphic Probability & Statistics Engine for ProbQuest
 * Client & Server compatible probability distributions and Monte Carlo trial generator.
 */

// Factorial calculation with memoization for fast runtime
const memoFactorial = [1, 1];
export function factorial(n) {
  if (n < 0) return 0;
  if (n < memoFactorial.length) return memoFactorial[n];
  let res = memoFactorial[memoFactorial.length - 1];
  for (let i = memoFactorial.length; i <= n; i++) {
    res *= i;
    memoFactorial[i] = res;
  }
  return res;
}

// Combinations: nCr
export function nCr(n, r) {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r === 1) return n;
  if (r > n / 2) r = n - r;
  let num = 1;
  let den = 1;
  for (let i = 1; i <= r; i++) {
    num *= (n - r + i);
    den *= i;
  }
  return num / den;
}

// Permutations: nPr
export function nPr(n, r) {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = n - r + 1; i <= n; i++) {
    res *= i;
  }
  return res;
}

// Binomial Distribution
export const Binomial = {
  pmf(n, p, k) {
    if (k < 0 || k > n) return 0;
    return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  },
  cdf(n, p, k) {
    if (k < 0) return 0;
    if (k >= n) return 1;
    let sum = 0;
    for (let i = 0; i <= Math.floor(k); i++) {
      sum += this.pmf(n, p, i);
    }
    return sum;
  },
  mean(n, p) { return n * p; },
  variance(n, p) { return n * p * (1 - p); },
  sample(n, p) {
    let hits = 0;
    for (let i = 0; i < n; i++) {
      if (Math.random() < p) hits++;
    }
    return hits;
  }
};

// Poisson Distribution
export const Poisson = {
  pmf(lambda, k) {
    if (k < 0) return 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  },
  cdf(lambda, k) {
    if (k < 0) return 0;
    let sum = 0;
    for (let i = 0; i <= Math.floor(k); i++) {
      sum += this.pmf(lambda, i);
    }
    return sum;
  },
  mean(lambda) { return lambda; },
  variance(lambda) { return lambda; },
  sample(lambda) {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k++;
      p *= Math.random();
    } while (p > L);
    return k - 1;
  }
};

// Geometric Distribution (Number of trials up to and including 1st success)
export const Geometric = {
  pmf(p, k) {
    if (k < 1) return 0;
    return Math.pow(1 - p, k - 1) * p;
  },
  cdf(p, k) {
    if (k < 1) return 0;
    return 1 - Math.pow(1 - p, Math.floor(k));
  },
  mean(p) { return 1 / p; },
  variance(p) { return (1 - p) / (p * p); },
  sample(p) {
    let trials = 1;
    while (Math.random() > p) {
      trials++;
    }
    return trials;
  }
};

// Uniform Continuous Distribution
export const Uniform = {
  pdf(a, b, x) {
    if (x < a || x > b) return 0;
    return 1 / (b - a);
  },
  cdf(a, b, x) {
    if (x < a) return 0;
    if (x >= b) return 1;
    return (x - a) / (b - a);
  },
  mean(a, b) { return (a + b) / 2; },
  variance(a, b) { return Math.pow(b - a, 2) / 12; },
  sample(a, b) { return a + Math.random() * (b - a); }
};

// Exponential Distribution
export const Exponential = {
  pdf(lambda, x) {
    if (x < 0) return 0;
    return lambda * Math.exp(-lambda * x);
  },
  cdf(lambda, x) {
    if (x < 0) return 0;
    return 1 - Math.exp(-lambda * x);
  },
  mean(lambda) { return 1 / lambda; },
  variance(lambda) { return 1 / (lambda * lambda); },
  sample(lambda) { return -Math.log(1 - Math.random()) / lambda; }
};

// Standard Error Function approximation for Normal CDF
function erf(x) {
  // Abramowitz and Stegun formula 7.1.26 approximation
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  return sign * y;
}

// Normal Distribution
export const Normal = {
  pdf(mean, stdDev, x) {
    if (stdDev <= 0) return 0;
    const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
  },
  cdf(mean, stdDev, x) {
    if (stdDev <= 0) return x >= mean ? 1 : 0;
    const z = (x - mean) / (stdDev * Math.sqrt(2));
    return 0.5 * (1 + erf(z));
  },
  zScore(mean, stdDev, x) {
    return (x - mean) / stdDev;
  },
  rangeProbability(mean, stdDev, x1, x2) {
    return this.cdf(mean, stdDev, x2) - this.cdf(mean, stdDev, x1);
  },
  mean(mean) { return mean; },
  variance(mean, stdDev) { return stdDev * stdDev; },
  sample(mean, stdDev) {
    // Box-Muller transform
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + z0 * stdDev;
  }
};

// Bayes' Theorem Calculator
export function calculateBayes(priorA, sensitivity, falsePositiveRate) {
  // P(A) = priorA
  // P(B|A) = sensitivity (true positive)
  // P(B|~A) = falsePositiveRate
  // P(~A) = 1 - P(A)
  // P(B) = P(B|A)*P(A) + P(B|~A)*P(~A)
  const pA = priorA;
  const pNotA = 1 - priorA;
  const pBgivenA = sensitivity;
  const pBgivenNotA = falsePositiveRate;
  
  const pB = (pBgivenA * pA) + (pBgivenNotA * pNotA);
  const pAgivenB = pB > 0 ? (pBgivenA * pA) / pB : 0;

  return {
    pA,
    pNotA,
    pBgivenA,
    pBgivenNotA,
    pB,
    pAgivenB, // Posterior probability P(A|B)
  };
}

// General Discrete Expected Value & Variance
export function computeDiscreteEVAndVar(outcomes, probabilities) {
  let ev = 0;
  for (let i = 0; i < outcomes.length; i++) {
    ev += outcomes[i] * probabilities[i];
  }
  let variance = 0;
  for (let i = 0; i < outcomes.length; i++) {
    variance += Math.pow(outcomes[i] - ev, 2) * probabilities[i];
  }
  return {
    ev,
    variance,
    stdDev: Math.sqrt(variance)
  };
}

// Fast Monte Carlo Batch Simulator
export function runMonteCarloTrials(samplerFn, count = 1000) {
  const results = {};
  const rawValues = [];
  for (let i = 0; i < count; i++) {
    const val = samplerFn();
    rawValues.push(val);
    results[val] = (results[val] || 0) + 1;
  }
  return { counts: results, total: count, rawValues };
}
