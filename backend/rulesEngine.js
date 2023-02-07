/**
 * @param {object} applicationData
 * @param {Array} lenders - An array with lenders and their rules
 * @return {Array} - The filtered array
 */

function run(applicationData, lenders) {
  const validBanks = []; //The filtered array with valid bank names

  let isAmountGT;
  let isAmountLT;
  let isAmountET;
  let isRepaymentGT;
  let isRepaymentLT;
  let isRepaymentET;


  //Verify correctness of user input.
  //Therefore also checking for the minimum amount and repayment years
  //Returns an empty array if the amount entered by user is less than 100 and the repaymentYears is less than 1.
  if (applicationData.amount < 100 || applicationData.repaymentYears < 1) {
    return [];
  }

  //loop through each bank(lenders) and for each bank loop through its rules, Check if the amount and repaymentYears entered by the user fits the conditions in the array, set its respective variables to true.

  lenders.forEach((bank) => {
    isAmountGT = true;
    isAmountLT = true;
    isAmountET = true;
    isRepaymentGT = true;
    isRepaymentLT = true;
    isRepaymentET = true;

    bank.rules.forEach((conditions) => {
      if (conditions.field === "amount") {
        if (conditions.operator === "greaterThan") {
          (applicationData.amount > conditions.value ? isAmountGT = true : isAmountGT = false)
        }
        if (conditions.operator === "lessThan") {
          (applicationData.amount < conditions.value ? isAmountLT = true : isAmountLT = false)
        }
        if (conditions.operator === "equalTo") {
          (applicationData.amount === conditions.value ? isAmountET = true : isAmountET = false)
        }
      }
      if (conditions.field === "repaymentYears") {
        if (conditions.operator === "greaterThan") {
          (applicationData.repaymentYears > conditions.value ? isRepaymentGT = true : isRepaymentGT = false)
        }
        if (conditions.operator === "lessThan") {
          (applicationData.repaymentYears < conditions.value ? isRepaymentLT = true : isRepaymentLT = false)
        }
        if (conditions.operator === "equalTo") {
          (applicationData.repaymentYears === conditions.value ? isRepaymentET = true : isRepaymentET = false)
        }
      }
    });

    //If all the conditions are true then push the name of the qualified banks to the array.

    if (isAmountGT && isAmountLT && isAmountET && isRepaymentGT && isRepaymentLT && isRepaymentET) {
      const lender = { name: bank.name };
      validBanks.push(lender);
    }
  });
  return validBanks;

}

module.exports = {
  run
}
