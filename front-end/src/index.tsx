import {NavBar, Menu} from './navBar/header';
import Home from './home/Home';
import Login from './login/Login';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

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
		<>
			<div className="flex w-full h-full">
				<div className="container">
					<RouterProvider router={router} />
				</div>
			</div>
		</>
	);
}
