// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null

// A function for connecting to MongoDB,
// taking a single paramater of the connection string
async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1))

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  // capture post body
  const { body } = req

  // token=gIkuvaNzQIHg97ATvDxqgjtO
  // &team_id=T0001
  // &team_domain=example
  // &enterprise_id=E0001
  // &enterprise_name=Globular%20Construct%20Inc
  // &channel_id=C2147483705
  // &channel_name=test
  // &user_id=U2147483697
  // &user_name=Steve
  // &command=/weather
  // &text=94070
  // &response_url=https://hooks.slack.com/commands/1234/5678
  // &trigger_id=13345224609.738474920.8088930838d88f008e0

  //body.token

  // Respond with a JSON string of all users in the collection
  res.status(200).json({
    "message": `Hello ${body.name}, you just parsed the request body!`,
    "token": body.token,
    "user_id": body.user_id
  })
}