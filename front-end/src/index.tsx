import Home from './home/Home';
import Login from './login/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import client from './graphqlConfig';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />,
	},
	{
		path: 'home/',
		element: <Home></Home>,
	},
]);

export default function Index() {
	return (
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	);
}
