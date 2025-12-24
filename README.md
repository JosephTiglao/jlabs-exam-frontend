# IP GeoTracker – Frontend (Vite + React)

This repository contains the **frontend application** for the IP GeoTracker project. The frontend is built with **React (Vite)** and can run **locally** or be accessed **online via Vercel hosting**.

---

## Tech Stack

- React (Vite)
- JavaScript
- Axios
- React Leaflet (Maps)
- Font Awesome (Icons)

---

## Live Demo (Hosted Version)

The frontend is deployed on **Vercel** and can be accessed online:

```
https://jlabs-exam-frontend-joseph-tiglaos-projects.vercel.app
```

---

## Project Structure

```
jlabs-exam-frontend/
├── src/
│   ├── components/
│   │   ├── MapUpdater.jsx
│   ├── pages/
│   │   ├── Login.css
│   │   ├── Login.jsx
│   │   ├── Home.css
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
└── vite.config.js
```

---

## Setup & Installation (Local Machine)

### Requirements

- Node.js v18 or later
- npm

> Note: Developed and tested using **Node.js v22.x**

---

### Install Dependencies

```bash
npm install
```

---

## Authentication (Test Credentials)

Use the following credentials to log in:

```
Email: jlabs@gmail.com
Password: password123
```

---

## API Configuration (Local vs Online)

The frontend dynamically switches API URLs using **environment variables**.

### `.env` Example

```env
VITE_API_URL=http://localhost:3000
```

### Online (Vercel Backend)

```env
VITE_API_URL=https://jlabs-exam-backend.vercel.app
```

The login request is sent using:

```js
axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data);
```

This allows the application to work both **offline (local backend)** and **online (hosted backend)**.

---

## Running the Frontend Locally

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## Map & Location Features

- Displays IP geolocation using **React Leaflet**
- Automatically updates marker position
- Display location details (city, region, country)
- Displays a fallback message when no location data is available

---

## Notes

- The app supports both **local** and **hosted** backends
- CORS is handled on the backend

---

## 👨‍💻 Author

Joseph Tiglao
