# ☕ Brew Haven Coffee Shop - MERN Stack Application

A full-stack, production-ready Coffee Shop web application with React frontend, Node.js backend, and MongoDB database.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
```bash
cd app
npm install
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Configure Environment Variables**

Backend (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/brewhaven
FRONTEND_URL=http://localhost:5173
```

Frontend (`app/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

**Option 1: Run Both Servers (Recommended)**

Terminal 1 - Backend:
```bash
cd server
node index.js
```

Terminal 2 - Frontend:
```bash
cd app
npm run dev
```

**Option 2: Frontend Only (Uses Static Data)**
```bash
cd app
npm run dev
```

### Seed Database (Optional)
```bash
cd server
npm run seed
```

## 📁 Project Structure

```
brewhaven-coffee/
├── app/                          # Frontend React Application
│   ├── src/
│   │   ├── api/                  # API Configuration
│   │   │   ├── axios.ts          # Axios instance
│   │   │   └── productService.ts # Product API calls
│   │   ├── components/           # Reusable UI Components
│   │   ├── contexts/             # React Contexts
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   │   └── ProductContext.tsx
│   │   ├── data/                 # Static Data
│   │   ├── pages/                # Page Components
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
├── server/                       # Backend Node.js Application
│   ├── config/
│   │   ├── db.js                 # MongoDB Connection
│   │   └── seed.js               # Database Seeder
│   ├── models/
│   │   └── Product.js            # Product Model
│   ├── controllers/
│   │   └── productController.js  # Product Controller
│   ├── routes/
│   │   └── productRoutes.js      # Product Routes
│   ├── index.js                  # Main Server File
│   ├── .env
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get categories
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Health Check
- `GET /api/health` - API health status

## 🛠️ Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios
- shadcn/ui Components

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS

## 📝 Features

- **Responsive Design** with Tailwind CSS
- **Smooth Animations** powered by Framer Motion
- **Product Catalog** with categories
- **Shopping Cart** functionality
- **User Authentication** (demo mode)
- **Admin Panel** for product management
- **Fallback to Static Data** when API unavailable

## 🔧 Development

The application is designed to work in two modes:

1. **Full Stack Mode**: Both frontend and backend running, connected to MongoDB
2. **Frontend Only Mode**: Uses static product data when backend is unavailable

This ensures the application always displays products, even without a running backend.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set `VITE_API_URL` environment variable to your backend URL

### Backend (Heroku/Railway/Render)
1. Set environment variables
2. Deploy the `server` folder
3. Update `FRONTEND_URL` in backend env

---

Made with ☕ and ❤️ by Brew Haven Team
