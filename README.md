
# 🚛 Transporter Management System

A web-based application built with **Node.js**, **Express**, **MongoDB**, and **EJS** that allows administrators to manage transporter information including creation, editing, searching, and deletion of transporter records.

## 📦 Features

- 🔐 Admin authentication (registration/login/logout)
- ✅ Session-based route protection
- ➕ Add new transporters
- 🔍 Search transporters by ID
- ✏️ Edit existing transporter details
- ❌ Delete transporters
- 📊 Display total count of transporters

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine
- **Session Handling**: express-session
- **Method Override**: Supports PATCH/DELETE via HTML forms

## 🧱 Project Structure

```

TransporterApp/
│
├── model/
│   ├── AdminSchema.js
│   └── TransportSchema.js
│
├── public/
│   └── (Static assets like CSS/JS if needed)
│
├── views/
│   ├── index.ejs
│   ├── register.ejs
│   ├── login.ejs
│   └── update.ejs
│
├── app.js
└── README.md

````

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repo:**

```bash
git clone https://github.com/Siraj-Dujana/Transport-Management-System.git
cd transporter-management
````

2. **Install dependencies:**

```bash
npm install
```

3. **Start MongoDB** (locally):

Make sure MongoDB is running at `mongodb://127.0.0.1:27017`.

4. **Run the application:**

```bash
node app.js
```

Visit `http://localhost:3000` in your browser.

## 🧪 Admin Credentials

> You must first register as an admin at `/admin/register`, and then log in via `/admin/login`.

## ✍️ Example Transporter Entry

| Field           | Type   | Description                   |
| --------------- | ------ | ----------------------------- |
| id              | String | Auto-generated short UUID     |
| transportName   | String | Name of the transport company |
| transporterName | String | Contact person name           |
| pCell           | String | Primary contact number        |
| sCell           | String | Secondary contact number      |
| address         | String | Transporter address           |
| city            | String | City location                 |

## 🛡️ Security Notes

* Make sure to **change the session secret** in production.
* Passwords are currently stored as plain text (for demo). Use bcrypt for hashing in production.

## 🤝 Contributing

Feel free to fork the repo, improve features, or submit pull requests!


