# 📅 Appointment Booking App

A full-stack appointment booking application built with JavaScript, enabling users to schedule, manage, and track appointments with ease.

---

## 🚀 Features

- User authentication (register/login)
- Browse available services and providers
- Book, reschedule, and cancel appointments
- Real-time availability calendar
- Email/SMS notifications and reminders
- Admin dashboard for managing schedules and providers
- Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT + bcrypt |
| Real-time | Socket.io |
| Email Notifications | Nodemailer |
| Date/Time | Day.js |
| Testing | Jest, Supertest |

---

## 📁 Project Structure

```
appointment-booking-app/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── context/         # React Context / state management
│       ├── hooks/           # Custom hooks
│       ├── services/        # API call functions
│       └── utils/
├── server/                  # Express backend
│   ├── controllers/         # Route handlers
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── middleware/          # Auth, error handling, etc.
│   ├── utils/
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/appointment-booking-app.git
cd appointment-booking-app
```

2. **Install dependencies**

```bash
# Install root/server dependencies
npm install

# Install client dependencies
cd client && npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/appointments
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

4. **Run the application**

```bash
# Development — runs both server and client concurrently
npm run dev

# Server only
npm run server

# Client only
npm run client
```

The client will run on `http://localhost:3000` and the API on `http://localhost:5000`.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Appointments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/appointments` | Get all appointments (admin) |
| GET | `/api/appointments/me` | Get current user's appointments |
| POST | `/api/appointments` | Book a new appointment |
| PUT | `/api/appointments/:id` | Reschedule an appointment |
| DELETE | `/api/appointments/:id` | Cancel an appointment |

### Availability
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/availability/:providerId` | Get available slots for a provider |

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 🚢 Deployment

### Build for production

```bash
cd client && npm run build
```

The Express server will serve the static build in production mode. Set `NODE_ENV=production` in your environment.

### Environment

Ensure the following are set in your production environment:

- `NODE_ENV=production`
- `MONGO_URI` pointing to your production database
- Valid `JWT_SECRET`
- Correct email SMTP credentials

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) format.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions or support, open an issue or reach out at `your-email@example.com`.
