# Worknest

## Setup Instructions

### Backend Setup

```bash
cd backend
npm install
Create a .env file inside the backend folder:
PORT=5000
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/worknest"
JWT_SECRET="your_jwt_secret"
Make sure MySQL is running and the worknest database exists.
Run Prisma:
npx prisma generate
npx prisma migrate dev

Start the backend:
npm run dev
Backend URL:
http://localhost:5000
Frontend Setup

Open a new terminal:

cd frontend
npm install

Create a .env.local file inside the frontend folder:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

Start the frontend:

npm run dev

Frontend URL:

http://localhost:3000
Run the Project

Backend terminal:

cd backend
npm run dev

Frontend terminal:

cd frontend
npm run dev

Open the application:

http://localhost:3000