<template>
  <footer>
    <div>sopmac &copy; {{ new Date().getUTCFullYear() }}</div>
    <slot></slot>
  </footer>
</template>
<script setup></script>

<style setup>
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
</style>
