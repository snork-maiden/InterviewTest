<template>
  <v-form ref="form" v-model="isFormValid" @submit.prevent="submitForm" class="form">
    <v-container mb-6>
      <v-row>
        <v-col cols="12" sm="auto" class="font-weight-bold" alignSelf="center">
          <span class="font-weight-bold">Договор</span>
        </v-col>

        <v-col cols="12" sm="5" xs="12">
          <v-text-field
            v-model="contractName"
            label="Название договора"
            outlined
            dense
            :rules="[requiredRule]"
          />
        </v-col>

        <v-col class="font-weight-bold" alignSelf="center">
          <span>№</span>
        </v-col>

        <v-col cols="12" sm="4" xs="12">
          <v-text-field
            v-model="contractNumber"
            label="Номер договора"
            type="number"
            outlined
            dense
            :rules="[requiredRule, numberRule]"
          />
        </v-col>
      </v-row>

      <v-row class="my-0 py-0">
        <v-col cols="12" sm="4" xs="12">
          <v-text-field
            v-model="firstPayment"
            label="Первый платёж"
            type="number"
            outlined
            dense
            :rules="[requiredRule, numberRule]"
          />
        </v-col>
        <v-col cols="12" sm="4" xs="12">
          <v-text-field
            v-model="lastPayment"
            label="Последний платёж"
            type="number"
            outlined
            dense
            :rules="[requiredRule, numberRule]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn :disabled="!isFormValid" color="primary" @click="submitForm">
            Добавить
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "ContractForm",
  data() {
    return {
      contractName: "на оказание услуг страхования",
      contractNumber: null,
      firstPayment: null,
      lastPayment: null,
      isFormValid: false,
    };
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        const description = `Договор ${this.contractName} №${this.contractNumber}`;
        const newContract = {
          number: +this.contractNumber,
          description,
          firstPayment: +this.firstPayment,
          lastPayment: +this.lastPayment,
        };

        this.$emit("submit", newContract);
        this.$refs.form.reset();
        this.$nextTick(() => {
          this.contractName = "на оказание услуг страхования";
        });
      }
    },
  },
  computed: {
    requiredRule() {
      return (v) => !!v || "Это поле обязательно";
    },
    numberRule() {
      return (v) => v > 0 || "Значение должно быть положительным";
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 800px;
}
</style>
