<template>
  <header>
    <v-row>
      <v-col>
        <v-card>
          <v-card>PHOTO</v-card>
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
<script setup></script>
<style>
  header {
    z-index: 1;
    position: fixed;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    background: #fff;
    color: #000;
    height: 70px;
    width: 100%;
  }
  div.v-card {
    box-shadow: none;
  }
</style>
