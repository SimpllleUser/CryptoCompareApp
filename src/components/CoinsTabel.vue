<template>
  <div class="coins-tabel">
<!--   <h1>Coin tabel</h1>-->
    <div>{{itemsCoin}}</div>
    <b-table striped hover  :fields="fields" :items="itemsCoin">

    </b-table>
  </div>
</template>

<script>
// import axios from "axios"
export default {
  name: "coins-tabel",
  props:['coinsList'],
  data(){
    return{
      itemsCoin:[]
    }
  },
  methods: {
    formatDataToTabel(){
      this.itemsCoin =  this.coinsList.map((item, index) => ({id: index + 1, Name: item.FullName, label: item.Name, }))
    }
  },
  created () {
    this.formatDataToTabel()
  },
};
</script>
