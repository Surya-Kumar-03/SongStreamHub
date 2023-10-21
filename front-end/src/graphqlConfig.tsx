import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {extractToken} from './jwt';

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_BASE_URL + '/graphql',
});

const authLink = setContext((_, {headers}) => {
	const jwtToken = extractToken();

	const updatedHeaders = jwtToken
		? {...headers, Authorization: `Bearer ${jwtToken}`}
		: {...headers, Authorization: null};

	return {
		headers: {
			...updatedHeaders,
			'Content-Type': 'application/json',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default client;
