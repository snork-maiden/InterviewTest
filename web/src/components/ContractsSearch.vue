<template>
  <v-container fluid>
    <v-col align="center">
      <h3 class="mb-4">Заключенные договоры</h3>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="contracts"
          :loading="contractsLoading"
          :hide-default-footer="hidePagination"
          :footer-props="{
            'items-per-page-options': [contracts.length],
          }"
        >
          <template #item.payment="{ item }">
            <span>{{ item.firstPayment + item.lastPayment }}</span>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import { ContractsAPI } from "@/api/contracts-api";

export default {
  name: "ContractsSearch",
  data() {
    return {
      contractsLoading: false,
      contracts: [],
      headers: [
        { text: "Номер", value: "number" },
        { text: "Описание", value: "description" },
        { text: "Платеж", value: "payment" },
        { text: "Удалить", value: "payment" },
      ],
    };
  },
  async created() {
    await this.loadContracts();
  },
  methods: {
    async loadContracts() {
      this.contractsLoading = true;
      try {
        this.contracts = await ContractsAPI.getContracts();
      } catch (e) {
        console.error(e);
      } finally {
        this.contractsLoading = false;
      }
    },
  },
  computed: {
    hidePagination() {
      return this.contracts.length < 5;
    },
  },
};
</script>
<style scoped></style>
