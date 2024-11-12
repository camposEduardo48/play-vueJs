<template>
	<Layout class="layout">
		<Container>
			<v-row>
				<v-col md="12" sm="12" class="d-flex justify-center align-center">
					<v-card width="400px" elevation="20">
						<v-row>
							<v-col class="d-flex justify-center">
								<v-form
									class="d-flex flex-column h-auto w-100 ma-6 pa-2 ga-4"
									elevation="6"
									@submit.prevent="() => userLogin()"
								>
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
									<v-row>
										<v-btn type="submit" class="mt-6 mb-8" block>Entrar</v-btn>
									</v-row>
									<v-row>
										<v-dialog max-width="500px">
											<template v-slot:activator="{ props: activatorProps }">
												<v-sheet class="d-flex flex-column w-100">
													<div class="d-flex justify-center mb-4">
														<small>Não possui cadastro?</small>
													</div>
													<div class="d-flex justify-center">
														<v-btn :style="{ fontSize: '8pt' }" v-bind="activatorProps" variant="plain"
															>Cadastrar-se</v-btn
														>
													</div>
												</v-sheet>
											</template>
											<template v-slot:default="{ isActive }">
												<v-card>
													<v-card-text>
														<h3>Criar cadastro</h3>
														<small>Preencha os campos abaixo com as suas informações pessoais legítimas</small>
													</v-card-text>
													<v-divider></v-divider>
													<v-sheet>
														<v-card-text>
															<v-form
																class="d-flex flex-column justify-center w-100"
																@submit.prevent="() => newUserRegister()"
															>
																<v-text-field
																	variant="outlined"
																	type="text"
																	v-model="newFirstName"
																	label="Digite seu primeiro nome"
																	required
																></v-text-field>
																<v-text-field
																	variant="outlined"
																	type="text"
																	v-model="newLastName"
																	label="Digite seu sobrenome"
																	required
																></v-text-field>
																<v-text-field
																	variant="outlined"
																	type="text"
																	v-model="newNickName"
																	label="Digite seu apelido"
																	required
																></v-text-field>
																<v-text-field
																	variant="outlined"
																	type="email"
																	v-model="newEmail"
																	label="Digite um endereço de email"
																	required
																></v-text-field>
																<v-card-text>Defina uma senha na qual usará para se logar futuramente</v-card-text>
																<v-text-field
																	variant="outlined"
																	type="password"
																	v-model="newPassword"
																	:color="newPassword.length > 5 && newPassword === repeatPassword ? 'green' : 'red'"
																	label="Digite uma palavra chave"
																	required
																></v-text-field>
																<v-text-field
																	variant="outlined"
																	type="password"
																	:color="newPassword.length > 5 && newPassword === repeatPassword ? 'green' : 'red'"
																	v-model="repeatPassword"
																	label="Digite a palavra chave novamente"
																	required
																></v-text-field>
																<v-checkbox
																	v-model="agreePermissions"
																	label="Você concorda com os termos e condições legais da Sopmac?"
																	color="#000"
																	required
																></v-checkbox>
																<v-sheet>
																	<v-row class="d-flex justify-end pa-4 ga-4 ma-2">
																		<v-btn variant="plain" @click="isActive.value = false">Cancelar</v-btn>
																		<v-btn variant="tonal" type="submit">Cadastrar</v-btn>
																	</v-row>
																</v-sheet>
															</v-form>
														</v-card-text>
													</v-sheet>
												</v-card>
											</template>
										</v-dialog>
									</v-row>
								</v-form>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</Container>
		<Footer>
			<div>sopmac &copy; {{ new Date().getUTCFullYear() }}</div>
		</Footer>
	</Layout>
