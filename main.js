
        document.addEventListener('DOMContentLoaded', function() {
            // Element references
            const displayInput = document.querySelector('.display-input');
            const displayHistory = document.querySelector('.display-history');
            const memoryStatus = document.getElementById('memoryStatus');
            const modeIndicator = document.querySelector('.mode-indicator');
            
            // Calculator state
            let currentInput = '0';
            let previousInput = '';
            let operation = null;
            let shouldResetScreen = false;
            let memory = 0;
            let isRadians = false;
            
            // Update display
            function updateDisplay() {
                displayInput.textContent = currentInput;
                displayHistory.textContent = previousInput;
                
                // Update memory status
                memoryStatus.textContent = memory !== 0 ? `Memory: ${memory}` : '';
            }
            
            // Reset calculator
            function resetCalculator() {
                currentInput = '0';
                previousInput = '';
                operation = null;
                shouldResetScreen = false;
                updateDisplay();
            }
            
            // Append number to current input
            function appendNumber(number) {
                if (currentInput === '0' || shouldResetScreen) {
                    currentInput = number;
                    shouldResetScreen = false;
                } else {
                    currentInput += number;
                }
                updateDisplay();
            }
            
            // Choose operation
            function chooseOperation(op) {
                if (currentInput === '0') return;
                
                if (previousInput !== '') {
                    compute();
                }
                
                operation = op;
                previousInput = currentInput;
                shouldResetScreen = true;
                updateDisplay();
            }
            
            // Compute calculation
            function compute() {
                let computation;
                const prev = parseFloat(previousInput);
                const current = parseFloat(currentInput);
                
                if (isNaN(prev) || isNaN(current)) return;
                
                switch (operation) {
                    case 'add':
                        computation = prev + current;
                        break;
                    case 'subtract':
                        computation = prev - current;
                        break;
                    case 'multiply':
                        computation = prev * current;
                        break;
                    case 'divide':
                        computation = prev / current;
                        break;
                    case 'power':
                        computation = Math.pow(prev, current);
                        break;
                    case 'mod':
                        computation = prev % current;
                        break;
                    default:
                        return;
                }
                
                currentInput = computation.toString();
                operation = null;
                previousInput = '';
                updateDisplay();
            }
            
            // Add decimal point
            function addDecimal() {
                if (shouldResetScreen) {
                    currentInput = '0.';
                    shouldResetScreen = false;
                } else if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
            }
            
            // Calculate percentage
            function calculatePercentage() {
                const current = parseFloat(currentInput);
                currentInput = (current / 100).toString();
                updateDisplay();
            }
            
            // Toggle sign
            function toggleSign() {
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
            }
            
            // Scientific functions
            function scientificFunction(func) {
                const current = parseFloat(currentInput);
                let computation;
                
                switch (func) {
                    case 'square':
                        computation = Math.pow(current, 2);
                        break;
                    case 'sqrt':
                        if (current < 0) {
                            computation = 'Error';
                        } else {
                            computation = Math.sqrt(current);
                        }
                        break;
                    case 'cbrt':
                        computation = Math.cbrt(current);
                        break;
                    case 'reciprocal':
                        computation = 1 / current;
                        break;
                    case 'abs':
                        computation = Math.abs(current);
                        break;
                    case 'exp':
                        computation = Math.exp(current);
                        break;
                    case 'factorial':
                        if (current < 0 || !Number.isInteger(current)) {
                            computation = 'Error';
                        } else {
                            computation = factorial(current);
                        }
                        break;
                    case 'log':
                        computation = Math.log10(current);
                        break;
                    case 'ln':
                        computation = Math.log(current);
                        break;
                    case 'sin':
                        computation = isRadians ? Math.sin(current) : Math.sin(current * Math.PI / 180);
                        break;
                    case 'cos':
                        computation = isRadians ? Math.cos(current) : Math.cos(current * Math.PI / 180);
                        break;
                    case 'tan':
                        computation = isRadians ? Math.tan(current) : Math.tan(current * Math.PI / 180);
                        break;
                    case 'tenPower':
                        computation = Math.pow(10, current);
                        break;
                    default:
                        return;
                }
                
                if (computation !== 'Error') {
                    currentInput = parseFloat(computation.toFixed(10)).toString();
                } else {
                    currentInput = computation;
                }
                updateDisplay();
            }
            
            // Helper function for factorial calculation
            function factorial(n) {
                if (n === 0 || n === 1) return 1;
                let result = 1;
                for (let i = 2; i <= n; i++) {
                    result *= i;
                }
                return result;
            }
            
            // Memory functions
            function memoryFunction(func) {
                const current = parseFloat(currentInput);
                
                switch (func) {
                    case 'mc':
                        memory = 0;
                        break;
                    case 'mr':
                        currentInput = memory.toString();
                        break;
                    case 'm+':
                        memory += current;
                        break;
                    case 'm-':
                        memory -= current;
                        break;
                    case 'ms':
                        memory = current;
                        break;
                    case 'm~':
                        memory = -memory;
                        break;
                }
                
                updateDisplay();
            }
            
            // Toggle degree/radian mode
            function toggleAngleMode() {
                isRadians = !isRadians;
                modeIndicator.textContent = isRadians ? 'RAD' : 'DEG';
            }
            
            // Event listeners for buttons
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('click', () => {
                    if (button.hasAttribute('data-value')) {
                        const value = button.getAttribute('data-value');
                        if (value === '.') {
                            addDecimal();
                        } else if (value === '(' || value === ')') {
                            // For future implementation of parentheses
                            appendNumber(value);
                        } else {
                            appendNumber(value);
                        }
                    } else if (button.hasAttribute('data-action')) {
                        const action = button.getAttribute('data-action');
                        
                        if (action === 'calculate') {
                            compute();
                        } else if (action === 'negate') {
                            toggleSign();
                        } else if ([
                            'sin', 'cos', 'tan', 'sqrt', 'square', 'cbrt', 
                            'reciprocal', 'abs', 'exp', 'factorial', 'log', 
                            'ln', 'tenPower'
                        ].includes(action)) {
                            scientificFunction(action);
                        } else if ([
                            'mc', 'mr', 'm+', 'm-', 'ms', 'm~'
                        ].includes(action)) {
                            memoryFunction(action);
                        } else if (action === 'mod') {
                            chooseOperation('mod');
                        } else if (action === 'power') {
                            chooseOperation('power');
                        } else {
                            chooseOperation(action);
                        }
                    }
                });
            });
            
            // Toggle angle mode on mode indicator click
            modeIndicator.addEventListener('click', toggleAngleMode);
            
            // Initialize display
            updateDisplay();
        });
    