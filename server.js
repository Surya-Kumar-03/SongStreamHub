const express = require('express');
const {ApolloServer} = require('@apollo/server');
const bodyParser = require('body-parser');
const {expressMiddleware} = require('@apollo/server/express4');
const cors = require('cors');
const {Strategy: GoogleStrategy} = require('passport-google-oauth20');
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Database Connection
const {connectToDatabase} = require('./back-end/config/database');

// Type Definitions
const {typeDefs, resolvers} = require('./back-end/graphql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Google OAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(accessToken);
			return done(null, profile);
		}
	)
);

app.use(passport.initialize());

async function startServer() {
	try {
		const dbConnected = await connectToDatabase();
		const server = new ApolloServer({typeDefs, resolvers});

		await server.start();

		if (dbConnected) {
			app.use('/', expressMiddleware(server));

			// app.get(
			// 	'/auth/google',
			// 	passport.authenticate('google', {scope: ['profile', 'email']})
			// );

			app.get(
				'/auth/google/callback',
				passport.authenticate('google', {session: false}),
				(req, res) => {
					const user = req.user; // Authenticated user data
					console.log(user);

					// res.redirect(`/graphql?token=${token}`);
				}
			);

			const PORT = process.env.PORT || 8000;
			app.listen(PORT, () => {
				console.log('Server Up and Running on Port:', PORT);
			});
		} else {
			console.error('Database connection failed.');
		}
	} catch (error) {
		console.error('Error starting the server:', error);
	}
}

startServer();
