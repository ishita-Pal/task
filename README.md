# task
Section B: Explain Your Thinking
1. Why did you choose this project structure?
I chose this structure to maintain a clear separation of concerns. The backend is housed in its own folder (/Backend) where all Express-related logic like routing, controllers, and database configuration is handled. The frontend (/my-todo-app) is developed using React and Tailwind CSS, organized into components and utility folders. This modular approach allows easier debugging, testing, and deployment for both the frontend and backend.

2. How did you separate frontend and backend concerns?
The frontend communicates with the backend strictly through HTTP requests (using Axios). The backend exposes a RESTful API that the frontend consumes, which ensures a clean interface between them. This separation allows each part to be developed, tested, and deployed independently. I also hosted them on different platforms (Vercel for frontend, Render for backend), which reinforces their independence.

3. How would you handle errors and edge cases?
  I used Postman extensively to test all API endpoints with different scenarios. The backend includes basic error handling using Express's status codes and error messages. For example:
    400 for bad requests (like missing fields),
    
    404 for not found,
    
    500 for server/database errors.
  
        In a full version, I would add:
        
        Try-catch blocks around async code,
        
        Frontend-level validations before sending data,
        
        Displaying user-friendly error messages on the UI.
      
      4. What security features would you add in production?
      For a production-ready app, I would add:
      
      Helmet.js for securing HTTP headers,
      
      Rate limiting and CORS controls,
      
      Authentication and Authorization using JWT or sessions,
      
      Input validation with libraries like Joi or express-validator to prevent SQL Injection or XSS,
      
      Environment variables management with .env for sensitive data like database credentials.
      
      5. What would you improve if you had 1 full day?
      With an extra day, I would:
      
      Make the frontend fully responsive for all devices,
      
      Add sorting and filtering for tasks,
      
      Implement user authentication and personalized task views,
      
      Add confirmation popups before deleting or editing tasks,
      
      Improve UI/UX with animations and success/failure toasts,
      
      Possibly add a search bar and status toggle (pending/done) for better task management.

