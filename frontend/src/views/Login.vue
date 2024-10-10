<template>
  <Layout
    :style="{
      backgroundImage: `url(${img_background})`,
      backgroundPosition: 'center',
    }"
  >
    <Container>
      <v-row>
        <v-col md="12" sm="12" class="d-flex justify-center align-center h-100 mt-10">
          <v-card class="h-auto w-25" elevation="20">
            <v-row>
              <v-col class="d-flex justify-center">
                <v-form class="d-flex flex-column h-auto w-100 ma-6 pa-2 ga-4" elevation="6" @submit.prevent="() => userLogin()">
                  <PhBiohazard :size="60" />
                  <v-text-field
                    v-model="user_nickname"
                    label="Digite seu apelido"
                    type="text"
                    placeholder="Digite seu apelido"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="user_password"
                    label="Digite sua senha"
                    type="password"
                    variant="outlined"
                    placeholder="Digite sua senha"
                    required
                  >
                  </v-text-field>
                  <small v-if="user_password.length > 0 && user_password.length < 6" color="red lighten-5"
                    >Quantidade de caracteres inválidos!</small
                  >
                  <v-row>
                    <v-btn type="submit" class="mt-6 mb-8" block>Enviar</v-btn>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </Container>
    <Footer></Footer>
  </Layout>
</template>
<script setup>
import Container from '@/components/container/Container.vue'
import Footer from '@/components/footer/Footer.vue'
import Layout from '@/components/layout/Layout.vue'
import { PhBiohazard } from '@phosphor-icons/vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import background from './../assets/bg-login.svg'
const apiJson = import.meta.env.VITE_DATABASE_URL
const img_background = background

const user_nickname = ref('')
const user_password = ref('')
const submitted = ref(false)
const show_users = ref([])

const notifyAccess = () => {
  toast.success(`Bem vindo de volta, ${user_nickname.value}!`, {
    autoClose: 4000,
  }) // ToastOptions
  return { notifyAccess }
}

const invalid = () => {
  toast.error('Usuário ou senha inválidos!', {
    autoClose: 2200,
  }) // ToastOptions
  return { invalid }
}
const problem = () => {
  toast.error('Acessado negado', {
    className: 'custom-style-toastify',
    autoClose: 2000,
  }) // ToastOptions
  return { problem }
}

const userLogin = async () => {
  try {
    const response = await axios.post(`${apiJson}/users`, {
      nickname: user_nickname.value,
      password: user_password.value,
    })
    if (response) {
      notifyAccess()
      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 3500)
      return console.log(`Acesso liberado!`)
    }
  } catch (err) {
    console.log(`Usuário ou senha inválidos!`)
    invalid()
  }
}

onMounted(() => {})
</script>

<style scoped>
.layout[data-v-c9bfb757] {
  height: 100%;
  background-size: contain;
  background-position: 0%;
}
.v-btn.v-btn--density-default {
  position: relative;
}
form {
  max-width: 350px;
}
ul {
  list-style: none;
}
.custom-style-toastify {
  background: #874b91 !important;
}
svg {
  color: #874b91;
}
button {
  padding: 0.5rem;
  color: #fff;
  background: #874b91 !important;
}
</style>
