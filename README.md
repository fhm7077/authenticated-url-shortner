# Authenticated URL Shortener

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Backend Development](#backend-development)
  - [Technology Used](#technology-used)
  - [Modules](#modules)
    - [User](#user)
    - [URL](#url)
  - [Database](#database)
  - [APIs](#apis)
  - [Authentication](authentication)
    - [JWT Authentication Guard](#jwt-authentication-guard)
  - [URL Shortening](url-shortening)
- [Frontend Development](#frontend-development)
  - [Technologies Used](#technologies-used-1)
  - [Implementation Details](#implementation-details)
    - [User Authentication](#user-authentication)
    - [URL Shortening Interface](#url-shortening-interface)
    - [User Profile](#user-profile)
    - [URL Management](#url-management)
    - [Styling](#styling)
    - [Interacting with the UI](#interacting-with-the-ui)
- [Special Considerations](#special-considerations)
    - [AI-Assisted Development Tool](#ai-assisted-development-tool)

## Introduction
This project is an authenticated URL shortener implemented using Nest.js for the backend and React for the frontend. The backend includes secure user authentication, hashed password storage, token-based authentication using JWT, and URL shortening routes accessible only to authenticated users. On the simple frontend, React, along with CSS, is utilized to create a user-friendly interface for seamless interaction with the URL shortening application. Users can register, log in, and access URL shortening features in a responsive and dynamic web environment.

## Technologies Used
- Node.js
- Nest.js
- React.js
- Typescript.js
- CSS
- Express.js
- MySQL

## Backend Development

### Technology Used
- **Framework:** Nest.js
- **Database:** MySQL 

### Modules
1. **User**
   - **Register:**
     - Endpoint: `POST /users/register`
     - Description: Allows users to register by providing necessary details, including email and password. Passwords are securely stored as hashed values.
     
   - **Login:**
     - Endpoint: `POST /users/login`
     - Description: Enables users to log in using their email and password. Generates a JWT token containing user id and name, stored in the browser's local storage for subsequent authentication.
     
   - **View Profile:**
     - Endpoint: `GET /users/viewProfile`
     - Description: Allows users to view their profile information.

   - **Logout:**
     - Endpoint: `POST /users/logout`
     - Description: Revokes and removes the JWT token from the local storage, effectively logging the user out.

2. **URL**
   - **URL Shortening:**
     - Endpoint: `POST /url/short-url`
     - Description: Allows users to shorten a given original URL. Requires JWT token for authentication using a middleware.

   - **Custom URL Shortening:**
     - Endpoint: `POST /url/short-url-custom`
     - Parameters: `originalUrl` (Original URL), `customUrl` (User-specified short URL)
     - Description: Enables users to create a custom short URL for a given original URL. Requires JWT token for authentication.

   - **Redirect Original URL:**
     - Endpoint: `GET /url/redirect`
     - Parameters: `shortUrl` (Shortened URL)
     - Description: Redirects users to the original URL corresponding to the provided short URL.

   - **List URLs:**
     - Endpoint: `GET /url/view-all`
     - Description: Allows users to view a list of URLs they have created. Uses user id from the JWT token for authentication.

### Database
- **Database:** MySQL (Local Server)
- **ORM:** TypeORM
  
### APIs
- **User Module:**
  - Register: `POST /users/register`
  - Login: `POST /users/login`
  - View Profile: `GET /users/viewProfile`
  - Logout: `POST /users/logout`

- **URL Module:**
  - URL Shortening: `POST /url/short-url`
  - Custom URL Shortening: `POST /url/short-url-custom`
  - Redirect Original URL: `GET /url/redirect`
  - List URLs: `GET /url/view-all`

### Authentication
The backend implements secure user registration, login, and logout routes. Passwords are securely stored in a hashed format. Token-based authentication is achieved using JWT, with tokens containing user id and name for various purposes. JWT is generated using the jsonwebtoken library, supporting algorithms like SHA256.

#### JWT Authentication Guard

The `JwtAuthGuard` class is responsible for protecting routes that require authentication. It implements the `CanActivate` interface from the Nest.js framework, allowing it to be used as a guard to control access to specific routes.

### URL Shortening
The backend provides routes to create and retrieve shortened URLs, ensuring access is restricted to authenticated users. Shortening is implemented using custom hashing with SHA256. Mapped original and shortened URLs are stored in a MySQL database. Custom URL creation is supported, and validation prevents the creation of duplicate URLs.

## Frontend Development

### Technologies Used
- **Framework:** React.js
- **Styling:** Material-UI (MUI), CSS

### Implementation Details
The frontend of the Authenticated URL Shortener is implemented using React.js along with Material-UI (MUI) to provide a dynamic and responsive user interface.

#### User Authentication
- **Login and Registration Forms:**
  - Users can log in or register using dedicated forms.
  - The login form validates user credentials before sending them to the backend for authentication.
  - Registration form ensures secure creation of new user accounts.

#### URL Shortening Interface
- **Shorten URL Form:**
  - Users can input an original URL and receive a shortened version.
  - Requires user authentication; the frontend includes logic to handle JWT tokens.
  - Utilizes the backend API endpoint: `POST /url/short-url`

- **Custom URL Form:**
  - Allows users to specify a custom short URL along with the original URL.
  - Custom URL creation is subject to validation and authentication.
  - Backend API endpoint used: `POST /url/short-url-custom`

#### User Profile
- **View Profile:**
  - Users can view their profile information.
  - Fetches user data from the backend using the API endpoint: `GET /users/viewProfile`

#### URL Management
- **List Created URLs:**
  - Users can view a list of URLs they have created.
  - Fetches data from the backend using the API endpoint: `GET /url/view-all`

#### Styling
- **Material-UI (MUI):**
  - Utilizes Material-UI components and styles for a consistent and visually appealing design.
  - Enhances the user experience with responsive and well-designed UI elements.
  
- **CSS Styles:**
  - Additional styling using CSS for custom components and layouts.
  - Styles are modular and adhere to best practices for maintainability.

### Interacting with the UI
Interacting with the UI is straightforward and organized to enhance user experience:

#### Headers
- **Login:**
  - Click on the "Login" header to access the login form.
  - Enter valid credentials and submit the form.

- **Registration:**
  - Click on the "Registration" header to access the registration form.
  - Complete the required details and submit the form.

- **Logout:**
  - Click on the "Logout" header to log out. This revokes the JWT token.

#### Sidebar
The sidebar includes the following components:

- **URL Shortening:**
  - Click on "URL Shortening" to access the form for shortening a URL.

- **Custom Shortening:**
  - Click on "Custom Shortening" to access the form for custom URL shortening.

- **List:**
  - Click on "List" to view a list of URLs created by the user.

- **User Profile:**
  - Click on "User Profile" to view details about the user.

- **Redirect:**
  - Click on "Redirect" to access the form for redirecting from a shortened URL to the original URL.

## Special Considerations

### AI-Assisted Development Tool

During the development of this Authenticated URL Shortener, AI-assisted development tool ChatGPT, were leveraged to enhance productivity and code quality. Here are some ways in which ChatGPT was utilized:

1. **Code Review Assistance:**
   - ChatGPT was employed for code review purposes, helping to identify potential issues, suggest improvements, and provide a fresh perspective on code structure.

2. **Error Identification:**
   - By interacting with ChatGPT, ChatGPT's natural language processing capabilities were utilized to quickly identify potential errors in the code, ensuring early detection and resolution of issues.

3. **Algorithmic Decision Making:**
   - ChatGPT assisted in making decisions related to algorithm choices, offering insights into the pros and cons of different approaches based on the project's requirements.

4. **Testing Strategies:**
   - ChatGPT was consulted to brainstorm effective testing strategies, ensuring thorough coverage of test cases and considering edge cases that might have been overlooked.

By integrating ChatGPT into the development workflow, there was an experience of improved code quality, faster issue resolution, and enhanced overall development efficiency. It served as a valuable tool for brainstorming ideas, receiving instant feedback, and addressing challenges in a timely manner.


**Note:** This documentation assumes a local MySQL server. Adjust database configurations as needed for deployment.
