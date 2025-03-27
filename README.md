# LawComp Computers E-Commerce Platform
## Overview
LawComp Computers is a modern e-commerce platform built with React.js, designed to showcase and sell tech products in Kenya. This application features product listings, shopping cart functionality, checkout process, and responsive design for all devices.
## Features
- *Product Catalog*: Browse products by category with detailed product pages

- *Shopping Cart*: Add/remove items, adjust quantities, and view totals

- *Checkout Process*: Secure checkout with multiple payment options

- *Responsive Design*: Fully responsive layout for mobile, tablet, and desktop

- *Product Search*: Quick search functionality with suggestions

- *Image Slider*: Animated hero section with rotating banners

- *Local Storage*: Persistent cart data using browser local storage
## Technologies Used
- *Frontend:* React.js, Tailwind CSS

- *State Management:* React Context API

- *Routing:* React Router

- *Icons:* Lucide React, React Icons

- *Build Tool:* Vite (or Create React App)
## Installation
1. Clone the repository:
git clone https://github.com/jonah-okiru/lawcomp-ecommerce.git
cd lawcomp-ecommerce
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Open your browser and visit:
http://localhost:3000
## Project Structure
lawcomp-ecommerce/
├── src/
│   ├── components/
│   │   ├── Cart.jsx             # Shopping cart component
│   │   ├── Categories.jsx       # Product categories display
│   │   ├── Checkout.jsx         # Checkout process
│   │   ├── Footer.jsx           # Site footer
│   │   ├── Hero.jsx             # Homepage banner
│   │   ├── Navbar.jsx           # Navigation bar
│   │   ├── ProductDetail.jsx    # Single product view
│   │   └── Products.jsx         # Product listings
│   ├── data/
│   │   └── products.js          # Product data
│   ├── pages/
│   │   └── CartPage.jsx         # Cart page
│   ├── App.jsx                  # Main application
│   └── main.jsx                 # Entry point
├── public/
│   └── images/                  # Product and logo images
├── package.json
└── README.md
## Key Components
1. *Product Display*
 - Responsive grid layout for products

 - Category filtering

 - Detailed product view with image gallery

2. *Shopping Cart*
 - Add/remove items

 - Quantity adjustment

 - Real-time total calculation

 - Persistent storage using localStorage

3. *Checkout Process*
 - Customer information form

 - Order summary

 - WhatsApp and email order confirmation options

4. *Responsive Navigation*
 - Mobile-friendly menu

 - Search functionality with suggestions

 - Category dropdown
## Customization
To customize the application:

1. *Products:* Update src/data/products.js with your product data

2. *Styling:* Modify Tailwind CSS classes in components

3. *Images:* Replace images in public/images/

4. *Contact Info:* Update footer contact details in Footer.jsx
## Deployment
To deploy to Vercel or Netlify:

1. Build the project:
npm run build
2. Deploy the dist folder to your preferred hosting service
## Future Enhancements
- User authentication system

- Product reviews and ratings

- Admin dashboard for inventory management

- Payment gateway integration

- Order tracking system