# TT Recruit — AI-Powered Recruitment Platform

> Final Year Project | Developed in collaboration with **Tunisie Telecom**

![Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat-square&logo=react)
![AI](https://img.shields.io/badge/AI-BERT%20Embeddings-orange?style=flat-square)
![Python](https://img.shields.io/badge/Python-Flask%20Microservice-3776AB?style=flat-square&logo=python)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)

---

## 🧠 What is TT Recruit?

TT Recruit is an intelligent recruitment platform built for **Tunisie Telecom**, one of Tunisia's largest telecommunications companies. The platform automates and enhances the hiring process using **AI-driven CV analysis** and **semantic job matching** — reducing manual screening time and improving candidate-job fit.

This was not a university exercise. It was a **real industry delivery**, built to production standards in collaboration with Tunisie Telecom's HR and IT teams.

---

## ✨ Key Features

### For Recruiters
- 📋 Post and manage job offers
- 🤖 Automatic CV parsing and ranked applicant scoring
- 📊 Review candidates sorted by AI-computed semantic similarity
- ✅ Full hiring workflow management (shortlist → interview → hire)
- 📧 Real-time email notifications at each hiring stage

### For Job Seekers
- 🔍 Browse and apply for job offers
- 📄 Upload CV for automatic parsing and matching
- 📬 Track application status in real time

### AI Engine
- BERT-based semantic embeddings to compute similarity between CVs and job descriptions
- NLP pipeline for automatic CV parsing (skills, experience, education extraction)
- Similarity scoring served via a dedicated Flask microservice

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, JavaScript, HTML/CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI / ML | Python, Flask, BERT / Transformers, scikit-learn |
| Auth | JWT (JSON Web Tokens) |
| Notifications | Nodemailer (real-time email) |
| Version Control | Git / GitHub |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              React Frontend                  │
│   Job Seeker Interface | Recruiter Dashboard │
└──────────────────┬──────────────────────────┘
                   │ REST API
┌──────────────────▼──────────────────────────┐
│         Node.js / Express.js Backend         │
│   Auth · Job Posts · Applications · Email   │
└──────────┬─────────────────┬────────────────┘
           │                 │
┌──────────▼──────┐ ┌────────▼────────────────┐
│    MongoDB      │ │  Flask ML Microservice   │
│   (Main DB)     │ │  BERT Embeddings · NLP   │
└─────────────────┘ └─────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mmdeyssi/TT-recrut-system.git
cd TT-recrut-system

# Install backend dependencies
cd PFE/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install Python ML dependencies
cd ../ml-service
pip install -r requirements.txt
```

### Running the app

```bash
# Start MongoDB
mongod

# Start the Flask ML microservice
cd ml-service
python app.py

# Start the Node.js backend
cd backend
npm run dev

# Start the React frontend
cd frontend
npm start
```

---

## 📸 Screenshots

> _Coming soon — dashboard, job listing, and AI matching views_

---

## 👤 Author

**Mouhib Mdaissi**
- 📍 Mannheim, Germany
- 💼 [linkedin.com/in/mouhib-mdaissi-2262b21ab](https://www.linkedin.com/in/mouhib-mdaissi-2262b21ab)
- 🐙 [github.com/mmdeyssi](https://github.com/mmdeyssi)

---

## 🤝 Acknowledgements

Built in collaboration with **Tunisie Telecom** as a Final Year Engineering Project (PFE) at Faculté des Sciences de Tunis, Université Tunis El Manar.
