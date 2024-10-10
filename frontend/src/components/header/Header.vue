<template class="position-absolute top-0 left-0 right-0">
  <header>
    <v-row>
      <v-col>
        <v-card>
          <v-card> <PhBowlingBall :size="36" :style="{ background: '#874B91', color: '#fff', borderRadius: '100%' }" /> </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <slot></slot>
        </v-card>
      </v-col>
    </v-row>
  </header>
</template>
<script setup>
import { PhBowlingBall } from '@phosphor-icons/vue'
</script>
<style>
div.v-card {
  box-shadow: none;
}
</style>
