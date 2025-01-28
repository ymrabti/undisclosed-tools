// Constants for loan calculation
const MONTHS_IN_YEAR = 12;

// Payment event types
const EVENT_TYPES = {
    PAUSE: 'pause',
    EXTRA_PAYMENT: 'extra_payment'
};

function calculateMonthlyPaymentPausesPayoffs(principal, annualInterestRate, remainingYears) {
    const monthlyInterestRate = (annualInterestRate / 100) / MONTHS_IN_YEAR;
    const totalMonths = remainingYears * MONTHS_IN_YEAR;

    // PMT formula: PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    return principal *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
}

function calculateMonthlyPayment(principal, annualInterestRate, remainingYears) {
    const monthlyInterestRate = (annualInterestRate / 100) / MONTHS_IN_YEAR;
    const totalMonths = remainingYears * MONTHS_IN_YEAR;

    // PMT formula: PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    // Where: P = Principal, r = Monthly Interest Rate, n = Total Number of Months
    const monthlyPayment = principal *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    return monthlyPayment;
}

// Function to calculate total years needed for payoff with fixed payment
function calculateRequiredYears(principal, annualInterestRate, monthlyPayment) {
    const monthlyInterestRate = (annualInterestRate / 100) / MONTHS_IN_YEAR;

    // Using the loan payment formula solved for n (number of months):
    // n = log(PMT/(PMT-PV*r)) / log(1+r)
    // Where: PMT = Monthly Payment, PV = Principal, r = Monthly Interest Rate

    const payment = monthlyPayment;
    const rateTerm = principal * monthlyInterestRate;

    // Check if payment is sufficient to cover interest
    if (payment <= rateTerm) {
        return Infinity; // Payment too low to ever pay off loan
    }

    const numberOfMonths = Math.ceil(
        Math.log(payment / (payment - rateTerm)) / Math.log(1 + monthlyInterestRate)
    );

    return Math.ceil(numberOfMonths / MONTHS_IN_YEAR);
}

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
function calculateRequiredMonthsToAdjust(principal, annualInterestRate, monthlyPayment) {
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


// Function to calculate loan amortization
function calculateLoanAmortization(initialLoanAmount, annualInterestRate, monthlyPayment, loanTermYears) {
    // Convert annual interest rate to decimal
    const annualInterestDecimal = annualInterestRate / 100;
    const monthlyInterestRate = annualInterestDecimal / MONTHS_IN_YEAR;

    let remainingLoanBalance = initialLoanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    const amortizationSchedule = [];

    // Calculate monthly amortization for each year
    for (let year = 1; year <= loanTermYears; year++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;

        // Calculate monthly payments for the current year
        for (let month = 1; month <= MONTHS_IN_YEAR; month++) {
            if (remainingLoanBalance <= 0) break;

            // Calculate monthly interest
            const monthlyInterest = remainingLoanBalance * monthlyInterestRate;
            // Calculate principal portion of payment
            const monthlyPrincipal = Math.min(
                monthlyPayment - monthlyInterest,
                remainingLoanBalance
            );

            // Update running totals
            yearlyInterest += monthlyInterest;
            yearlyPrincipal += monthlyPrincipal;
            remainingLoanBalance -= monthlyPrincipal;

            // Ensure we don't go below zero
            remainingLoanBalance = Math.max(0, remainingLoanBalance);
        }

        // Update total amounts
        totalInterestPaid += yearlyInterest;
        totalPrincipalPaid += yearlyPrincipal;

        // Add year summary to amortization schedule
        amortizationSchedule.push({
            year,
            remainingBalance: remainingLoanBalance,
            yearlyInterestPaid: yearlyInterest,
            yearlyPrincipalPaid: yearlyPrincipal,
            monthlyInterest: yearlyInterest / MONTHS_IN_YEAR,
            monthlyPrincipal: yearlyPrincipal / MONTHS_IN_YEAR
        });

        // Break if loan is fully paid
        if (remainingLoanBalance <= 0) break;
    }

    return {
        schedule: amortizationSchedule,
        summary: {
            initialLoanAmount,
            remainingBalance: remainingLoanBalance,
            totalInterestPaid,
            totalPrincipalPaid,
            totalPaid: totalInterestPaid + totalPrincipalPaid
        }
    };
}

function calculateLoanAmortizationFixedTermLoanWith___Events(initialLoanAmount, annualInterestRate, loanTermYears, events = []) {
    // Validate and sort events by year and month
    const sortedEvents = [...events].sort((a, b) => {
        return (a.year - b.year) || (a.month - b.month);
    });

    const annualInterestDecimal = annualInterestRate / 100;
    const monthlyInterestRate = annualInterestDecimal / MONTHS_IN_YEAR;

    let remainingLoanBalance = initialLoanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let totalInterestCapitalized = 0; // Track interest added to principal during pauses

    const amortizationSchedule = [];

    // Calculate amortization for each year
    for (let year = 1; year <= loanTermYears; year++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;
        let yearlyInterestCapitalized = 0;
        const startingYearBalance = remainingLoanBalance;

        // Calculate required monthly payment for remaining balance and term
        const remainingYears = loanTermYears - year + 1;
        let monthlyPayment = calculateMonthlyPaymentPausesPayoffs(
            remainingLoanBalance,
            annualInterestRate,
            remainingYears
        );

        // Process each month
        for (let month = 1; month <= MONTHS_IN_YEAR; month++) {
            if (remainingLoanBalance <= 0) break;

            // Check for events this month
            const currentEvents = sortedEvents.filter(
                event => event.year === year && event.month === month
            );

            // Calculate monthly interest
            const monthlyInterest = remainingLoanBalance * monthlyInterestRate;

            let monthlyPrincipal = 0;
            let interestCapitalized = 0;

            // Process events
            for (const event of currentEvents) {
                switch (event.type) {
                    case EVENT_TYPES.PAUSE:
                        // During pause, interest is added to principal
                        interestCapitalized = monthlyInterest;
                        remainingLoanBalance += interestCapitalized;
                        yearlyInterestCapitalized += interestCapitalized;
                        continue;

                    case EVENT_TYPES.EXTRA_PAYMENT:
                        // Apply extra payment directly to principal
                        const extraPayment = Math.min(event.amount, remainingLoanBalance);
                        remainingLoanBalance -= extraPayment;
                        yearlyPrincipal += extraPayment;

                        // Recalculate monthly payment for new balance
                        if (remainingLoanBalance > 0) {
                            monthlyPayment = calculateMonthlyPaymentPausesPayoffs(
                                remainingLoanBalance,
                                annualInterestRate,
                                remainingYears - (month / MONTHS_IN_YEAR)
                            );
                        }
                        break;
                }
            }

            // If no pause event, process regular payment
            if (!currentEvents.some(e => e.type === EVENT_TYPES.PAUSE)) {
                monthlyPrincipal = Math.min(monthlyPayment - monthlyInterest, remainingLoanBalance);
                remainingLoanBalance -= monthlyPrincipal;
                yearlyInterest += monthlyInterest;
                yearlyPrincipal += monthlyPrincipal;
            }

            // Prevent rounding errors
            remainingLoanBalance = Math.max(0, remainingLoanBalance);
        }

        // Update totals
        totalInterestPaid += yearlyInterest;
        totalPrincipalPaid += yearlyPrincipal;
        totalInterestCapitalized += yearlyInterestCapitalized;

        // Add year summary to schedule
        amortizationSchedule.push({
            year,
            startingBalance: startingYearBalance,
            remainingBalance: remainingLoanBalance,
            monthlyPayment,
            yearlyPayment: monthlyPayment * MONTHS_IN_YEAR,
            yearlyInterestPaid: yearlyInterest,
            yearlyPrincipalPaid: yearlyPrincipal,
            yearlyInterestCapitalized,
            effectiveInterestPaid: yearlyInterest + yearlyInterestCapitalized
        });

        if (remainingLoanBalance <= 0) break;
    }

    return {
        schedule: amortizationSchedule,
        summary: {
            initialLoanAmount,
            remainingBalance: remainingLoanBalance,
            totalInterestPaid,
            totalPrincipalPaid,
            totalInterestCapitalized,
            totalEffectiveInterest: totalInterestPaid + totalInterestCapitalized,
            totalPaid: totalInterestPaid + totalPrincipalPaid
        }
    };
}

function calculateLoanAmortizationFixedTermLoanWithoutEvents(initialLoanAmount, annualInterestRate, loanTermYears) {
    const annualInterestDecimal = annualInterestRate / 100;
    const monthlyInterestRate = annualInterestDecimal / MONTHS_IN_YEAR;

    let remainingLoanBalance = initialLoanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    const amortizationSchedule = [];

    // Calculate amortization for each year
    for (let year = 1; year <= loanTermYears; year++) {
        // Calculate required monthly payment for remaining balance and term
        const remainingYears = loanTermYears - year + 1;
        const monthlyPayment = calculateMonthlyPayment(
            remainingLoanBalance,
            annualInterestRate,
            remainingYears
        );

        let yearlyInterest = 0;
        let yearlyPrincipal = 0;
        const startingYearBalance = remainingLoanBalance;

        // Calculate monthly payments for the current year
        for (let month = 1; month <= MONTHS_IN_YEAR; month++) {
            if (remainingLoanBalance <= 0) break;

            // Calculate monthly interest
            const monthlyInterest = remainingLoanBalance * monthlyInterestRate;
            // Calculate principal portion of payment
            const monthlyPrincipal = monthlyPayment - monthlyInterest;

            // Update running totals
            yearlyInterest += monthlyInterest;
            yearlyPrincipal += monthlyPrincipal;
            remainingLoanBalance -= monthlyPrincipal;

            // Prevent rounding errors from creating slightly negative balances
            remainingLoanBalance = Math.max(0, remainingLoanBalance);
        }

        // Update total amounts
        totalInterestPaid += yearlyInterest;
        totalPrincipalPaid += yearlyPrincipal;

        // Add year summary to amortization schedule
        amortizationSchedule.push({
            year,
            startingBalance: startingYearBalance,
            remainingBalance: remainingLoanBalance,
            monthlyPayment,
            yearlyPayment: monthlyPayment * MONTHS_IN_YEAR,
            yearlyInterestPaid: yearlyInterest,
            yearlyPrincipalPaid: yearlyPrincipal,
            monthlyInterest: yearlyInterest / MONTHS_IN_YEAR,
            monthlyPrincipal: yearlyPrincipal / MONTHS_IN_YEAR
        });

        // Break if loan is fully paid
        if (remainingLoanBalance <= 0) break;
    }

    return {
        schedule: amortizationSchedule,
        summary: {
            initialLoanAmount,
            remainingBalance: remainingLoanBalance,
            totalInterestPaid,
            totalPrincipalPaid,
            totalPaid: totalInterestPaid + totalPrincipalPaid
        }
    };
}

function calculateLoanAmortizationFixedMonthlyPayments(initialLoanAmount, annualInterestRate, monthlyPayment, events = []) {
    // First calculate how many years it will take
    const estimatedYears = calculateRequiredYears(
        initialLoanAmount,
        annualInterestRate,
        monthlyPayment
    );

    if (estimatedYears === Infinity) {
        throw new Error(`Monthly payment of ${monthlyPayment} is too low. Minimum required: ${(initialLoanAmount * (annualInterestRate / 100) / MONTHS_IN_YEAR).toFixed(2)
            }`);
    }

    // Validate and sort events by year and month
    const sortedEvents = [...events].sort((a, b) => {
        return (a.year - b.year) || (a.month - b.month);
    });

    const annualInterestDecimal = annualInterestRate / 100;
    const monthlyInterestRate = annualInterestDecimal / MONTHS_IN_YEAR;

    let remainingLoanBalance = initialLoanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    let totalInterestCapitalized = 0;
    let actualYears = 0;

    const amortizationSchedule = [];

    // Calculate amortization for each year until loan is paid off
    for (let year = 1; year <= estimatedYears; year++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;
        let yearlyInterestCapitalized = 0;
        const startingYearBalance = remainingLoanBalance;

        // Process each month
        for (let month = 1; month <= MONTHS_IN_YEAR; month++) {
            if (remainingLoanBalance <= 0) break;

            // Check for events this month
            const currentEvents = sortedEvents.filter(
                event => event.year === year && event.month === month
            );

            // Calculate monthly interest
            const monthlyInterest = remainingLoanBalance * monthlyInterestRate;

            let monthlyPrincipalPaid = 0;
            let interestCapitalized = 0;

            // Process events
            for (const event of currentEvents) {
                switch (event.type) {
                    case EVENT_TYPES.PAUSE:
                        // During pause, interest is added to principal
                        interestCapitalized = monthlyInterest;
                        remainingLoanBalance += interestCapitalized;
                        yearlyInterestCapitalized += interestCapitalized;
                        continue;

                    case EVENT_TYPES.EXTRA_PAYMENT:
                        // Apply extra payment directly to principal
                        const extraPayment = Math.min(event.amount, remainingLoanBalance);
                        remainingLoanBalance -= extraPayment;
                        yearlyPrincipal += extraPayment;
                        break;
                }
            }

            // If no pause event, process regular payment
            if (!currentEvents.some(e => e.type === EVENT_TYPES.PAUSE)) {
                monthlyPrincipalPaid = Math.min(monthlyPayment - monthlyInterest, remainingLoanBalance);
                remainingLoanBalance -= monthlyPrincipalPaid;
                yearlyInterest += monthlyInterest;
                yearlyPrincipal += monthlyPrincipalPaid;
            }

            // Prevent rounding errors
            remainingLoanBalance = Math.max(0, remainingLoanBalance);
        }

        // Update totals
        totalInterestPaid += yearlyInterest;
        totalPrincipalPaid += yearlyPrincipal;
        totalInterestCapitalized += yearlyInterestCapitalized;
        actualYears = year;

        // Add year summary to schedule
        amortizationSchedule.push({
            year,
            startingBalance: startingYearBalance,
            remainingBalance: remainingLoanBalance,
            monthlyPayment,
            yearlyPayment: monthlyPayment * MONTHS_IN_YEAR,
            yearlyInterestPaid: yearlyInterest,
            yearlyPrincipalPaid: yearlyPrincipal,
            yearlyInterestCapitalized,
            effectiveInterestPaid: yearlyInterest + yearlyInterestCapitalized
        });

        if (remainingLoanBalance <= 0) break;
    }

    return {
        schedule: amortizationSchedule,
        summary: {
            initialLoanAmount,
            monthlyPayment,
            actualYearsToPayoff: actualYears,
            remainingBalance: remainingLoanBalance,
            totalInterestPaid,
            totalPrincipalPaid,
            totalInterestCapitalized,
            totalEffectiveInterest: totalInterestPaid + totalInterestCapitalized,
            totalPaid: totalInterestPaid + totalPrincipalPaid
        }
    };
}

function calculateLoanAmortizationFixedMonthlyPayment1(initialLoanAmount, annualInterestRate, monthlyPayment, events = []) {
    // Calculate total months needed
    const totalRequiredMonths = calculateRequiredMonthsToAdjust(
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

function Method_01() {
    // Example usage with your original values
    const loanDetails = calculateLoanAmortization(
        400000,  // initial loan amount
        5,       // annual interest rate (%)
        3000,    // monthly payment
        25       // loan term in years
    );
    // Print yearly schedule
    loanDetails.schedule.forEach(year => {
        console.log({
            "Year": year.year,
            "Remaining Balance": year.remainingBalance.toLocaleString('fr'),
            "Yearly Interest": year.yearlyInterestPaid.toLocaleString('fr'),
            "Monthly Interest": year.monthlyInterest.toLocaleString('fr'),
            "Yearly Principal": year.yearlyPrincipalPaid.toLocaleString('fr'),
            "Monthly Principal": year.monthlyPrincipal.toLocaleString('fr')
        });
    });

    // Print final summary
    console.log("\nLoan Summary:");
    console.log({
        "Initial Loan Amount": loanDetails.summary.initialLoanAmount.toLocaleString('fr'),
        "Remaining Balance": loanDetails.summary.remainingBalance.toLocaleString('fr'),
        "Total Interest Paid": loanDetails.summary.totalInterestPaid.toLocaleString('fr'),
        "Total Principal Paid": loanDetails.summary.totalPrincipalPaid.toLocaleString('fr'),
        "Total Amount Paid": loanDetails.summary.totalPaid.toLocaleString('fr')
    });
}

function Method_02() {
    // Example usage with your original loan amount
    const loanDetails = calculateLoanAmortizationFixedTermLoanWithoutEvents(
        400000,  // initial loan amount
        4,       // annual interest rate (%)
        25       // loan term in years
    );

    // Print yearly schedule
    loanDetails.schedule.forEach(year => {
        console.log({
            "Year": year.year,
            "Starting Balance": year.startingBalance.toLocaleString('fr'),
            "Required Monthly Payment": year.monthlyPayment.toLocaleString('fr'),
            "Yearly Payment": year.yearlyPayment.toLocaleString('fr'),
            "Yearly Interest": year.yearlyInterestPaid.toLocaleString('fr'),
            "Yearly Principal": year.yearlyPrincipalPaid.toLocaleString('fr'),
            "Remaining Balance": year.remainingBalance.toLocaleString('fr')
        });
    });

    // Print final summary
    console.log("\nLoan Summary:");
    console.log({
        "Initial Loan Amount": loanDetails.summary.initialLoanAmount.toLocaleString('fr'),
        "Total Interest Paid": loanDetails.summary.totalInterestPaid.toLocaleString('fr'),
        "Total Principal Paid": loanDetails.summary.totalPrincipalPaid.toLocaleString('fr'),
        "Total Amount Paid": loanDetails.summary.totalPaid.toLocaleString('fr')
    });
}

function Method_03() {

    // Example usage with payment events
    const paymentEvents = [
        // Payment pause for 3 months in year 2
        { type: EVENT_TYPES.PAUSE, year: 2, month: 1 },
        { type: EVENT_TYPES.PAUSE, year: 2, month: 2 },
        { type: EVENT_TYPES.PAUSE, year: 2, month: 3 },

        // Large extra payment in year 5
        { type: EVENT_TYPES.EXTRA_PAYMENT, year: 5, month: 6, amount: 50000 }
    ];

    const loanDetails = calculateLoanAmortizationFixedTermLoanWith___Events(
        1_500_000,  // initial loan amount
        5,       // annual interest rate (%)
        25,      // loan term in years
        paymentEvents
    );

    // Print yearly schedule
    loanDetails.schedule.forEach(year => {
        console.table({
            "Year": year.year,
            "Starting Balance": year.startingBalance.toLocaleString('fr'),
            "Monthly Payment": year.monthlyPayment.toLocaleString('fr'),
            "Interest Paid": year.yearlyInterestPaid.toLocaleString('fr'),
            "Interest Capitalized": year.yearlyInterestCapitalized.toLocaleString('fr'),
            "Principal Paid": year.yearlyPrincipalPaid.toLocaleString('fr'),
            "Remaining Balance": year.remainingBalance.toLocaleString('fr')
        });
    });

    // Print final summary
    console.log("\nLoan Summary:");
    console.table({
        "Initial Loan Amount": loanDetails.summary.initialLoanAmount.toLocaleString('fr'),
        "Total Interest Paid": loanDetails.summary.totalInterestPaid.toLocaleString('fr'),
        "Interest Capitalized": loanDetails.summary.totalInterestCapitalized.toLocaleString('fr'),
        "Total Effective Interest": loanDetails.summary.totalEffectiveInterest.toLocaleString('fr'),
        "Total Principal Paid": loanDetails.summary.totalPrincipalPaid.toLocaleString('fr'),
        "Total Amount Paid": loanDetails.summary.totalPaid.toLocaleString('fr'),
        "Remaining Balance": loanDetails.summary.remainingBalance.toLocaleString('fr')
    });
}

function Method_04() {

    // Example usage with fixed monthly payment
    const paymentEvents = [
        // Payment pause for 3 months in year 2
        { type: EVENT_TYPES.PAUSE, year: 2, month: 1 },
        { type: EVENT_TYPES.PAUSE, year: 2, month: 2 },
        { type: EVENT_TYPES.PAUSE, year: 2, month: 3 },

        // Extra payment in year 5
        { type: EVENT_TYPES.EXTRA_PAYMENT, year: 5, month: 6, amount: 50000 }
    ];

    const loanDetails = calculateLoanAmortizationFixedMonthlyPayments(
        400000,      // initial loan amount
        5,           // annual interest rate (%)
        5000,        // fixed monthly payment
        paymentEvents
    );

    // Print yearly schedule
    loanDetails.schedule.forEach(year => {
        console.log({
            "Year": year.year,
            "Starting Balance": year.startingBalance.toLocaleString('fr'),
            "Monthly Payment": year.monthlyPayment.toLocaleString('fr'),
            "Interest Paid": year.yearlyInterestPaid.toLocaleString('fr'),
            "Interest Capitalized": year.yearlyInterestCapitalized.toLocaleString('fr'),
            "Principal Paid": year.yearlyPrincipalPaid.toLocaleString('fr'),
            "Remaining Balance": year.remainingBalance.toLocaleString('fr')
        });
    });

    // Print final summary
    console.log("\nLoan Summary:");
    console.log({
        "Initial Loan Amount": loanDetails.summary.initialLoanAmount.toLocaleString('fr'),
        "Monthly Payment": loanDetails.summary.monthlyPayment.toLocaleString('fr'),
        "Years to Payoff": loanDetails.summary.actualYearsToPayoff,
        "Total Interest Paid": loanDetails.summary.totalInterestPaid.toLocaleString('fr'),
        "Interest Capitalized": loanDetails.summary.totalInterestCapitalized.toLocaleString('fr'),
        "Total Effective Interest": loanDetails.summary.totalEffectiveInterest.toLocaleString('fr'),
        "Total Principal Paid": loanDetails.summary.totalPrincipalPaid.toLocaleString('fr'),
        "Total Amount Paid": loanDetails.summary.totalPaid.toLocaleString('fr')
    });
}

function Method_05() {
    // Example usage
    try {
        const loanDetails = calculateLoanAmortizationFixedMonthlyPayment1(
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
}

Method_05()

/* 
now generate a ui that covers all the cases:
input initial loan amount and annual interest rate
input Fixed monthly payment or fixed term loan with correspondance input
input events
etc..
output list yearly summary
output global summary
output suggetions(if there is)
etc...
*/