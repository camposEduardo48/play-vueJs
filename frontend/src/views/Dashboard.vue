<template>
  <Layout class="container position-relative">
    <Container>
      <v-col md="12" sm="12">
        <v-row>
          <v-col class="d-flex flex-column ga-4 pb-10">
            <v-card elevation="10">
              <v-card-text>
                <section class='d-flex align-center ga-2'>
                  <div>
                    <img :src="profileImg" alt="">
                  </div>
                  <h2>{{ user_nickname }}</h2>
                  <span class="status" :style="{ background: status_test ? '#00ff00' : 'red' }"></span>
                </section>
                  <!-- mostrar o nome do usuario logado e autenticado -->
                  <!-- <span >
                    <h3>{{ intlMoneyBrl }}</h3>
                  </span> -->
                <div>
                  <small :style="{ color: '#000' }">{{ 'Mostrar dia da semana e data no cabeçalho' }}</small>
                </div>
              </v-card-text>
              <v-row>
                <v-col>
                  <v-sheet class="d-flex justify-end">
                        <v-btn
                          class="d-flex ga-2"
                          :style="{ background: '#fff', color: '#000' }"
                          text="Editar perfil"
                          @click="() => toEditProfile()"
                        >
                        </v-btn>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card>
            <v-sheet class="d-flex justify-space-between ga-5">
              <v-card class="d-flex justify-center w-33" elevation="4">
                <v-card-text class="d-flex flex-column align-center justify-space-between ga-2">
                  <span class="d-flex justify-space-between w-100">
                    <h3>Congelado</h3>
                    <PhPause :size="32"
                  /></span>
                  <span class="d-flex justify-center align-center">
                    <v-card-text>
                      <h2>{{ getAnyStatus }}</h2>
                    </v-card-text>
                  </span>
                </v-card-text>
              </v-card>
              <v-card class="d-flex justify-center w-33" elevation="4">
                <v-card-text class="d-flex flex-column align-center justify-space-between ga-2">
                  <span class="d-flex justify-space-between w-100">
                    <h3>Em andamento</h3>
                    <PhPersonSimpleRun :size="32" />
                  </span>
                  <span class="d-flex justify-center align-center">
                    <v-card-text>
                      <h2>{{ getInProgressStatus }}</h2>
                    </v-card-text>
                  </span>
                </v-card-text>
              </v-card>
              <v-card class="d-flex justify-center w-33" elevation="4">
                <v-card-text class="d-flex flex-column align-center justify-space-between ga-2">
                  <span class="d-flex justify-space-between w-100">
                    <h3>Finalizado</h3>
                    <PhTrophy :size="32" />
                  </span>
                  <span class="d-flex justify-center align-center">
                    <v-card-text>
                      <h2>{{ getCompletedStatus }}</h2>
                    </v-card-text>
                  </span>
                </v-card-text>
              </v-card>
            </v-sheet>
            <v-row>
              <v-col>
                <v-btn
                  :style="{ background: '#fff', color: '#000' }"
                  text="Alterar branch"
                  ></v-btn>
              </v-col>
              <v-col class="d-flex justify-end pb-0">
                <v-dialog max-width="550px">
                  <template v-slot:activator="{ props: activatorProps }">               
                      <v-btn
                        :style="{ background: '#fff', color: '#000' }"
                        text="Adicionar nova tarefa "
                        v-bind="activatorProps"
                      >
                      </v-btn>
                  </template>
                  <template v-slot:default="{ isActive }">
                    <v-col>
                      <v-card>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn variant="plain" text="Fechar" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                        <v-card-title> Adicionar nova tarefa </v-card-title>
                        <v-card-text>
                          Dentro de cada tarefa, poderemos adicionar steps, que serão checkbox tickadas ao longo da jornada de
                          desenvolvimento.
                        </v-card-text>
                        <v-form @submit.prevent="() => addNewObject()" class="pa-6">
                          <v-select v-model="title.value" :items="title" label="Selecione o tipo de tarefa" required></v-select>
                          <v-select v-model="color.value" :items="color" label="Selecione a cor do card"></v-select>
                          <v-text-field v-model="name_object" label="Titulo da tarefa" required></v-text-field>
                          <v-textarea v-model="detail_object" label="Descreva a tarefa" required></v-textarea>
                          <!-- <v-checkbox v-model="priority" label="Prioridade para concluir essa tarefa?"></v-checkbox> -->
                          <!-- <v-select v-model="step.value" :items="step" label="Quantidade de steps"></v-select> -->
                          <!-- verificar o como o step é enviado caso o client nao selecione o valor -->
                          <v-card-actions>
                            <v-row class="d-flex justify-end">
                              <v-btn variant="plain" text="Cancelar" @click="isActive.value = false"></v-btn>
                              <v-btn
                                :style="{ background: '#000', color: '#fff' }"
                                variant="tonal"
                                text="Confirmar"
                                type="submit"
                              ></v-btn>
                            </v-row>
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </v-col>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-space-between mt-0">
              <v-col class="d-flex flex-column h-auto">
                <ul
                  v-if="any_task.length > 0"
                  v-for="object in any_task"
                  :key="object.id"
                  class="pa-4"
                  :style="{ background: object.cardColor }"
                >
                  <li class="d-flex justify-space-between">
                    <div>
                      <b>{{ object.title }}</b>
                    </div>
                    <div v-if="object.status === 'any'" :style="{ cursor: 'pointer' }">
                      <PhClock color="grey" :size="22" />
                    </div>
                  </li>
                  <li>
                    <small>{{ object.systemOption }}</small>
                  </li>
                  <v-divider></v-divider>
                  <li>
                    <small>{{ object.author }}</small>
                  </li>
                  <li>
                    <v-card-text>{{ object.description }}</v-card-text>
                  </li>
                  <li v-if="object.status === 'any'">
                    <small :style="{fontWeight: 'bold' }">Não iniciado 😴</small>
                  </li>
                  <li>
                    <small>Steps: {{ object.step }}</small>
                  </li>
                  <li>
                    <small> Criado em: {{ dayjs(object.createdAt).format('DD/MM/YYYY HH:mm') }}</small>
                  </li>
                  <v-divider></v-divider>
                  <li class="d-flex justify-end ga-3">
                    <v-dialog max-width='600px'>
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                          class="d-flex ga-2"
                          v-bind="activatorProps"
                          @click="() => {}"
                        >
                        <PhPlus :size="22" />
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card :style="{ background: object.cardColor }">
                          <v-sheet>
                            <v-card-text>
                              <h3>{{  object.title  }}</h3>
                            </v-card-text>
                            <v-card-text>{{ object.description }}</v-card-text>
                            <v-divider></v-divider>
                            <v-form @submit.prevent="() => postStep()">
                              <v-sheet v-if="stepInput">
                                <v-card-actions class="d-flex justify-end">
                                  <v-btn :style="{ background: '#000', color: '#fff' }"
                                  variant="tonal" text='Incluir steps' @click="stepInput = false"></v-btn>
                                </v-card-actions>
                              </v-sheet>
                              <v-sheet v-if="!stepInput">
                                <div class="d-flex justify-end">
                                  <v-btn variant="plain" text='Fechar' @click="stepInput = true"></v-btn>
                                </div>
                                <v-card-text>
                                  <v-text-field type="text" v-model="stepText" label="Insira um step"></v-text-field>
                                </v-card-text>
                                <div class="d-flex justify-end mr-3">
                                  <v-btn :style="{ background: '#000', color: '#fff' }"
                                  variant="tonal" text='Adicionar' type='submit' @click="stepInput = false"></v-btn>
                                </div>
                                <v-card-text>
                                  <small><b>Aviso:</b> cada step, representa uma etapa do seu processo de desenvolvimento.</small>
                                </v-card-text>
                              </v-sheet>
                            </v-form>
                            <v-sheet class="pa-4">
                              <v-row>
                                <ol>
                                  <li>
                                    <v-card-text>
                                      <h3>Concluir steps:</h3>
                                    </v-card-text>
                                  </li>
                                  <li>
                                    <v-checkbox v-model="checkedStep" label="Levar o caramelo para passear..."></v-checkbox>
                                  </li>
                                </ol>
                              </v-row>
                            </v-sheet>
                            <v-card-text>
                              <small>Author: {{  object.userId  }}</small>
                            </v-card-text>
                          </v-sheet>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-dialog max-width="600px">
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps">
                          <PhTrash :size="22" />
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card :style="{ background: object.cardColor }">
                          <v-card-text>
                            <h3>
                              Deseja realmente excluir a tarefa "<b>{{ object.title }}</b
                              >"?
                            </h3>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-sheet>
                            <v-card-text>{{ object.description }}</v-card-text>
                            <v-card-text>
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem nam nisi, dolorum corrupti laborum
                              rerum esse possimus molestias, nostrum necessitatibus aliquam pariatur, dolore delectus consectetur!
                              Hic, deleniti? Corrupti, debitis pariatur.
                            </v-card-text>
                          </v-sheet>
                          <v-sheet>
                            <v-col>
                              <v-row class="d-flex justify-end pa-4">
                                <v-btn variant="plain" @click="isActive.value = false">Cancelar</v-btn>
                                <v-btn variant="tonal" @click="() => removeTask(object.id)">Confirmar</v-btn>
                              </v-row>
                            </v-col>
                          </v-sheet>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-btn @click="() => editTask(object.id)" disabled>
                      <PhPencil :size="22" />
                    </v-btn>
                    <v-btn @click="() => nextStepTask(object.id)">
                      <PhPlay :size="20" />
                    </v-btn>
                  </li>
                </ul>
                <ul v-else class="pa-4">
                  <li>
                    <div class="d-flex justify-center">
                      <p>{{ 'Nenhuma tarefa nova' }}</p>
                    </div>
                  </li>
                </ul>
              </v-col>
              <v-col class="d-flex flex-column">
                <ul
                  v-if="in_progress_task.length > 0"
                  v-for="object in in_progress_task"
                  :key="object.id"
                  class="pa-4"
                  :style="{ background: object.cardColor }"
                >
                  <li class="d-flex justify-space-between">
                    <div>
                      <b>{{ object.title }}</b>
                    </div>
                    <div @click="() => removeFavorite(object.id)" :style="{ cursor: 'pointer' }">
                      <p class="emoji">
                        {{ object.priority === true ? '⭐' : ' ' }}
                      </p>
                    </div>
                  </li>
                  <li>
                    <small>{{ object.systemOption }}</small>
                  </li>
                  <v-divider></v-divider>
                  <li>
                    <small>{{ object.author }}</small>
                  </li>
                  <li>
                    <v-card-text>{{ object.description }}</v-card-text>
                  </li>
                  <li v-if="object.status === 'in-progress'">
                    <small :style="{ color: '#000', fontWeight: 'bold' }">Em andamento 🏃🏿</small>
                  </li>
                  <li>
                    <small>Steps: {{ object.step }}</small>
                  </li>
                  <li>
                    <small>Iniciado em: {{ dayjs(object.updatedAt).format('DD/MM/YYYY HH:mm') }}</small>
                  </li>
                  <v-divider></v-divider>
                  <li class="d-flex justify-end ga-3">
                    <v-dialog max-width="600px">
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps">
                          <PhEye :size="22" />
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card :style="{ background: object.cardColor }">
                          <v-card-text>
                            <h3>{{ object.title }}</h3>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-sheet>
                            <v-card-text>{{ object.description }}</v-card-text>
                            <v-card-text>
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem nam nisi, dolorum corrupti laborum
                              rerum esse possimus molestias, nostrum necessitatibus aliquam pariatur, dolore delectus consectetur!
                              Hic, deleniti? Corrupti, debitis pariatur.
                            </v-card-text>
                            <v-card-text>
                              <h4>Quandtidade de steps: {{ object.step }}</h4>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card :style="{ boxShadow: 'none' }">
                              <v-card-text v-for="step in object.step">
                                <v-checkbox label="Completar tal coisa após any...."></v-checkbox>
                              </v-card-text>
                            </v-card>
                            <v-card-text>
                              <small>Author: {{ object.lastName }}</small>
                            </v-card-text>
                          </v-sheet>
                          <v-sheet>
                            <v-col>
                              <v-row class="d-flex justify-end pa-4">
                                <v-btn variant="plain" @click="isActive.value = false">Cancelar</v-btn>
                                <v-btn variant="tonal" @click="() => finishTask(object.id)">Confirmar</v-btn>
                              </v-row>
                            </v-col>
                          </v-sheet>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-dialog max-width="600px">
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps">
                          <PhTrash :size="22" />
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card :style="{ background: object.cardColor }">
                          <v-card-text>
                            <h3>
                              Deseja realmente excluir a tarefa <b>"{{ object.title }}"</b>?
                            </h3>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-sheet>
                            <v-card-text>{{ object.description }}</v-card-text>
                            <v-card-text>
                              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem nam nisi, dolorum corrupti laborum
                              rerum esse possimus molestias, nostrum necessitatibus aliquam pariatur, dolore delectus consectetur!
                              Hic, deleniti? Corrupti, debitis pariatur.
                            </v-card-text>
                          </v-sheet>
                          <v-sheet>
                            <v-col>
                              <v-row class="d-flex justify-end pa-4">
                                <v-btn variant="plain" @click="isActive.value = false">Cancelar</v-btn>
                                <v-btn variant="tonal" @click="() => removeTask(object.id)">Confirmar</v-btn>
                              </v-row>
                            </v-col>
                          </v-sheet>
                        </v-card>
                      </template>
                    </v-dialog>
                    <v-btn @click="() => editTask(object.id)" disabled>
                      <PhPencil :size="22" />
                    </v-btn>
                    <v-btn v-if="object.priority === false" @click="() => setFavorite(object.id)">
                      <!-- criar logica para favoritar task -->
                      <PhStar :size="22" />
                    </v-btn>
                    <v-btn v-if="object.priority === true" @click="() => ''" disabled>
                      <!-- criar logica para favoritar task -->
                      <PhStar :size="22" />
                    </v-btn>
                    <!-- só podera finalizar a task após completar todas as tasks -->
                  </li>
                </ul>
                <ul v-else class="pa-4">
                  <li>
                    <div class="d-flex justify-center">
                      <p>{{ 'Nenhuma tarefa em progresso' }}</p>
                    </div>
                  </li>
                </ul>
              </v-col>
              <v-col class="d-flex flex-column">
                <ul
                  v-if="completed_task.length > 0"
                  v-for="object in completed_task"
                  :key="object.id"
                  class="pa-4"
                  :style="{ background: object.cardColor }"
                >
                  <li class="d-flex justify-space-between">
                    <div>
                      <b>{{ object.title }}</b>
                    </div>
                    <div v-if="object.status === 'completed'" :style="{ cursor: 'pointer' }">
                      <PhCheckCircle color="green" :size="22" />
                    </div>
                    </li>
                    <li>
                      <small>{{ object.systemOption }}</small>
                    </li>
                    <v-divider></v-divider>
                    <li v-if="object.status != 'completed' ">
                      <li>
                      <small>{{ object.author }}</small>
                    </li>
                    <li>
                      <small>Etapas: {{ object.step }}</small>
                    </li>
                    <li>
                      <v-card-text>{{ object.description }}</v-card-text>
                    </li>
                    <li>
                      <small>Finalizado em: {{ dayjs(object.updatedAt).format('DD/MM/YYYY HH:mm') }}</small>
                    </li>
                  </li>
                  <li v-if="object.status === 'completed'">
                    <small :style="{ color: 'green', fontWeight: 'bold' }">Finalizado ✅</small>
                  </li>
                  <li class="d-flex justify-end ga-3">
                    <v-btn @click="() => ''" disabled>
                      <!-- <PhEyeClosed v-if="openEye" :size="22" /> -->
                      <PhEye :size="22" />
                    </v-btn>
                    <v-btn @click="() => ''" disabled>
                      <p>Relatório</p>
                    </v-btn>
                  </li>
                </ul>
                <ul v-else class="pa-4">
                  <li>
                    <div class="d-flex justify-center">
                      <p>{{ 'Nenhuma tarefa completada' }}</p>
                    </div>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </Container>
  </Layout>
  <Footer>
      <v-col>
        <v-row class='d-flex justify-end pr-5 position-absolute'>
          <v-sheet :style="{position: 'fixed', right: '20px', bottom: '20px'}">
              <v-btn @click="() => signOut()" :style="{height: '60px', width:'auto'}" elevation='20'>
                <PhSignOut :size="32" />
              </v-btn>
          </v-sheet>
        </v-row>
      </v-col>
  </Footer>
