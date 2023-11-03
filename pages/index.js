import { useRouter } from 'next/router';
import * as React from 'react';
import loginStyle from '../styles/login.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Google from '@mui/icons-material/Google';
import Facebook from '@mui/icons-material/GitHub';
import { useSession, signIn, signOut } from "next-auth/react"
import { useCheckAndInsertUser } from '../src/components/UserUtils';

export default function Login() {
    const { data: session } = useSession();
    useCheckAndInsertUser(session);
    const router = useRouter();

    // Check if session is true, then redirect to the loginNavigate page
    if (session) {
        router.push('/loginNavigate'); // Replace '/loginNavigate' with your actual desired URL
    }

    return (
        <>
            <div className={loginStyle.home}>
                <div className={loginStyle.card} style={{ color: "black" }}>
                    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1.2rem", fontWeight: "550", textAlign: "center" }}>Sign In to your account</div>

                    {!session && (
                        <>
                            <br />
                            <div style={{ display: "flex", fontFamily: "Arial, Helvetica, sans-serif", flexDirection: "row", justifyContent: "center" }} onClick={() => signIn()}>
                                <Google style={{ padding: ".1vw" }} />
                                <Facebook style={{ padding: ".1vw" }} />
                            </div>
                            <br />
                        </>
                    )}
                    {session && (
                        <>
                            Redirecting...
                        </>
                    )}

                </div>
            </div>
        </>
    );
}
