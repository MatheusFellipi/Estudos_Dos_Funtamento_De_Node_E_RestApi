const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

function verifyIsExisteAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  //find retorna todos os dados
  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "customer not found" });
  }
  request.customer = customer;
  return next();
}
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

/*
 * id  = uuid
 * cpf string,
 * name string,
 * statement[]
 */

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  //some retorna booleano
  const customersAlreadyExists = customers.some(
    (customers) => customers.cpf === cpf
  );
  if (customersAlreadyExists) {
    return response.status(400).json({ error: "customers already exists!!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).json(customers);
});
app.get("/account", verifyIsExisteAccountCPF, (request, response) => {
  const { customer } = request;

  return response.status(201).json(customer);
});
app.get("/statement/", verifyIsExisteAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});
app.post("/deposit", verifyIsExisteAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };
  customer.statement.push(statementOperation);

  return response.status(201).json(statementOperation);
});
app.post("/withdraw", verifyIsExisteAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "debito",
  };
  customer.statement.push(statementOperation);

  return response.status(201).json(statementOperation);
});
app.get("/statement/date", verifyIsExisteAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");
  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});
app.put("/account", verifyIsExisteAccountCPF, (request, response) => {
  const { customer } = request;
  const { name } = request.body;

  customer.name = name;

  return response.status(201).send();
});
app.delete("/account", verifyIsExisteAccountCPF, (request, response) => {
  const { customer } = request;
  customers.splice(customer, 1);
  return response.status(200).send(customers);
});
app.get("/balance", verifyIsExisteAccountCPF, (request, response) => {
  const { customer } = request;
  const balance = getBalance(customer.statement);
  return response.status(200).json(balance);
});

app.listen(3000, () => console.log("server runing"));