</template>
<script setup>
import Footer from '@/components/footer/Footer.vue'
import {
  PhCheckCircle,
  PhClock,
  PhEye,
  PhPause,
  PhPencil,
  PhPersonSimpleRun,
  PhPlay,
  PhPlus,
  PhSignOut,
  PhStar,
  PhTrash,
  PhTrophy
} from '@phosphor-icons/vue'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { jwtDecode } from 'jwt-decode'
import { io } from 'socket.io-client'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

dayjs.locale('pt-br')

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL
const PORT = Number(import.meta.env.VITE_PORT)
const socket = io(`${DATABASE_URL}${PORT}`)
const status_test = ref(true)
const step = ref([1, 2, 3, 4, 5])
const user_info = ref('')
const object_info = ref([])
const any_task = ref([])
const in_progress_task = ref([])
const completed_task = ref([])
const user_nickname = ref('')
const profileImg = ref()
const title = ref(['KENGOO App', 'ZapYou', 'ZapYou 2.0'])
const name_object = ref('')
const detail_object = ref('')
const filterStatus = ref('')
const getAnyStatus = ref('')
const getInProgressStatus = ref('')
const getCompletedStatus = ref('')
const priority = ref()
const color = ref(['lightSkyBlue', 'khaki', 'lightCoral', 'lightGreen'])
const items = ref([])
const token = localStorage.getItem('authToken')
const stepInput = ref(false)
const stepText = ref('')
const checkedStep = ref(false)
const stepItems = ref()

