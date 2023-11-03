import React, { useState } from 'react';
import { Button, Input, Text } from '@nextui-org/react';
import Link from 'next/link';
import { Breadcrumbs, Crumb, CrumbLink } from '../breadcrumb/breadcrumb.styled';
import { HouseIcon } from '../icons/breadcrumb/house-icon';
import { Flex } from '../styles/flex';

export const Accounts = () => {
   const [secretKey, setSecretKey] = useState('');
   const [fileLocation, setFileLocation] = useState('');
   const [progress, setProgress] = useState(0);
   const [showProgressBar, setShowProgressBar] = useState(false);

   const handleStart = () => {
      if (secretKey === '' || fileLocation === '') {
         alert('Both fields must be filled before starting!');
         return;
      }

      setShowProgressBar(true);

      let currentProgress = 0;
      const interval = setInterval(() => {
         currentProgress += 1;
         setProgress(currentProgress);

         if (currentProgress >= 100) {
            clearInterval(interval);
         }
      }, 50);
   };

   const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
         setFileLocation(selectedFile.name);
      }
   };

   return (
      <Flex
         css={{
            'mt': '$5',
            'px': '$6',
            '@sm': {
               mt: '$10',
               px: '$16',
            },
         }}
         justify={'center'}
         direction={'column'}
      >
         <Breadcrumbs>
            <Crumb>
               <HouseIcon />
               <Link href={"/loginNavigate"}>
                  <CrumbLink href="/loginNavigate">Home</CrumbLink>
               </Link>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">Send</CrumbLink>
            </Crumb>
         </Breadcrumbs>

         <Text h3>Send File</Text>

         <div style={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '20%',
         }}>
            <Input
               value={secretKey}
               onChange={(e) => setSecretKey(e.target.value)}
               placeholder="Enter receiver's secret key"
            />
            <br />

            <Input 
               type="file" 
               onChange={handleFileChange} 
               style={{ display: 'none' }} 
               id="fileInput" 
            />
            <Input
               value={fileLocation}
               placeholder="Selected file"
               onClick={() => document.getElementById("fileInput").click()}
               readOnly
            />
            <br />

            <Button onClick={handleStart}>Start</Button>

            {showProgressBar && (
               <div style={{
                  width: '100%',
                  height: '20px',
                  backgroundColor: '#e0e0e0',
                  marginTop: '20px'
               }}>
                  <div style={{
                     width: `${progress}%`,
                     height: '100%',
                     backgroundColor: '#3f51b5'
                  }}></div>
               </div>
            )}
         </div>
      </Flex>
   );
};
