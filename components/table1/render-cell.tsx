
import React from "react";
import { Table } from '@nextui-org/react';

interface Props {
    video_url?: any;
    timeduration?: any;
}


export const RenderCell = ({ video_url , timeduration }: Props) => {
  // @ts-ignore
    console.log(video_url);
    console.log(timeduration);
    return (
        <Table.Row>
            <Table.Cell>{typeof video_url !== "symbol" ? video_url : "Invalid Value"}</Table.Cell>
            <Table.Cell>{typeof timeduration !== "symbol" ? timeduration : "Invalid Value"}</Table.Cell>
        </Table.Row>
    );
}