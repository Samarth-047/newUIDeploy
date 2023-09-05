import { Avatar, Dropdown, Navbar, Text,Button } from '@nextui-org/react';
import React from 'react';
import { DarkModeSwitch } from './darkmodeswitch';
import { useSession, signIn, signOut } from "next-auth/react"


export const UserDropdown = () => {
   const { data: session } = useSession();
   const handleSignOut: React.MouseEventHandler<HTMLButtonElement> = async () => {
      await signOut({ callbackUrl: '/' });
   };

   return (
      <Dropdown placement="bottom-right">
         <Navbar.Item>
            <Dropdown.Trigger>
               <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
               />
            </Dropdown.Trigger>
         </Navbar.Item>
         <Dropdown.Menu
            aria-label="User menu actions"
            onAction={(actionKey) => console.log({ actionKey })}
         >
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
               <Text b color="inherit" css={{ d: 'flex' }}>
                  Signed in as
               </Text>
               <Text b color="inherit" css={{ d: 'flex' }}>
                  {session?.user?.email}
               </Text>
            </Dropdown.Item>
               <Dropdown.Item key="logout" withDivider color="error">
                  
                  <div onClick={() => signOut({ callbackUrl: '/' })}>Log Out</div>
               </Dropdown.Item>
            <Dropdown.Item key="switch" withDivider>
               <DarkModeSwitch />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};
