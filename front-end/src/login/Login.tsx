import {Button} from '@/components/ui/button';
import {Icon} from '@iconify/react';
import {Link} from 'react-router-dom';

export default function Login() {
	return (
		<div className="dark flex w-full h-screen justify-center items-center ">
			<div className="border border-1 rounded-md">
				<Button className="bg-slate-200 flex justify-between gap-5 shadow-lg">
					<Icon icon="flat-color-icons:google" />
					<Link to="home/">Sign In with Google</Link>
				</Button>
			</div>
		</div>
	);
}
