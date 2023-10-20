const typeDefs = `
  type Query {
    getUser(uid: Int!): User 
    getSong(id: Int!): Song
  }

  type User {
    uid: Int!
    username: String!
    email: String!
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

  type Mutation {
    authenticateWithGoogle: String
  }
`;

const resolvers = {
	Mutation: {
		authenticateWithGoogle: {
			resolve: () => {
				console.log('Recieved');
				return 'Google authentication successful';
			},
		},
	},
};

module.exports = {typeDefs, resolvers};
