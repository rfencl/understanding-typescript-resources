// calculator.ts
// TypeScript code for investment calculation

// data:
// initial amount
// annual contribution
// expected return
// duration

// These are type definitions and a function to calculate investment growth over time.
// The function returns an array of results for each year, or an error message if the input is invalid.
// The results include the total amount, total contributions, and total interest earned for each year.
// The results are printed to the console in a formatted manner.
type InvestmentData = {
  initialAmount: number;
  annualContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: string;
  totalAmount: number;
  totalContributions: number;
  totalInterestEarned: number;
};

// The return type can either be an array of InvestmentResult or a string for error messages.
type CalculationResult = InvestmentResult[] | string;

function isValidData(data: InvestmentData): boolean | string{

  if (data.initialAmount < 0) {
    return 'Initial amount must be a non-negative number.';
  }
  if (data.annualContribution < 0) {
    return 'Annual contribution must be a non-negative number.';
  }
  if (data.expectedReturn < 0) {
    return 'Expected return must be a non-negative number.';
  }
  if (data.duration <= 0) {
    return 'Duration must be a positive number.';
  }

  return true;
}

function calculateInvestment(data: InvestmentData): CalculationResult {
  // destructuring the input data
  const { initialAmount, annualContribution, expectedReturn, duration } = data;
  // Validate the input data
  let validationResult = isValidData(data);
  
  if (validationResult !== true) {
    return validationResult as string; 
  } 

  let total = initialAmount;
  let totalContributions = 0;
  let totalInterestEarned = 0;

  const annualResults: InvestmentResult[] = [];

  for (let i = 0; i < duration; i++) {
    total = total * (1 + expectedReturn);
    totalInterestEarned = total - totalContributions - initialAmount;
    totalContributions += annualContribution;
    total += annualContribution;

    annualResults.push({
      year: `Year ${i + 1}`,
      totalAmount: total,
      totalInterestEarned,
      totalContributions
    });
  }

  return annualResults;
}

// Function to print the results in a formatted manner
function printResults(results: CalculationResult) {
  // Check if the results are an error message or an array of results
  if (typeof results === 'string') {
    console.log(results);
  } else {
    for (const yearEndResult of results) {
      console.log(yearEndResult.year);
      console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
      console.log(`Total Contributions: ${yearEndResult.totalContributions.toFixed(0)}`);
      console.log(`Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`);
      console.log('----------------------');
    }
  }
}

const investmentData: InvestmentData = {
  initialAmount: 5000,
  annualContribution: 500,
  expectedReturn: 0.08,
  duration: 10
};

const results = calculateInvestment(investmentData)

printResults(results);
