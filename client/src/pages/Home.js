import React from 'react';
// import useQuery Hook from Apollo Client to allow you to make requests to GraphQL server
// allows you to make requests to GraphQL server you connected to and made available to the app using the <ApolloProvider> component in App.js
import { useQuery } from '@apollo/client';
// import QUERY_THOUGHTS query and use with imported Hook functionality to query the data
import { QUERY_THOUGHTS } from '../utils/queries';
// import ThoughtList component
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request
  // when you load Home component in app, you'll execute the query for thought data. This is async like fetch(), & Apollo's @apollo/client library provides a loading property to indicate the request isn't done yet
  // when loading is finished and data is returned from server, that info is stored in the destructured data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use optional chainging to negate the need to check if an obj even exists before accessing its properties
  // in this case, no data will exist until the query to the server is finished
  // without the ?, you'll receive an error that says you can't access the property of data because it's undefined
  // this says if data exists, store it in thoughts constant you just created. If data is undefined, save an empty array to thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
            // use ternary operator to conditionally render <thoughtList> component:
            // if query hasn't completed and loading is still defined, display message to indicate that
          ) : (
            // once query is complete and loading is undefined, pass the thoughts array & custom title to ThoughtList component as props
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
