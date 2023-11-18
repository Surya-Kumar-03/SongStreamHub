// Model Imports
const User = require('./models/userModel');
const Song = require('./models/songModel');
const Artist = require('./models/artistModel');

// GraphQL
const typeDefs = `
  type User {
    uid: String!
    username: String!
    email: String!
    profilePicture: String!
    likedSongs: [String]
  }

  type Artist {
	id: String!
	name: String!
	bio: String!
	genres: String!
	followers: Int!
	songs: [Song]
  }

  scalar Date
  type Song {
    id: Int!
    name: String!
    artistId: String!
	ownerId: String!
    mediaUrl: String!
    thumbnail: String!
    duration: Int!
    date: Date
    clicks: Int
    likes: Int
    genre: String
  }

  type Query {
    getUser(uid: String!): User 
    getSong(id: String!): Song
	getArtists: [Artist]
  }

  type Mutation {
    updateUser(input: UserInput!): String
	uploadSong(input: SongInput!): String
  }

  input SongInput {
	title: String!
	artistId: String
	newArtist: String
	songLink: String!
	coverPhotoLink: String!
	duration: Int!
	genre: String!
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
		getArtists: async () => {
			try {
				const artists = await Artist.find().populate('songs');

				const graphqlArtists = artists.map((artist) => ({
					id: artist._id,
					name: artist.name,
					bio: artist.bio,
					genres: artist.genres,
					followers: artist.followers,
					songs: artist.songs.map((song) => ({
						id: song._id,
						name: song.name,
						artistId: song.artistId,
						ownerId: song.ownerId,
						mediaUrl: song.mediaUrl,
						thumbnail: song.thumbnail,
						duration: song.duration,
						date: song.date,
						clicks: song.clicks,
						likes: song.likes,
						genre: song.genre,
					})),
				}));

				return graphqlArtists;
			} catch (error) {
				console.error('Error fetching artists:', error);
				throw new Error('An error occurred while fetching artists.');
			}
		},
		getSong: async (_, args, context) => {
			try {
				const {id} = args;
				console.log('Id is', id);
				const res = context;
				const song = await Song.findById(id);

				if (!song) {
					return res.status(404).json({error: 'Song not found.'});
				}

				return {
					id: song._id,
					name: song.name,
					artistId: song.artistId,
					ownerId: song.ownerId,
					mediaUrl: song.mediaUrl,
					thumbnail: song.thumbnail,
					duration: song.duration,
					date: song.date.toISOString(),
					clicks: song.clicks || 0,
					likes: song.likes || 0,
					genre: song.genre || '',
				};
			} catch (error) {
				console.error('Error fetching song:', error);
				throw new Error('An error occurred while fetching the song.');
			}
		},
	},
	Mutation: {
		updateUser: async (_, args, context) => {
			const {isValid, userId, res} = context;
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
		uploadSong: async (_, args, context) => {
			const {isValid, userId, res} = context;
			if (!isValid) {
				return res.status(401).json({error: 'Login is required to upload songs.'});
			}

			const {input} = args;

			try {
				const {
					title,
					artistId,
					newArtist,
					songLink,
					coverPhotoLink,
					duration,
					genre,
				} = input;

				if (
					(artistId === undefined || artistId === null) &&
					(newArtist === undefined || newArtist === null)
				) {
					return res.status(400).json({
						error: 'Provide either an existing artist or a new artist (only one).',
					});
				}

				let artistIdFinal;
				if (artistId !== null && artistId !== undefined) {
					artistIdFinal = artistId;
				} else {
					const newArtistObject = new Artist({
						name: newArtist,
					});

					const createdArtist = await newArtistObject.save();
					artistIdFinal = createdArtist._id;
				}

				const song = new Song({
					name: title,
					artistId: artistIdFinal,
					ownerId: userId,
					mediaUrl: songLink,
					thumbnail: coverPhotoLink,
					duration: duration,
					date: new Date(),
					clicks: 0,
					likes: 0,
					genre,
				});

				await song.save();

				const songId = song._id.toString();
				try {
					const artist = await Artist.findById(artistIdFinal);

					const isSongAlreadyPresent = artist.songs.some((song) =>
						song.equals(songId)
					);

					if (!isSongAlreadyPresent) {
						artist.songs.push(songId);
						await artist.save();
					}
				} catch (error) {
					console.error('Error adding song to artist:', error);
					res.status(500).json({error: 'Error adding song to artist'});
				}

				return 'Song uploaded successfully.';
			} catch (error) {
				console.error('Error uploading song:', error);
				return res
					.status(500)
					.json({error: 'An error occurred while uploading the song.'});
			}
		},
	},
};

module.exports = {typeDefs, resolvers};
