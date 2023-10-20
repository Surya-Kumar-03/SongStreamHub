import {Button} from '@/components/ui/button';
import {Icon} from '@iconify/react';
import {Link} from 'react-router-dom';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';

export default function Login() {
	return (
		<div className="flex w-full h-screen justify-center items-center flex-col gap-10">
			<Card className="w-[350px] flex flex-col items-center">
				<CardHeader>
					<CardTitle>
						<Label className="text-2xl">Login to Songs Hub</Label>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Link to="home/">
						<Button className="flex justify-between gap-5 shadow-lg rounded-full px-10">
							<Icon icon="flat-color-icons:google" />
							Sign In with Google
						</Button>
					</Link>
				</CardContent>
			</Card>
			{/* <div className="text-2xl">Login to Songs Hub</div> */}
		</div>
	);
}
