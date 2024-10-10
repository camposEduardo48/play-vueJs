<template>
  <Layout class="container position-relative">
    <Container>
      <v-col md="12" sm="12">
        <v-row>
          <v-col class="d-flex flex-column ga-4 pb-10">
            <v-card elevation="10">
              <v-card-text class="d-flex align-center ga-2">
                <span>
                  <h2>{{ user_nickname }}</h2>
                  <!-- mostrar o nome do usuario logado e autenticado -->
                  <h3>{{ intlMoneyBrl }}</h3>
                </span>
                <span class="status" :style="{ background: status_test ? '#00ff00' : 'red' }"></span>
                <small :style="{ color: 'silver' }">{{ 'Aplicar websockets' }}</small>
                <small>{{ 'Aplicar JWT no login' }}</small>
              </v-card-text>
              <v-row>
                <v-col>
                  <v-sheet class="d-flex justify-end">
                    <v-dialog>
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                          class="d-flex ga-2"
                          :style="{ background: '#fff', color: '#874b91' }"
                          text="Editar perfil"
                          v-bind="activatorProps"
                          @click="() => {}"
                        >
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-sheet>
                          <v-card-text>Modal perfil</v-card-text>
                        </v-sheet>
                      </template>
                    </v-dialog>
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
              <v-col class="d-flex justify-end pb-0">
                <v-dialog max-width="550px">
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                      class="d-flex ga-2"
                      :style="{ background: '#fff', color: '#874b91' }"
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
                      </v-card>
                      <v-card>
                        <v-form @submit.prevent="() => addNewObject()" class="pa-6">
                          <v-select v-model="title.value" :items="title" label="Selecione o tipo de tarefa" required></v-select>
                          <v-select v-model="color.value" :items="color" label="Selecione a cor do card"></v-select>
                          <v-text-field v-model="name_object" label="Titulo da tarefa" required></v-text-field>
                          <v-textarea v-model="detail_object" label="Descreva a tarefa" required></v-textarea>
                          <v-checkbox v-model="priority" label="Prioridade para concluir essa tarefa?"></v-checkbox>
                          <v-select v-model="step.value" :items="step" label="Quantidade de steps"></v-select>
                          <small>Não é obrigatório selecionar á quantidade de steps.</small>
                          <small>
                            a quantidade de steps criara de forma automatica a caixa de steps, após a execução da função passar
                            throw new error</small
                          >
                          <v-card-actions>
                            <v-row class="d-flex justify-end">
                              <v-btn variant="plain" text="Cancelar" @click="isActive.value = false"></v-btn>
                              <v-btn
                                :style="{ background: '#874b91', color: '#fff' }"
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
                    <small :style="{ color: 'grey' }">Não iniciado</small>
                  </li>
                  <li v-if="object.status === 'in-progress'">
                    <small :style="{ color: '#000' }">Em andamento</small>
                  </li>
                  <li v-if="object.status === 'complete'">
                    <small :style="{ color: 'green' }">Não iniciado</small>
                  </li>
                  <li>
                    <small>Etapas: {{ object.step }}</small>
                  </li>
                  <li>
                    <small>Data de criação: {{ object.createdAt }}</small>
                  </li>
                  <v-divider></v-divider>
                  <li class="d-flex justify-end ga-3">
                    <v-btn @click="() => {}" disabled>
                      <PhEyeClosed :size="22" />
                    </v-btn>
                    <v-dialog max-width="600px">
                      <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps">
                          <PhTrash :size="22" />
                        </v-btn>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card>
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
                    <div :style="{ cursor: 'pointer' }">
                      <p class="emoji">
                        {{ object.priority === true ? '⭐' : null }}
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
                  <li v-if="object.status === 'any'">
                    <small :style="{ color: 'grey' }">Não iniciado</small>
                  </li>
                  <li v-if="object.status === 'in-progress'">
                    <small :style="{ color: '#000' }">Em andamento</small>
                  </li>
                  <li v-if="object.status === 'complete'">
                    <small :style="{ color: 'green' }">Não iniciado</small>
                  </li>
                  <li>
                    <small>Etapas: {{ object.step }}</small>
                  </li>
                  <li>
                    <small>{{ object.createdAt }}</small>
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
                        <v-card>
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
                                <v-btn variant="tonal" @click="() => toCompleteTask(object.id)">Confirmar</v-btn>
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
                        <v-card>
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
                    <v-btn @click="() => editTask(object.id)">
                      <!-- criar logica para favoritar task -->
                      <PhStar :size="22" />
                    </v-btn>
                    <!-- só podera finalizar a task após completar todas as tasks -->
                    <v-btn @click="() => nextStepTask(object.id)" disabled>
                      <PhCheckCircle :size="22" />
                    </v-btn>
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
                  <li>
                    <small>{{ object.author }}</small>
                  </li>
                  <li>
                    <v-card-text>{{ object.description }}</v-card-text>
                  </li>
                  <li v-if="object.status === 'any'">
                    <small :style="{ color: 'grey' }">Não iniciado</small>
                  </li>
                  <li v-if="object.status === 'in-progress'">
                    <small :style="{ color: '#000' }">Em andamento</small>
                  </li>
                  <li v-if="object.status === 'completed'">
                    <small :style="{ color: 'green' }">Finalizado</small>
                  </li>
                  <li>
                    <small>Etapas: {{ object.step }}</small>
                  </li>
                  <li>
                    <small>{{ object.createdAt }}</small>
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
</template>
<script setup>
import {
  PhCheckCircle,
  PhClock,
  PhEye,
  PhEyeClosed,
  PhPause,
  PhPencil,
  PhPersonSimpleRun,
  PhPlay,
  PhStar,
  PhTrash,
  PhTrophy,
} from '@phosphor-icons/vue'
import axios from 'axios'
import { io } from 'socket.io-client'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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
const title = ref(['ZapYou', 'ZapYou 2.0', 'Sisconep', 'KENGOO'])
const name_object = ref('')
const detail_object = ref('')
const filterStatus = ref('')
const getAnyStatus = ref('')
const getInProgressStatus = ref('')
const getCompletedStatus = ref('')
const priority = ref(false)
const date = ref('')
const hours = ref('')

