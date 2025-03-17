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



---

## Backend Implementation

- **GraphQL API:**  
  The backend is built on Express with Apollo Server. GraphQL type definitions and resolvers define queries and mutations for user management, clock in/out, and dashboard statistics.

- **Authentication:**  
  Custom JWT authentication is implemented in `src/utils/auth.js`. Additionally, Auth0 token verification is available via `src/utils/auth0.js`.

- **Database:**  
  Prisma ORM connects to a MongoDB database. The Prisma schema in `prisma/schema.prisma` defines the `User` and `Shift` models.

- **Geolocation Check:**  
  The `clockIn` mutation in `src/schema/resolvers.js` uses the Haversine formula to ensure the care worker is within the allowed perimeter before recording a clock in event.

---

## Frontend Implementation

### PWA Integration

- **Vite and Vite PWA Plugin:**  
  The project is bootstrapped with Vite. The `vite.config.js` file includes the `vite-plugin-pwa` to generate a service worker and manifest for offline support and installability.

- **Manifest and Icons:**  
  The PWA manifest is defined in `public/manifest.json` with necessary metadata and icon references.

### Automatic Location Detection

- **GeoNotifier Component:**  
  The new `GeoNotifier.jsx` component continuously monitors the user’s geolocation using the browser's Geolocation API. When a care worker enters or leaves the defined geofence, it triggers a notification (using Ant Design's notification component) suggesting to clock in or clock out accordingly.

- **Real-Time Notifications:**  
  These notifications enhance user experience by providing timely reminders, improving workflow efficiency in healthcare settings.

### UI/UX Enhancements

- **Ant Design:**  
  The frontend leverages Ant Design for a professional and responsive user interface, including menus, forms, buttons, cards, and tables.

- **Auth0 Integration:**  
  The Auth0 React SDK is integrated via `auth0-provider-with-history.jsx`, allowing users to log in using Auth0 (with Google and email options).

---

## Setup and Installation

### Backend

1. **Navigate to the `/backend` directory.**
2. Install dependencies:
   ```bash
   npm install

## Project Structure

The project is split into two main directories: **backend** and **frontend**.

### Backend

