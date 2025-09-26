🚀 Project Overview

We are building Smart Journey Cards, an AI-powered trip planning platform that helps commuters find the cheapest, fastest, or most comfortable travel options.

Unlike traditional route apps, our system provides:

Voice-based natural queries (via Whisper).

AI-parsed structured results (via GPT).

Smart journey cards with friendly AI-generated descriptions.

Interactive route details (mock bus/auto/cab options).

Mock payment integration (Razorpay sandbox).

User accounts + history stored in MongoDB.

This makes our solution unique for hackathons — it combines AI, maps, payments, and personalization in a simple but powerful demo.

🎯 Problem We’re Solving

Commuters face decision fatigue when choosing between buses, autos, or cabs.

Should they choose the cheapest?

Or the fastest?

Or the most comfortable?

Most apps show raw data (maps, fares), but don’t help users make smart choices.

💡 Our Solution

Smart Journey Cards acts like a travel buddy:

User speaks or types a query → “Cheapest way to reach Airport from KPR College”.

System parses the query → identifies source, destination, intent.

AI generates journey cards ranked by cheapest, fastest, most comfortable.

Each card includes:

Cost 💰

Time ⏱️

Comfort ⭐

AI personality description (e.g., “🟢 Budget-friendly ride, but expect a longer trip”).

User clicks a card → sees route details.

User books → mock Razorpay payment flow.

Query & choice saved into MongoDB history.

Over time → system personalizes card order.

🛠️ Tech Stack

Backend: Node.js, Express, MongoDB, Mongoose, OpenAI API, Nominatim (OSM), dotenv, cors

Frontend: React (cards UI, login/signup, Razorpay integration)

AI Models:

Whisper → voice to text

GPT → parse queries + generate descriptions

Database: MongoDB (users, history)

Payment: Razorpay Sandbox

📂 Key Features in Detail
🔐 Authentication

Signup/Login with email + password (stored in MongoDB).

isVerified flag for mock email confirmation.

JWT-based authentication for protected routes.

🧠 Travel Query

/query → parses user’s natural language query into structured JSON.

🛺 Recommendations

/recommend → returns mock transport options (bus, auto, cab).

Sorted based on intent (cheapest, fastest, comfortable).

Includes AI-generated friendly card text.

🗺️ Locations

/locations → geocoding via Nominatim OSM (free, no key required).

📍 Route Details

Each transport option contains a mock route path (list of stops).

Displayed when a card is clicked.

💳 Payments

Razorpay sandbox integration.

Simulated checkout → “Ticket Confirmed 🎉”.

📜 History

Queries + chosen routes stored in MongoDB.

/history → returns a user’s travel history.

✨ Personalization

Reorder cards automatically based on past user choices (cheap, fast, or comfort bias).

🔗 Demo Flow (End-to-End)

User signs up / logs in.

User says: “Fastest way to Peelamedu from Gandhipuram”.

Whisper → /query → OpenAI JSON intent.

/recommend → returns options (sorted).

Frontend shows journey cards.

User clicks Fastest → route details displayed.

User clicks Book → Razorpay sandbox payment.

Query & selection stored in MongoDB history.

Next time → system reorders cards based on preference.

🌟 Why It’s Unique

Voice + AI integration → Natural, conversational experience.

Smart cards with personality → Friendly, memorable UX.

Payment simulation → End-to-end journey, not just routes.

History + personalization → Learns user’s travel style.

Uses OSM (free) → Practical for hackathons (no Google billing).