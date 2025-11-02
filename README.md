🍬 Sweet Shop Management System

A full-stack MERN application that allows users to browse, purchase, and manage sweets.
It features role-based authentication, admin controls, and a responsive frontend interface.

🚀 Features
👥 User Roles

Admin
Add new sweets 🧁
Edit existing sweets ✏️
Delete sweets 🗑️
View stock and manage quantity

User
View available sweets 🍫
Purchase sweets (select quantity) 💳

🖥️ Tech Stack
Layer	                    Technology
Frontend	      React.js, React Router, Context API
Backend	              Node.js, Express.js
Database	          MongoDB (Mongoose ODM)
Authentication	  JWT (JSON Web Token)
Testing	              Jest + Supertest
Styling	                  Custom CSS

⚙️ Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/<your-username>/SweetShopManagement.git
cd SweetShopManagement

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside the backend/ folder:
MONGO_URI=mongodb+srv://<your-db-uri>
JWT_SECRET=your_jwt_secret
PORT=5000

Run the backend server:
npm run dev

Your backend runs at:
👉 http://localhost:5000


3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev

Your frontend runs at:
👉 http://localhost:5173


🧪 Running Tests
To ensure backend routes and logic are working correctly:
cd backend
npm test


✅ Tests cover:
Sweet creation
Fetching sweets
Updating sweets
Purchasing sweets
Deleting sweets

🔐 API Endpoints
Method	        Endpoint	              Description	          AuthRequired
POST	       /api/auth/register	      Register a new user	        ❌
POST	       /api/auth/login	        Login & get token	          ❌
GET	         /api/sweets	               Get all sweets	          ✅
POST	       /api/sweets	            Add new sweet (Admin)	      ✅
PUT	         /api/sweets/:id	         Update sweet (Admin)	      ✅
POST	       /api/sweets/:id/purchase	   Purchase sweets	        ✅
DELETE	     /api/sweets/:id	         Delete sweet (Admin)	      ✅


🧁 Default User Roles
Role	          Capabilities
Admin	      Add, edit, delete sweets
User	      View and purchase sweets

SweetShopManagement/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── vite.config.js
│
└── README.md


🧠 Test-Driven Development (TDD)
All backend routes are verified using Jest + Supertest.
Ensures stability, correctness, and error handling for CRUD and purchase operations.
