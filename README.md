# Counter-Strike Item Trading Application

## Description
A full-stack web application to facilitate trading of items from the game Counter-Strike. Post trade listings and make trade offers to other traders in the community. An easy-to-use platform that ensures you have all the tools you need to trade seamlessly in real time! 📈💱🔪🔄🔫💰

## Features
- **User creation and login**: Users must create an account and login before using the application. Basic authentication ensures the validity of account details and performs checks before any features are usable.
- **Post trades**: Users can post the items they have to trade for the items they want to trade for.
- **Offer trades**: Users can make offers to any active trade postings made by other users.
- **Accept/Decline trades**: Users can choose to accept or decline any incoming offers. If accepted, the trade will be marked as completed and will no longer be active.
- **Activity feed**: See all completed trades from all users, including information regarding items exchanged and time of trade completion.

## Technologies Used
### Frontend
- **HTML**, **CSS**, **JavaScript (React.js)**

### Backend
- **JavaScript (Express.js, Node.js)**, **MongoDB**

### Middleware
- **JavaScript**

## Methodology
### Frontend
- **HTML and CSS**
    - HTML and CSS are the foundations of the visual layout, user interface, and styling throughout the entirety of the application.
    - HTML is used for forms such as trade creation and making trade offers.
    - HTML is used extensively with the React.js framework to create reusable UI components.
    - CSS is used to ensure responsiveness through media queries.

- **JavaScript (React.js)**
    - JavaScript is used with the React.js framework to create reusable visual components.
    - React.js was used for state management, page direction/routing, and client-side handling data.
    - Responsible for all of the client-side activity and rendering.

### Backend
- **JavaScript (Express.js, Node.js)**
    - Express.js is used for creating RESTful APIs for various functionalities relating to users, trades, and offers.
    - Node.js is responsible for server-side execution such as: handling API calls, middleware functionality, and database integration.

- **MongoDB**
    - MongoDB is the NoSQL data storage for data such as users, trades, and offers. All data is stored in JSON format for simplified access and processing for the frontend.
    - There are 3 different collections to organize data: Users, Trades, and Offers.
    - Utilized the _id field to reference data and relate users to trades and offers.

### Middleware
- **JavaScript**
    - Handled login and issuing of JWT.
    - Created middleware methods to ensure API routes were only usable with a valid JWT.
    - Prevented users from using application functionalities if they were not logged in.

## Screenshots
