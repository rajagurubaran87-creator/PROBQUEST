# 🎲 ProbQuest — Learn Probability & Random Variables Through Play

> **Course Outcome CO1**: *"Understand the fundamental concepts of probability and examine discrete & continuous random variables"*

**ProbQuest** is an interactive, browser-based educational game engineered to make Probability & Statistics intuitive and engaging for undergraduate engineering and science students.

---

## 🚀 Quick Start (Zero Setup Required)

You can play **ProbQuest** immediately without installing Node.js or any dependencies:

1. **Full Game Hub**: Open [`standalone.html`](./standalone.html) directly in any web browser.
2. **Featured Detective Game (6 Thieves & 6 Clues)**: Open [`thief_game.html`](./thief_game.html) directly in any web browser.

---

## 🎮 Game Architecture & Features

### 1. Probability Island Quest Map
- **15 Unlockable Zones**: 9 Discrete RV zones (Unit I) and 6 Continuous RV zones (Unit II).
- **Meta Systems**: Player Leveling, XP Progress, Streak Counter, Badge Case Showcase.

### 2. Featured Game: "The Master Bank Robbery"
- **6 Suspects**: Sly Fox, Shadow Jack, Viper Vance, Ghost Cat, Falcon Rex, Wolf Grim.
- **6 Forensic Clues**: Handedness Palm Print, Boot Size Tread, Blood DNA Droplet, Laser Height Sensor, Tattoo Ink Fiber, Tool Scratch Pattern.
- **Real-Time Bayesian Engine**: Computes exact posterior probability for each thief as evidence is toggled:
  $$\text{Posterior } P(\text{Thief}_i \mid C_1..C_6) = \frac{P(T_i) \cdot \prod_{j=1}^{6} P(C_j \mid \text{Thief}_i)}{\sum_{k=1}^{6} P(T_k) \cdot \prod_{j=1}^{6} P(C_j \mid \text{Thief}_k)}$$

### 3. Interactive Simulations & Real-Time Charts
- **Monte Carlo Engine**: Runs up to 5,000 real-time trial draws in browser memory.
- **Dynamic Chart Overlays**: Live PMF histograms, step-function CDFs, continuous PDF curves, and Z-score area visualizers.

### 4. Adaptive Quiz Engine
- 5-question adaptive quizzes per zone with step-by-step mathematical explanations.

### 5. In-Game Formula Codex
- Interactive reference notebook with built-in variable calculators for $nCr$, Binomial, Poisson, Exponential, and Normal distributions.

### 6. Learning Analytics & Instructor View
- Class-wide mastery heatmap across all 15 syllabus topics.
- One-click CSV export for Outcome-Based Education (OBE) documentation.

---

## 🗺️ Syllabus-to-Gameplay Mapping

| Unit | Concept | Mini-Game | Visual Mechanic |
|---|---|---|---|
| **Unit I** | Basic Probability | **Treasure Chest Odds** | Draw items from chests & watch empirical frequency converge to $P(E) = \frac{\vert A \vert}{\vert S \vert}$. |
| **Unit I** | Conditional Probability & Bayes | **The Master Bank Robbery** | Inspect 6 forensic clues to identify the thief among 6 suspects. |
| **Unit I** | Independence | **Two Dice Duel** | Roll dice pairs to test if $P(A \cap B) = P(A) \times P(B)$. |
| **Unit I** | Bayes' Theorem | **Medical Diagnosis Lab** | Disease prior vs false positives; update belief $P(\text{Disease} \mid \text{Test}^+)$. |
| **Unit I** | Discrete RV & CDF | **Loot Table Builder** | Assign item rarities, view PMF bars & step-function CDF $F(x) = P(X \le x)$. |
| **Unit I** | Mean & Variance | **Fair Game or Not?** | Calculate expected winnings $E[X]$ & risk variance $\text{Var}(X)$ on slot wagers. |
| **Unit I** | Binomial Distribution | **Archery Trials** | Adjust $n$ & $p$, fire arrows, overlay theoretical Binomial curve onto histogram. |
| **Unit I** | Poisson Distribution | **Call Center Rush** | Adjust rate $\lambda$, observe random call arrivals per time interval. |
| **Unit I** | Geometric Distribution | **First Strike** | Predict attempt number of 1st critical hit given crit chance $p$. |
| **Unit II** | Continuous RVs & CDF | **River Explorer** | Measure sensor depth range $[a, b]$ as continuous area under PDF curve. |
| **Unit II** | Continuous Mean/Var | **Balance the Beam** | Visually balance continuous PDF shape on a fulcrum to locate mean $\mu$. |
| **Unit II** | Uniform Distribution | **Spinner Wheel Lab** | Spin continuous dial where all angles in $[a, b]$ are equally likely. |
| **Unit II** | Exponential Distribution | **Waiting Room** | Predict waiting time $P(T \le t)$ on decaying continuous exponential curve. |
| **Unit II** | Normal Distribution | **Bell Curve Archery** | Calibrate marksmanship with $\mu$ and $\sigma$, shade Z-score area on Gaussian curve. |

---

## 📁 Directory Structure

```
probquest/
├── standalone.html            # Complete zero-setup browser game hub
├── thief_game.html            # Dedicated 6-thief, 6-clue bank heist game
├── package.json               # Frontend dependencies & scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS design system
├── index.html                 # Main HTML entry
├── server/
│   └── server.js              # Express REST API for backend validation
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Root application container
    ├── index.css              # Custom glassmorphism styles & animations
    ├── engine/
    │   └── statsEngine.js     # Isomorphic Probability & Statistics Engine
    ├── data/
    │   ├── zonesData.js       # 15 zone definitions & adaptive quizzes
    │   └── mockState.js       # Persistence & instructor sample data
    └── components/
        ├── Navbar.jsx         # HUD Header (Level, XP, Streak, Tabs)
        ├── MapHub.jsx         # Interactive Probability Island Quest Map
        ├── MiniGameContainer.jsx # Game sandbox & quiz container
        ├── FormulaCodex.jsx   # Interactive formula reference sheet
        ├── MasteryDashboard.jsx # Student CO1 progress & badges
        ├── InstructorDashboard.jsx # Learning analytics & OBE exporter
        └── minigames/         # 14 Custom Mini-Game Components
```

---

## 🛠️ Full-Stack Development Setup

If you wish to run the app using Vite and Node.js:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Frontend Dev Server**:
   ```bash
   npm run dev
   ```

3. **Start Express Backend API**:
   ```bash
   npm run server
   ```

---

## 📜 License

This project is licensed under the MIT License — free for educational and academic use.
