import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://synclabs.hasura.app/v1/graphql', // replace with your Hasura GraphQL URL
    headers: {
      'x-hasura-admin-secret': 'dP95HpqGU456507HaVhs18MNEX373WXl6I0nhK01YYD2mJEKpMIygafrCJB9717Q', // replace with your Hasura Admin Secret
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