const money = 48
const userMoney = 0
const resMoney = Number(money + userMoney)

const intlMoneyBrl = ref()
// const realMoney = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resMoney)
const realMoney = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resMoney)
intlMoneyBrl.value = String(realMoney)

const person = {
  fName: 'Eduardo',
  lName: 'Campos',
  fullName: function () {
    return `${this.fName} ${this.lName}, the creator`
  }
}
console.log(person.fullName())

const newItem = () => {
  toast.success('Adicionado com sucesso', {
    autoClose: 2500,
  }) // ToastOptions
  return { newItem }
}
const taskFinished = () => {
  toast.success('Tarefa finalizada ✅', {
    autoClose: 2500,
  }) // ToastOptions
  return { taskFinished }
}
const newTask = () => {
  toast.success('Nova tarefa adicionada', {
    autoClose: 3000,
  }) // ToastOptions
  return { newTask }
}
const startTask = (title) => {
  toast.success(`Tarefa "${title}" iniciada`, {
    autoClose: 3000,
  }) // ToastOptions
  return { startTask }
}
const deleteSuccess = () => {
  toast.success('Tarefa removida com sucesso', {
    autoClose: 1500,
    isLoading: false,
  })
  return { deleteSuccess }
}
const invalid = () => {
  toast.error('Informação inválida', {
    autoClose: 2000,
  }) // ToastOptions
  return { invalid }
}
const someError = () => {
  toast.error('Ops, algo deu errado!', {
    autoClose: 3000,
  }) // ToastOptions
  return { someError }
}

