import axios from "axios";

const contractsHost = axios.create({
  baseURL: "http://localhost:3000/",
});

export const ContractsAPI = {
  getContracts: async () => {
    const resp = await contractsHost.get("contracts");

    return resp.data;
  },
  addContract: async (contactData) => {
    const resp = await contractsHost.post("contracts", contactData);

    return resp.data;
  },
  deleteContract: async (id) => {
    const resp = await contractsHost.delete("contracts/" + id);

    return resp.data;
  },
};
