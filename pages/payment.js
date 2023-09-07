import { loadStripe } from '@stripe/stripe-js';
import React from "react";
import { Button, Input, Text } from '@nextui-org/react';
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



export default function Payment() {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
  async function CheckOut({ lineItems }) {
    let stripePromise = null
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
          <CrumbLink href="#">Payments</CrumbLink>
        </Crumb>
      </Breadcrumbs>


      <Text h3>Payment</Text>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>
      <Button onClick={(() => {
          CheckOut({
            lineItems: [
              {
                price: "price_1NnOUgSI0BWXfdSuDXjzMwU1",
                quantity: 1
              }
            ]
          }

          )
        })} style={{width:'5vw'}}>PAY</Button>
      </div>
      
    </Flex>
  );
}
