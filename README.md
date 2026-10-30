# 🎬 Movie Flex

A responsive, feature-rich web application designed to browse, search, and explore movies and TV shows across diverse genres. Built with **React**, **Bootstrap**, and powered by **The Movie Database (TMDB) API**.

---

## 🚀 Features

- 🔍 **Browse & Search:** Explore trending movies, top-rated films, and television shows.
- 🎭 **Genre Filtering:** Filter titles by action, comedy, drama, and custom categories.
- 📽️ **Trailer Modals:** Watch official trailers directly within clean popup modal windows.
- 📱 **Responsive Design:** Optimized layout for mobile, tablet, and desktop screens.
- ⚡ **Dynamic Routing:** Seamless multi-page navigation using `react-router-dom`.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React Hooks (`useState`, `useEffect`)
- **Routing:** React Router DOM
- **UI Framework:** Bootstrap / React-Bootstrap, Custom CSS
- **Data Source:** [The Movie Database (TMDB) API](https://www.themoviedb.org/)
- **Bundler / Build Tool:** Vite / Create React App

---

## 📁 Project Structure

```text
Movie-Flex/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── Allmovies.jsx
│   │   ├── Movie.jsx
│   │   ├── Moviebox.jsx
│   │   ├── Action.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md
