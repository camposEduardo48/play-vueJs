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
                  <v-card-text class="d-flex align-center ga-4">
                    <span>
                      <h2>{{ `company_name` }}</h2>
                    </span>
                    <span class="status"></span>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-row class="pa-4">
                    <v-card-text>
                      <h3>dashboard page</h3>
                    </v-card-text>
                    <v-col class="d-flex ga-4">
                      <v-btn text="Say Hello"></v-btn>
                      <v-btn text="Go Out"></v-btn>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row>
                  <v-col>
                    <v-card elevation="20">
                      <v-card-text>
                        <h3>Statistics</h3>
                      </v-card-text>
                      <v-divider> </v-divider>
                      <v-card-text>loading...</v-card-text>
                      <v-card-text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quod maxime saepe ut unde voluptatem
                        culpa adipisci nulla ullam illo recusandae maiores nesciunt consectetur quia delectus vel aspernatur,
                        distinctio possimus!
                      </v-card-text>
                      <v-card-text>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi, sequi minus in eveniet, ea libero
                        illo similique eaque explicabo atque suscipit distinctio. Ea, aliquam explicabo blanditiis sunt odit
                        officia distinctio!
                      </v-card-text>
                      <v-table>
                        <thead>
                          <tr>
                            <th>service</th>
                            <th>company</th>
                            <th>status</th>
                            <th>date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
  import background from './../assets/bg-dashboard.svg'

  const img_background = background
  const apiJson = 'http://localhost:3300'
  const user_info = ref('')
  const user_nickname = ref('')
  let socket

  const connectSocket = () => {
    socket = io('http://localhost:3000')
    socket.on('connect', () => {
      console.log(console.log('Conectado com SOCKET.IO'))
    })
    socket.on('disconnect', () => {
      console.log('Desconectado')
    })
  }

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', 'Olá, servidor via SOCKET.IO!')
    }
  }

  const getUser = async () => {
    if (socket) {
      socket.emit('received', 'dados recebidos com sucesso! SOCKET.IO')
    }
    const request = await axios.get(`${apiJson}/users`)
    user_info.value = request.data
    const datas = user_info.value
    const nick = datas.map < string > ((item) => item.nickname)
    user_nickname.value = nick[0]
  }

  onMounted(() => {
    connectSocket()
    getUser()
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
    height: 12px;
    width: 12px;
    border-radius: 100%;
    background: silver;
  }
</style>
