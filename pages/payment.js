import styles from '../styles/Home.module.css'
import { loadStripe } from '@stripe/stripe-js'

export async function CheckOut({lineItems}) {
    let stripePromise = null
    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)
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

export default function Payment() { 
    return (
        <div className={styles.container}>
            <head>
                <title>Payment</title>
                <link rel="icon" href="/favicon.ico" />
            </head>

        <main className={styles.main}>
            <h1 className={styles.title}>
            Payment
            </h1>
            <div className={styles.grid}>
                <div>
                <h3>Payment &rarr;</h3>
                <p>Payment</p>
                <button onclick={(() => {
                    CheckOut({
                        lineItems: [
                            {
                                price : "price_1NnOUgSI0BWXfdSuDXjzMwU1",
                                quantity: 1
                            }
                        ]
                    }

                    )
                })}>PAY</button>
                </div>
            </div>  
        </main>
        </div>
    )
    }