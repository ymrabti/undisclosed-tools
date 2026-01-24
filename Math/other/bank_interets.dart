/* import 'dart:math';

import '../lib.dart';

void main(List<String> args) {
  logg(args);
  runApp(
    MaterialApp(
      home: LoanCalculator(),
    ),
  );
}

class LoanCalculator extends StatefulWidget {
  const LoanCalculator({super.key});

  @override
  State<LoanCalculator> createState() => _LoanCalculatorState();
}

class _LoanCalculatorState extends State<LoanCalculator> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Input controllers
  final TextEditingController _loanAmountController = TextEditingController();
  final TextEditingController _interestRateController = TextEditingController();
  final TextEditingController _termController = TextEditingController();
  final TextEditingController _monthlyPaymentController = TextEditingController();
  final TextEditingController _extraPaymentController = TextEditingController();

  bool _isFixedTerm = true;
  bool _hasExtraPayment = false;
  bool _isExtraPaymentRecurring = false;
  String _termType = 'Years';

  // Results
  List<YearSummary> _yearSummaries = <YearSummary>[];
  double _totalPayments = 0;
  double _totalInterest = 0;
  DateTime? _payoffDate;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Loan Payment Calculator'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              // Loan Amount Input
              TextFormField(
                controller: _loanAmountController,
                decoration: InputDecoration(
                  labelText: 'Loan Amount (\$)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
                validator: (String? value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter loan amount';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),

              // Interest Rate Input
              TextFormField(
                controller: _interestRateController,
                decoration: InputDecoration(
                  labelText: 'Annual Interest Rate (%)',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
                validator: (String? value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter interest rate';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),

              // Payment Type Selection
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text('Payment Type', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                      RadioListTile<bool>(
                        title: Text('Fixed Term'),
                        value: true,
                        groupValue: _isFixedTerm,
                        onChanged: (bool? value) {
                          setState(() {
                            _isFixedTerm = value ?? true;
                          });
                        },
                      ),
                      RadioListTile<bool>(
                        title: Text('Fixed Monthly Payment'),
                        value: false,
                        groupValue: _isFixedTerm,
                        onChanged: (bool? value) {
                          setState(() {
                            _isFixedTerm = value ?? true;
                          });
                        },
                      ),

                      // Conditional Input based on selection
                      if (_isFixedTerm) ...<Widget>[
                        Row(
                          children: <Widget>[
                            Expanded(
                              child: TextFormField(
                                controller: _termController,
                                decoration: InputDecoration(
                                  labelText: 'Term Length',
                                  border: OutlineInputBorder(),
                                ),
                                keyboardType: TextInputType.number,
                                validator: (String? value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Please enter term length';
                                  }
                                  return null;
                                },
                              ),
                            ),
                            SizedBox(width: 16),
                            DropdownButton<String>(
                              value: _termType,
                              items: <String>['Years', 'Months'].map((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                              onChanged: (String? newValue) {
                                setState(() {
                                  _termType = newValue!;
                                });
                              },
                            ),
                          ],
                        ),
                      ] else ...<Widget>[
                        TextFormField(
                          controller: _monthlyPaymentController,
                          decoration: InputDecoration(
                            labelText: 'Monthly Payment (\$)',
                            border: OutlineInputBorder(),
                          ),
                          keyboardType: TextInputType.number,
                          validator: (String? value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter monthly payment';
                            }
                            return null;
                          },
                        ),
                      ],
                    ],
                  ),
                ),
              ),
              SizedBox(height: 16),

              // Extra Payments Section
              Card(
                child: Padding(
                  padding: EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Text('Extra Payments', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                          Switch(
                            value: _hasExtraPayment,
                            onChanged: (bool value) {
                              setState(() {
                                _hasExtraPayment = value;
                              });
                            },
                          ),
                        ],
                      ),
                      if (_hasExtraPayment) ...<Widget>[
                        TextFormField(
                          controller: _extraPaymentController,
                          decoration: InputDecoration(
                            labelText: 'Extra Payment Amount (\$)',
                            border: OutlineInputBorder(),
                          ),
                          keyboardType: TextInputType.number,
                        ),
                        CheckboxListTile(
                          title: Text('Recurring Monthly'),
                          value: _isExtraPaymentRecurring,
                          onChanged: (bool? value) {
                            setState(() {
                              _isExtraPaymentRecurring = value ?? false;
                            });
                          },
                        ),
                      ],
                    ],
                  ),
                ),
              ),
              SizedBox(height: 16),

              // Calculate Button
              Center(
                child: ElevatedButton(
                  onPressed: _calculateLoan,
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                  ),
                  child: Text('Calculate'),
                ),
              ),
              SizedBox(height: 24),

              // Results Section
              if (_yearSummaries.isNotEmpty) ...<Widget>[
                Text('Loan Summary', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                SizedBox(height: 16),

                // Overall Summary Card
                Card(
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text('Overall Summary', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                        SizedBox(height: 8),
                        Text('Total Payments: \$${_totalPayments.toStringAsFixed(2)}'),
                        Text('Total Interest: \$${_totalInterest.toStringAsFixed(2)}'),
                        Text('Payoff Date: ${_payoffDate?.toString().split(' ')[0]}'),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 16),

                // Yearly Summaries
                Text('Yearly Breakdown', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                SizedBox(height: 8),
                ListView.builder(
                  shrinkWrap: true,
                  physics: NeverScrollableScrollPhysics(),
                  itemCount: _yearSummaries.length,
                  itemBuilder: (BuildContext context, int index) {
                    final YearSummary summary = _yearSummaries[index];
                    return Card(
                      child: ListTile(
                        title: Text('Year ${index + 1}'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text('Principal Paid: \$${summary.principalPaid.toStringAsFixed(2)}'),
                            Text('Interest Paid: \$${summary.interestPaid.toStringAsFixed(2)}'),
                            Text('Remaining Balance: \$${summary.remainingBalance.toStringAsFixed(2)}'),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  void _calculateLoan() {
    if (!_formKey.currentState!.validate()) return;

    // Get input values
    final double loanAmount = double.parse(_loanAmountController.text);
    final double annualRate = double.parse(_interestRateController.text) / 100;
    final double monthlyRate = annualRate / 12;

    double monthlyPayment;
    int totalMonths;

    if (_isFixedTerm) {
      // Calculate monthly payment for fixed term
      totalMonths = _termType == 'Years' ? (int.parse(_termController.text) * 12) : int.parse(_termController.text);

      monthlyPayment = (loanAmount * monthlyRate * pow(1 + monthlyRate, totalMonths)) / (pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      // Use fixed monthly payment
      monthlyPayment = double.parse(_monthlyPaymentController.text);
      // Calculate months until payoff (approximate)
      totalMonths = ((log(monthlyPayment) - log(monthlyPayment - loanAmount * monthlyRate)) / log(1 + monthlyRate)).ceil();
    }

    // Add extra payments if applicable
    double extraPayment = _hasExtraPayment ? double.parse(_extraPaymentController.text) : 0;

    // Calculate yearly summaries
    _calculateYearlySummaries(
      loanAmount,
      monthlyRate,
      monthlyPayment,
      extraPayment,
      _isExtraPaymentRecurring,
    );

    setState(() {});
  }

  void _calculateYearlySummaries(
    double loanAmount,
    double monthlyRate,
    double monthlyPayment,
    double extraPayment,
    bool isExtraPaymentRecurring,
  ) {
    _yearSummaries = <YearSummary>[];
    double remainingBalance = loanAmount;
    double yearlyPrincipal = 0;
    double yearlyInterest = 0;
    _totalPayments = 0;
    _totalInterest = 0;
    int monthsCount = 0;

    while (remainingBalance > 0) {
      double monthlyInterest = remainingBalance * monthlyRate;
      double monthlyPrincipal = monthlyPayment - monthlyInterest;

      // Apply extra payment
      if (_hasExtraPayment) {
        if (_isExtraPaymentRecurring || monthsCount == 0) {
          monthlyPrincipal += extraPayment;
        }
      }

      // Adjust final payment if needed
      if (monthlyPrincipal > remainingBalance) {
        monthlyPrincipal = remainingBalance;
      }

      remainingBalance -= monthlyPrincipal;
      yearlyPrincipal += monthlyPrincipal;
      yearlyInterest += monthlyInterest;
      _totalPayments += monthlyPayment + (isExtraPaymentRecurring ? extraPayment : 0);
      monthsCount++;

      // Create yearly summary
      if (monthsCount % 12 == 0 || remainingBalance <= 0) {
        _yearSummaries.add(YearSummary(
          principalPaid: yearlyPrincipal,
          interestPaid: yearlyInterest,
          remainingBalance: remainingBalance,
        ));
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }

    _totalInterest = _totalPayments - loanAmount;
    _payoffDate = DateTime.now().add(Duration(days: (monthsCount * 30.44).round()));
  }
}

class YearSummary {
  final double principalPaid;
  final double interestPaid;
  final double remainingBalance;

  YearSummary({
    required this.principalPaid,
    required this.interestPaid,
    required this.remainingBalance,
  });
}
 */
