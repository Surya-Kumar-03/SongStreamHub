import {Button} from '@/components/ui/button';
import {Icon} from '@iconify/react';
import {useMutation} from '@apollo/client';
import {gql} from '@apollo/client';

export default function Login() {
	const AUTHENTICATE_WITH_GOOGLE = gql`
		mutation Mutation {
			authenticateWithGoogle
		}
	`;

	const [authenticateWithGoogle] = useMutation(AUTHENTICATE_WITH_GOOGLE);

	async function handleGoogleSignIn() {
		try {
			const {data}: any = await authenticateWithGoogle;
			console.log(data);
		} catch (error) {
			console.error('Google authentication error:', error);
		}
	}

	return (
		<div className="dark flex w-full h-screen justify-center items-center">
			<div className="border border-1 rounded-md">
				<Button
					className="bg-slate-200 flex justify-between gap-5 shadow-lg"
					onClick={handleGoogleSignIn}>
					<Icon icon="flat-color-icons:google" />
					Sign In with Google
				</Button>
			</div>
		</div>
	);
}
