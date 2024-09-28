<template>
  <Layout>
    <Header></Header>
    <Container>
      <v-main class='container'>
        <v-row>
          <v-col class='d-flex justify-center'>
            <v-card class='h-auto w-50'>
              <v-card-text>
                <h2>Dashboard</h2>
              </v-card-text>
              <v-divider></v-divider>
              <v-row class='pa-4'>
                <v-card-text>
                  <h3>dashboard page</h3>
                </v-card-text>
                <v-col class='d-flex ga-4'>
                    <v-btn text='Say Hello'></v-btn>
                    <v-btn text='Go Out'></v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-main>
    </Container>
  <Footer></Footer>
  </Layout>
</template>
<script lang="ts" setup>
import Container from '@/components/container/Container.vue'
import Footer from '@/components/footer/Footer.vue'
import Header from '@/components/header/Header.vue'
import Layout from '@/components/layout/Layout.vue'
</script>
<style scoped>

</style>