const addNewObject = async () => {
  try {
    const modelObject = {
      title: name_object.value,
      systemOption: title.value.value,
      description: detail_object.value,
      cardColor: color.value.value,
    }
    const response = await axios.post(`${DATABASE_URL}${PORT}/tasks`, modelObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    console.log(modelObject)
    title.value.value = ''
    name_object.value = ''
    detail_object.value = ''
    color.value.value
  //verificar se está funcionando correto
    newTask()
    socket.emit('new-task', response.data)
  } catch (err) {
    someError()
    console.log(`algo deu errado: ${err}`)
  }
}
const getObject = async () => {
  try {
    const request = await axios.get(`${DATABASE_URL}${PORT}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    object_info.value = request.data
    const object_datas = object_info.value

    filterStatus.value = object_datas
    const seeStatus = filterStatus.value

    const statusAny = seeStatus.filter((item) => item.status === 'any')
    const statusInProgress = seeStatus.filter((item) => item.status === 'in-progress')
    const statusCompleted = seeStatus.filter((item) => item.status === 'completed')

    any_task.value = statusAny
    in_progress_task.value = statusInProgress
    completed_task.value = statusCompleted

    getAnyStatus.value = statusAny.length
    getInProgressStatus.value = statusInProgress.length
    getCompletedStatus.value = statusCompleted.length

    socket.emit('get-tasks', request)
  } catch (err) {
    someError()
    console.log(`algo deu errado: ${err}`)
  }
}
const toEditProfile = () => {
  location.href = '/profile'
}
const signOut = async () => {
  try {
    localStorage.removeItem('authToken')
    location.replace("/")
  } catch (err) {
    console.log(err)
  }
}
const verifyToken = (token) => {
  try {
    const decoded = jwtDecode(token)
    if (decoded.exp) {
      const expiration = dayjs.unix(decoded.exp)
      if (dayjs().isAfter(expiration)) {
        console.log('Seu token está expirado')
        return false
      }
      return true
    }
    return console.log('Token está sem o campo exp')

  } catch (err) {
    console.log('Erro ao verificar Token: ', err.message)
    return false
  }
}
if (!verifyToken(token)) {
  localStorage.removeItem('authToken')
  location.replace("/")
}
const getUser = async () => {
  try {
    const request = await axios.get(`${DATABASE_URL}${PORT}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    user_info.value = request.data
    const datas = user_info.value
    // os dados exibidos devem estar de acordo com os dados do usuario que fez login
    user_nickname.value = datas.nickname
    profileImg.value = datas.img_photo
  } catch (err) {
    someError()
    console.log(`algo deu errado: ${err}`)
  }
}
const getStep = async () => {
    const stepData = stepItems.value
  try {
    const request = await axios.get(`${DATABASE_URL}${PORT}/steps`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    stepItems.value = request.data
    return console.log(stepData)
  } catch (err) {
    console.log(err)
  }
}
const postStep = async () => {
  try {
    const response = await axios.post(`${DATABASE_URL}${PORT}/steps`, {
        titleStep: stepText.value,
        descriptionStep: '',
        checked: false,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    if (!stepText.value) {
  console.log('Title step is required');
  return;
}
    socket.emit('new-step', response.data)
    console.log(stepText.value)
  } catch (err) {
    console.log(err)
  }
}

const nextStepTask = async (id) => {
  // só concluir a task appós finalizar todos os steps de cada task
  try {
    const response = await axios.put(`${DATABASE_URL}${PORT}/tasks/${id}`, {
      status: 'in-progress',
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    socket.emit('task-updated', response.data)
    startTask()
  } catch (err) {
    someError()
    console.log(err)
  }
}
const finishTask = async (id) => {
  // só concluir a task appós finalizar todos os steps de cada task
  try {
    const response = await axios.patch(`${DATABASE_URL}${PORT}/tasks/${id}`, {
      status: 'completed',
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    socket.emit('task-updated', response.data)
    taskFinished()
  } catch (err) {
    someError()
    console.log(err)
  }
}
const setFavorite = async (id) => {
  priority.value = true
  try {
    const response = await axios.patch(`${DATABASE_URL}${PORT}/tasks/${id}`, {
      priority: priority.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    socket.emit('task-updated', response.data)
  } catch (err) {
    someError()
    console.log(err)
  }
}
const removeFavorite = async (id) => {
  priority.value = false
  try {
    const response = await axios.patch(`${DATABASE_URL}${PORT}/tasks/${id}`, {
      priority: priority.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    socket.emit('task-updated', response.data)
  } catch (err) {
    someError()
    console.log(err)
  }
}
const removeTask = async (id) => {
  try {
    const request = await axios.delete(`${DATABASE_URL}${PORT}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    deleteSuccess()
    socket.on('request', (deletedTask) => {
      // Remover a tarefa excluída da lista
      request = request.filter((task) => task.id !== deletedTask.id)
    })
    return request
  } catch (err) {
    someError()
    console.log(err)
  }
}
onMounted(() => {
  getUser()
  getObject() 
  socket.on('connect', () => {
    console.log(`Conectado com ID: ${socket.id}`)
  })
  
  socket.on('task-created', (newTask) => {
    object_info.value.push(newTask)
    getObject()
  })
  socket.on('task-updated', (updatedTask) => {
    // Atualizar a tarefa na lista com base no ID
    const index = any_task.value.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) {
      any_task.value[index] = updatedTask // Substituir a tarefa existente pela atualizada
    }
    const indexPr = in_progress_task.value.findIndex((task) => task.id === updatedTask.id)
    if (indexPr !== -1) {
      in_progress_task.value[indexPr] = updatedTask // Substituir a tarefa existente pela atualizada
    }
    // '' dentro das aspas deve-se definir o nome dos eventos que serao chamados entre front e back
    // Recebe uma nova tarefa
    object_info.value.unshift(updatedTask) // ideia: adicionar os itens atualizados ao topo da lista * VERIFICAR *
    getObject()
  })
  socket.on('task-finished', (finishTask) => {
    const indexC = completed_task.value.findIndex((task) => task.id === finishTask.id)
    if (indexC !== -1) {
      completed_task.value[indexC] = finishTask // Substituir a tarefa existente pela atualizada
    }
    getObject()
  })
  socket.on('task-deleted', (deletedTask) => {
    object_info.value = object_info.value.filter((task) => task.id !== deletedTask.id)
    getObject()
  })

})
onBeforeUnmount(() => {
  // Desconectar o socket quando o componente for destruído
  socket.disconnect()
  console.log(`Socket desconectado => ${socket.id}`)
})
</script>
<style scoped>
.layout[data-v-c9bfb757] {
  height: 100%;
  background-size: contain;
  background-position: 0%;
}
span.status {
  height: 10px;
  width: 10px;
  border-radius: 100%;
  background: silver;
}
img {
  height: 65px;
  width: 65px;
  background-position: center;
  background-size: contain;
}
.v-sheet {
  background: transparent;
  box-shadow: none;
}
.v-col {
  color: #000;
}
.emoji {
  position: relative;
  top: 0px;
  right: 0px;
  font-size: 15pt;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  list-style: none;
  background: #fff;
  width: 100%;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  margin: 10px 0px 10px 0px;
  border-radius: 6px;
}
h2 {
  font-size: 19pt;
}
svg {
  color: #000;
}
footer {
  position: fixed;
  display: flex;
  background: transparent;
  color: gray;
  height: auto;
  width: 100%;
  bottom: 0%;
  left: 0.5rem;
}
.container {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-image: url('https://getwallpapers.com/wallpaper/full/f/9/5/251950.jpg');
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Largura da barra de rolagem */
}
.custom-scrollbar::-webkit-scrollbar-track {
  background-color: silver; /* Cor de fundo da trilha da barra de rolagem */
  border-radius: 10px; /* Arredondamento dos cantos */
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: gray; /* Cor da barra de rolagem */
  border-radius: 10px; /* Arredondamento dos cantos */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: #000; /* Cor ao passar o mouse */
}
</style>
