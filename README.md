# 🚗 Car Rental Platform (MERN stack Project)

A complete full-stack Car Rental Platform where users can explore cars, view details, book vehicles, manage bookings, and handle their own car listings with secure authentication, modern UI, and scalable backend architecture.

🔗 Live Site: https://car-rental-client-t2eb.vercel.app/
🔗 Backend API: https://car-rental-server-fdq93562m-codebymonir.vercel.app/
🔗 GitHub Client: https://github.com/CodeByMonir/carRental-Client
🔗 GitHub Server: https://github.com/CodeByMonir/carRental-Server

---

## ✨ Key Features
- Secure authentication system using JWT (protected routes)
- Google login + email/password authentication
- Browse and explore all available cars from database
- Full car details page with booking system
- Add, update, and delete car listings (owner control)
- User-specific booking management system
- Search cars by name using MongoDB regex
- Filter cars by car type (SUV, Sedan, Luxury, etc.)
- Featured cars section (limited results from DB)
- Fully responsive UI for mobile, tablet, and desktop
- Loading spinner + proper error handling (no default alerts)
- Persistent login (no logout on refresh)
- Clean, recruiter-friendly UI design

---

## 🛠️ Tech Stack
Frontend: Next.js / React, Tailwind CSS, Axios, React Hook Form, Toast Notifications, Framer Motion  
Backend: Node.js, Express.js, MongoDB, JWT (JOSE), CORS, dotenv  

---

## 📡 API Endpoints
GET /cars → get all cars  
GET /cars/:id → get car details  
POST /cars → add car  
PATCH /update/:id → update car  
DELETE /added-cars/:id → delete car  
GET /added-cars/:id → user cars  
GET /featured-cars → featured cars  

POST /booking → create booking  
GET /booking/:id → user bookings  

---

## 🏠 Pages
Home → banner, available cars (6+ cards), static sections  
Explore Cars → all cars with search & filter  
Car Details → full info + booking  
Add Car → add new listing (private)  
My Added Cars → update & delete cars  
My Bookings → view booking history  

---

## 🔐 Authentication Flow
Email/password login + Google login supported. JWT token-based authentication used. Protected routes ensure only logged-in users can access private pages. Login persists after refresh.

---

## 🧠 Advanced Features
MongoDB $regex search, filtering by car type, booking count increment using $inc, secure middleware protection, optimized API structure, and scalable folder architecture.

---

## 📱 UI/UX
Fully responsive design, equal-sized cards, consistent spacing, clean typography, modern layout, and recruiter-friendly interface with no lorem ipsum or default alerts.

---

## ❌ Error Handling
Custom 404 page, loading spinner during API calls, and user-friendly error messages using toast/custom UI.

---

## 🚀 Deployment
Frontend: Vercel  
Backend: Vercel  
Database: MongoDB Atlas  

---

## 👨‍💻 Developer
Monir Hossen
GitHub: https://github.com/CodeByMonir 

---

## ⭐ Final Note
This project is a production-ready full-stack Car Rental system built with modern web technologies, secure authentication, and real-world scalable architecture for portfolio and recruiter evaluation.