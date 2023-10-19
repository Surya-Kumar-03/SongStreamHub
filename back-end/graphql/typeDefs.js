const Query = `
  type Query {
    getUser(uid: Int!): User 
    getSong(id: Int!): Song
  }
`;

const UserType = `
  type User {
    uid: Int!
    username: String!
    email: String!
    likedSongs: [String]
  }
`;

const SongType = `
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

const typeDefs = [Query, UserType, SongType];
module.exports = { typeDefs };
