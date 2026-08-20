/**
 * Express REST API Server for ProbQuest
 * Backend service for server-side probability validation, auth, and instructor reporting.
 */

import express from 'express';
import cors from 'cors';
import { Binomial, Poisson, Normal, calculateBayes } from '../src/engine/statsEngine.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory mock database
const db = {
  users: [
    { id: 'u1', username: 'student1', role: 'student', xp: 850, level: 3 }
  ],
  attempts: [],
};

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ProbQuest Backend API' });
});

// GET /api/zones - Returns syllabus zones metadata
app.get('/api/zones', (req, res) => {
  res.json({
    status: 'success',
    unit1: 'One-Dimensional Discrete Random Variables',
    unit2: 'One-Dimensional Continuous Random Variables',
    totalZones: 15
  });
});

// POST /api/zones/:id/attempt - Validates student probability calculations server-side
app.post('/api/zones/:id/attempt', (req, res) => {
  const { zoneId } = req.params;
  const { guessedValue, params, quizAnswers } = req.body;

  let trueValue = null;

  if (zoneId === 'z4') {
    // Bayes' Theorem
    const b = calculateBayes(params.prior, params.sensitivity, params.falsePos);
    trueValue = b.pAgivenB;
  } else if (zoneId === 'z7') {
    // Binomial
    trueValue = Binomial.pmf(params.n, params.p, params.k);
  } else if (zoneId === 'z8') {
    // Poisson
    trueValue = Poisson.pmf(params.lambda, params.k);
  } else if (zoneId === 'z14') {
    // Normal range
    trueValue = Normal.rangeProbability(params.mean, params.stdDev, params.rangeMin, params.rangeMax);
  }

  const isAccurate = trueValue !== null ? Math.abs(guessedValue - trueValue) < 0.02 : true;

  res.json({
    status: 'success',
    zoneId,
    trueValue,
    guessedValue,
    isAccurate,
    xpAwarded: isAccurate ? 200 : 50
  });
});

// GET /api/instructor/report - Generates CO1 outcome attainment report
app.get('/api/instructor/report', (req, res) => {
  res.json({
    courseOutcome: 'CO1 — Discrete & Continuous Probability Mastery',
    enrolledStudents: 48,
    classAverageAttainment: 84.2,
    attainmentStatus: 'Target Achieved (> 75%)'
  });
});

app.listen(PORT, () => {
  console.log(` ProbQuest Express Server running on http://localhost:${PORT}`);
});
