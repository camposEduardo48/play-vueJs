import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const newItem = () => {
  toast.success('Adicionado com sucesso', {
    autoClose: 2500,
  }) // ToastOptions
  return { newItem }
}
export const taskFinished = () => {
  toast.success('Tarefa finalizada ✅', {
    autoClose: 2500,
  }) // ToastOptions
  return { taskFinished }
}
export const newTask = () => {
  toast.success('Nova tarefa adicionada', {
    autoClose: 3000,
  }) // ToastOptions
  return { newTask }
}
export const startTask = (title) => {
  toast.success(`Tarefa "${title}" iniciada`, {
    autoClose: 3000,
  }) // ToastOptions
  return { startTask }
}
export const deleteSuccess = () => {
  toast.success('Tarefa removida com sucesso', {
    autoClose: 1500,
    isLoading: false,
  })
  return { deleteSuccess }
}
export const invalid = () => {
  toast.error('Informação inválida', {
    autoClose: 2000,
  }) // ToastOptions
  return { invalid }
}
export const someError = () => {
  toast.error('Ops, algo deu errado!', {
    autoClose: 3000,
  }) // ToastOptions
  return { someError }
}