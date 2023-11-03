import { Table, Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { Box } from '../styles/box';
import { useSession } from "next-auth/react"
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_AND_API_CALLS } from "../../src/graphql/queries.js";
import { RenderCell } from "./render-cell";
import Button from '@mui/material/Button';

export const TableWrapper = () => {
   const { data: session } = useSession();
   const [Api_calls, setApi_calls] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;  // Change this value as needed

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = Api_calls.slice(indexOfFirstItem, indexOfLastItem);
   // @ts-ignore
   const paginate = (pageNumber) => setCurrentPage(pageNumber);



   const Columns = [
      { name: 'Sender', uid: 'video_url' },
      { name: 'File Name', uid: 'timeduration' },
      { name: 'Request', uid: 'timeduration' },
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

   const handleAccept = (id : any) => {
      console.log(`Accepted for ID: ${id}`);
      // Add your logic here for when the "Accept" button is clicked
  }
  
  const handleReject = (id : any) => {
      console.log(`Rejected for ID: ${id}`);
      // Add your logic here for when the "Reject" button is clicked
  }
  

   // @ts-ignore
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
            <Table.Body items={currentItems}>
               {currentItems?.map((row: any, index) => (
                  <Table.Row key={index}>
                     <Table.Cell>
                        {row.video_url}
                     </Table.Cell>
                     <Table.Cell>
                        {row.timeduration}
                     </Table.Cell>
                     <Table.Cell>
   <Button onClick={() => handleAccept(row.id)}>Accept</Button> {/* Assuming you want to do something with the row ID or some data */}
   <Button onClick={() => handleReject(row.id)}>Reject</Button>
</Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table>
         {/* @ts-ignore */}
         <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Pagination
               total={Math.ceil(Api_calls.length / itemsPerPage)}
               // @ts-ignore
               value={currentPage}
               onChange={(value) => paginate(value)}
            />
         </div>

      </Box>
   );
};
