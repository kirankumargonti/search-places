# Search Places App

This is a React application that allows users to search for places and view the results in a paginated table. The app is built with TypeScript and uses modern React practices for optimal performance and responsiveness.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/kirankumargonti/search-places.git
   ```

2. Navigate to the project directory:

   ```
   cd search-places
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Go to https://rapidapi.com/wirefreethought/api/geodb-cities, sign up for an API key, and create a `.env` file in the root directory with the following format:

   ```
   VITE_APP_API_URL=your_api_url
   VITE_APP_API_KEY=your_api_key_from_rapidapi
   ```

5. Start the development server:

   ```
    npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Usage

- Type in the search box to search for places
- Use the pagination controls to navigate through results
- Adjust the "Limit" to change the number of results fetched from the API (1-10)
- Adjust the "Items per page" to change the number of results displayed in the table (cannot exceed the limit)
- Use Ctrl/Cmd + / to quickly focus on the search input
- On smaller screens, the table view will transform into a card view for better readability

## Built With

- React
- TypeScript
- CSS
- Vite - Next Generation Frontend Tooling

## Features

1. Search functionality with debounced input to reduce API calls
2. Paginated results display with dynamic page number generation
3. Adjustable limit for API requests (1-10)
4. Adjustable items per page for table display (cannot exceed the limit)
5. Responsive design (down to 300px width)
6. Keyboard shortcut (Ctrl/Cmd + /) to focus on the search input
7. Error handling and display
8. Loading spinner during API requests
9. Table view transforms into card view on smaller screens

## Optimizations

1. Debounced search input and limit changes to reduce unnecessary API calls
2. Memoized components using React.memo to prevent unnecessary re-renders
3. useCallback for event handlers and functions to maintain referential equality
4. useMemo for derived state to avoid unnecessary recalculations
5. Responsive design for various screen sizes, including mobile-friendly card view for table data
6. CSS variables for consistent theming and easy customization

## Responsive Design

- The app is fully responsive down to 300px width
- Table view transforms into a card view on screens smaller than 768px
- Font sizes and spacing adjust for smaller screens
- Input fields and controls stack vertically on smaller screens for better usability
