<template>
  <footer>
    <slot>footer</slot>
  </footer>
</template>
<script setup></script>

<style setup>
footer {
  position: fixed;
  display: flex;
  background: black;
  color: aliceblue;
  height: auto;
  width: 100%;
  bottom: 0%;
}
</style>
