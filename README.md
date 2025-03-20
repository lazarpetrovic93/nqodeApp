
## **🛠 Prerequisites**
Ensure you have the correct **Node.js version** installed:
- **Node.js v18.18.2** *(recommended)*
- **npm** (comes with Node.js)

To check your current version, run:
```sh
node -v
```

---

## **Installation**
1. **Clone the repository**  
   ```sh
   git clone https://github.com/lazarpetrovic93/nqodeApp.git
   cd nqodeApp
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

---

## **🚀 Running the App**
### **Development Mode**
To start the development server, run:
```sh
npm run dev
```
After starting, the app should be available at:  
👉 **http://localhost:5173** (or a different port if 5173 is in use)

---

## **🔧 Building for Production**
To create an optimized production build, run:
```sh
npm run build
```
To preview the production build:
```sh
npm run preview
```

---

## **🧪 Running Tests**
The project uses **Vitest** for testing. To run tests:
```sh
npm run test
```

For test coverage:
```sh
npm run test:coverage
```

---

## **📂 Project Structure**
```
/src
  ├── __tests__/       # Unit tests
  ├── components/       # UI components
  ├── hooks/            # Custom React hooks
  ├── store/            # Redux store & slices
  ├── utils/            # Utility functions
  ├── App.tsx           # Main application component
  ├── main.tsx          # App entry point
  ├── index.css         # Global styles
/public                 # Static assets
/vite.config.ts         # Vite configuration
```

---

