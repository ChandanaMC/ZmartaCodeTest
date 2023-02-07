const express = require('express')
const cors = require('cors')
const rulesEngine = require('./rulesEngine')
const lenders = require('./lenders')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post("/submit", async (req, res) => {
  //Get the user input (amount and repaymentYears from the frontend)
  const amount = req.body.amount;
  const repaymentYears = req.body.repaymentYears;

  console.log(amount);
  console.log(repaymentYears);

  const applicationData = {
    amount,
    repaymentYears,
  };

  Promise.all(rulesEngine.run(applicationData, lenders).map((lender) => {
    return sendToBank(lender);
 })).then((data) => {
    console.log(data);
    res.send(data)
  });
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/**
 * Simulates an API call to bank
 * @param {object} lender
 * @return {Promise<>}
 */
function sendToBank(lender) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Applied to ${lender.name}`)
      resolve({
        name: lender.name,
        response: `Successfully applied to ${lender.name}`
      })
    }, 1000)
  })
}
