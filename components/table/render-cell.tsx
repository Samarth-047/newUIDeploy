import {Col, Row, User, Text, Tooltip} from '@nextui-org/react';
import React from 'react';
import {DeleteIcon} from '../icons/table/delete-icon';
import {EditIcon} from '../icons/table/edit-icon';
import {EyeIcon} from '../icons/table/eye-icon';
import {IconButton, StyledBadge} from './table.styled';

interface Props {
   user: any;
   columnKey: string | React.Key;
}

export const RenderCell = ({user, columnKey}: Props) => {
   // @ts-ignore
   const cellValue = user[columnKey];
   switch (columnKey) {
      case 'video_url':
         return (
            <User squared src={user.avatar} name={cellValue} css={{p: 0}}>
               {user.video_url}
            </User>
         );
         case 'video_url':
            return (
               <User squared src={user.avatar} name={cellValue} css={{p: 0}}>
                  {user.timeduration}
               </User>
            );
      case 'role':
         return (
            <Col>
               <Row>
                  <Text b size={14} css={{tt: 'capitalize'}}>
                     {cellValue}
                  </Text>
               </Row>
               <Row>
                  <Text
                     b
                     size={13}
                     css={{tt: 'capitalize', color: '$accents7'}}
                  >
                     {user.team}
                  </Text>
               </Row>
            </Col>
         );
      case 'status':
         return (
            // @ts-ignore
            <StyledBadge type={String(user.status)}>{cellValue}</StyledBadge>
         );
      default:
         return cellValue;
   }
};
