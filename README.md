# 🌿 CurEase — Smart Healthcare, Simplified

**CurEase** is an AI-powered **health-tech platform** focused on making healthcare more **accessible, personalized, and intelligent**.  
It combines **modern web & mobile technologies** with **machine learning** to help users understand symptoms, analyze nutrition, manage medical records, and connect with healthcare professionals — all in one place.

CurEase is built with a vision to **reduce dependency on manual healthcare processes** and empower users with **data-driven health insights**.

---

## ✨ Key Highlights

- 🧠 AI-Driven Health Insights  
- 📊 Personalized User Dashboard  
- 📱 Mobile-First, Responsive Design  
- 🔐 Privacy-Focused Architecture  
- 🚀 Scalable & Modular Tech Stack  

---

## 🌟 Core Features

### 🩺 Symptom-Based Disease Detection
- Input symptoms and get AI-predicted probable conditions  
- Early awareness support (not a medical diagnosis)

### 🍎 Nutrition Analysis from Food Images
- Upload food images
- Get calories, nutrients, and dietary insights instantly

### 📁 Medical Report Management
- Secure upload and storage of lab reports & prescriptions
- Easy access anytime

### 👨‍⚕️ Doctor–Patient Interaction
- Appointment scheduling
- Secure chat system

### 📊 Personalized Health Dashboard
- Health summaries & reminders
- Smart recommendations

### 📱 Responsive & Modern UI
- Optimized for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technologies |
|------|-------------|
| Frontend | React.js, Tailwind CSS, Chakra UI |
| Backend | Node.js, Express.js |
| Database | MongoDB, Firebase |
| Machine Learning | Python, Scikit-learn, TensorFlow |
| APIs | REST APIs, Health & Nutrition APIs |
| Authentication | Firebase Auth |
| Deployment | Vercel, Render / Heroku |

---

## ⚙️ How It Works

1. User authentication via email or Google  
2. Dashboard overview of health data  
3. Symptom analysis using ML models  
4. Food image nutrition analysis  
5. Medical report storage & tracking  
6. Doctor appointment & chat system  
7. Smart reminders & notifications  

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm / yarn
- MongoDB or Firebase
- Python ≥ 3.8

### Clone the Repository
```bash
git clone https://github.com/prasad-pranay/curease.git
cd CurEase
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Open: http://localhost:3000

---

## 📡 API Overview

| Endpoint | Method | Description |
|--------|--------|-------------|
| /auth/signup | POST | Create account |
| /auth/login | POST | Login user |
| /symptoms/analyze | POST | Predict disease |
| /food/analyze | POST | Analyze food image |
| /reports/upload | POST | Upload report |
| /reports/:id | GET | Get report |
| /appointments | GET / POST | Manage appointments |

---

## 🗺️ Roadmap

- Symptom-based disease detection  
- Nutrition analysis from images  
- Medical report tracking  
- Doctor–patient chat  
- Push notifications  
- Wearable device integration  

---

## 🔮 Future Enhancements

- Video consultations
- Health trend analytics
- Multi-language support
- Insurance system integration
- Advanced AI predictions

---

## 📁 Project Structure

```
CurEase/
├── frontend/
├── backend/
├── ml-models/
├── README.md
└── package.json
```

---

## 🔐 Security & Privacy

- Secure Firebase authentication
- Encrypted data storage
- Restricted report & image access
- GDPR & HIPAA considerations

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo  
2. Create a feature branch  
3. Commit your changes  
4. Push & open a pull request  

---

## 📄 License

© 2025 Pranay — All rights reserved.

---

## 📬 Contact

- GitHub: https://github.com/prasad-pranay  
- Email: prasadpranay2005@gmail.com
