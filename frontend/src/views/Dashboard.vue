<template>
  <Layout
    :style="{
      backgroundImage: `url(${img_background})`,
      backgroundPosition: 'center',
    }"
  >
    <Header>
      <v-row>
        <v-card-text class="d-flex justify-end border">
          {{ user_nickname }}
        </v-card-text>
      </v-row>
    </Header>
    <v-container>
      <Container>
        <v-row>
          <v-col md="12" sm="12" class="d-flex justify-center">
            <v-row>
              <v-col class="d-flex flex-column ga-4" md="3">
                <v-card class="d-flex" elevation="20">
                  <v-card class="w-100">
                    <v-card-text>
                      <h3>Available</h3>
                    </v-card-text>
                    <v-card-text class="d-flex justify-center align-center">
                      <h2>{{ 99 }}</h2>
                    </v-card-text>
                  </v-card>
                </v-card>
                <v-card class="d-flex" elevation="20">
                  <v-card class="w-100">
                    <v-card-text>
                      <h3>Unavailable</h3>
                    </v-card-text>
                    <v-card-text class="d-flex justify-center align-center">
                      <h2>{{ 99 }}</h2>
                    </v-card-text>
                  </v-card>
                </v-card>
                <v-card elevation="20">
                  <v-card class="w-100">
                    <v-card-text>
                      <h3>Disconnected</h3>
                    </v-card-text>
                    <v-card-text class="d-flex justify-center align-center">
                      <h2>{{ 99 }}</h2>
                    </v-card-text>
                  </v-card>
                </v-card>
              </v-col>
              <v-col class="d-flex flex-column ga-4">
                <v-card elevation="20">
                  <v-card-text class="d-flex align-center ga-1">
                    <span>
                      <h2>{{ `company_name` }}</h2>
                    </span>
                    <span class="status" :style="{ background: status_test ? '#00ff00' : 'red' }"></span>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-row class="pa-4">
                    <v-col class="d-flex ga-4">
                      <v-btn text="Say Hello" @click="() => sendMessage()"></v-btn>
                      <v-dialog max-width="800px">
                        <template v-slot:activator="{ props: activatorProps }">
                          <v-btn text="Adicionar novo objeto" v-bind="activatorProps" @click="() => createNewObject()"></v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                          <v-row>
                            <v-col>
                              <v-card>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn variant="plain" text="Fechar" @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                                <v-card-title> Adicionar novo objeto na tabela </v-card-title>
                                <v-card-text>
                                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium, numquam at sunt illum
                                  amet, quam, voluptates repellat maiores reiciendis illo iste quaerat dolor asperiores omnis
                                  natus officiis eveniet ab quos?
                                </v-card-text>
                              </v-card>
                              <v-sheet>
                                <v-form @submit.prevent="() => addNewObject()" class="pa-6">
                                  <v-select
                                    v-model="type_object.value"
                                    :items="type_object"
                                    label="Selecione o tipo de objeto"
                                    required
                                  ></v-select>
                                  <v-text-field v-model="name_object" label="Nome do objeto" required></v-text-field>
                                  <v-text-field v-model="detail_object" label="Descrição do objeto" required></v-text-field>
                                  <v-checkbox label="Desejar manter ativo no sistema?"></v-checkbox>
                                  <v-card-actions>
                                    <v-row class="d-flex justify-end">
                                      <v-btn variant="plain" text="Cancelar" @click="isActive.value = false"></v-btn>
                                      <v-btn variant="tonal" text="Confirmar" type="submit"></v-btn>
                                    </v-row>
                                  </v-card-actions>
                                </v-form>
                              </v-sheet>
                            </v-col>
                          </v-row>
                        </template>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row>
                  <v-col>
                    <v-card class="overflow-y-auto custom-scrollbar absolute" elevation="20" max-height="500px">
                      <v-card-text class="custom-z-index w-full">
                        <h3 block>Products</h3>
                      </v-card-text>
                      <v-divider> </v-divider>
                      <v-table class="mt-14 w-full">
                        <thead>
                          <tr>
                            <th>service</th>
                            <th>company</th>
                            <th>status</th>
                            <th>date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="object in object_info" :key="object.id">
                            <td>{{ object.type }}</td>
                            <td>{{ object.name }}</td>
                            <td>{{ object.detail }}</td>
                            <td>{{ object.name }}</td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </Container>
    </v-container>
    <Footer></Footer>
  </Layout>