const color = ref(['lightSkyBlue', 'khaki', 'lightCoral', 'lightGreen'])

const money = 3456.789
const userMoney = 2324.8754
const resMoney = Number(money + userMoney)

const intlMoneyBrl = ref()
const realMoney = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resMoney)
intlMoneyBrl.value = String(realMoney)

// const editTask = async (id) => {
//   try {
//     const request = await axios.patch(`${DATABASE_URL}/list/${id}`, {
//       // alterar o status da task e mover parar a próxima coluna
//     })
//     console.log(`Edit the task => ${id}`)
//     return //response
//   } catch (err) {
//     console.log(err)
//   }
// }

const newItem = () => {
  toast.success('Adicionado com sucesso', {
    autoClose: 2500,
  }) // ToastOptions
  return { newItem }
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

const addNewObject = async () => {
  const modelObject = {
    systemOption: title.value.value,
    title: name_object.value,
    description: detail_object.value,
    priority: priority.value,
    cardColor: color.value.value,
    step: step.value.value,
  }
  try {
    newTask()
    const response = await axios.post(`${DATABASE_URL}${PORT}/tasks`, modelObject)
    title.value.value = ''
    name_object.value = ''
    detail_object.value = ''
    priority.value = ''
    color.value.value = ''
    step.value.value = ''
    // refresh
    console.log(response)
    socket.emit('new-task', response.data)
  } catch (err) {
    console.log(`algo deu errado: ${err}`)
  }
}
const toCompleteTask = () => {
  console.log('if all task are complete, done the task')
}
const getObject = async () => {
  try {
    const request = await axios.get(`${DATABASE_URL}${PORT}/tasks`)

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
    console.log(`algo deu errado: ${err}`)
  }
}
const getUser = async () => {
  try {
    const request = await axios.get(`${DATABASE_URL}${PORT}/users`)
    user_info.value = request.data
    const datas = user_info.value
    const nick = datas.map((item) => item.nickname)
    user_nickname.value = nick[0]
  } catch (err) {
    console.log(`algo deu errado: ${err}`)
  }
}
const nextStepTask = async (id) => {
  // só concluir a task appós finalizar todos os steps de cada task
  try {
    const response = await axios.patch(`${DATABASE_URL}${PORT}/tasks/${id}`, {
      status: 'in-progress',
    })
    socket.emit('task-updated', response.data)
    startTask()
  } catch (err) {
    console.log(err)
  }
}
const removeTask = async (id) => {
  try {
    const request = await axios.delete(`${DATABASE_URL}${PORT}/tasks/${id}`)
    deleteSuccess()
    socket.on('request', (deletedTask) => {
      // Remover a tarefa excluída da lista
      request = request.filter((task) => task.id !== deletedTask.id)
    })
    return request
  } catch (err) {
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
    const indexC = in_progress_task.value.findIndex((task) => task.id === updatedTask.id)
    if (indexC !== -1) {
      completed_task.value[indexC] = updatedTask // Substituir a tarefa existente pela atualizada
    }
    // '' dentro das aspas deve-se definir o nome dos eventos que serao chamados entre front e back
    // Recebe uma nova tarefa
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
  console.log('Socket desconectado')
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
  cursor: pointer;
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
  color: #874b91;
}
.container {
  background: rgb(234, 210, 238);
  background: linear-gradient(90deg, rgba(234, 210, 238, 1) 0%, rgba(135, 75, 145, 1) 100%);
}
.custom-z-index {
  word-wrap: break-word;
  background: #fff;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 8px; /* Largura da barra de rolagem */
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Cor de fundo da trilha da barra de rolagem */
  border-radius: 10px; /* Arredondamento dos cantos */
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
