# 📋 MERN Stack Machine Test – Admin, Agent & CSV Distribution App

## 🎯 Objective

Create a full-stack MERN application with the following core features:

1. Admin Login
2. Agent Management
3. Upload and Distribute CSV Data

---

## 🚀 Features

### ✅ 1. Admin Login

- Email and Password authentication
- JWT-based login system
- On success: redirect to dashboard
- On failure: show validation or error message

### ✅ 2. Agent Management

- Add new agents with:
  - Name
  - Email
  - Mobile number (with country code)
  - Password (hashed)
- View all agents
- (Optional: Update & Delete agents)

### ✅ 3. CSV Upload & Task Distribution

- Accepts `.csv`, `.xlsx`, `.xls` files
- Required Fields in File:
  - `FirstName` (Text)
  - `Phone` (Number)
  - `Notes` (Text)
- Validates format and content
- Distributes tasks equally among 5 agents
  - If uneven, distributes remaining items sequentially
- Saves all distributed tasks to MongoDB
- Frontend displays tasks per agent

---

## 🛠 Tech Stack

| Layer       | Technology           |
| ----------- | -------------------- |
| Database    | MongoDB              |
| Backend     | Node.js, Express.js  |
| Frontend    | React.js             |
| Auth        | JWT (JSON Web Token) |
| File Upload | Multer, xlsx         |

---

---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the `backend/` directory with:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdbname
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

```

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm start
```
