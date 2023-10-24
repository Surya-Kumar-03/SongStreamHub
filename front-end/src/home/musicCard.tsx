import * as React from 'react';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import poster from '@/assets/poster.webp';
import Image from '@/components/ui/image';
import {Icon} from '@iconify/react';
import PlayButton from '@/components/ui/platButton';
import ArtistCard from '@/artist/artishCard';

export function MusicCard() {
	const [like, setLike] = React.useState(false);
	const [likeCount, setLikeCount] = React.useState(101);
	const [playing, setPlaying] = React.useState(false);

	const likeSong = () => {
		if (like) {
			setLikeCount((prev) => prev - 1);
		} else {
			setLikeCount((prev) => prev + 1);
		}
		setLike((prev) => !prev);
	};
	const playSong = () => {
		console.log('Song Playing');
		setPlaying((prev) => !prev);
	};
	return (
		<Card className="w-[350px] hover:bg-foreground/10">
			<CardContent className="p-4 relative h-80">
				<Image
					src={poster}
					className="w-full h-full bg-cover bg-center  bg-black bg-blend-overlay"
				/>
				<Button
					onClick={playSong}
					variant="ghost"
					className="absolute cursor-pointer bg-green-600 hover:bg-green-600  bottom-5 right-10 hover:scale-110 transition-all rounded-full h-10 w-10">
					<PlayButton play={playing} />
				</Button>
			</CardContent>
			<CardFooter>
				<div className="flex justify-between w-full">
					<div className="flex flex-col">
						<div>Song Name</div>
						<div className="text-sm text-muted-foreground">
							<ArtistCard
								name="Aryan Amish"
								avatar_link=""
								genere="hpi-hop"
								song_title="New Song"
								upload_date="21st sep, 2023"
							/>
						</div>
					</div>
					<div className="flex flex-col justify-center items-center gap-2">
						<div onClick={likeSong} className="cursor-pointer w-5 h-5">
							{like ? (
								<Icon icon="flat-color-icons:like" className="w-full h-full" />
							) : (
								<Icon icon="mdi:heart-outline" className="w-full h-full" />
							)}
						</div>
						<div className="text-xs text-muted-foreground transition-all">
							{likeCount} Likes
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
