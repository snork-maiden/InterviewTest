<template>
  <v-app>
    <v-main>
      <ContractsSearch/>
    </v-main>
  </v-app>
</template>

<script>

import ContractsSearch from "@/components/ContractsSearch.vue";

export default {
  name: 'App',

  components: {
    ContractsSearch,
  },

  data: () => ({
    //
  }),
};
</script>
