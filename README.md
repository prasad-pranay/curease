# CurEase 🌿

CurEase is an innovative **health-tech application** designed to provide **smart healthcare solutions** using modern web technologies, mobile-friendly design, and AI-powered tools. The app focuses on **personalized health insights**, **nutrition analysis**, **symptom-based disease detection**, and **medical report tracking**, making healthcare accessible and convenient for everyone.

---

## 🌟 Features

### Core Features
- **Symptom-based Disease Detection:** Users can input symptoms, and the app provides probable diseases using AI/ML algorithms.
- **Nutrition Analysis from Food Images:** Capture food images to get nutritional breakdowns automatically.
- **Medical Report Management:** Track and organize medical reports, prescriptions, and lab results securely.
- **Doctor-Patient Interaction:** Built-in chat and appointment features for seamless communication.
- **User Dashboard:** Personalized health stats, reminders, and recommendations.
- **Responsive UI:** Works seamlessly across mobile, tablet, and desktop.

### Tech Stack
| Layer           | Technology / Tools |
|-----------------|------------------|
| **Frontend**    | React.js, Tailwind CSS, Chakra UI |
| **Backend**     | Node.js, Express.js, Firebase, MongoDB |
| **Machine Learning** | Python (Scikit-learn, TensorFlow), Custom ML Models |
| **APIs**        | RESTful APIs, Third-party health & nutrition APIs |
| **Authentication** | Firebase Auth (Email/Password, Google Sign-in) |
| **Deployment**  | Vercel (Frontend), Render / Heroku (Backend) |

---

## 🎯 How It Works

1. **User Sign-up & Authentication:** Secure login using email/password or Google Sign-in.
2. **Dashboard Overview:** Access health stats, reports, and upcoming appointments.
3. **Symptom Input:** Users enter symptoms → ML model predicts possible conditions.
4. **Food Image Upload:** App analyzes image → shows calories, nutrients, and suggestions.
5. **Medical Report Upload:** Users can store and track lab reports securely.
6. **Doctor Interaction:** Schedule appointments, chat with doctors, or request consultations.
7. **Notifications & Reminders:** Stay informed about medications, appointments, and health tips.

---

## 🖼 Screenshots / Demo
![Dashboard](https://link-to-screenshot1.com)
![Symptom Analysis](https://link-to-screenshot2.com)
![Food Analysis](https://link-to-screenshot3.com)

> Replace these links with actual screenshots of your app for a visual appeal.

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16.x
- npm / yarn
- MongoDB / Firebase account
- Python ≥ 3.8 (for ML modules)

### Clone the repository
```bash
git clone https://github.com/prasad-pranay/curease.git
cd CurEase
```

# Backend Setup
cd backend
npm install
cp .env.example .env
# Add your environment variables (DB URI, Firebase keys, etc.)
npm run dev

# Frontend Setup
cd frontend
npm install
npm start

# Open the app in browser
# http://localhost:3000

# ------------------------
# API Documentation
# Base URL: https://api.curease.com
# ------------------------
# Endpoint              Method      Description
# /auth/signup           POST       Create a new user
# /auth/login            POST       Login user and get JWT
# /symptoms/analyze      POST       Predict disease based on symptoms
# /food/analyze          POST       Upload food image to analyze nutrition
# /reports/upload        POST       Upload medical report
# /reports/:id           GET        Fetch specific medical report
# /appointments          POST/GET   Manage doctor appointments

# ------------------------
# Roadmap
# ------------------------
# Symptom-based disease detection
# Nutrition analysis from food images
# Medical report tracking
# Doctor-patient chat
# Push notifications for health reminders
# AI-powered personalized health suggestions
# Integration with wearable devices

# ------------------------
# Future Enhancements
# ------------------------
# Real-time doctor consultation via video call
# Health trend analytics over time
# Integration with health insurance systems
# Multi-language support for wider accessibility

# ------------------------
# Folder Structure
# ------------------------
# CurEase/
# ├── frontend/       # React frontend code
# │   ├── src/
# │   └── public/
# ├── backend/        # Node.js + Express backend
# │   ├── controllers/
# │   ├── models/
# │   ├── routes/
# │   └── app.js
# ├── ml-models/      # Python ML scripts for predictions
# ├── .gitignore
# ├── README.md
# └── package.json

# ------------------------
# Security & Privacy
# ------------------------
## User authentication using Firebase Auth (secure & encrypted)
## All sensitive user data is stored securely in MongoDB
## Image and report uploads are stored safely with restricted access
## GDPR and HIPAA compliance considered for future versions

## ------------------------
## Contributing
## ------------------------
## Fork the repo
## Create a new branch (git checkout -b feature/YourFeature)
## Commit your changes (git commit -m 'Add some feature')
## Push to the branch (git push origin feature/YourFeature)
## Create a pull request

## ------------------------
## License
## ------------------------
## © 2025 Pranay

## ------------------------
## Contact
## ------------------------
## GitHub: https://github.com/prasad-pranay
## Email: prasadpranay2005@gmail.com





git clone https://github.com/yourusername/CurEase.git
cd CurEase
