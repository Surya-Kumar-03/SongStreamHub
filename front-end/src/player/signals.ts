import { signal } from "@preact/signals-react";

function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}


export interface interfaceQueue {
	song_name: string;
	artist: string;
	url: string;
	poster: {
		src: string;
		size: string;
		type: string;
	}[];
}
export interface GlobalAudioPlayer {
	visible: boolean;
	playing: boolean;
	songName: string;
	currentSongPlayingPosition: number;
	duration: number;
	volume: number;
	queue: interfaceQueue[];
	loopQueue: boolean;
	loopSong: boolean;
	currentPlayingIndex: number;
}

    const visible = signal(true)
	const playing = signal(true)
	const duration = signal<number>(1) // in seconds
	const volume = signal(0.7)
	const queue= signal<interfaceQueue[]>([
		{
			song_name: 'Siya Ram',
			artist: 'Unknown',
			url: '/sample_audio.mp3',
			poster: [
				{
					src: 'https://dummyimage.com/96x96',
					size: '96x96',
					type: 'image/png',
				},
			],
		},
		{
			song_name: 'Tu Mera hoke',
			artist: 'Arijit Singh',
			url: '/song1.m4a',
			poster: [
				{
					src: 'https://dummyimage.com/96x96',
					size: '96x96',
					type: 'image/png',
				},
			],
		},
		{
			song_name: 'Dheere Dheere',
			artist: 'Yo Yo Honey Singh',
			url: '/song2.m4a',
			poster: [
				{
					src: 'https://dummyimage.com/96x96',
					size: '96x96',
					type: 'image/png',
				},
			],
		},
	])
	const currentPlayingIndex = signal(0)
	const loopQueue = signal(true)
	const loopSong = signal(false)
	const currentSongPlayingPosition = signal(0)


const PlayerSignals =  {
        visible: visible.value,
        playing: playing.value,
		duration: duration.value,
		volume: volume.value,
		queue: queue.value,
        currentPlayingIndex: currentPlayingIndex.value,
        loopQueue: loopQueue.value,
        loopSong: loopSong.value,
        currentSongPlayingPosition: currentSongPlayingPosition.value,
		currentSong : ()=>{
			if(currentPlayingIndex.value >= 0 && currentPlayingIndex.value < queue.value.length)
				return queue.value[currentPlayingIndex.value]
			return {}	
		},
		next: () => {
			if (loopSong.value) {
				return;
			} else if (currentPlayingIndex.value === queue.value.length - 1) {
				currentSongPlayingPosition.value = 0;

				if (loopQueue.value) {
					currentSongPlayingPosition.value = 0;
					currentPlayingIndex.value = 0;
					playing.value = true;
				} else {
					playing.value = false;
				}
			} else {
				currentSongPlayingPosition.value = 0;

				currentPlayingIndex.value += 1;
				playing.value = true;
			}
		},
		prev: () => {
			if (loopSong.value) {
				return;
			} else if (loopQueue.value) {
				currentSongPlayingPosition.value = 0;

				currentPlayingIndex.value = mod(
					currentPlayingIndex.value - 1,
					queue.value.length
				);
				playing.value = true;
			} else {
				currentSongPlayingPosition.value = 0;

				if (currentPlayingIndex.value === 0) {
					playing.value = false;
				} else {
					currentPlayingIndex.value -= 1;
					playing.value = true;
				}
			}
		},
		shuffle: () => {
			function shuffleArrayInRange(
				array: interfaceQueue[],
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

			if (currentPlayingIndex.value === -1) {
				shuffleArrayInRange(queue.value, 0, queue.value.length - 1);
			} else {
				shuffleArrayInRange(queue.value, 0, currentPlayingIndex.value - 1);
				shuffleArrayInRange(
					queue.value,
					currentPlayingIndex.value + 1,
					queue.value.length - 1
				);
			}
		},
    }




export default PlayerSignals