</template>
<script setup>
  import Container from '@/components/container/Container.vue'
  import Footer from '@/components/footer/Footer.vue'
  import Header from '@/components/header/Header.vue'
  import Layout from '@/components/layout/Layout.vue'
  import axios from 'axios'
  import { io } from 'socket.io-client'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { toast } from 'vue3-toastify'
  import background from './../assets/bg-dashboard.svg'

  const status_test = ref(true)

  const img_background = background
  const apiJson = 'http://localhost:3300'
  const user_info = ref('')
  const object_info = ref([])
  const user_nickname = ref('')
  const type_object = ref(['fisico', 'virtual'])
  const name_object = ref('')
  const detail_object = ref('')

  let socket

  const newItem = () => {
    toast.success('Adicionado com sucesso', {
      autoClose: 2500,
    }) // ToastOptions
    return { newItem }
  }
  const invalid = () => {
    toast.error('Informação inválida', {
      autoClose: 2000,
    }) // ToastOptions
    return { invalid }
  }

  const addNewObject = async () => {
    try {
      const modelObject = {
        type: type_object.value.value,
        name: name_object.value,
        detail: detail_object.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      type_object.value = ''
      name_object.value = ''
      detail_object.value = ''
      if (name_object.value.length > 3 && detail_object.value.length > 5) {
        newItem()
        const request = await axios.post(`${apiJson}/objects`, modelObject)
        return request
      }
      invalid()
    } catch (err) {
      console.log(`algo deu errado: ${err}`)
    }
  }

  const connectSocket = () => {
    socket = io('http://localhost:3000/dashboard')
    socket.on('connect', () => {
      console.log(console.log('Conectado com SOCKET.IO'))
    })
    socket.on('disconnect', () => {
      console.log('Desconectado')
    })
  }

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', 'Olá, servidor via SOCKET.IO!') //verificar SOCKETS
    }
    console.log('say hello')
  }
  const getObject = async () => {
    try {
      const request = await axios.get(`${apiJson}/objects`)
      object_info.value = request.data
      const object_datas = object_info.value
      return console.log(object_datas)
    } catch (err) {
      console.log(`algo deu errado: ${err}`)
    }
  }
  const getUser = async () => {
    if (socket) {
      socket.emit('received', 'dados recebidos com sucesso! SOCKET.IO')
    }
    try {
      const request = await axios.get(`${apiJson}/users`)
      user_info.value = request.data
      const datas = user_info.value
      const nick = datas.map((item) => item.nickname)
      user_nickname.value = nick[0]
    } catch (err) {
      console.log(`algo deu errado: ${erro}`)
    }
  }

  onMounted(() => {
    connectSocket()
    getUser()
    getObject()
  })
  onUnmounted(() => {
    if (socket) {
      socket.disconnect()
    }
  })
</script>
<style scoped>
  .layout[data-v-c9bfb757] {
    height: 100%;
    background-size: contain;
    background-position: 0%;
  }
  div.header {
    display: flex;
    justify-content: end;
    align-items: center;
  }
  span.status {
    height: 10px;
    width: 10px;
    border-radius: 100%;
    background: silver;
  }
  .custom-z-index {
    position: fixed;
    word-wrap: break-word;
    z-index: 1;
    background: #fff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px; /* Largura da barra de rolagem */
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Cor de fundo da trilha da barra de rolagem */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #ba68c8; /* Cor da barra de rolagem */
    border-radius: 10px; /* Arredondamento dos cantos */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background-color: #874b91; /* Cor ao passar o mouse */
  }
</style>
