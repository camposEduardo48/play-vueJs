<template>
  <footer>
    <slot>sopmac &copy; {{ new Date().getUTCFullYear() }}</slot>
  </footer>
</template>
<script setup></script>

<style setup>
  footer {
    position: fixed;
    display: flex;
    background: #fff;
    color: gray;
    height: auto;
    width: 100%;
    bottom: 0%;
    left: 0.5rem;
  }
</style>
