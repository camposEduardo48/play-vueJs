<script setup lang="ts">
import Container from '@/components/container/Container.vue';
import Layout from '@/components/layout/Layout.vue';
import axios from 'axios'
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

interface UserInfo {
  id: string
  img_photo: string
  firstName: string
  lastName: string
  nickname: string
  email: string
  createdAt: string
}

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL
const PORT = Number(import.meta.env.VITE_PORT)
const req_api = ref<UserInfo>([])
const token = localStorage.getItem('authToken')

  const getApiDatas = async () => {
    try {
      const response = await axios.get(`${DATABASE_URL}${PORT}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      req_api.value = response.data
      const userDatas = req_api.value
      return console.log(userDatas)
    } catch (err) {
      console.log(err)
    }
  }

onMounted(() => {
  getApiDatas()
})

</script>

<template>
  <Layout class="container">
    <Container>
      <v-col md="12" sm="12">
        <v-row>
          <v-col md="1">
              <v-card-actions>
                <v-btn text="Voltar" variant="elevated" href="/dashboard"></v-btn>
              </v-card-actions>
          </v-col>
          <v-col class="d-flex flex-column ga-4">
            <v-card>
              <v-col>
                <v-row>
                  <v-card class="d-flex align-center justify-center h-100 ml-4" width="200px" elevation="0">
                    <v-col>
                      <v-sheet>
                        <img width="180" :src="req_api.img_photo" alt="">
                      </v-sheet>
                      <v-sheet>
                        <v-btn text="Alterar" block disabled></v-btn>
                      </v-sheet>
                    </v-col>
                  </v-card>
                  <v-card-text>
                    <h1>{{req_api.nickname}}</h1>
                    <v-divider></v-divider>
                    <v-card class="ma-4" elevation="0">
                      <h3>Suas informações:</h3>
                      <form>
                        <v-card-text class="info mt-2">
                        <span>
                          <p><b>Nome: </b></p>
                          <v-text-field :value="req_api.firstName+' '+req_api.lastName" disabled></v-text-field>
                        </span>
                        <span>
                          <p><b>Apelido: </b></p>
                          <v-text-field :value="req_api.nickname" disabled></v-text-field>
                        </span>
                        <span>
                          <p><b>E-mail: </b></p>
                          <v-text-field :value="req_api.email" disabled></v-text-field>
                        </span>
                        <span>
                          <v-card-text>
                            <small><b>Conta criada em: </b>{{ dayjs(req_api.createdAt).format('DD/MM/YYYY') }}</small>
                          </v-card-text>
                        </span>
                        <span class="d-flex justify-end" block>
                          <v-btn text="Editar dados" disabled></v-btn>
                        </span>
                      </v-card-text>
                      </form>
                    </v-card>
                  </v-card-text>
                </v-row>
              </v-col>
            </v-card>
            <v-card>
              <v-card-text>
                <small>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit exercitationem repellendus facilis aliquid vero. Ex eaque, vero officiis in qui non quis, provident officia id libero dignissimos laudantium voluptates? Recusandae!
                </small>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </Container>
  </Layout>
</template>
<style>
  .container {
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-image: url('https://getwallpapers.com/wallpaper/full/f/9/5/251950.jpg');
}
.info {
  padding: 3px;
  background: whitesmoke;
}
</style>