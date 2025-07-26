document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '0';
    let operator = null;
    let previousInput = '';
    let shouldResetDisplay = false;

    // Function to update the display
    function updateDisplay() {
        display.textContent = currentInput;
    }

    // Event listener for all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (button.classList.contains('number')) {
                if (currentInput === '0' || shouldResetDisplay) {
                    currentInput = buttonText;
                    shouldResetDisplay = false;
                } else {
                    currentInput += buttonText;
                }
                updateDisplay();
            } else if (button.classList.contains('operator')) {
                if (previousInput && operator && !shouldResetDisplay) {
                    // Perform calculation if there's a previous input, operator, and not a fresh start
                    currentInput = String(calculate(parseFloat(previousInput), parseFloat(currentInput), operator));
                    updateDisplay();
                }
                operator = button.dataset.operator;
                previousInput = currentInput;
                shouldResetDisplay = true; // Prepare for new number input
            } else if (button.classList.contains('decimal')) {
                if (shouldResetDisplay) {
                    currentInput = '0.';
                    shouldResetDisplay = false;
                } else if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
            } else if (button.classList.contains('equals')) {
                if (operator && previousInput !== '') {
                    currentInput = String(calculate(parseFloat(previousInput), parseFloat(currentInput), operator));
                    updateDisplay();
                    operator = null; // Reset operator
                    previousInput = ''; // Clear previous input
                    shouldResetDisplay = true; // Ready for a new calculation
                }
            } else if (button.classList.contains('clear')) {
                currentInput = '0';
                operator = null;
                previousInput = '';
                shouldResetDisplay = false;
                updateDisplay();
            } else if (button.classList.contains('backspace')) {
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                updateDisplay();
            }
        });
    });

    // Function to perform calculations
    function calculate(num1, num2, op) {
        switch (op) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    return 'Error'; // Handle division by zero
                }
                return num1 / num2;
            default:
                return num2;
        }
    }

    updateDisplay(); // Initial display update
});