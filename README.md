# Plantly

Plantly is a fullstack web application that helps users care for their houseplants by providing useful information and tools to manage their plant collection.

---

## Live Demo

https://plantly-frontend.onrender.com

## Tech Stack

- **Frontend:** React, Material UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (stored in HttpOnly cookies)
- **Deployment:** Render.com

---

## Features

- Plant catalog with species info and care instructions
- Add plants to personal dashboard with nickname and location
- User registration and login
- Protected routes with cookie-based JWT authentication
- Light and dark mode support
- Dashboard with grid and table views
- Sort and filter plants in the table view
- Edit and delete plant entries
- Responsive UI with snackbar feedback

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NikitaBud/plantly.git
cd plantly
```

### 2. Set up environment variables

Create a `.env` file in `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 3. Install dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 4. Run the app

```bash
# Server&Client (root dir)
npm run dev

# Backend
npm run dev

# Frontend (in separate terminal)
npm start
```

---


## Future Improvements

- Watering reminders
- Email or push notifications
- AI-based plant care suggestions

---

## Author

**Nik Budiakov**\
[GitHub](https://github.com/yourusername)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

