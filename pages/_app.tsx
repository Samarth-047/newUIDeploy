import '../styles/globals.css';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import type { AppProps as NextAppProps } from 'next/app';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Layout} from '../components/layout/layout';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import client from '../src/lib/apollo-client';

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {},
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

interface AppProps extends NextAppProps {
  pageProps: {
    session: any;  // Replace with the type of your session
    [key: string]: any;  // For all other props
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
   return (
      <NextThemesProvider
         defaultTheme="system"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider>
          
            <ApolloProvider client={client}>
					<SessionProvider session={session}>
						<Component {...pageProps} />
					</SessionProvider>
				</ApolloProvider>
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
