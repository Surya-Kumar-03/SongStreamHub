// Model Imports
const User = require('./models/userModel');

// GraphQL
const typeDefs = `
  type User {
    uid: String!
    username: String!
    email: String!
    profilePicture: String!
    likedSongs: [String]
  }

  scalar Date
  type Song {
    id: Int!
    name: String!
    artist: String!
    mediaUrl: String!
    album: String!
    thumbnail: String!
    duration: Int!
    date: Date
    clicks: Int
    likes: Int
    genre: String
  }

  type Query {
    getUser(uid: String!): User 
    getSong(id: Int!): Song
  }

  type Mutation {
    updateUser(input: UserInput!): String
  }

  input UserInput {
    username: String
    profilePicture: String
  }
`;

const resolvers = {
	Query: {
		getUser: async (_, args, context) => {
			const {uid} = args;
			const {res} = context;
			try {
				const user = await User.findById(uid);

				if (!user) {
					return res.status(404).json({error: 'User not found.'});
				}

				const graphqlUser = {
					uid: user._id,
					username: user.name,
					email: user.email,
					likedSongs: user.likedSongs,
					profilePicture: user.profilePicture,
				};

				return graphqlUser;
			} catch (error) {
				console.error('Error fetching user:', error);
				throw new Error('An error occurred while fetching the user.');
			}
		},
	},
	Mutation: {
		updateUser: async (_, args, context) => {
			const {isValid, userId, req, res} = context;
			if (!isValid) {
				return res.status(401).json({error: 'Login required to perform updation.'});
			}

			const {input} = args;
			try {
				const user = await User.findById(userId);
				if (!user) {
					return res.status(404).json({error: 'User not found.'});
				}

				if (user._id != userId) {
					return res.status(401).json({error: 'Unauthorised.'});
				}

				if (input.username) {
					user.name = input.username;
				}
				if (input.profilePicture) {
					user.profilePicture = input.profilePicture;
				}

				await user.save();
				return 'Updation successful.';
			} catch (error) {
				console.error('Error updating user:', error);
				throw new Error('An error occurred while updating the user.');
			}
		},
	},
};

module.exports = {typeDefs, resolvers};
