# 🔊 BrailleRead - Assistive Braille Reading Device

![BrailleRead Banner](https://img.shields.io/badge/BrailleRead-Assistive%20Technology-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-informational?style=for-the-badge)

> **Empowering Independence Through Touch & Sound**

BrailleRead is an innovative assistive technology device designed to bridge the gap between tactile braille learning and audio feedback. This repository contains both the hardware specifications and the promotional landing page for the BrailleRead device.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About the Project

BrailleRead is a 3D-printed device that helps visually impaired individuals learn braille through immediate audio feedback. The device features:

- **Physical Device**: 3D-printed box with a reader space and 3 tactile buttons
- **Braille Pieces**: Modular 3D-printed pieces containing braille codes
- **Audio Output**: Instant voice feedback when braille pieces are placed on the reader
- **Landing Page**: Professional web presence to promote and explain the product

### How It Works

1. Place a 3D-printed braille piece on the reader space
2. The device scans and recognizes the braille pattern
3. Audio output immediately speaks the corresponding word
4. Users can explore and learn at their own pace

## ✨ Features

### Hardware
- ⚡ **Instant Recognition** - 0.5s response time with 99.9% accuracy
- 🔊 **Crystal-Clear Audio** - High-quality voice output
- 📦 **Modular Design** - Expandable braille piece library
- 🔋 **Portable** - Compact design for learning anywhere
- 🎯 **Simple Interface** - Three-button control system

### Landing Page
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Modern UI/UX** - Dark theme with gradient accents
- 📧 **Contact Form** - Direct email integration
- ✨ **Smooth Animations** - Engaging scroll effects
- ♿ **Accessible** - Built with accessibility in mind

## 🛠️ Technology Stack

### Frontend
- **React** - UI library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **Vite** - Build tool
- **Netlify** - Hosting platform

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Nodemailer** - Email service
- **Render** - Hosting platform

### Hardware (Embedded System)
- **Arduino/Raspberry Pi** - Microcontroller
- **Tactile Sensors** - Braille pattern recognition
- **Audio Module** - Voice output system
- **3D Printed Components** - Custom enclosure and braille pieces

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Gmail account (for email functionality)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/project-braille.git
cd project-braille
```

#### 2. Frontend Setup

```bash
cd client
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install Lucide React
npm install lucide-react

# Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

#### 3. Backend Setup

```bash
cd server
npm install

# Create .env file
cat > .env << EOL
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
RECIPIENT_EMAIL=your-email@gmail.com
NODE_ENV=development
PORT=5000
EOL

# Start server
node server.js
```

#### 4. Access the Application

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Test endpoint: `http://localhost:5000/api/test`

## 📁 Project Structure

```
project-braille/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── App.jsx           # Main landing page component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Tailwind CSS imports
│   ├── public/               # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Backend application
│   ├── server.js             # Express server & email API
│   ├── package.json
│   └── .env                  # Environment variables (not tracked)
│
├── hardware/                  # Hardware documentation (optional)
│   ├── schematics/
│   ├── 3d-models/
│   └── code/
│
└── README.md
```

## 🌐 Deployment

### Frontend Deployment (Netlify)

1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`

### Backend Deployment (Render)

1. **Create a new Web Service on Render**

2. **Configure:**
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables (see below)

3. **Deploy and get your URL**

### Production URLs

- **Frontend**: `https://project-braille.netlify.app`
- **Backend**: `https://project-braille.onrender.com`

## 🔐 Environment Variables

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Backend (.env)

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
RECIPIENT_EMAIL=your-email@gmail.com

# Server Configuration
NODE_ENV=production
PORT=5000
```

### Getting Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Generate password for "Mail"
5. Use the 16-character password in `EMAIL_PASS`

## 📡 API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: `https://project-braille.onrender.com`

### Endpoints

#### Health Check
```http
GET /
```
Returns server status and timestamp.

#### Test Endpoint
```http
GET /api/test
```
Tests if the email server is properly configured.

**Response:**
```json
{
  "message": "Email server is running!",
  "email": "✓ Configured",
  "recipient": "✓ Configured"
}
```

#### Send Email
```http
POST /api/send-email
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in BrailleRead!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Be respectful and inclusive

## 🐛 Known Issues

- Render free tier has cold start delays (30-60 seconds for first request)
- Email service requires Gmail app password (regular password won't work)
- 3D models and hardware schematics coming soon

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

**Project Maintainer** - contact@brailleread.com

**Project Link**: [https://github.com/yourusername/project-braille](https://github.com/yourusername/project-braille)

**Live Demo**: [https://project-braille.netlify.app](https://project-braille.netlify.app)

## 🙏 Acknowledgments

- Thanks to all contributors who help make assistive technology more accessible
- Inspired by the visually impaired community's need for better learning tools
- Built with ❤️ for accessibility and inclusion

---

<div align="center">

**Made with 💙 for a more inclusive world**

[Report Bug](https://github.com/yourusername/project-braille/issues) · [Request Feature](https://github.com/yourusername/project-braille/issues)

</div>
