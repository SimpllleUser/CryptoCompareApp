<template>
  <div class="about">
    <h1>This is an Detail page</h1>
    {{$route.params.id}}
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "coin-detail",
  created() {
  }
  }

</script>
