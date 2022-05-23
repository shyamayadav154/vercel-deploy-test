import '../styles/globals.css';
import '../node_modules/react-toastify/dist/ReactToastify.min.css';
import { SessionProvider } from 'next-auth/react';
import { GlobalProvider } from '../Global-State/globalContext';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import EmptyLayout from '../components/Layout/EmptyLayout';
import axios from 'axios'
// import {QueryClientProvider, QueryClient} from 'react-query'
// import {REactQueryDevtools} from 'react-query/devtools'


// const queryClient = new QueryClient()

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {

      const Layout = Component.Layout || EmptyLayout;

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <GlobalProvider>
        <AnimatePresence exitBeforeEnter>
        <Layout>

           <Component {...pageProps}/>
        </Layout>
        </AnimatePresence>
      </GlobalProvider>

      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </SessionProvider>
  );
}
