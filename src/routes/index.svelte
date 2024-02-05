<!-- App.svelte -->
<script lang="ts">
  import Home from '@/pages/Home.svelte'
  import Login from '@/pages/Login.svelte'
  import { authStore } from '@/stores/auth'
  import { onMount } from 'svelte'
  import { Route, Router, navigate } from 'svelte-routing'
  export let url = ''

  let authenticated = Boolean(window.localStorage.getItem('sv_tk'))

  authStore.subscribe(($isAuthenticated) => {
    authenticated =
      Boolean($isAuthenticated.token) ||
      Boolean(window.localStorage.getItem('sv_tk'))

    if (!$isAuthenticated.token) {
      navigate('/login', { replace: true })
    }
  })

  onMount(() => {
    if (!authenticated) {
      navigate('/login', { replace: true })
    }
  })
</script>

<Router {url}>
  <div>
    <Route path="/"><Home /></Route>
    <Route path="/login"><Login /></Route>
  </div>
</Router>
