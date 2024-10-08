<script setup lang="ts">
import App from "../App.vue";
import {onMounted, ref} from "vue";
import {remult} from "remult";

const username = ref("");
const signedIn = ref(false);

async function signIn() {
  const result = await fetch("api/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username.value })
  });

  if (result.ok) {
    remult.user = await result.json();
    signedIn.value = true;
  } else {
    alert(await result.json())
  }
}

async function signOut() {
  await fetch("/api/signOut", {
    method: "POST"
  })

  remult.user = undefined;
  signedIn.value = false;
}

onMounted(async () => {
  const result = await fetch("/api/currentUser");
  remult.user = await result.json();
  signedIn.value = remult.authenticated();
})
</script>

<template>
  <div v-if="signedIn">
    Hello {{ remult.user?.name }}
    <button @click="$event => signOut()">Sign Out</button>
    <App />
  </div>

  <div v-else>
    <h1>todos</h1>
    <main>
      <form @submit.prevent="$event => signIn()">
        <input v-model="username" placeholder="Username, try Andrej or Steve" />
        <button>Sign In</button>
      </form>
    </main>
  </div>
</template>