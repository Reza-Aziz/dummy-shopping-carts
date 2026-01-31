# Dump Online Shop

A simplified, premium, and modern shopping cart application built with React, Tailwind CSS, and Context API. This project demonstrates a clean UI/UX with essential e-commerce features using the DummyJSON API.

## 🚀 Features

- **Product Catalog**: Browse products with beautiful card layouts and smooth animations.
- **Search & Filtering**: Real-time product search with debounce, price range filtering, and custom discount filters.
- **Sorting**: Sort products by price (low/high) or alphabetically.
- **Product Details**: Premium modal view for product details with "Add to Cart" functionality.
- **Shopping Cart**: Fully functional cart with persistent storage (localStorage), quantity adjustment, and removal.
- **Checkout**: Simulated checkout process with clear visual feedback.
- **Responsive Design**: Fully responsive layout optimized for mobile and desktop.
- **Modern UI**: Glassmorphism effects, vibrant gradients, and premium typography (Plus Jakarta Sans).

## 🛠️ Tech Stack

- **Frontend Library**: React.js
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📂 Project Structure

```
src/
├── Api/
│   └── Dummy.js            # API service functions for DummyJSON
├── Component/
│   ├── Header.js           # Navigation header
│   ├── ProductDetailModal.js # Product info modal
│   ├── ProductItem.js      # Individual product card component
│   ├── ProductList.js      # Grid list of products with pagination
│   └── SearchBar.js        # Search, Filter, and Sort component
├── Context/
│   └── CartContext.js      # Global state for Shopping Cart
├── Pages/
│   ├── Carts.js            # Shopping Cart page
│   └── ShoppingCartsPages.js # Home/Landing page
└── App.js                  # Main application entry with Routing
```

## ⚡ Optimization Measures

- **Lazy Loading**: Route-based code splitting using `React.lazy` and `Suspense` ensures faster initial load times.
- **React.memo**: Applied to list items (`ProductItem`) to prevent unnecessary re-renders during interactions.
- **Debounced Search**: Search input utilizes debounce to minimize API calls during typing.
- **Efficient State**: Localized state management where possible to reduce global re-renders.

## 🏃‍♂️ How to Run

1.  **Clone the repository** (if applicable)
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Development Server**:
    ```bash
    npm start
    ```
4.  **Open in Browser**:
    Visit `http://localhost:3000`

## 📝 License

This project is for educational purposes.
