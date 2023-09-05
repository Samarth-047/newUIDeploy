import {Button, Input, Text} from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import {Breadcrumbs, Crumb, CrumbLink} from '../breadcrumb/breadcrumb.styled';
import {DotsIcon} from '../icons/accounts/dots-icon';
import {ExportIcon} from '../icons/accounts/export-icon';
import {InfoIcon} from '../icons/accounts/info-icon';
import {TrashIcon} from '../icons/accounts/trash-icon';
import {HouseIcon} from '../icons/breadcrumb/house-icon';
import {UsersIcon} from '../icons/breadcrumb/users-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {Flex} from '../styles/flex';
import {TableWrapper} from '../table/table';
import {AddUser} from './add-user';

export const Accounts = () => {
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
               <UsersIcon />
               <CrumbLink href="#">Users</CrumbLink>
               <Text>/</Text>
            </Crumb>
            <Crumb>
               <CrumbLink href="#">List</CrumbLink>
            </Crumb>
         </Breadcrumbs>

         <Text h3>All API-Calls</Text>
         <TableWrapper />
      </Flex>
   );
};
