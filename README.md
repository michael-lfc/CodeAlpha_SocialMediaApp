SocialApp (MERN + TypeScript)
A full-stack social media application built with TypeScript, featuring user authentication, post interactions, comments, and a follow system. The app is designed with clean architecture and a scalable structure, suitable for real-world production environments.
⭐ Key Features
User Authentication (Register, Login, Logout)
Create, Like, and Comment on Posts
Edit and Delete Posts (Authenticated users only)
Follow / Unfollow Users
User Profiles with Followers & Following
Paginated Post Feed
Light / Dark Theme Toggle
Protected Routes using JWT
Responsive UI
Clean Error Handling (Backend + Frontend)
🛠 Tech Stack
Frontend
React.js
TypeScript
React Router
Context API (Auth & Theme)
Axios
CSS Variables (Light/Dark theme)
Backend
Node.js
Express.js
TypeScript
MongoDB & Mongoose
JWT Authentication
Cloudinary (Profile images)
bcrypt (Password hashing)
Database
MongoDB (NoSQL)
Users
Posts
Comments
Followers / Following
🔌 API Endpoints
Auth
Endpoint
Method
Description
/api/auth/register
POST
Register user
/api/auth/login
POST
Login user
/api/auth/me
GET
Get current user
Users
Endpoint
Method
Description
/api/users/:id
GET
Get user profile
/api/users/:id/follow
POST
Follow / Unfollow user
/api/users/:id/followers
GET
Get followers
/api/users/:id/following
GET
Get following
Posts
Endpoint
Method
Description
/api/posts
POST
Create post
/api/posts
GET
Get paginated posts
/api/posts/:id/like
PUT
Like / Unlike post
/api/posts/:id
PUT
Update post
/api/posts/:id
DELETE
Delete post
Comments
Endpoint
Method
Description
/api/comments/:postId
POST
Add comment
/api/comments/:postId
GET
Get post comments
📁 Folder Structure
Copy code

client/
 └── src/
     ├── api/
     ├── components/
     ├── hooks/
     ├── pages/
     ├── types/
     ├── utils/
     └── styles/

server/
 └── src/
     ├── controllers/
     ├── models/
     ├── routes/
     ├── middleware/
     └── utils/