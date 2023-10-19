const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const passport = require("passport");

require("dotenv").config();

// Database Connection
const { connectToDatabase } = require("./back-end/config/database");

// Type Definitions
const { typeDefs } = require("./back-end/graphql/typeDefs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(passport.initialize());

async function startServer() {
  try {
    const dbConnected = await connectToDatabase();

    // Type Definitions and Resolvers
    const schema = { typeDefs: typeDefs, resolvers: {} };
    const server = new ApolloServer(schema);

    await server.start();

    if (dbConnected) {
      app.use("/", expressMiddleware(server));

      app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
      );

      app.get(
        "/auth/google/callback",
        passport.authenticate("google", { session: false }),
        (req, res) => {
          const user = req.user; // Authenticated user data

          // 1. Create or retrieve the user profile in your application's database
          // (You may need to query your database to check if the user already exists.)

          // 2. Store user information in your database
          // (Save the user's name, email, or any other relevant information from user.profile.)

          // 3. Generate a JWT with user data
          // const token = jwt.sign({ user }, JWT_SECRET);

          // 4. Redirect or respond with the JWT
          // res.redirect(`/graphql?token=${token}`);
        }
      );

      const PORT = process.env.PORT || 8000;
      app.listen(PORT, () => {
        console.log("Server Up and Running on Port:", PORT);
      });
    } else {
      console.error("Database connection failed.");
    }
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();

// <script src="https://accounts.google.com/gsi/client" async defer></script>
// add this to index.html
