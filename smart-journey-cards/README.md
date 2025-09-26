
# Smart Journey Cards

## 🚀 Project Overview

Smart Journey Cards is an AI-powered trip planning platform that helps commuters find the cheapest, fastest, or most comfortable travel options.

Unlike traditional route apps, our system provides:

- Voice-based natural queries (via Whisper).
- AI-parsed structured results (via GPT).
- Smart journey cards with friendly AI-generated descriptions.
- Interactive route details (mock bus/auto/cab options).
- Mock payment integration (Razorpay sandbox).
- User accounts + history stored in MongoDB.

This makes our solution unique for hackathons — it combines AI, maps, payments, and personalization in a simple but powerful demo.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, OpenAI API, Nominatim (OSM), dotenv, cors, bcrypt, jsonwebtoken
- **Frontend**: React, React Router, Axios, Razorpay Checkout
- **AI Models**:
  - Whisper → voice to text
  - GPT → parse queries + generate descriptions
- **Database**: MongoDB (users, history)
- **Payment**: Razorpay Sandbox

## 🏁 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- An OpenAI API key
- A Razorpay account for sandbox keys

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/smart-journey-cards.git
   cd smart-journey-cards/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the `backend` directory and add the following environment variables:

   ```
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

### Frontend Setup

1. **Navigate to the `frontend` directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## 🏃‍➡️ Running the application

1. **Start the backend server**

   ```bash
   cd ../backend
   npm start
   ```

   The backend server will start on port 5000.

2. **Start the frontend development server**

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend application will open in your browser at `http://localhost:3000`.

##  API Endpoints

### Authentication

- `POST /api/auth/signup`: User signup.
- `POST /api/auth/login`: User login.

### Travel

- `POST /api/travel/query`: Parse a natural language travel query.
- `POST /api/travel/recommend`: Get travel recommendations.
- `GET /api/travel/locations`: Geocode a place name.

### History

- `POST /api/history`: Save a travel query and selected option to the user's history.
- `GET /api/history/:userId`: Get the user's travel history.
