# HOQQA

Reservation and management system for HOQQA Lounge.

## Prerequisites

- Node.js
- MongoDB Atlas Account (or local MongoDB)

## Setup & Installation

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Configuration**:
    Create a `.env` file in the root directory. You can use `.env.example` as a template.
    Ensure you add your MongoDB URI.
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hoqqa?retryWrites=true&w=majority
    SECRET_KEY=your_secret_key_here
    PORT=5000
    ```

## Initialization

Run the seed script **once** to populate the database with default data (admin account, initial menu items).
```bash
npm run seed
```

## Running the Application

To run the full application, you need to start both the backend server and the frontend client.

**1. Start the Backend Server:**
```bash
npm run dev:backend
```
The server will start on `http://localhost:5000`.

**2. Start the Frontend Client:**
open a new terminal:
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## Project Structure

- `server/`: Backend source code (Node.js/Express)
- `src/`: Frontend source code (React/Vite)
- `uploads/`: Directory for uploaded images

## Admin Access

The admin dashboard is located at `/x10z`. Access is protected and requires valid credentials.

## Deployment

To deploy this application, you must deploy both the **Frontend** and the **Backend**.

### 1. Backend Deployment (Node.js)
The backend (`server/` folder) must be hosted on a service that supports Node.js (e.g., Render, Railway, Heroku, DigitalOcean).
- Ensure you set the `MONGO_URI` environment variable on your hosting provider.
- The server listens on `PORT` (default 5000).

### 2. Frontend Deployment (Static/SPA)
The frontend (`src/`) can be hosted on services like Netlify, Vercel, or GitHub Pages.
- **Crucial:** You must set the `VITE_API_URL` environment variable in your frontend hosting settings to point to your **deployed backend URL**.
  - Example: `VITE_API_URL=https://your-backend-app.onrender.com/api`
- Without this, the frontend will try to contact `localhost`, which will fail for public users.