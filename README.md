# DoorStep
A ecommerce project with HTML, CSS, JavaScript frontend and Java backend. Features include product catalog, shopping cart, user authentication, and order management.

## Features

- **Product Catalog**: Browse and search products with detailed descriptions
- **Shopping Cart**: Add/remove items and manage quantities
- **User Authentication**: Secure login and registration system
- **Order Management**: Place orders and track order history
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Payment Integration**: Secure payment processing

## Tech Stack

**Frontend:**
- HTML5
- CSS3
- JavaScript (ES6+)

**Backend:**
- Java
- Spring Framework
- MySQL Database

## Installation

1. Clone the repository
```bash
git clone https://github.com/Jaswanth909/DoorStep-Ecommerce-Site.git
```

2. Navigate to project directory
```bash
cd DoorStep-Ecommerce-Site
```

3. Setup backend
```bash
cd backend
mvn clean install
```

4. Setup frontend
```bash
cd ../frontend
npm install
```

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open browser and navigate to `http://localhost:3000`

## Project Structure

```
DoorStep-Ecommerce-Site/
├── backend/          # Java backend code
├── frontend/         # HTML, CSS, JavaScript files
└── README.md         # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Developed by [Jaswanth909](https://github.com/Jaswanth909)


## Deployment

### Option 1: Deploy on Render (Recommended for Full-Stack)

#### Backend Deployment
1. Create a [Render.com](https://render.com) account
2. Connect your GitHub repository
3. Create new **Web Service**:
   - **Build Command**: `cd backend && mvn clean install`
   - **Start Command**: `java -jar target/doorstep-*.jar`
   - **Port**: 8080
4. Create MySQL database instance on Render
5. Set environment variables:
   ```
   SPRING_DATASOURCE_URL=your-mysql-url
   SPRING_DATASOURCE_USERNAME=your-db-user
   SPRING_DATASOURCE_PASSWORD=your-db-password
   ```
6. Deploy! Your backend URL will be: `https://doorstep-app.onrender.com`

#### Frontend Deployment (Netlify)
1. Create a [Netlify](https://netlify.com) account
2. Connect your GitHub repository
3. Create new site:
   - **Build command**: Leave empty (static files)
   - **Publish directory**: `frontend`
4. Update API endpoint in `frontend/js/api.js`:
   ```javascript
   const API_BASE = "https://doorstep-app.onrender.com/api";
   ```
5. Your frontend URL will be: `https://doorstep.netlify.app`

### Option 2: Docker Deployment
1. Build Docker image:
   ```bash
   docker build -t doorstep-app .
   ```
2. Run container:
   ```bash
   docker run -p 8080:8080 doorstep-app
   ```

### Environment Variables (Production)
Create `.env` file in backend:
```
SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host/doorstep
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=password
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SERVER_PORT=8080
```

## Live Demo
- **Frontend**: [https://doorstep.netlify.app](https://doorstep.netlify.app) (coming soon)
- **Backend API**: [https://doorstep-app.onrender.com](https://doorstep-app.onrender.com) (coming soon)

## Troubleshooting

**Port Already in Use**:
```bash
kill -9 $(lsof -ti:8080)  # macOS/Linux
netstat -ano | findstr :8080  # Windows
```

**Database Connection Error**:
- Verify MySQL is running
- Check database credentials in `application.properties`
- Ensure database name matches configuration

**CORS Errors**:
- Add CORS configuration in backend if frontend is on different domain
- Update `allowed-origins` in Spring configuration
