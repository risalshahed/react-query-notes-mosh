import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// we can pass a few default values inside the call of "QueryClient()" function if we want

// const queryClient = new QueryClient();

// 9.1 queryClient() er default options amra customize korte pari
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 5*1000*60,   // 5 minutes
      // 10 sec freshe thakbe, erpor stale hye jabe
      staleTime: 10*1000,      // 10 seconds
      // 9.3 refetch false kri
      refetchOnWindowFocus: false,  // by default -> true
      refetchOnReconnect: false,  // by default -> true
      // component er 1st mount a refetch hbe?
      refetchOnMount: false,  // by default -> true
      // ******* 9.4 most of the time a egulo lagbei na! sudhu stale time lagbe, tai shob gulo comment kore sudhu staleTime ta amdr hook "useTodos" a change kore dbo
    }
  }
});

// 9.2 one of the beauty of react is it automatically refreshes react data under 3 situations
/* AUTO REFRESH
- When the network is reconnected
- When a component is mounted
- When the window is refocused
*** wait, window refocused??? yes, amra jodi browser oi tab theke onno kothao emn ki same browser er onno tab a giyeo oi tab a return kri, data refetch hye abr stale theke FRESH hye jabe! we can change this settings, go to 9.3
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* QueryClientProvider er sathe ei client={queryClient} na dle kono component e render hbena! BUT now sbkisu ei react-qeury er client er kase access asey, JOSS */}
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
