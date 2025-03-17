# Healthcare Worker Clock In/Out Application

Welcome to the **Healthcare Worker Clock In/Out Application** – a comprehensive solution for healthcare organizations to manage staff clock in/out activities with robust tracking, analytics, and an enhanced user experience. This project is a full-stack web application featuring:

- **Manager Features:** 
  - Set geofenced perimeters for clocking in.
  - View live attendance and detailed shift logs.
  - Access dashboard analytics (average hours, daily clock-ins, weekly totals).

- **Care Worker Features:**
  - Clock in and clock out with optional notes.
  - Automated geolocation-based validation.
  - Receive notifications when entering or leaving a predefined area.

- **User Authentication:**
  - Custom JWT authentication and Auth0 integration (supporting Google and email logins).

- **Bonus Features:**
  - Progressive Web App (PWA) capabilities for offline support and home screen installation.
  - Automatic location detection with real-time notifications when entering or leaving the clock-in perimeter.

A live demo of the app is available here: [https://healthcare-worker-clock-2.onrender.com](https://healthcare-worker-clock-2.onrender.com)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
  - [PWA Integration](#pwa-integration)
  - [Automatic Location Detection](#automatic-location-detection)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [License](#license)

---

## Tech Stack

- **Backend:**
  - **Node.js, Express, GraphQL:** For building a flexible API.
  - **Prisma ORM with MongoDB:** For robust database connectivity.
  - **JWT & Auth0:** For secure authentication and authorization.
- **Frontend:**
  - **React with Vite:** For a fast development experience.
  - **Ant Design:** For a polished and responsive UI.
  - **Apollo Client:** To handle GraphQL queries and mutations.
  - **Auth0 React SDK:** For seamless third-party authentication.
  - **Vite PWA Plugin:** For service workers and offline capabilities.
  - **Geolocation API:** For automatic location detection and notifications.

---

## Project Structure

The project is split into two main directories: **backend** and **frontend**.

### Backend

