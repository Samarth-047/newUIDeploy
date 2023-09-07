import { Table } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Box } from '../styles/box';
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_AND_API_CALLS } from "../../src/graphql/queries.js";
import { RenderCell } from "./render-cell";

export const TableWrapper = () => {
   const { data: session } = useSession();
   const [Api_calls, setApi_calls] = useState([]);

   const Columns = [
      { name: 'VIDEO URL', uid: 'video_url' },
      { name: 'TIME DURATION', uid: 'timeduration' },
   ];

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
         console.log(apiCalls);
         return;
      }
   }, [data, loading, error]);

   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         <Table
            aria-label="Example table with custom cells"
            css={{
               height: 'auto',
               minWidth: '100%',
               boxShadow: 'none',
               width: '100%',
               px: 0,
            }}
         >
            <Table.Header columns={Columns}>
               {(column) => (
                  <Table.Column
                     key={column.uid}
                     hideHeader={column.uid === 'actions'}
                     align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                     {column.name}
                  </Table.Column>
               )}
            </Table.Header>

            <Table.Body items={Api_calls}>
            {Api_calls?.map((row:any, index) => (
                  <Table.Row key={index}>
                     <Table.Cell>
                        {row.video_url}
                     </Table.Cell>
                     <Table.Cell>
                        {row.timeduration}
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
            <Table.Pagination
               shadow
               noMargin
               align="center"
               rowsPerPage={8}
               onPageChange={(page) => console.log({ page })}
            />
         </Table>
      </Box>
   );
};
