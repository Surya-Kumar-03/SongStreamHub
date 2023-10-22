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
`;

const resolvers = {
	Query: {
		getUser: async (_, args) => {
			const {uid} = args;
			try {
				const user = await User.findById(uid);

				if (!user) {
					return {error: 'User not found.'};
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
};

module.exports = {typeDefs, resolvers};
