<template>
  <div>
    <header>
      <h1>Schedulizer</h1>
      <table>
        <tr>
          <th>Event Name</th>
          <th>Date</th>
        </tr>
        <tr v-for="event in events" :key='event.id'>
          <td class="data-table-cell">{{event.attributes.name}}</td>
          <td class="data-table-cell">{{event.formattedDate}}</td>
        </tr>
      </table>
    </header>
  </div>
</template>

<script>
import { fetchEvents } from '../api/event-api';

export default {
  name: 'Schedulizer',
  data() {
    return {
      events: []
    };
  },
  created() {
    fetchEvents().then(data => (this.events = data));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.data-table-cell {
  text-align: left;
}
</style>
