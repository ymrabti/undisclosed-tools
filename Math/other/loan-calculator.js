// Constants for loan calculation
const MONTHS_IN_YEAR = 12;

// Payment event types
const EVENT_TYPES = {
    PAUSE: 'pause',
    EXTRA_PAYMENT: 'extra_payment'
};

// Function to format period as years and months
function formatPeriod(totalMonths) {
    const years = Math.floor(totalMonths / MONTHS_IN_YEAR);
    const months = totalMonths % MONTHS_IN_YEAR;
    const yearText = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '';
    
    if (years && months) {
        return `${yearText} and ${monthText}`;
    }
    return yearText || monthText || '0 months';
}

// Function to calculate required months for payoff
function calculateRequiredMonths(principal, annualInterestRate, monthlyPayment) {
    const monthlyInterestRate = (annualInterestRate / 100) / MONTHS_IN_YEAR;
    
    // Check if payment is sufficient to cover interest
    const minimumPayment = principal * monthlyInterestRate;
    if (monthlyPayment <= minimumPayment) {
        throw new Error(`Monthly payment of ${monthlyPayment.toLocaleString('fr')} is too low. ` +
            `Minimum required to cover interest: ${(minimumPayment + 0.01).toLocaleString('fr')}`);
    }
    
    // Using the loan payment formula solved for n (number of months):
    // n = ln(PMT/(PMT-PV*r)) / ln(1+r)
    // Where: PMT = Monthly Payment, PV = Principal, r = Monthly Interest Rate
    const months = Math.ceil(
        Math.log(monthlyPayment / (monthlyPayment - principal * monthlyInterestRate)) / 
        Math.log(1 + monthlyInterestRate)
    );
    
    return months;
}

function calculateLoanAmortization(
    initialLoanAmount,
    annualInterestRate,
    monthlyPayment,
    events = []
) {
    // Calculate total months needed
    const totalRequiredMonths = calculateRequiredMonths(
        initialLoanAmount,
        annualInterestRate,
        monthlyPayment
    );
    
    const years = Math.floor(totalRequiredMonths / MONTHS_IN_YEAR);
    const months = totalRequiredMonths % MONTHS_IN_YEAR;
    
    console.log(`\nWith a monthly payment of ${monthlyPayment.toLocaleString('fr')}, ` +
        `it will take ${formatPeriod(totalRequiredMonths)} to pay off the loan.`);
    
    // Sort events
    const sortedEvents = [...events].sort((a, b) => {
        return (a.year - b.year) || (a.month - b.month);
    });
    
    const annualInterestDecimal = annualInterestRate / 100;
    const monthlyInterestRate = annualInterestDecimal / MONTHS_IN_YEAR;
    
    let remainingLoanBalance = initialLoanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let totalInterestCapitalized = 0;
    let monthsProcessed = 0;
    
    const amortizationSchedule = [];
    let currentYear = 1;
    let yearlyData = {
        year: currentYear,
        startingBalance: remainingLoanBalance,
        yearlyInterest: 0,
        yearlyPrincipal: 0,
        yearlyInterestCapitalized: 0,
        monthlyPayments: []
    };
    
    // Process each month until loan is paid off
    while (remainingLoanBalance > 0) {
        const currentMonth = (monthsProcessed % MONTHS_IN_YEAR) + 1;
        
        // Start new year data if needed
        if (currentMonth === 1 && monthsProcessed > 0) {
            amortizationSchedule.push({
                ...yearlyData,
                remainingBalance: remainingLoanBalance,
                monthlyPayment
            });
            currentYear++;
            yearlyData = {
                year: currentYear,
                startingBalance: remainingLoanBalance,
                yearlyInterest: 0,
                yearlyPrincipal: 0,
                yearlyInterestCapitalized: 0,
                monthlyPayments: []
            };
        }
        
        // Calculate monthly interest
        const monthlyInterest = remainingLoanBalance * monthlyInterestRate;
        
        // Process regular payment
        const monthlyPrincipalPaid = Math.min(monthlyPayment - monthlyInterest, remainingLoanBalance);
        remainingLoanBalance -= monthlyPrincipalPaid;
        yearlyData.yearlyInterest += monthlyInterest;
        yearlyData.yearlyPrincipal += monthlyPrincipalPaid;
        
        // Record monthly payment data
        yearlyData.monthlyPayments.push({
            month: currentMonth,
            payment: monthlyPayment,
            principal: monthlyPrincipalPaid,
            interest: monthlyInterest,
            remainingBalance: remainingLoanBalance
        });
        
        monthsProcessed++;
    }
    
    // Add final year data
    amortizationSchedule.push({
        ...yearlyData,
        remainingBalance: remainingLoanBalance,
        monthlyPayment
    });
    
    // Calculate totals
    totalInterestPaid = amortizationSchedule.reduce((sum, year) => sum + year.yearlyInterest, 0);
    totalPrincipalPaid = amortizationSchedule.reduce((sum, year) => sum + year.yearlyPrincipal, 0);
    
    return {
        schedule: amortizationSchedule,
        summary: {
            initialLoanAmount,
            monthlyPayment,
            loanTerm: formatPeriod(monthsProcessed),
            requiredMonths: monthsProcessed,
            years,
            months,
            totalInterestPaid,
            totalPrincipalPaid,
            totalPaid: totalInterestPaid + totalPrincipalPaid,
            actualMonthlyPaymentCount: monthsProcessed
        }
    };
}

// Example usage
try {
    const loanDetails = calculateLoanAmortization(
        400000,      // initial loan amount
        5,           // annual interest rate (%)
        3000         // monthly payment
    );

    // Print yearly schedule
    console.log("\nYearly Schedule:");
    loanDetails.schedule.forEach(year => {
        console.log({
            "Year": year.year,
            "Starting Balance": year.startingBalance.toLocaleString('fr'),
            "Interest Paid": year.yearlyInterest.toLocaleString('fr'),
            "Principal Paid": year.yearlyPrincipal.toLocaleString('fr'),
            "Remaining Balance": year.remainingBalance.toLocaleString('fr')
        });
    });

    // Print final summary
    console.log("\nLoan Summary:");
    console.log({
        "Initial Loan Amount": loanDetails.summary.initialLoanAmount.toLocaleString('fr'),
        "Monthly Payment": loanDetails.summary.monthlyPayment.toLocaleString('fr'),
        "Total Time to Payoff": loanDetails.summary.loanTerm,
        "Total Interest Paid": loanDetails.summary.totalInterestPaid.toLocaleString('fr'),
        "Total Principal Paid": loanDetails.summary.totalPrincipalPaid.toLocaleString('fr'),
        "Total Amount Paid": loanDetails.summary.totalPaid.toLocaleString('fr')
    });
} catch (error) {
    console.error("Error:", error.message);
}
