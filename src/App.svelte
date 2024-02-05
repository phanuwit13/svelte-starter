<script lang="ts">
  import Route from '@/routes/index.svelte'
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'

  const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
  <Route />
</QueryClientProvider>
