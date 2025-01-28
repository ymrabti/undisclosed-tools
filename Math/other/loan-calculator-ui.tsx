import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Plus, Minus, AlertCircle } from 'lucide-react';

const MONTHS_IN_YEAR = 12;

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const formatPeriod = (totalMonths) => {
  const years = Math.floor(totalMonths / MONTHS_IN_YEAR);
  const months = totalMonths % MONTHS_IN_YEAR;
  const yearText = years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : '';
  const monthText = months > 0 ? `${months} month${months !== 1 ? 's' : ''}` : '';
  
  if (years && months) return `${yearText} and ${monthText}`;
  return yearText || monthText || '0 months';
};

const LoanCalculator = () => {
  // Base loan state
  const [loanAmount, setLoanAmount] = useState('400000');
  const [interestRate, setInterestRate] = useState('5');
  const [calculationType, setCalculationType] = useState('fixed-payment');
  
  // Payment/Term state
  const [monthlyPayment, setMonthlyPayment] = useState('3000');
  const [years, setYears] = useState('25');
  const [months, setMonths] = useState('0');
  
  // Events state
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  
  // Event form state
  const [eventType, setEventType] = useState('pause');
  const [eventYear, setEventYear] = useState('1');
  const [eventMonth, setEventMonth] = useState('1');
  const [eventAmount, setEventAmount] = useState('0');

  const addEvent = useCallback(() => {
    const newEvent = {
      type: eventType,
      year: parseInt(eventYear),
      month: parseInt(eventMonth),
      ...(eventType === 'extra_payment' && { amount: parseFloat(eventAmount) })
    };
    setEvents(prev => [...prev, newEvent]);
  }, [eventType, eventYear, eventMonth, eventAmount]);

  const removeEvent = useCallback((index) => {
    setEvents(prev => prev.filter((_, i) => i !== index));
  }, []);

  const calculateLoan = useCallback(() => {
    setError('');
    setResults(null);
    
    try {
      const amount = parseFloat(loanAmount);
      const rate = parseFloat(interestRate);
      
      if (isNaN(amount) || amount <= 0) throw new Error('Invalid loan amount');
      if (isNaN(rate) || rate <= 0) throw new Error('Invalid interest rate');
      
      // Mock calculation results for demonstration
      // In real implementation, this would use the actual calculation function
      const mockResults = {
        schedule: [
          {
            year: 1,
            startingBalance: amount,
            yearlyInterest: amount * (rate/100),
            yearlyPrincipal: parseFloat(monthlyPayment) * 12,
            remainingBalance: amount - (parseFloat(monthlyPayment) * 12)
          }
        ],
        summary: {
          initialLoanAmount: amount,
          monthlyPayment: parseFloat(monthlyPayment),
          loanTerm: calculationType === 'fixed-payment' ? 
            '20 years and 3 months' : `${years} years and ${months} months`,
          totalInterestPaid: amount * (rate/100) * parseInt(years),
          totalPrincipalPaid: amount,
          totalPaid: amount + (amount * (rate/100) * parseInt(years))
        }
      };
      
      setResults(mockResults);
    } catch (err) {
      setError(err.message);
    }
  }, [loanAmount, interestRate, calculationType, monthlyPayment, years, months]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Loan Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Base Loan Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Loan Amount
                </label>
                <Input
                  type="number"
                  value={loanAmount}
                  onChange={e => setLoanAmount(e.target.value)}
                  placeholder="Enter loan amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Annual Interest Rate (%)
                </label>
                <Input
                  type="number"
                  value={interestRate}
                  onChange={e => setInterestRate(e.target.value)}
                  placeholder="Enter interest rate"
                  step="0.1"
                />
              </div>
            </div>

            {/* Calculation Type Tabs */}
            <Tabs value={calculationType} onValueChange={setCalculationType}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="fixed-payment">Fixed Monthly Payment</TabsTrigger>
                <TabsTrigger value="fixed-term">Fixed Term</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fixed-payment" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly Payment
                  </label>
                  <Input
                    type="number"
                    value={monthlyPayment}
                    onChange={e => setMonthlyPayment(e.target.value)}
                    placeholder="Enter monthly payment"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="fixed-term" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Years</label>
                    <Input
                      type="number"
                      value={years}
                      onChange={e => setYears(e.target.value)}
                      placeholder="Enter years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Months</label>
                    <Input
                      type="number"
                      value={months}
                      onChange={e => setMonths(e.target.value)}
                      placeholder="Enter months"
                      max="11"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Events Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Events</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                  >
                    <option value="pause">Payment Pause</option>
                    <option value="extra_payment">Extra Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <Input
                    type="number"
                    value={eventYear}
                    onChange={e => setEventYear(e.target.value)}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Month</label>
                  <Input
                    type="number"
                    value={eventMonth}
                    onChange={e => setEventMonth(e.target.value)}
                    min="1"
                    max="12"
                  />
                </div>
                {eventType === 'extra_payment' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <Input
                      type="number"
                      value={eventAmount}
                      onChange={e => setEventAmount(e.target.value)}
                    />
                  </div>
                )}
              </div>
              
              <Button onClick={addEvent} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>

              {/* Events List */}
              {events.length > 0 && (
                <div className="space-y-2">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>
                        {event.type === 'pause' ? 'Payment Pause' : 'Extra Payment'} - 
                        Year {event.year}, Month {event.month}
                        {event.amount && ` - ${formatCurrency(event.amount)}`}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEvent(index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={calculateLoan} className="w-full">
              Calculate Loan
            </Button>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Results Display */}
            {results && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Yearly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.schedule.map((year, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2 text-sm">
                          <div>Year {year.year}</div>
                          <div>Starting Balance: {formatCurrency(year.startingBalance)}</div>
                          <div>Interest Paid: {formatCurrency(year.yearlyInterest)}</div>
                          <div>Principal Paid: {formatCurrency(year.yearlyPrincipal)}</div>
                          <div>Remaining: {formatCurrency(year.remainingBalance)}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Loan Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>Initial Loan Amount:</div>
                      <div>{formatCurrency(results.summary.initialLoanAmount)}</div>
                      <div>Monthly Payment:</div>
                      <div>{formatCurrency(results.summary.monthlyPayment)}</div>
                      <div>Loan Term:</div>
                      <div>{results.summary.loanTerm}</div>
                      <div>Total Interest:</div>
                      <div>{formatCurrency(results.summary.totalInterestPaid)}</div>
                      <div>Total Amount Paid:</div>
                      <div>{formatCurrency(results.summary.totalPaid)}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanCalculator;
