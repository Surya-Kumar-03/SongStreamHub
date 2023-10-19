import Home from './home/Home';
import Login from './login/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

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
		<>
			<RouterProvider router={router} />
		</>
	);
}
