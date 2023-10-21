import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_BASE_URL + '/graphql',
});

const authLink = setContext((_, {headers}) => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
