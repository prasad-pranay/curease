<div>
<img src="../.sample/icon.png" height=100 /><h1>Curease - Frontend Setup</h1>
</div>

## 📑 Table of Contents

- [Environment Setup](#environment-setup)
  - [Frontend Environment Variables](#frontend-environment-variables)
  - [Environment Variable Description](#environment-variable-description)
  - [Getting Your Google Client ID](#getting-your-google-client-id)
  - [Backend Configuration](#backend-configuration)
- [Setup the Frontend](#setup-the-frontend)
  - [Navigate to the Frontend Directory](#1-navigate-to-the-frontend-directory)
  - [Install Dependencies](#2-install-dependencies)
  - [Start the Development Server](#3-start-the-development-server)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)



## Environment Setup

CurEase uses environment variables to configure API endpoints and external authentication services.

### Frontend Environment Variables

Create a `.env` file in the root of the frontend directory and configure the following variables:

```env
VITE_BACKEND_API_URL=YOUR_BACKEND_URL
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

### Environment Variable Description

| Variable | Description |
|---|---|
| `VITE_BACKEND_API_URL` | Base URL of the deployed or locally running CurEase backend. |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID used for Google authentication. |

**Getting your Google Client ID:**

1. Visit the [Google Cloud Console](https://console.cloud.google.com/auth/clients).
2. Select your project or create a new one.
3. Configure the OAuth consent screen.
4. Create an OAuth 2.0 Client ID.
5. Configure the authorized JavaScript origins for your frontend.
6. Copy the Client ID into your `.env` file.

<br/>

**Backend Configuration**

1. CurEase frontend communicates with the backend through the configured `VITE_BACKEND_API_URL`.

2. For backend installation, environment configuration, and deployment instructions, refer to the [Backend Setup](../curease%20backend/README.md) documentation.

<br/>

## Setup the Frontend

### 1. Navigate to the Frontend Directory

```bash
cd "CurEase frontend"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend will generally be available at:

http://localhost:5173

## Project Structure

```bash
CurEase frontend/
├── node_modules/              # Auto-generated dependencies
├── public/                    # Static assets
├── src/
│   ├── admin/                 # Admin pages
│   ├── aiPage/                # AI chat page
│   ├── assets/                # Local assets
│   ├── chat/                  # Firebase chat modal
│   ├── component/             # UI components
│   ├── components/            # Additional components
│   ├── doctor/                # Doctor pages
│   ├── initialPages/          # Landing, splash and about pages
│   ├── lib/                   # Utility libraries
│   ├── patient/               # Patient pages
│   ├── pharmacy/              # Pharmacy pages
│   ├── App.jsx                # Main application component
│   ├── BackendFunctions.jsx   # Backend API functions
│   ├── index.css              # Global styles
│   ├── main.jsx               # Application entry point
│   ├── SmoothScroll.jsx       # Lenis smooth scrolling
│   ├── splash.css             # Splash page styles
│   └── Splash.jsx              # Splash page component
├── .env                       # Environment configuration
├── .env.example               # Environment template
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── README.md                  # Frontend documentation
└── vite.config.js             # Vite configuration
```

## Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Generate a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

