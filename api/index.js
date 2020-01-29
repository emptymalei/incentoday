// Import Dependencies
const url = require('url')

// Create cached connection variable
let cachedDb = null

module.exports = async (req, res) => {

  // Select the users collection from the database
  const index = {
      "description": "your collective workspace",
      "paths": [
        {
          "path": "/api/kitchen",
          "description": "kitchen work"
        }
      ]
    }

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ index })
}