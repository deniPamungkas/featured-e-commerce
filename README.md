# 🛒 MERN E-commerce App
## Live Website :rocket:
https://featured-e-commerce.vercel.app/shop

## This app is built using:
### Server :
- NodeJs
- ExpressJs
### Client :
- ReactJs
- Redux Toolkit
- TailwindCss
- ShadcnUi
### Database :
- MongoDB
### Cloud storage :
- Cloudinary
### Deployment :
- Vercel
### Payment Gateway :
- Midtrans

## How to Run the project in your computer 💻

### Requirements
- node v20: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
- npm v10: https://docs.npmjs.com/getting-started

### 1. Clone the repository link

```bash
git clone https://github.com/deniPamungkas/featured-e-commerce.git
```

### 2. move to project folder

```bash
cd featured-e-commerce
```

### 3. for frontend side
```bash
cd client
```
```bash
npm install
```
```bash
npm run dev
```
make sure you running on localhost port:5173

### 4. for backend side
```bash
cd server
```
```bash
npm install
```
- create .env inside server folder
- and this is an example what inside .env file
  ```bash
  PORT = 3000
  DATABASE_URL=mongodb+srv://*********.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 (your mongoDB databse url)
  DATABASE_PASSWORD=********* (your mongoDB database password)
  JWT_SECRET = 'jwtSecret' (your own jwt secret key string))
  DBNAME = e-commerce (your mongoDB database name))
  CLOUDINARY_CLOUD_NAME = ******* (your cloudinary cloud name)
  CLOUDINARY_API_KEY = 5849********* (cloudinary api key)
  CLOUDINARY_API_SECRET = AZ_ByoY******* (cloudinary api secret key)

  MIDTRANS_SERVER_KEY = SB-Mid-server-****** (midtrans server key) 
  MIDTRANS_CLIENT_KEY = SB-Mid-client-****** (midtrans client key)
  ```

```bash
npm start
```
## API Documentation
https://web.postman.co/workspace/f73fee78-4072-4c7f-8c64-6a111b9aebf9/overview
