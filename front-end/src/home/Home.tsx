import {MusicCard} from './musicCard';
import {useEffect} from 'react';
import {writeToken} from '@/jwt';

const getQueryParam = (name: string) => {
	const params = new URLSearchParams(location.search);
	return params.get(name);
};

export default function Home() {
	useEffect(() => {
		const token: string | null = getQueryParam('token');
		if (token) {
			writeToken(token);
		}
	}, []);

	return (
		<div className="p-10 flex flex-wrap gap-5">
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
			<MusicCard />
		</div>
	);
}
