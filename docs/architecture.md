
---

### 2️⃣ ARCHITECTURE.md  

```markdown
# System Architecture – Smart Journey Cards (with Auth + History)

## ⚙️ Components
- **Frontend (React)**
  - Login/Signup forms.
  - Capture voice input → send audio to Whisper.
  - Fetch `/query`, `/recommend`, `/locations`.
  - Show **cards** with AI descriptions.
  - Razorpay sandbox checkout integration.
  - Display **past travel history**.

- **Backend (Node.js + Express + MongoDB)**
  - **Auth APIs**:
    - `/signup`: Create account (email + password, `isVerified=false` by default).
    - `/login`: Authenticate and issue JWT session token.
  - **User History APIs**:
    - `/history`: Save queries & chosen routes to MongoDB.
    - `/history/:userId`: Fetch user’s past history.
  - **Travel APIs**:
    - `/query`: Calls OpenAI → parse query into JSON.
    - `/recommend`: Returns ranked travel options from mock dataset.
    - `/locations`: Calls Nominatim API → lat/lng for a place.
  - **Middleware**:
    - CORS enabled.
    - JWT-based authentication.
    - Error handling.

- **APIs**
  - OpenAI (GPT, Whisper).
  - Nominatim (geocoding).
  - Razorpay Sandbox (payments).

- **Database (MongoDB + Mongoose)**
  - `users` collection: stores login info + confirmation flag.
  - `history` collection: stores queries, parsed data, and selected routes.

---

## 🗄️ Mock Dataset (Example)
```json
{
  "routes": [
    {
      "source": "KPR College",
      "destination": "Coimbatore Airport",
      "options": [
        { "mode": "Bus", "cost": 30, "time": 45, "comfort": 2, "route": ["KPR College", "Peelamedu", "Airport"] },
        { "mode": "Auto", "cost": 150, "time": 30, "comfort": 3, "route": ["KPR College", "Airport"] },
        { "mode": "Cab", "cost": 350, "time": 25, "comfort": 5, "route": ["KPR College", "Avinashi Road", "Airport"] }
      ]
    }
  ]
}
User → Frontend (React)
   |       \
   |        Whisper → /query → OpenAI → JSON Intent
   |                /recommend → Mock Dataset → AI Cards
   |                /locations → Nominatim → Lat/Lng
   |                /history → MongoDB (store user past trips)
   |                /signup, /login → MongoDB (users)
   |
   Razorpay Sandbox → Mock Payment
