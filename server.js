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

// User Model
const User = require('./back-end/models/userModel');

// JWT Validators
const {validateToken} = require('./back-end/jwt');

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
			return done(null, profile);
		}
	)
);

app.use(passport.initialize());

async function startServer() {
	try {
		const dbConnected = await connectToDatabase();
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});

		await server.start();

		if (dbConnected) {
			app.get('/', (req, res) => {
				res.send('Hello from the backend server!');
			});

			app.use(
				'/graphql',
				expressMiddleware(server, {
					context: ({req, res}) => {
						const authorizationHeader = req.headers.authorization;
						if (authorizationHeader) {
							const token = authorizationHeader.replace('Bearer ', '');
							const {userId, isValid} = validateToken(token);
							return {
								userId: userId,
								isValid: isValid,
							};
						} else {
							return {
								userId: null,
								isValid: false,
							};
						}
					},
				})
			);

			app.get(
				'/auth/google',
				passport.authenticate('google', {scope: ['profile', 'email']})
			);

			app.get(
				'/auth/google/callback',
				passport.authenticate('google', {session: false}),
				async (req, res) => {
					try {
						const {id, displayName, emails, photos} = req.user;

						const googleId = id;
						const name = displayName;
						const email = emails[0].value;
						const profilePicture = photos[0].value;

						let user = await User.findOne({googleId});

						if (!user) {
							user = new User({googleId, name, email, profilePicture});
							await user.save();
						}

						const token = jwt.sign(
							{
								userId: user._id,
								name: user.name,
								email: user.email,
								profilePicture: user.profilePicture,
							},
							process.env.JWT_SECRET,
							{expiresIn: '7d'}
						);

						res.redirect(`${process.env.FRONTEND_URL}/home?token=${token}`);
					} catch (error) {
						console.error('Error handling Google Sign-In:', error);
						res.status(500).json({error: 'Server Error'});
					}
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
