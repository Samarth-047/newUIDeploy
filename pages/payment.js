import { loadStripe } from '@stripe/stripe-js';
import React from "react";
import { Button, Input, Text } from '@nextui-org/react';
import Script from 'next/script';
import { useState, useEffect } from 'react';
import { Box } from '../components/styles/box';
import { useQuery } from "@apollo/client";
import Link from 'next/link';
import { Breadcrumbs, Crumb, CrumbLink } from '../components/breadcrumb/breadcrumb.styled';
import { DotsIcon } from '../components/icons/accounts/dots-icon';
import { ExportIcon } from '../components/icons/accounts/export-icon';
import { InfoIcon } from '../components/icons/accounts/info-icon';
import { TrashIcon } from '../components/icons/accounts/trash-icon';
import { HouseIcon } from '../components/icons/breadcrumb/house-icon';
import { UsersIcon } from '../components/icons/breadcrumb/users-icon';
import { SettingsIcon } from '../components/icons/sidebar/settings-icon';
import { Flex } from '../components/styles/flex';
import { PaymentCard1 } from '../components/payments/payment-card1';
import { PaymentCard2 } from '../components/payments/payment-card2';
import { PaymentCard3 } from '../components/payments/payment-card3';
import { useSession } from "next-auth/react"
import { GET_WALLET_DETAILS } from "../src/graphql/queries.js";


import {TableWrapper} from '../components/table1/table';



export default function Payment() {
    const { data: session } = useSession();

    const [walletData, setwalletData] = useState(
        {
           current_balance: 0,
           start_date: "",
           end_date: "",
        }
     );
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
            setwalletData({
                current_balance: data.Wallet[0].current_balance || 0,
                start_date: data.Wallet[0].start_date || "",
                end_date: data.Wallet[0].end_date || "",
             });


            //  console.log(keyValueApiCalls);
            return;
        }
    }, [data, loading, error]);
    // @ts-ignore
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
    const [balance, setBalance] = React.useState(0);
    const publishableKey = process.env.NEXT_PUBLIC_API_KEY;
    const customerEmail = session?.user?.email;

    async function CheckOut({ lineItems }) {
        let stripePromise = null;
        const getStripe = () => {
            if (!stripePromise) {
                stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
            }
            return stripePromise
        }
        const stripe = await getStripe()

        await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems,
            successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: window.location.origin,
        })
    }

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
                    <CrumbLink href="#">Receive</CrumbLink>
                </Crumb>
            </Breadcrumbs>


            <Text h3>Receive File</Text>
            <br />
            <br />
            <br />
            <TableWrapper />
            

        </Flex>
    );
}
