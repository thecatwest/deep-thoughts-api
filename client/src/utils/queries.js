// this file stores all graphQL query requests
import { gql } from '@apollo/client';

// wrap entire query code in a tagged template literal using the imported gql function; saved it as QUERY_THOUGHTS, & exported using ES6 module export syntax
export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;