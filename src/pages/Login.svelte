<script lang="ts">
  import MainLayout from '@/layouts/MainLayout.svelte'
  import { loginService } from '@/services/auth'
  import { authStore } from '@/stores/auth'
  import { useMutation } from '@sveltestack/svelte-query'
  import { onMount } from 'svelte'
  import { createForm } from 'svelte-forms-lib'
  import { navigate } from 'svelte-routing'

  const mutationLogin = useMutation(loginService)
  const { mutateAsync: handleLogin } = $mutationLogin

  const { form, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      onLogin(values.username, values.password)
    },
  })

  const onLogin = async (username: string, password: string) => {
    const response = await handleLogin({
      data: {
        username,
        password,
      },
    })
    authStore.set({
      token: response.token,
    })
    window.localStorage.setItem('sv_tk', response.token)
    navigate('/')
  }

  onMount(() => {
    if ($authStore.token) {
      navigate('/')
    }
  })
</script>

<MainLayout>
  <form
    on:submit={handleSubmit}
    class="max-w-[425px] bg-gray-200 px-8 py-4 flex flex-col gap-4 m-auto mt-10 rounded-lg"
  >
    <h3 class="text-center">Form Login</h3>
    <div class="grid grid-cols-8">
      <label for="username" class="col-span-2">username</label>
      <input
        id="username"
        name="username"
        class="border col-span-6"
        on:change={handleChange}
        bind:value={$form.username}
      />
    </div>
    <div class="grid grid-cols-8">
      <label for="password" class="col-span-2">name</label>
      <input
        id="password"
        name="password"
        class="border col-span-6"
        on:change={handleChange}
        bind:value={$form.password}
      />
    </div>
    <button class="border border-green-600 m-auto px-4 py-1">Login</button>
  </form>
</MainLayout>
