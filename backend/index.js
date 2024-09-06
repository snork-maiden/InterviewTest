import express from 'express';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cors());

let contractsLastId = 3;
let contracts = [{
  id: 1,
  number: '13748',
  description: 'Договор на оказание услуг страхования №13748',
  firstPayment: '100',
  lastPayment: '300'
}, {
  id: 2,
  number: '14223',
  description: 'Договор на оказание услуг страхования №14223',
  firstPayment: '100',
  lastPayment: '300'
}]

function validateContract(contract) {
  if(typeof contract !== 'object') {
    return false;
  }
  
  if(!contract?.number || !contract?.description || !contract?.firstPayment || !contract?.lastPayment) {
    return false;
  }
  
  return true;
}

app.get('/contracts', (req, res) => {
  res.json(contracts);
});

app.post('/contracts', (req, res) => {
  const body = req.body;

  const isValid = validateContract(body);
  
  if(!isValid) {
    return res.status(400).send('Неверно заполнен договор');
  }
  
  contracts.push({
    id: contractsLastId++,
    number: body.number.toString(),
    description: body.description.toString(),
    firstPayment: body.firstPayment.toString(),
    lastPayment: body.lastPayment.toString(),
  });
  
  return res.status(201).send();
})

app.delete('/contracts/:contractId', (req, res) => {
  const contractId = +req.params.contractId;

  console.log('Deleting contract with id', contractId);
  
  const deleteIndex = contracts.findIndex((contract) => contract.id === contractId);
  if(deleteIndex >= 0) {
    contracts.splice(deleteIndex, 1);
  }

  return res.send();
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});