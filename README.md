# FootFlex - Premium Shoe Store

FootFlex is a full-featured MERN stack e-commerce platform specializing in premium footwear for men, women, and kids.

## Features

- Animated 3D landing page with user/admin login options.
- Separate authentication flows for users and admins.
- Category-based product browsing (Men, Women, Kids).
- Detailed product pages with size and color selection.
- Shopping cart functionality.
- Checkout process with shipping and payment options.
- Admin dashboard with sales analytics.
- Admin product management (Create, Read, Update, Delete).
- Admin order management with status updates.
- Responsive design for all devices.

## Data Flow Diagram

```
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│               │         │               │         │               │
│  Client Side  │ ◄─────► │  Server API   │ ◄─────► │   Database    │
│  (React.js)   │   HTTP  │  (Express.js) │   Query │   (MongoDB)   │
│               │  Request│               │         │               │
└───────────────┘         └───────────────┘         └───────────────┘
        ▲                        │                         ▲
        │                        ▼                         │
        │                ┌───────────────┐                 │
        │                │               │                 │
        └───────────────┤   File System  ├─────────────────┘
                        │    Storage     │    Backup
                        │               │
                        └───────────────┘
```

## Folder Structure

```
footflex/
│
├── client/                  # Frontend React application
│   ├── public/              # Public assets
│   └── src/                 # React source files
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── context/         # Context providers
│       ├── assets/          # Static assets (images, etc.)
│       └── utils/           # Utility functions
│
├── server/                  # Backend Node.js application
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── data/                # File system data storage
│   └── utils/               # Utility functions
│
└── README.md                # Project documentation
```

## Technology Stack

- **Frontend**: React.js, React Router, Styled Components, Framer Motion, Three.js
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Storage**: MongoDB Atlas & Local File System

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/footflex.git
   cd footflex
   ```

2. Install server dependencies:
   ```
   npm install
   ```

3. Install client dependencies:
   ```
   cd client
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory with your MongoDB connection string:
   ```
   MONGO_URI=mongodb+srv://ketansingla3246:GAYJWc9VKWhcqnKy@cluster0.u9cqyta.mongodb.net/footflex
   JWT_SECRET=footflex123
   NODE_ENV=development
   PORT=5000
   ```

### Running the Application

1. For development (both server and client):
   ```
   npm run dev
   ```

2. For server only:
   ```
   npm run server
   ```

3. For client only:
   ```
   npm run client
   ```

The server will run on http://localhost:5000 and the client on http://localhost:3000.

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users` - User registration
- `POST /api/admins/login` - Admin login
- `POST /api/admins` - Admin registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a product (admin)
- `PUT /api/products/:id` - Update a product (admin)
- `DELETE /api/products/:id` - Delete a product (admin)

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/user/myorders` - Get user's orders
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/admins/users` - Get all users (admin)
- `GET /api/admins/users/:id` - Get user by ID (admin)

## License

This project is licensed under the MIT License.#A E-commerce website project by Harshita, Keshav Saini, Ketan Kumar, Dhruv Pandey
#FootFlex
@ Footprint-Co.
#FootFlex
