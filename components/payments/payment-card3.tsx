import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client";
import { GET_WALLET_DETAILS } from "../../src/graphql/queries.js";
import { useEffect, useState } from 'react';

export const PaymentCard3 = () => {
   const { data: session } = useSession();
   const [walletData, setwalletData] = useState();
   const userEmail = session?.user?.email;
   

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
         console.log("Success fetching data:", data.Wallet[0].current_balance);
         const walletdata = data.Wallet[0];
         setwalletData(walletdata);


         //  console.log(keyValueApiCalls);
         return;
      }
   }, [data, loading, error]);


   return (
      <Card
         css={{
            mw: '375px',
            bg: '$green600',
            borderRadius: '$xl',
            px: '$6',
            width:'$100'
         }}
      >
         <Card.Body css={{py: '$16',width:'$80'}}>
            <Flex css={{gap: '$5'}}>
               <Community />
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}}>
                     Expires On
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$10', py: '$10'}} align={'center'}>
               {walletData && <Text
                  span
                  size={'$xl'}
                  css={{color: 'white'}}
                  weight={'semibold'}
               >
                  {walletData.end_date}
               </Text>}
            </Flex>
            
         </Card.Body>
      </Card>
   );
};
