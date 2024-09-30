<template>
  <Layout
    :style="{
      backgroundImage: `url(${img_background})`,
      backgroundPosition: 'center',
    }"
  >
    <Container>
      <v-row>
        <v-col md="12" sm="12" class="d-flex justify-center mt-10">
          <v-card class="h-auto w-33" elevation="20">
            <v-row>
              <v-col class="d-flex justify-center">
                <v-form class="d-flex flex-column h-auto w-100 ma-6 pa-2 ga-4" elevation="6" @submit.prevent="postUser">
                  <h3>acess_zap_unity_utility_v1</h3>
                  <PhBiohazard :size="32" />
                  <v-divider></v-divider>
                  <v-text-field
                    v-model="user_nickname"
                    label="Digite seu apelido"
                    type="text"
                    placeholder="Digite seu apelido"
                    variant="outlined"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="user_email"
                    label="Digite seu email"
                    type="text"
                    variant="outlined"
                    placeholder="Digite seu email"
                    required
                  >
                  </v-text-field>
                  <small v-if="user_email.length > 4 && user_email.length < 18" color="red lighten-5"
                    >Quantidade de caracteres inválidos!</small
                  >
                  <v-row>
                    <v-btn type="submit" class="mt-6 mb-12" block>Enviar</v-btn>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </Container>
  </Layout>
</template>
<script setup>
import Container from '@/components/container/Container.vue'
import Layout from '@/components/layout/Layout.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import background from './../assets/bg-login.svg'
const apiJson = 'http://localhost:3300'
const img_background = background

const user_nickname = ref('')
const user_email = ref('')
const submitted = ref(false)
const show_users = ref([])

// const notify = () => {
//   toast('Dados enviados com sucesso!', {
//     autoClose: 2000,
//   }) // ToastOptions
//   return { notify }
// }

const notifyAccess = () => {
  toast.success('Acesso liberado', {
    autoClose: 4000,
  }) // ToastOptions
  return { notifyAccess }
}

const invalid = () => {
  toast.error('Dados inválidos!', {
    autoClose: 2000,
  }) // ToastOptions
  return { invalid }
}
const problem = () => {
  toast.error('Acessado negado', {
    autoClose: 2000,
  }) // ToastOptions
  return { problem }
}

const postUser = async () => {
  const request = await axios.get(`${apiJson}/users`)
  const reqAll = ref([])
  reqAll.value = request.data
  const searchData = reqAll.value
  const user_datas = {
    nickname: user_nickname.value.trim(),
    email: user_email.value.trim(),
    permissions: false,
    createdAt: new Date(),
  }

  // localStorage.getItem(user_datas)

  const req_nick = searchData.find((item) => user_datas.nickname === item.nickname)
  const req_email = searchData.find((item) => user_datas.email === item.email)

  /** verificação para postage de novo usuário!
   * const req_nick = searchData.find(item => user_datas.nickname === item.nickname || user_datas.nickname.length < 6)
    const req_email = searchData.find(item => user_datas.email === item.email || user_datas.email.length < 10)
   */

  try {
    if (req_nick && req_email) {
      notifyAccess()
      setTimeout(() => {
        const redirectTo = () => {
          return (window.location.href = '/dashboard')
        }
        redirectTo()
      }, 2000)
    }
    /** postar novo usuario
     * if (!req_nick && !req_email) {
      
      const response = await axios.post(`${apiJson}/users`, user_datas)
      notify()
      return console.log('Novo usuário adicionado com sucesso!')
    }
     */
    if (req_nick.length === 0 && req_nick.length < 6) {
      return invalid()
    }
    if (req_email.length === 0 && req_email.length < 8) {
      return invalid()
    }
  } catch (err) {
    problem()
    console.log(`Ops, tivemos um problema ao realizar a função! ${err}`)
  }
}

onMounted(() => {})
</script>

<style>
.layout[data-v-c9bfb757] {
  height: 100%;
  background-size: contain;
  background-position: 0%;
}
.v-btn.v-btn--density-default {
  position: relative;
  background: #d6a4de;
}

ul {
  list-style: none;
}
</style>
