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
`;

const resolvers = {};

module.exports = {typeDefs, resolvers};
