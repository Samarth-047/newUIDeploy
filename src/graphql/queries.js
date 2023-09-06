import gql from 'graphql-tag';

// Query to fetch user by email
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    Users(where: { email: { _eq: $email } }) {
      email
    }
  }
`;

// Mutation to insert a new user
export const INSERT_USER = gql`
  mutation InsertUser($email: String!, $username: String!) {
    insert_Users_one(object: { email: $email, username: $username }) {
      username
    }
  }
`;

/* 
query GetUserAndApiCalls($email: String!) {
  Users(where: { email: { _eq: $email } }) {
    -----desired data content-----
  }}
*/

// Query to fetch user and all the API calls made by them based on user email
// We are using Users_by_pk because email is the primary key,
// in case of a more generic search we can use Users with where clause which is written above
export const GET_USER_AND_API_CALLS = gql`
  query GetUserAndApiCalls($email: String!) {
    Users_by_pk(email: $email) {       
      email
      username
      Api_calls {
        timeduration
        video_url
        createdOn
      }
    }
  }
`;
  
