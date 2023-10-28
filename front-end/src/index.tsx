import {NavBar, Menu} from './navBar/header';
import Home from './home/Home';
import Login from './login/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import client from './graphqlConfig';
import MusicPlayer from './player/musicPlayer';

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
				<div>
					<RouterProvider router={router} />
					<MusicPlayer />
				</div>
			</div>
		</ApolloProvider>
	);
}
