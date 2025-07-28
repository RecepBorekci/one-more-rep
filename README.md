# 💪 One More Rep

**One More Rep** is a motivational workout companion app designed to keep you pushing through your gym sets. With carefully timed, randomized audio prompts — from tough-love trainers to uplifting encouragement and quirky fun lines — this app keeps your energy high and your mindset strong. Whether you're chasing PRs or just need a mental push, One More Rep is here for that *"just one more rep."*

---

## 🎯 App Mission

**One More Rep** is a motivational workout companion app. It runs in the background and plays supportive or funny voice lines through the user’s earbuds at chosen intervals during gym sessions. The goal is to help users push for one more rep with random voice prompts in different tones — tough love, gentle support, or funny lines.

---

## 🚀 Features

### ✅ Core (MVP) Features

* 🎧 **Timed Audio Prompts**: Plays voice lines at regular intervals (e.g., every 20–40 seconds) during a workout.
* 🗂️ **Voice Pack Selection**: Choose from different tone packs — e.g., “Tough Coach,” “Kind Encouragement,” or “Funny Motivation.”
* ⏱️ **Smart Timer Engine**: Runs in the background with configurable intervals. Randomizes playback within your set limits.
* 📱 **Simple UI**:

  * Start/Stop button
  * Interval slider
  * Voice pack selector
* 📦 **React Native App Setup**:

  * Expo (for rapid prototyping & dev)
  * TypeScript-based structure
  * State managed via Zustand or Context API

---

## 🔮 Future Features (Planned)

* 🎤 **User Voice Uploads**: Upload your own motivational recordings.
* 📊 **Session Stats**: Track how long you stayed in the workout zone.
* 🧠 **AI Suggestions**: Dynamically change tone type based on session duration or fatigue level.
* 🔁 **Set-Based Audio Logic**: Smart detection of sets or rest breaks for more contextual prompts.
* 🌐 **i18n Support**: Turkish, English, Japanese motivational packs.
* 🔊 **Spotify/Audio Integration**: Run over your music without interrupting playback.

---

## 🛠️ Tech Stack

* **Frontend**: React Native (with Expo)
* **State Management**: Zustand or Context API
* **Audio Engine**: `expo-av` or `react-native-sound`
* **Navigation**: React Navigation
* **Deployment**: EAS (Expo Application Services)

---

## 🧩 Project Structure

```
OneMoreRep/
├── assets/          # Audio files, icons
├── components/      # Reusable UI components
├── hooks/           # Custom hooks (e.g., useTimer)
├── screens/         # App screens (e.g., HomeScreen)
├── store/           # Zustand/Context-based state
├── utils/           # Helper functions
├── App.tsx
└── README.md
```
