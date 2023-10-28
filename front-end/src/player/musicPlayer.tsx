import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Icon} from '@iconify/react/dist/iconify.js';
import React from 'react';
import {Slider} from '@/components/ui/slider';
import ReactPlayer from 'react-player';
import {useSelector, useDispatch} from 'react-redux';
import AudioPlayer from '@/redux/features/audioPlayer';
import type {RootState} from '@/redux/store';

const secondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const new_seconds = Math.floor(seconds - minutes * 60);
	return `${minutes}:${new_seconds}`;
};

export default function MusicPlayer() {
	const Player = React.useRef<ReactPlayer | null>(null);
	const reduxAudioPlayer = useSelector((state: RootState) => state.AudioPlayer);
	const dispatch = useDispatch();
	const [seeking, setSeeking] = React.useState(false);
	const handleProgress = (changeState: {
		loaded: number;
		playedSeconds: number;
		loadedSeconds: number;
		played: number;
	}) => {
		if (reduxAudioPlayer.playing && seeking === false) {
			dispatch(AudioPlayer.currentSongPlayingPosition(changeState.playedSeconds));
		}
		if (Player.current?.getDuration() !== reduxAudioPlayer.duration) {
			dispatch(AudioPlayer.duration(Player.current?.getDuration()));
		}
	};
	const handleDuration = (duration: number) => {
		dispatch(AudioPlayer.duration(duration));
	};
	const handleSongEnded = () => {
		dispatch(AudioPlayer.next());
	};
	const handleSeek = (data: number[]) => {
		setSeeking(true);
		dispatch(AudioPlayer.seek(data[0]));
		Player.current?.seekTo(reduxAudioPlayer.currentSongPlayingPosition);
		setSeeking(false);
		console.log(data);
	};
	const handleVolumeSeek = (data: number[]) => {
		dispatch(AudioPlayer.volume(data[0] / 100));
	};
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!reduxAudioPlayer.visible) {
				return;
			}
			if (event.key === ' ') {
				event.preventDefault();
				dispatch(AudioPlayer.togglePlayPause());
			} else if (event.key === 'ArrowUp') {
				event.preventDefault();
			} else if (event.key === 'ArrowDown') {
				event.preventDefault();
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
								<AvatarImage src={''} className="rounded-sm"></AvatarImage>
								<AvatarFallback className="rounded-sm">{initials}</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex flex-col">
							<div>Song Name</div>
							<div>Artist Name</div>
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
							<div>
								{secondsToMinutes(reduxAudioPlayer.currentSongPlayingPosition)}
							</div>
							<div className="w-full">
								<Slider
									defaultValue={[0]}
									max={reduxAudioPlayer.duration}
									step={1}
									onValueCommit={handleSeek}
									onValueChange={handleSeek}
									value={[reduxAudioPlayer.currentSongPlayingPosition]}
								/>
							</div>
							<div>{secondsToMinutes(reduxAudioPlayer.duration)}</div>
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
								return reduxAudioPlayer.queue[reduxAudioPlayer.currentPlayingIndex];
							}
							return '';
						})()}
						onEnded={handleSongEnded}
						loop={reduxAudioPlayer.loopSong}
						height={'40px'}
						playing={reduxAudioPlayer.playing}
						onProgress={handleProgress}
						onDuration={handleDuration}
						volume={reduxAudioPlayer.volume}
						muted={reduxAudioPlayer.volume === 0}
					/>
				</div>
			</div>
		</>
	);
}
