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
POST         /api/sweets/:id/restock   Restock sweet(Admin only)  ✅

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

🧠 AI Usage Transparency
This project was co-developed with the assistance of OpenAI’s ChatGPT (GPT-5), which was used to:
Design backend routes and test cases (TDD)
Generate modular, optimized React code
Refactor frontend components for clean architecture
Write documentation (README, code comments)
Debug test environment (Jest & ES Modules)
All AI-generated code was reviewed, tested, and modified as needed by the developer (Kethan Acharya).

📸 Screenshots
Register:
<img width="1512" height="1419" alt="Screenshot 2025-11-02 225220" src="https://github.com/user-attachments/assets/00b4bca1-934b-4a28-ba46-77f53c0b736d" />

Login:
<img width="1297" height="1317" alt="Screenshot 2025-11-02 225323" src="https://github.com/user-attachments/assets/026e15c1-dd22-4057-833c-ad81040e6e25" />

User Dashboard:
<img width="2853" height="1473" alt="Screenshot 2025-11-02 225346" src="https://github.com/user-attachments/assets/65059ce0-b0e5-43e7-9e05-30e7d7a87a48" />

Purchase:
<img width="2853" height="1473" alt="Screenshot 2025-11-02 225346" src="https://github.com/user-attachments/assets/eb2ecaba-7157-478a-b70b-e97e194ced08" />

Admin Dashboard:
<img width="2829" height="1407" alt="Screenshot 2025-11-02 225445" src="https://github.com/user-attachments/assets/8061dc24-d59f-4426-a582-a3fa0e7c0f40" />

Editing:
<img width="2829" height="1407" alt="Screenshot 2025-11-02 225445" src="https://github.com/user-attachments/assets/4070aa4e-d903-4c4b-87d6-914b31b6684b" />

Deleting:
<img width="1931" height="1451" alt="Screenshot 2025-11-02 225616" src="https://github.com/user-attachments/assets/d19e65fb-4d0d-46de-bfe0-7a1fe69bb6b8" />

Updated Dashboard after delete:
<img width="2841" height="1036" alt="Screenshot 2025-11-02 225633" src="https://github.com/user-attachments/assets/468530d5-d5db-463e-90d7-7e47aaa1e638" />
