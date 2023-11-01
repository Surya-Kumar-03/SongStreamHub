import {NavBar, Menu} from './navBar/header';
import Home from './home/Home';
import Login from './login/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import client from './graphqlConfig';
import MusicPlayer from './player/MusicPlayer';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<NavBar />
				<Login />
			</>
		),
	},
	{
		path: 'home/',
		element: (
			<>
				<Menu />
				<Home></Home>
			</>
		),
	},
]);

export default function Index() {
	return (
		<ApolloProvider client={client}>
			<div className="flex w-full h-full justify-center items-center">
				<div className="flex flex-col w-full flex-grow h-full">
					<div className="w-full h-full pb-28">
						<RouterProvider router={router} />
					</div>
					<MusicPlayer />
				</div>
			</div>
		</ApolloProvider>
	);
}
