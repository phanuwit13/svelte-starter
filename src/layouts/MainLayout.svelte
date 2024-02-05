<script lang="ts">
  import { userService } from '@/services/auth'
  import { authStore, userStore } from '@/stores/auth'
  import { useQuery } from '@sveltestack/svelte-query'
  import { onMount } from 'svelte'

  const mutationUser = useQuery(['get-user'], userService, {
    enabled: false,
  })

  const { refetch: handleGetUser } = $mutationUser

  authStore.subscribe((v) => {
    if (v.token) {
      handleGetUser().then((res) => {
        if (res.data) {
          window.localStorage.setItem('sv_us', JSON.stringify(res.data))
          userStore.set({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            username: res.data.username,
          })
        }
      })
    }
  })

  onMount(() => {
    const data = window.localStorage.getItem('sv_tk')
    const dataUser = window.localStorage.getItem('sv_us')
    if (data) {
      authStore.set({ token: data })
    }
    if (dataUser && JSON.parse(dataUser)) {
      const user = JSON.parse(dataUser)
      userStore.set({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      })
    }
  })

  const handleLogout = () => {
    window.localStorage.removeItem('sv_tk')
    window.localStorage.removeItem('sv_us')
    userStore.set({
      username: '',
      firstName: '',
      lastName: '',
    })
    authStore.set({
      token: '',
    })
  }
</script>

<div class="flex flex-col h-screen overflow-hidden">
  <header class="w-full text-center border-b border-grey p-4 grid grid-cols-3">
    <div></div>
    <div>Svelte Starter</div>
    {#if $userStore.firstName}
      <div class="flex items-center gap-2">
        Hello {`${$userStore.firstName} ${$userStore.lastName}`}
        <button on:click={handleLogout} class="border px-2">logout</button>
      </div>
    {/if}
  </header>
  <main class="flex-1 overflow-y-auto">
    <slot />
  </main>
  <footer class="w-full text-center border-t border-grey p-4">
    design by phanuwit13
  </footer>
</div>
