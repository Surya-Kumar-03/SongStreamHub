import {createSlice} from '@reduxjs/toolkit';
function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}
export interface GlobalAudioPlayer {
	visible: boolean;
	playing: boolean;
	songName: string;
	currentSongPlayingPosition: number;
	artist: string;
	duration: number;
	volume: number;
	queue: string[];
	loopQueue: boolean;
	loopSong: boolean;
	currentPlayingIndex: number;
}

const initialState: GlobalAudioPlayer = {
	visible: true,
	playing: false,
	songName: '',
	artist: '',
	duration: 1, // in seconds
	volume: 0.7,
	queue: ['/sample_audio.mp3', '/song1.m4a', '/song2.m4a'],
	currentPlayingIndex: 0,
	loopQueue: true,
	loopSong: false,
	currentSongPlayingPosition: 0,
};

export const Player = createSlice({
	name: 'AudioPlayer',
	initialState,
	reducers: {
		show: (state) => {
			state.visible = true;
		},
		hide: (state) => {
			state.visible = false;
		},
		togglePlayPause: (state) => {
			state.playing = !state.playing;
		},
		songName: (state, action) => {
			state.songName = action.payload;
		},
		artist: (state, action) => {
			state.artist = action.payload;
		},
		duration: (state, action) => {
			state.duration = action.payload;
		},
		seek: (state, action) => {
			state.currentSongPlayingPosition = action.payload;
		},
		volume: (state, action) => {
			state.volume = action.payload;
		},
		play: (state) => {
			state.playing = true;
		},
		pause: (state) => {
			state.playing = false;
		},
		addSong: (state, action) => {
			state.queue.push(action.payload);
		},
		next: (state) => {
			if (state.loopSong) {
				return;
			} else if (state.currentPlayingIndex === state.queue.length - 1) {
				state.currentSongPlayingPosition = 0;

				if (state.loopQueue) {
					state.currentSongPlayingPosition = 0;
					state.currentPlayingIndex = 0;
					state.playing = true;
				} else {
					state.playing = false;
				}
			} else {
				state.currentSongPlayingPosition = 0;

				state.currentPlayingIndex += 1;
				state.playing = true;
			}
		},
		prev: (state) => {
			if (state.loopSong) {
				return;
			} else if (state.loopQueue) {
				state.currentSongPlayingPosition = 0;

				state.currentPlayingIndex = mod(
					state.currentPlayingIndex - 1,
					state.queue.length
				);
				state.playing = true;
			} else {
				state.currentSongPlayingPosition = 0;

				if (state.currentPlayingIndex === 0) {
					state.playing = false;
				} else {
					state.currentPlayingIndex -= 1;
					state.playing = true;
				}
			}
		},
		queueLoop: (state, action) => {
			state.loopQueue = action.payload;
		},
		songLoop: (state, action) => {
			state.loopSong = action.payload;
		},
		currentSongPlayingPosition: (state, action) => {
			state.currentSongPlayingPosition = action.payload;
		},
		shuffle: (state) => {
			function shuffleArrayInRange(
				array: string[],
				startIndex: number,
				endIndex: number
			) {
				if (startIndex < 0 || endIndex >= array.length || startIndex >= endIndex) {
					return 'Invalid range.';
				}

				for (let i = endIndex; i > startIndex; i--) {
					const j = Math.floor(Math.random() * (i - startIndex + 1)) + startIndex;
					[array[i], array[j]] = [array[j], array[i]];
				}
			}

			if (state.currentPlayingIndex === -1) {
				shuffleArrayInRange(state.queue, 0, state.queue.length - 1);
			} else {
				shuffleArrayInRange(state.queue, 0, state.currentPlayingIndex - 1);
				shuffleArrayInRange(
					state.queue,
					state.currentPlayingIndex + 1,
					state.queue.length - 1
				);
			}
		},
	},
});

const AudioPlayer = {
	player: Player,
	volume: Player.actions.volume,
	show: Player.actions.show,
	hide: Player.actions.hide,
	songName: Player.actions.songName,
	artist: Player.actions.artist,
	duration: Player.actions.duration,
	seek: Player.actions.seek,
	play: Player.actions.play,
	pause: Player.actions.pause,
	togglePlayPause: Player.actions.togglePlayPause,
	addSong: Player.actions.addSong,
	next: Player.actions.next,
	prev: Player.actions.prev,
	queueLoop: Player.actions.queueLoop,
	songLoop: Player.actions.songLoop,
	shuffle: Player.actions.shuffle,
	currentSongPlayingPosition: Player.actions.currentSongPlayingPosition,
};

export default AudioPlayer;
