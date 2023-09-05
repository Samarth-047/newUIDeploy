import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme, NextUIProvider} from '@nextui-org/react';
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
