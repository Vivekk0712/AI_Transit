# User & Developer Stories – Smart Journey Cards

These stories cover **Signup/Login, AI-powered travel queries, journey recommendations, routes, payments, and history**.  
They are written in a detailed format for feeding into Gemini CLI during the **coding or designing phase**.

---

## 👤 Authentication Stories

### Story 1: User Signup
- As a **new user**, I want to **sign up with my email and password** so that I can create an account.
- Acceptance Criteria:
  - API: `POST /signup`
  - Input: `{ "email": "user@example.com", "password": "mypassword" }`
  - Password stored **hashed** in MongoDB.
  - Default field: `"isVerified": false`.
  - Response: `{ "message": "Signup successful, please confirm your email" }`

### Story 2: User Login
- As a **registered user**, I want to **log in with email and password** so that I can access the app.
- Acceptance Criteria:
  - API: `POST /login`
  - Input: `{ "email": "user@example.com", "password": "mypassword" }`
  - On success → return **JWT token**.
  - Response: `{ "token": "jwt_token_here" }`

### Story 3: Email Confirmation (Mock)
- As a **user**, I want to have an `isVerified` field in MongoDB so that my account can later support real email verification.
- Acceptance Criteria:
  - User schema includes `"isVerified": false` by default.
  - Can be manually set to `true` for demo.

---

## 🧠 Travel Query & AI Stories

### Story 4: Natural Query Parsing
- As a **user**, I want to **ask in natural language** (typed or spoken) how to travel between two places so that the app understands my intent.
- Acceptance Criteria:
  - API: `POST /query`
  - Input: `{ "query": "Cheapest way to reach Coimbatore Airport from KPR College" }`
  - Uses **OpenAI API** to parse.
  - Response:
    ```json
    {
      "source": "KPR College",
      "destination": "Coimbatore Airport",
      "intent": "cheapest"
    }
    ```

### Story 5: Travel Recommendations
- As a **user**, I want to **see the best travel options** sorted by my intent (cheapest, fastest, comfortable).
- Acceptance Criteria:
  - API: `POST /recommend`
  - Input: `{ "source": "KPR College", "destination": "Coimbatore Airport", "intent": "cheapest" }`
  - Response:
    ```json
    [
      { "mode": "Bus", "cost": 30, "time": 45, "comfort": 2, "route": ["KPR College", "Peelamedu", "Airport"] },
      { "mode": "Auto", "cost": 150, "time": 30, "comfort": 3, "route": ["KPR College", "Airport"] },
      { "mode": "Cab", "cost": 350, "time": 25, "comfort": 5, "route": ["KPR College", "Avinashi Road", "Airport"] }
    ]
    ```

### Story 6: AI Journey Cards with Personality
- As a **user**, I want each travel option to appear as a **smart card with AI text** so that it feels like a recommendation, not just data.
- Acceptance Criteria:
  - Example card:
    ```json
    {
      "mode": "Bus",
      "cost": 30,
      "time": 45,
      "comfort": 2,
      "ai_description": "🟢 Budget-friendly ride for just ₹30, but expect a longer trip."
    }
    ```

---

## 🗺️ Locations & Routes Stories

### Story 7: Geocoding Place Names
- As a **user**, I want to **enter a place name** and get latitude & longitude so that the system can locate it on a map.
- Acceptance Criteria:
  - API: `GET /locations?place=Coimbatore Airport`
  - Uses **Nominatim OSM API**.
  - Response:
    ```json
    { "lat": 11.0291752, "lng": 77.0411825 }
    ```

### Story 8: Route Details
- As a **user**, I want to **click a journey card** and see the actual stops/route path so that I know how the trip will progress.
- Acceptance Criteria:
  - Each option in mock dataset includes `"route": ["Point A", "Point B", "Destination"]`.
  - When a card is clicked, show this sequence.

---

## 💳 Payment Stories

### Story 9: Mock Payment
- As a **user**, I want to **simulate paying for a chosen route** so that I feel like I booked a ticket.
- Acceptance Criteria:
  - Razorpay Sandbox integration.
  - Frontend button: **Book Now** → triggers mock checkout.
  - On success, show `"Ticket confirmed 🎉"`.

---

## 📜 History Stories

### Story 10: Save Travel History
- As a **user**, I want my **queries and selected options** stored in MongoDB so that I can see past trips.
- Acceptance Criteria:
  - API: `POST /history`
  - Input:
    ```json
    {
      "userId": "mongo_object_id",
      "query": "Cheapest way to reach Airport from KPR College",
      "parsedQuery": { "source": "KPR College", "destination": "Coimbatore Airport", "intent": "cheapest" },
      "selectedOption": { "mode": "Bus", "cost": 30, "time": 45, "comfort": 2 }
    }
    ```
  - Stored with timestamp.

### Story 11: Fetch Travel History
- As a **user**, I want to **see my travel history** so that I can review past trips.
- Acceptance Criteria:
  - API: `GET /history/:userId`
  - Response:
    ```json
    [
      {
        "query": "Cheapest way to reach Airport from KPR College",
        "selectedOption": { "mode": "Bus", "cost": 30, "time": 45 },
        "timestamp": "2025-09-26T10:00:00Z"
      }
    ]
    ```

---

## 🔐 Security Stories

### Story 12: Protected Routes
- As a **developer**, I want to ensure only logged-in users can access `/recommend`, `/history`, and `/locations` so that data is secure.
- Acceptance Criteria:
  - JWT authentication middleware.
  - Unauthorized requests return `{ "error": "Unauthorized" }`.
