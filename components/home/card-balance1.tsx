import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_AND_API_CALLS } from "../../src/graphql/queries.js";
import { useEffect, useState } from 'react';

export const CardBalance1 = () => {
   const { data: session } = useSession();
   const [Api_calls, setApi_calls] = useState([]);
   const userEmail = session?.user?.email;
   const { loading, error, data } = useQuery(GET_USER_AND_API_CALLS, {
      variables: { email: userEmail },
      skip: !userEmail,
   });
   useEffect(() => {
      if (loading) {
         console.log("Loading...");
         return;
      }

      if (error) {
         console.error("Error fetching data:", error);
         return;
      }

      if (data) {
         const apiCalls = data.Users_by_pk.Api_calls;
         setApi_calls(apiCalls);
         //  console.log(keyValueApiCalls);
         return;
      }
   }, [data, loading, error]);
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$blue600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$16',width:'$60'}}>
            <Flex css={{gap: '$5'}}>
               <Community />
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}}>
                     API-Calls made
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$10'}} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  css={{color: 'white'}}
                  weight={'semibold'}
               >
                  {Api_calls.length}
               </Text>
            </Flex>
         </Card.Body>
      </Card>
   );
};
