<template>
  <v-container fluid>
    <v-col align="center">
      <h3 class="mb-4">Заключенные договоры</h3>
      <add-contract-form @submit="(newContract) => addContract(newContract)" />
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

          <template #item.actions="{ item }">
            <v-btn color="red" @click="deleteContract(item.id)" icon>
              <v-icon>mdi-delete</v-icon>
              <!-- Material design delete icon -->
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>
import { ContractsAPI } from "@/api/contracts-api";
import AddContractForm from "./AddContractForm.vue";

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
        { text: "Удалить", value: "actions" },
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
        console.log(this.contracts);
      } catch (e) {
        console.error(e);
      } finally {
        this.contractsLoading = false;
      }
    },
    async deleteContract(contractId) {
      try {
        await ContractsAPI.deleteContract(contractId);
        this.contracts = this.contracts.filter(
          (contract) => contract.id !== contractId
        );
      } catch (e) {
        console.error(e);
      }
    },
    async addContract(newContract) {
      newContract.id = this.nextId;

      console.log(newContract);
      try {
        await ContractsAPI.addContract(newContract);
        this.contracts.push(newContract);
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    hidePagination() {
      return this.contracts.length < 5;
    },
  },
  nextId() {
    const ids = this.contracts.map((item) => item.id);
    return Math.max(...ids);
  },
  components: {
    AddContractForm,
  },
};
</script>
<style scoped></style>
