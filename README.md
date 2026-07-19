# CodeSentry AI

> **An AI-Powered Code Review Platform built with the MERN Stack and
> Groq AI**

CodeSentry AI is a full-stack web application that helps developers
analyze source code using AI. Users can create projects, paste code or
upload source files, receive AI-generated code reviews with detailed
findings, visualize analytics through an interactive dashboard, and
export review reports as PDFs.

## 🚀 Features

### Authentication

-   User Registration & Login
-   JWT Authentication
-   Protected Routes
-   Secure Password Hashing

### Project Management

-   Create, View and Delete Projects
-   Project-based Code Reviews

### AI Code Review

-   Paste Code or Upload Files
-   Multiple Languages & Review Types
-   AI Score & Summary
-   Detailed Findings
-   Suggested Fixes
-   Severity Levels

### Dashboard

-   Project & Review Statistics
-   Interactive Charts
-   Recent Reviews

### Review History

-   Search, Filter & Sort
-   View Details
-   Delete Reviews
-   Export PDF Reports

### Profile

-   User Information
-   Review Analytics

## 🛠 Tech Stack

**Frontend** - React.js - Tailwind CSS - React Router - Axios - React
Hot Toast - Recharts - jsPDF

**Backend** - Node.js - Express.js - Prisma ORM - PostgreSQL - JWT -
bcrypt

**AI** - Groq API

## ⚙️ Installation

``` bash
git clone https://github.com/yourusername/CodeReviewAI.git
cd CodeReviewAI

cd server
npm install

cd ../client
npm install
```

## 🔑 Environment Variables

``` env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

## ▶️ Run

``` bash
cd server
npm run dev
```

``` bash
cd client
npm run dev
```

## 📈 Future Improvements

-   GitHub Integration
-   Team Collaboration
-   Multi-file Analysis
-   Drag & Drop Upload
-   AI Chat Assistant

## 👨‍💻 Author

**Mohammed Kaif**

## 📜 License

MIT License
