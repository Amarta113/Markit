# Markit -- Multi-Vendor Ecommerce Marketplace

Markit is a full-stack multi-vendor ecommerce platform where multiple sellers can list and manage their products, and buyers can browse, search, and purchase from a unified storefront.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| State Management | Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens) |

---

## Features

### Buyer
- Browse products across all sellers
- Search and filter by category
- Add to cart and wishlist
- User registration, login, and profile management
- Responsive design (mobile + desktop)

### Seller
- Seller registration and dashboard
- Create, update, and delete product listings
- Manage orders and inventory

### General
- Multi-vendor support (each seller has their own storefront)
- Category-based navigation with dropdown
- Sticky navbar on scroll
- Mobile-friendly sidebar navigation

---

## Project Structure

```
markit/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── assets/         # Images, icons
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Cart/
│   │   │   ├── Header/
│   │   │   ├── Wishlist/
│   │   │   └── ...
│   │   ├── pages/          # Route-level pages
│   │   ├── redux/          # Redux store and slices
│   │   ├── static/         # Static data (categories, nav items)
│   │   └── styles/         # Global styles and Tailwind config
│   └── vite.config.js
│
└── backend/                # Express API server
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/markit.git
cd markit
```

**2. Setup the backend**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
npm run dev
```

**3. Setup the frontend**
```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`

---

## API Reference

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| GET | `/api/auth/me` | Get current logged-in user |
| POST | `/api/auth/logout` | Logout user |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/:id` | Get user profile by ID |
| PUT | `/api/user/update` | Update user profile |
| PUT | `/api/user/update-avatar` | Update profile picture |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/products/create` | Create a new product (seller only) |
| PUT | `/api/products/:id` | Update a product (seller only) |
| DELETE | `/api/products/:id` | Delete a product (seller only) |

### Sellers (Shops)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/shop/register` | Register as a seller |
| POST | `/api/shop/login` | Seller login |
| GET | `/api/shop/:id` | Get shop info |
| GET | `/api/shop/products/:id` | Get all products of a shop |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders/create` | Place a new order |
| GET | `/api/orders/user/:id` | Get all orders for a user |
| GET | `/api/orders/seller/:id` | Get all orders for a seller |
| PUT | `/api/orders/:id/status` | Update order status (seller only) |

---

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port for the backend server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `BACKEND_URL` | Base URL of the backend (used in frontend) |

---

## License

This project is licensed under the MIT License.
