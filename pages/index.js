
import { useRouter } from 'next/router';
import * as React from 'react';
import loginStyle from '../styles/login.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Google from '@mui/icons-material/Google';
import Facebook from '@mui/icons-material/GitHub';
import { useSession, signIn, signOut } from "next-auth/react"
import { useCheckAndInsertUser} from '../src/components/UserUtils'; // Adjust the path as needed


export default function Login() {
    const { data: session } = useSession();
    useCheckAndInsertUser(session);

    return (
        <>
            <div className={loginStyle.home}>
                <div className={loginStyle.card} style={{color:"black"}}>
                    <div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "1.2rem", fontWeight: "550", textAlign: "center" }}>Sign In to your account</div>

                    <br />
                    <br />
                    {!session && (
                        <>
                            <TextField
                                required
                                label="Email"
                                id="outlined-textarea"
                                placeholder="Enter your email."
                                multiline
                                sx={{ width: 300 }}
                            />
                            <br />
                            <TextField
                                required
                                label="Password"
                                id="outlined-textarea"
                                placeholder="Enter your password."
                                multiline
                                sx={{ width: 300 }}
                            />
                            <br />
                            <Button variant="contained" style={{ backgroundColor: "#5d73a9" }}>Sign In</Button>
                            <br />
                            <div style={{ display: "flex", fontFamily: "Arial, Helvetica, sans-serif", justifyContent: "center", textAlign: "center", fontSize: "1.3vw", fontWeight: "200" }}>OR</div>
                            <br />
                            <div style={{ display: "flex", fontFamily: "Arial, Helvetica, sans-serif", justifyContent: "center", textAlign: "center", fontSize: "1vw", fontWeight: "200" }}>Sign in with</div>
                            
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
