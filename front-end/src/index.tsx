import {NavBar, Menu} from './navBar/header';
import Home from './home/Home';
import Login from './login/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import client from './graphqlConfig';

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
			<div className="flex w-full h-full">
				<div className="container">
					<RouterProvider router={router} />
				</div>
			</div>
		</ApolloProvider>
	);
}
