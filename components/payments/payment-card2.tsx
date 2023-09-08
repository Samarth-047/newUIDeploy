import { Card, Text } from '@nextui-org/react';
import React from 'react';
import { Community } from '../icons/community';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client";
import { GET_WALLET_DETAILS } from "../../src/graphql/queries.js";
import { useEffect, useState } from 'react';

export const PaymentCard2 = () => {
   const { data: session } = useSession();
   const [walletData, setwalletData] = useState(
      {
         current_balance: 0,
         start_date: "",
         end_date: "",
      }
   );
   const userEmail = session?.user?.email;
   const [daysRemaining, setDaysRemaining] = useState();


   const { loading, error, data } = useQuery(GET_WALLET_DETAILS, {
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
         console.log("Success fetching data:", data.Wallet[0]);
         const walletdata = data.Wallet[0];
         setwalletData({
            current_balance: data.Wallet[0].current_balance || 0,
            start_date: data.Wallet[0].start_date || "",
            end_date: data.Wallet[0].end_date || "",
         });
         //  console.log(keyValueApiCalls);
         return;
      }
   }, [data, loading, error]);


   return (
      <Card
         css={{
            mw: '375px',
            bg: 'red',
            borderRadius: '$xl',
            px: '$6',
            width: '$100'
         }}
      >
         <Card.Body css={{ py: '$16', width: '$80' }}>
            <Flex css={{ gap: '$5' }}>
               <Community />
               <Flex direction={'column'}>
                  <Text span css={{ color: 'white' }}>
                     Expires In
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{ gap: '$10', py: '$10' }} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  css={{ color: 'white' }}
                  weight={'semibold'}
               >
                  23 Days
               </Text>
            </Flex>

         </Card.Body>
      </Card>
   );
};
