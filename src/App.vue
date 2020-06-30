<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  td,
  th {
    border: 1px solid rgb(190, 190, 190);
    padding: 5px;
  }

  th {
    font-weight: bold;
  }

  caption {
    padding: 10px;
    caption-side: bottom;
  }

  table {
    border-collapse: collapse;
    border: 2px solid rgb(200, 200, 200);
    letter-spacing: 1px;
    font-family: sans-serif;
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .container .item {
    flex-grow: 1;
  }

  .text-align-center {
    text-align: center;
  }

  .text-align-right {
    text-align: right;
  }

  .text-align-left {
    text-align: left;
  }
  .farming-bgcolor {
    background-color: rgb(231, 186, 62);
  }
  .farming-color {
    color: rgb(231, 200, 62);
  }

  .mining-bgcolor {
    background-color: rgb(161, 94, 238);
  }
  .mining-color {
    color: rgb(161, 94, 238);
  }

  .combat-bgcolor {
    background-color: rgb(245, 82, 82);
  }
  .combat-color {
    color: rgb(245, 82, 82);
  }

  .foraging-bgcolor {
    background-color: rgb(87, 209, 87);
  }
  .foraging-color {
    color: rgb(87, 209, 87);
  }

  .fishing-bgcolor {
    background-color: rgb(59, 150, 230);
  }
  .fishing-color {
    color: rgb(59, 150, 230);
  }
  
  .no-bgcolor {
    background-color: white;
  }
  .no-color {
    color: black;
  }
</style>
