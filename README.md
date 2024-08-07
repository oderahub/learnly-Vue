# learnly App

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

E-Commerce Product Listing Frontend
Overview
This is the frontend part of the E-Commerce Product Listing application, built using Vue.js and Tailwind CSS. It provides a responsive UI for displaying, searching, adding, and editing products.

Features
Product Listing: Displays products in a responsive grid layout.
Search Functionality: Allows users to filter products by name.
CRUD Operations: Users can add and edit products (authenticated users only).
User Authentication: Includes login and registration forms.
Responsive Design: Ensures a smooth experience across various devices.
Getting Started
Prerequisites
Node.js
Yarn (preferred) or npm
Setup
Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-product-listing.git
cd ecommerce-product-listing/frontend
Install Dependencies

bash

yarn install
Configure Environment Variables

Create a .env file in the root directory and add the following:

env

VUE_APP_API_URL= 
Replace http://localhost:3000/api with the URL of your backend API if different.

Run the Development Server

bash

yarn serve
The frontend will be available at http://localhost:8080.

Project Structure
src/components/: Contains reusable Vue components like ProductList.vue, ProductForm.vue, etc.
src/views/: Contains view components for different pages, e.g., Home.vue, Login.vue, Register.vue.
src/router/index.ts: Defines application routes and navigation.
src/store/index.ts: Manages state using Vuex (if used).
src/assets/: Contains static assets like images and styles.
Available Scripts
yarn serve: Starts the development server and opens the application in your browser.
yarn build: Builds the application for production.
yarn lint: Lints and fixes files using ESLint.
Usage
Product Listing Page
Displays all products fetched from the backend.
Includes a search bar to filter products by name.
Authenticated users can see options to add, edit, or delete products.
Add Product Form
Accessible through a route like /add-product.
Allows authenticated users to add new products, including name, description, price, and image.
Edit Product Form
Accessible from the product list page.
Allows authenticated users to update existing product details.
Authentication
Login: Allows users to log in and receive a JWT token for authenticated requests.
Register: Allows new users to create an account.
API Integration
The frontend communicates with the backend API using Axios for HTTP requests. The API endpoints used are:

GET /api/products: Fetch all products.
POST /api/products: Create a new product.
PUT /api/products/
: Update an existing product.
DELETE /api/products/
: Delete a product.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.