</template>
<script setup>
	import Container from '@/components/container/Container.vue'
	import Footer from '@/components/footer/Footer.vue'
	import Layout from '@/components/layout/Layout.vue'
	import { UserDatasSchema } from '@/lib/zod'
	import { PhBiohazard } from '@phosphor-icons/vue'
	import axios from 'axios'
	import { ref } from 'vue'
	import { toast } from 'vue3-toastify'
	import 'vue3-toastify/dist/index.css'

	const DATABASE_URL = import.meta.env.VITE_DATABASE_URL
	const PORT = Number(import.meta.env.VITE_PORT)

	const newFirstName = ref('')
	const newLastName = ref('')
	const newNickName = ref('')
	const newEmail = ref('')
	const newPassword = ref('')
	const repeatPassword = ref('')
	const agreePermissions = ref(false) // verificar a entrada desse dado no banco de dados
	const token = localStorage.getItem('authToken')
	const equalPasswords = ref(false)

	const user_nickname = ref('')
	const user_password = ref('')
	const submitted = ref(false)
	const show_users = ref([])

	const notifyAccess = () => {
		toast.success(`Bem vindo de volta, ${user_nickname.value}!`, {
			autoClose: 1500,
		}) // ToastOptions
		return { notifyAccess }
	}
	const registered = () => {
		toast.success(`Cadastro realizado com sucesso!`, {
			autoClose: 3200,
		}) // ToastOptions
		return { registered }
	}
	const notRegistered = () => {
		toast.error(`Verifique e preencha os dados corretamente!`, {
			autoClose: 2000,
		}) // ToastOptions
		return { notRegistered }
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
			autoClose: 1200,
		}) // ToastOptions
		return { problem }
	}
	const newUserRegister = async () => {
		const newUser = {
			firstName: newFirstName.value,
			lastName: newLastName.value,
			nickname: newNickName.value,
			email: newEmail.value,
			password: newPassword.value,
			agreePermissions: agreePermissions.value,
		}
		equalPasswords.value = newUser.password === repeatPassword.value
		const verifyPassword = equalPasswords.value
		const { success, error } = UserDatasSchema.safeParse(newUser)
		console.log(success)
		try {
			if (success && verifyPassword) {
				const response = await axios.post(`${DATABASE_URL}${PORT}/users`, newUser)
				registered()
				newFirstName.value = ''
				newLastName.value = ''
				newNickName.value = ''
				newEmail.value = ''
				newPassword.value = ''
				repeatPassword.value = ''
				agreePermissions.value = false
				setTimeout(() => {
					location.reload()
				}, 1200)
			} else {
				notRegistered()
			}
		} catch (err) {
			notRegistered()
			console.log(`Erro no envio dos dados: ${err}`)
		}
	}
	const userLogin = async () => {
		try {
			const response = await axios.post(`${DATABASE_URL}${PORT}/users`, {
				nickname: user_nickname.value,
				password: user_password.value,
			})
			const { token } = response.data // token desestruturado vindo do backend
			if (response) {
				notifyAccess()
				//no navegador verificar no inspecionar/aplicativo/armazenamento-local
				//lá da pra saber se os dados estão salvos ou nao
				setTimeout(() => {
					location.replace('/dashboard')
				}, 500)
				localStorage.setItem('authToken', token) // armazena o token do localStorage
			}
		} catch (err) {
			console.log(err)
			invalid()
		}
	}
</script>
<style scoped>
	.layout[data-v-c9bfb757] {
		background-size: cover;
		background-image: url('/src/assets/background.png');
	}
	.v-btn.v-btn--density-default {
		position: relative;
	}
	.container {
		height: 100%;
		width: 100%;
	}
	ul {
		list-style: none;
	}
	.custom-style-toastify {
		background: #000 !important;
	}
	svg {
		color: #000;
	}
	button {
		padding: 0.5rem;
		color: #fff;
		background: #000 !important;
	}
	footer {
		position: relative;
		display: flex;
		background: transparent;
		color: gray;
		height: auto;
		width: 100%;
		bottom: 0%;
		left: 0.5rem;
	}
</style>
