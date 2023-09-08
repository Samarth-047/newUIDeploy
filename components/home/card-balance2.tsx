import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_AND_API_CALLS } from "../../src/graphql/queries.js";
import { useEffect, useState } from 'react';

export const CardBalance2 = () => {
   const { data: session } = useSession();
   const [Api_calls, setApi_calls] = useState([]);

   const Columns = [
      { name: 'VIDEO URL', uid: 'video_url' },
      { name: 'TIME DURATION', uid: 'timeduration' },
   ];
   const [minutes, setMinutes] = useState(0);
   const [seconds, setSeconds] = useState(0);
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

   const calculateTotalTime = (api_calls:any) => {
      // seperate first 2 and last 2 characters and convert to int
      if (api_calls) {
          let minutes = 0;
          let seconds = 0;
          // iterate through api_calls and add up the time
          for (let i = 0; i < api_calls.length; i++) {
              minutes += parseInt(api_calls[i].timeduration.toString().slice(0, 2));
              seconds += parseInt(api_calls[i].timeduration.toString().slice(-2));
          }
          minutes = minutes + Math.floor(seconds / 60);
          setMinutes(minutes);
          setSeconds(seconds % 60);
          console.log(minutes);
          return minutes;
      }
  }

  useEffect(() => {
   // setApi_calls(useGetUserAndApiCalls(session));
   if (Api_calls) {
       try {
           const total = calculateTotalTime(Api_calls);
           // Convert to minutes if needed
       } catch (error) {
           console.error('Error computing total time:', error);
       }
   }
}, [Api_calls]);

   return (
      <Card
         css={{
            mw: '375px',
            bg: '$accents0',
            borderRadius: '$xl',
            px: '$6',
            width:'$100'
         }}
      >
         <Card.Body css={{py: '$16',width:'$80'}}>
            <Flex css={{gap: '$5'}}>
               <Community color={'$accents9'} />
               <Flex direction={'column'}>
                  <Text span css={{color: ''}}>
                     Total Recording Time
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$10', py: '$10'}} align={'center'}>
               <Text span size={'$xl'} weight={'semibold'}>
                  {minutes}&nbsp;Minutes&nbsp;{seconds}&nbsp;Seconds
               </Text>
            </Flex>
         </Card.Body>
      </Card>
   );
};
