# Dota 2 Forum

A simple forum application for Dota 2 discussions with JSON-based database storage.

## Features

- View list of articles
- Add new articles
- View article details
- Add comments to articles
- Dark theme based on original design
- No authentication required

## Installation

1. Make sure you have Node.js installed
2. Install dependencies (if needed):
   ```bash
   npm install
   ```

## Running the Server

Start the server:
```bash
node server.js
```

Or use npm:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. View articles on the home page
3. Click "Add Article" to create a new article
4. Click on any article to view it and add comments

## Data Storage

All data is stored in `data.json` file. The file structure:
```json
{
  "articles": [
    {
      "id": "timestamp",
      "title": "Article title",
      "author": "Username",
      "content": "Article content",
      "date": "ISO date string",
      "comments": [
        {
          "author": "Username",
          "text": "Comment text",
          "date": "ISO date string"
        }
      ]
    }
  ]
}
```

## Files

- `index.html` - Home page with articles list
- `add-article.html` - Page for adding new articles
- `article.html` - Article view page with comments
- `styles.css` - Styling
- `script.js` - Client-side JavaScript
- `server.js` - Node.js server for API
- `data.json` - JSON database file
- `package.json` - Node.js package configuration

