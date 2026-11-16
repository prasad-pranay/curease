<div>
<img src="../.sample/icon.png" height=100 /><h1>Curease - Backend Setup</h1>
</div>

CurEase uses a multi-service backend architecture consisting of **Node.js (Express)** and **Python (Flask)**. Each service handles a dedicated set of responsibilities, allowing the application to manage healthcare operations alongside AI-powered features.

## 📑 Table of Contents

- [Backend Architecture](#backend-architecture)
- [Roles of Backend Technologies](#roles-of-backend-technologies)
- [Node.js API Routes](#nodejs-api-routes)
- [Flask API Routes](#flask-api-routes)
- [Backend Setup](#backend-setup)
  - [Prerequisites](#1-prerequisites)
  - [Environment Setup](#2-environment-setup)
  - [Where to Get the Required Keys](#3-where-to-get-the-required-keys)
  - [Backend Configuration](#4-backend-configuration)
  - [Running the Backend Servers](#5-running-the-backend-servers)
- [Accessing CurEase](#accessing-curease)
- [Security Guidelines](#security-guidelines)

## Backend Architecture

CurEase follows a two-service backend architecture:

- **Node.js + Express:** Handles the primary application backend, authentication, database operations, API routes, Firebase connectivity, and notifications.
- **Python + Flask:** Handles AI/ML-related operations, including symptom prediction, LLM integration, food image analysis, and prescription receipt generation.

Both services communicate with each other where required to provide the complete application functionality.

## Roles of Backend Technologies

| Node.js (Express) | Flask (Python) |
|---|---|
| User authentication and validation | Symptom prediction model |
| MongoDB database operations | LLM-powered response generation |
| Firebase connectivity | Food image nutrition analysis |
| Doctor, Patient and Admin routes | Prescription receipt generation and downloading |
| Push notifications | AI/ML processing |
| Appointment management | Image processing |
| Other application API routes | Python-based utilities |

## Node.js API Routes

The Node.js server handles the primary application APIs.

| Route | Description |
|---|---|
| `/` | Backend health check |
| `/doctor` | Doctor-related routes |
| `/patient` | Patient-related routes |
| `/pharmacy` | Pharmacy-related routes |
| `/login` | Authentication and login routes |
| `/tools` | Application tools and utilities |
| `/notification` | Notification management |
| `/gemini` | Gemini-related routes |
| `/appointments` | Appointment management |

## Flask API Routes

The Flask server handles AI/ML processing and related services.

| Route | Description |
|---|---|
| `/` | Backend health check |
| `/get-symptoms` | Access the symptom prediction model |
| `/get-response` | Generate responses using LLMs |
| `/food-image` | Analyze food images and predict nutritional information |
| `/get-recipt` | Generate and retrieve prescription receipts |

## Backend Setup

Follow these instructions to configure and run the CurEase backend locally.

### 1. Prerequisites

Make sure the following are installed on your system:

- Node.js and npm
- Python 3.11 or later
- pip (Python package manager)
- Git
- MongoDB Atlas account or a MongoDB instance
- Minimum 4 GB RAM recommended
- Windows 10 or later (for the commands provided below)

### 2. Environment Setup

Create a file named `.env` inside the `curease backend` directory.

You can either rename `.env.example` to `.env` or create a new `.env` file with the following variables:

```env
# Email Configuration
EMAIL_USER=YOUR_EMAIL_ADDRESS
EMAIL_PASS=YOUR_EMAIL_APP_PASSWORD

# Database Configuration
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

# Google Authentication
GOOGLE_LOGIN_ID=YOUR_GOOGLE_CLIENT_ID

# Authentication Security
JWT_SECRET=YOUR_LONG_RANDOM_SECRET

# Google Gemini API
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# Admin Credentials
ADMIN_NAME=YOUR_ADMIN_USERNAME
ADMIN_PASS=YOUR_STRONG_ADMIN_PASSWORD
```

### 3. Where to Get the Required Keys

| Variable | Description |
|---|---|
| `EMAIL_USER` | Email address used by the application for sending emails. |
| `EMAIL_PASS` | Email App Password if required by your email provider. For Gmail, enable 2-Step Verification and generate an App Password. |
| `MONGO_URI` | MongoDB connection string. Get it from [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database). |
| `GOOGLE_LOGIN_ID` | Google OAuth Client ID. Get it from [Google Cloud Console](https://console.cloud.google.com/auth/clients). |
| `JWT_SECRET` | A long, randomly generated secret used for signing JWT tokens. |
| `GEMINI_API_KEY` | API key for Google Gemini. Generate it through [Google AI Studio](https://aistudio.google.com/apikey). |
| `ADMIN_NAME` | Username for the administrator account. |
| `ADMIN_PASS` | Strong password for the administrator account. |

### 4. Backend Configuration

Clone the repository if you haven't already:

```bash
git clone https://github.com/prasad-pranay/curease.git
```

Navigate to the backend directory:

```bash
cd "curease backend"
```

**Step 1: Create a Python virtual environment (recommended)**

```bash
python -m venv .venv
```

**Step 2: Activate the virtual environment**

For Windows:

```bash
.venv\Scripts\activate
```

For macOS/Linux:

```bash
source .venv/bin/activate
```

**Step 3: Install Python dependencies**

```bash
pip install -r requirements.txt
```

**Step 4: Install Node.js dependencies**

```bash
npm install
```

Make sure both dependency installations complete successfully before starting the servers.

### 5. Running the Backend Servers

CurEase requires both Node.js and Flask servers to run simultaneously.

Open two separate terminals from the backend directory.

**1. Start the Flask (Python) server**

Activate your Python virtual environment and execute:

```bash
python backend.py
```

The Flask server will be available at:

```text
http://localhost:8000
```

**2. Start the Node.js server**

In another terminal, execute:

```bash
npm run dev
```

The Node.js server will be available at:

```text
http://localhost:5000
```

*Note: These commands assume your Flask and Node.js applications are configured to use ports 8000 and 5000 respectively.*

## Accessing CurEase

Once both backend services and the frontend are running, access the application through:

**Frontend:**

http://localhost:5173

For frontend installation, environment configuration, and additional instructions, refer to the [CurEase Frontend Setup](../CurEase%20frontend/README.md).

## 🎯 Backend Objective

The CurEase backend is designed to provide a reliable foundation for healthcare operations while integrating AI-powered capabilities. By separating application services from AI/ML processing, it keeps the system modular and easier to maintain, extend, and scale.

---

**CurEase – Making Healthcare Smarter and More Accessible.**