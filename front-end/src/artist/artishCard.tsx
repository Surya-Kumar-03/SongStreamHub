import {CalendarDays} from 'lucide-react';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card';

interface Props {
	name: string;
	avatar_link: string;
	song_title: string;
	genere: string;
	upload_date: string;
}

export default function ArtistCard(props: Props) {
	const name = props.name.toUpperCase().split(' ');
	let initials = '';
	for (let i = 0; i < name.length; i++) {
		initials += name[i][0];
	}

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<div className="cursor-pointer hover:underline">{props.name}</div>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<Avatar>
						<AvatarImage src={props.avatar_link} />
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
					<div className="space-y-1 w-full">
						<h4 className="text-sm font-semibold">{props.name}</h4>
						<p className="text-sm">{`${props.song_title} - ${props.genere}`}</p>
						<div className="flex items-center pt-2">
							<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
							<span className="text-xs text-muted-foreground">
								{props.upload_date}
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
}
