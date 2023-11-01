import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Icon} from '@iconify/react/dist/iconify.js';
import React from 'react';
import {Slider} from '@/components/ui/slider';
import ReactPlayer from 'react-player';
import {useSelector, useDispatch} from 'react-redux';
import AudioPlayer from '@/redux/features/audioPlayer';
import type {RootState} from '@/redux/store';
import PlayerSignals from './signals';
const secondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const new_seconds = Math.floor(seconds - minutes * 60);
	return `${String(minutes).padStart(2, '0')}:${String(new_seconds).padStart(
		2,
		'0'
	)}`;
};

let seeking = false;
export default function MusicPlayer() {
	const Player = React.useRef<ReactPlayer | null>(null);
	const trackSlider = React.useRef<HTMLSpanElement>(null);
	const reduxAudioPlayer = useSelector((state: RootState) => state.AudioPlayer);
	const volumeSlider = React.useRef<HTMLSpanElement>(null);
	const dispatch = useDispatch();
	const handleProgress = (changeState: {
		loaded: number;
		playedSeconds: number;
		loadedSeconds: number;
		played: number;
	}) => {
		if (PlayerSignals.playing && seeking === false) {
			PlayerSignals.currentSongPlayingPosition = changeState.playedSeconds;
			dispatch(AudioPlayer.currentSongPlayingPosition(changeState.playedSeconds));
		}
		if (Player.current?.getDuration() !== reduxAudioPlayer.duration) {
			PlayerSignals.duration = Player.current?.getDuration() || 0;
			dispatch(AudioPlayer.duration(Player.current?.getDuration()));
		}
	};
	const handleDuration = (duration: number) => {
		PlayerSignals.duration = duration;
		dispatch(AudioPlayer.duration(duration));
	};
	const handleSongEnded = () => {
		PlayerSignals.next();
		dispatch(AudioPlayer.next());
	};
	const handleSeek = (data: number[]) => {
		seeking = true;
		let seekTo = data[0];
		if (seekTo < 0) {
			seekTo = 0;
		} else if (seekTo > reduxAudioPlayer.duration) {
			seekTo = reduxAudioPlayer.duration;
		}
		dispatch(AudioPlayer.seek(seekTo));
		Player.current?.seekTo(seekTo);
		seeking = false;
	};
	const handleVolumeSeek = (data: number[]) => {
		let vol = data[0];
		if (vol < 0) {
			vol = 0;
		} else if (vol > 100) {
			vol = 100;
		}
		dispatch(AudioPlayer.volume(vol / 100));
	};

	const currentSong = () => {
		return reduxAudioPlayer.queue[reduxAudioPlayer.currentPlayingIndex];
	};

	React.useEffect(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: currentSong().song_name,
				artist: currentSong().artist || 'unknown',
				artwork: currentSong().poster,
			});

			navigator.mediaSession.setActionHandler('play', () => {
				dispatch(AudioPlayer.play());
			});
			navigator.mediaSession.setActionHandler('pause', () => {
				dispatch(AudioPlayer.pause());
			});
			navigator.mediaSession.setActionHandler('stop', () => {
				dispatch(AudioPlayer.pause());
				dispatch(AudioPlayer.currentSongPlayingPosition(0));
			});
			navigator.mediaSession.setActionHandler('previoustrack', () => {
				dispatch(AudioPlayer.prev());
			});
			navigator.mediaSession.setActionHandler('nexttrack', () => {
				dispatch(AudioPlayer.next());
			});
			navigator.mediaSession.setActionHandler('seekto', (e) => {
				if (e.seekTime) {
					handleSeek([e.seekTime]);
				}
			});
			navigator.mediaSession.setActionHandler('seekbackward', (e) => {
				if (e.seekTime) {
					handleSeek([e.seekTime]);
				}
			});
			navigator.mediaSession.setActionHandler('seekforward', (e) => {
				if (e.seekTime) {
					handleSeek([e.seekTime]);
				}
			});
		}
	}, [reduxAudioPlayer.currentPlayingIndex]);

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!reduxAudioPlayer.visible) {
				return;
			}
			if (
				!(
					event.key === ' ' ||
					event.key === 'ArrowUp' ||
					event.key === 'ArrowDown' ||
					event.key === 'ArrowLeft' ||
					event.key === 'ArrowRight'
				)
			) {
				return;
			}
			const old_vol = parseFloat(
				parseFloat(volumeSlider.current?.getAttribute('data-volume') || '0').toFixed(
					2
				)
			);
			const currentSongPos = parseFloat(
				trackSlider.current?.getAttribute('data-current-position') || '0'
			);
			if (
				event.key === ' ' &&
				!(document.activeElement instanceof HTMLInputElement)
			) {
				event.preventDefault();
				dispatch(AudioPlayer.togglePlayPause());
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
				handleVolumeSeek([old_vol + 2]);
			} else if (event.key === 'ArrowDown') {
				event.preventDefault();
				handleVolumeSeek([old_vol - 2]);
			} else if (event.key === 'ArrowLeft') {
				event.preventDefault();
				handleSeek([currentSongPos - 5]);
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				handleSeek([currentSongPos + 5]);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [reduxAudioPlayer.visible]);

	const initials = 'AA';
	const [like, setLike] = React.useState(false);
	const likeSong = () => {
		// if (like) {
		// 	setLikeCount((prev) => prev - 1);
		// } else {
		// 	setLikeCount((prev) => prev + 1);
		// }
		setLike((prev) => !prev);
	};

	const volumeIcon = (volume: number) => {
		if (volume === 0) {
			return 'lucide:volume-x';
		}
		if (volume > 50) {
			return 'lucide:volume-2';
		}
		return 'lucide:volume-1';
	};

	return (
		<>
			<div className="fixed bottom-0 w-full bg-primary-foreground">
				<div className="flex justify-between h-full w-full p-4">
					<div className="flex gap-5  w-full">
						<div>
							<Avatar className=" rounded-sm p-1 w-16 h-16">
								<AvatarImage
									src={currentSong().poster[0].src}
									className="rounded-sm"></AvatarImage>
								<AvatarFallback className="rounded-sm">{initials}</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex flex-col">
							<div>{currentSong().song_name}</div>
							<div>{currentSong().artist}</div>
						</div>
						<div className="h-full flex justify-center items-center pb-3">
							<div
								onClick={likeSong}
								className="cursor-pointer w-5 h-5 transition-all ">
								{like ? (
									<Icon icon="flat-color-icons:like" className="w-full h-full" />
								) : (
									<Icon icon="mdi:heart-outline" className="w-full h-full" />
								)}
							</div>
						</div>
					</div>
					<div className="flex flex-col w-full justify-center items-center ">
						<div className="flex flex-row w-full justify-center gap-5">
							<div
								onClick={() => dispatch(AudioPlayer.shuffle())}
								className="cursor-pointer transition-all hover:scale-110 opacity-90 hover:opacity-100 w-5">
								<Icon icon="solar:shuffle-linear" className="w-full h-full" />
							</div>
							<div
								onClick={() => dispatch(AudioPlayer.prev())}
								className="cursor-pointer transition-all hover:scale-110 opacity-90 hover:opacity-100 w-5">
								<Icon icon="fluent:previous-28-filled" className="w-full h-full" />
							</div>
							<div
								onClick={() => {
									dispatch(AudioPlayer.togglePlayPause());
								}}
								className="w-9 cursor-pointer transition-transform hover:scale-110 opacity-90 hover:opacity-100  flex justify-center items-center h-full bg-primary rounded-full p-2">
								{!reduxAudioPlayer.playing ? (
									<Icon
										icon="solar:play-bold"
										className="!fill-primary-foreground text-primary-foreground w-full h-full"
									/>
								) : (
									<Icon
										icon="ic:round-pause"
										className="!fill-primary-foreground text-primary-foreground w-full h-full"
									/>
								)}
							</div>
							<div
								onClick={() => dispatch(AudioPlayer.next())}
								className="cursor-pointer transition-all hover:scale-110 opacity-90 hover:opacity-100 w-5">
								<Icon icon="fluent:next-28-filled" className="w-full h-full" />
							</div>
							<div className="relative w-5 flex flex-col justify-center items-center">
								{reduxAudioPlayer.loopSong ? (
									<Icon
										onClick={() => {
											dispatch(AudioPlayer.queueLoop(false));
											dispatch(AudioPlayer.songLoop(false));
										}}
										icon="cil:loop-1"
										className="w-full h-full cursor-pointer transition-all hover:scale-110 hover:opacity-100 opacity-80"
									/>
								) : (
									<Icon
										onClick={() => {
											if (!reduxAudioPlayer.loopQueue) {
												dispatch(AudioPlayer.queueLoop(true));
											} else {
												dispatch(AudioPlayer.songLoop(true));
												dispatch(AudioPlayer.queueLoop(false));
											}
										}}
										icon="cil:loop"
										className="w-full h-full cursor-pointer transition-all hover:scale-110 hover:opacity-100 opacity-80"
									/>
								)}
								{reduxAudioPlayer.loopQueue === true && (
									<div className="absolute bottom-0 rounded-full bg-primary w-[5px] h-[5px]"></div>
								)}
							</div>
						</div>
						<div className="flex w-full h-full items-center justify-center gap-3">
							<div className="w-14">
								{secondsToMinutes(reduxAudioPlayer.currentSongPlayingPosition)}
							</div>
							<div className="w-full">
								<Slider
									data-current-position={reduxAudioPlayer.currentSongPlayingPosition}
									ref={trackSlider}
									defaultValue={[0]}
									max={reduxAudioPlayer.duration}
									step={1}
									onValueCommit={handleSeek}
									onValueChange={handleSeek}
									value={[reduxAudioPlayer.currentSongPlayingPosition]}
								/>
							</div>
							<div className="w-14">
								{secondsToMinutes(reduxAudioPlayer.duration)}
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="flex w-full justify-end items-center h-full pr-10 gap-3">
							<div>
								<Icon icon="heroicons:queue-list-20-solid" />
							</div>
							<div className="w-44 flex  items-center justify-center gap-3">
								<div>
									<Icon
										id="volume-icon"
										data-volume={0}
										onClick={(
											event: React.MouseEvent<SVGSVGElement, MouseEvent>
										) => {
											const svgElement: SVGSVGElement = event.currentTarget;
											const v: number = parseInt(
												svgElement.getAttribute('data-volume') || '0'
											);
											svgElement.setAttribute(
												'data-volume',
												String(reduxAudioPlayer.volume * 100)
											);
											handleVolumeSeek([v]);
										}}
										icon={volumeIcon(reduxAudioPlayer.volume * 100)}
									/>
								</div>
								<div className="w-full">
									<Slider
										data-volume={reduxAudioPlayer.volume * 100}
										ref={volumeSlider}
										onValueChange={(vol: number[]) => {
											if (vol[0] !== 0) {
												document
													.getElementById('volume-icon')
													?.setAttribute('data-volume', '0');
											}
											handleVolumeSeek(vol);
										}}
										onValueCommit={handleVolumeSeek}
										value={[reduxAudioPlayer.volume * 100]}
										defaultValue={[reduxAudioPlayer.volume * 100]}
										max={100}
										step={1}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="hidden">
					<ReactPlayer
						controls={true}
						ref={Player}
						url={(() => {
							if (reduxAudioPlayer.currentPlayingIndex !== -1) {
								return reduxAudioPlayer.queue[reduxAudioPlayer.currentPlayingIndex]
									.url;
							}
							return '';
						})()}
						onEnded={handleSongEnded}
						loop={reduxAudioPlayer.loopSong}
						playing={reduxAudioPlayer.playing}
						onProgress={handleProgress}
						onDuration={handleDuration}
						volume={reduxAudioPlayer.volume}
						muted={reduxAudioPlayer.volume === 0}
					/>
					T
				</div>
			</div>
		</>
	);
}
