### Introduction
Welcome to the Financial Tracker App! This application is built using the MERN stack (MongoDB, Express.js, React, Node.js) to help users track their expenses, visualize spending trends, and manage budgets effectively.
Setup Instructions:

### Features
Expense Tracking:
 - Add, edit, and delete expenses.
 - Categorize expenses for better organization.

Expense Categorization: 
- Organize expenses by categories like Food, Rent, and Entertainment.

Graphical Reports:
  - View a horizontal bar chart ranking expense categories by total spending.
  - See a pie chart visualizing expense distribution across categories.
  
Budget Monitoring:
  - View total expenses and analyze spending trends over time.


Include steps to clone, install dependencies, and run the app locally.
Example:
markdown
Copy code
### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Jamesoseoighe/DataRepProject.git
   ```
2. Install Dependencies:
Backend
- Navigate to the backend folder
     ```bash
     cd backend
     ```
- Install the required backend dependencies:
     ```bash
     npm install
     ```
Frontend
 - Navigate to the frontend folder:
    ```bash
    cd ../frontend
    ```
- Install the required Frontend dependencies:
     ```bash
     npm install
     ```
Start Frontend
- Start Frontend Server
   ```bash
    npm start
    ```
Start Backend
- Start Backend Server
   ```bash
    cd backend
    npm start
    ```

   
### Additional Information
Dependencies
The project uses the following dependencies:

### Backend
- Express: Web framework for building the backend.
- Mongoose: ODM library for MongoDB.
- Cors: Middleware for Cross-Origin Resource Sharing.
- Axios: HTTP client for making API requests.
### Frontend
- React: Frontend library for building the UI.
- React Router DOM: For managing routing in React.
- Recharts: For creating data visualizations (charts).
- Axios: For making HTTP requests.

### Using the App
1. Adding an Expense
- Go to the "Budget Tracker" page.
- Fill out the expense form with the name, amount, and category.
- Click "Add Expense" to save the entry.
2. Editing an Expense
- Find the expense in the list.
- Click "Edit" to modify its details.
- Submit the form to update the expense.
3. Viewing Graphical Reports
- Navigate to the "Charts" page.
   - Bar Chart: Ranks categories by total spending.
   - Pie Chart: Displays the distribution of expenses.
4. Deleting an Expense
- Click the "Delete" button next to an expense to remove it from the list.

### Known Issues
Limited Currency Conversion:

- Currently, the app only supports USD as the base currency.
- Solution: Implement functionality to dynamically select the base currency.

