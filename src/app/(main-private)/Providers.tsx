import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { FavoritesContextProvider } from '@/contexts/FavoriteContext'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}
let browserQueryClient: QueryClient | undefined = undefined
function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesContextProvider>
        {children}
      </FavoritesContextProvider>
    </QueryClientProvider>
  )
}