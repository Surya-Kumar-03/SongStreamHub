import {Button} from '@/components/ui/button';
import {Icon} from '@iconify/react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {isTokenExpired, extractToken} from '@/jwt';
import {useEffect} from 'react';

export default function Login() {
	useEffect(() => {
		const jwtToken = extractToken();
		if (jwtToken !== null && !isTokenExpired(jwtToken)) {
			window.location.href = '/home';
		}
	}, []);

	return (
		<div className="flex w-full h-screen justify-center items-center flex-col gap-10">
			<Card className="w-[350px] flex flex-col items-center">
				<CardHeader>
					<CardTitle>
						<Label className="text-2xl">Login to Songs Hub</Label>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<a href={import.meta.env.VITE_BASE_URL + '/auth/google'}>
						<Button className="flex justify-between gap-5 shadow-lg rounded-full px-10">
							<Icon icon="flat-color-icons:google" />
							Sign In with Google
						</Button>
					</a>
				</CardContent>
			</Card>
			{/* <div className="text-2xl">Login to Songs Hub</div> */}
		</div>
	);
}
