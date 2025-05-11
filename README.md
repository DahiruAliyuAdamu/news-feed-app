# React Client App

A modern web application built with **React.js** and **Tailwind CSS**, featuring user authentication, protected routes, post creation, and profile management.

---

## 🚀 Features

- 🔐 User Authentication (Login, Registration, Change Password)
- 🧾 Create and View Posts
- 🧍 Profile Management
- 🔒 Protected Routes
- 🎨 Tailwind CSS for Styling
- ⚛️ React Context API for Auth State
- 🔧 Environment-based configuration (`.env.local`, `.env.production`)

---

## 🧱 Project Structure

```
client/
├── public/              # Static files
├── src/                 # React source files
│   ├── components/      # Reusable components (Navbar, EditPostModal, etc.)
│   ├── helpers/         # Context and utility files
│   ├── pages/           # Main page components (Login, Profile, Home, etc.)
│   ├── App.js           # Main routing logic
│   ├── index.js         # Entry point
│   └── App.css          # Global styles
├── .env.local           # Local development env variables
├── .env.production      # Production env variables
├── tailwind.config.js   # TailwindCSS configuration
├── postcss.config.js    # PostCSS config
└── package.json         # Project metadata and dependencies
```

---

## 📦 Getting Started

### Prerequisites

- Node.js (>= 14)
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd client
npm install
```

### Running Locally

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## ⚙️ Environment Variables

Set the following in your `.env.local` or `.env.production` file:

```env
REACT_APP_API_URL=https://your-backend-api.com
```

---

## 🧪 Scripts

| Command            | Description                         |
|-------------------|-------------------------------------|
| `npm start`       | Run app in development mode         |
| `npm run build`   | Create a production-ready build     |
| `npm test`        | Run tests (if configured)           |
| `npm run lint`    | Lint JS files (if ESLint configured)|

---

## 🧰 Built With

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Context API](https://reactjs.org/docs/context.html)

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 🙋‍♀️ Contributing

Contributions are welcome! Please fork the repository and create a pull request.

---

## 📬 Contact

For issues or feature requests, please open an issue on the GitHub repository.
