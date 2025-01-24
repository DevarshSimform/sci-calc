# JavaScript Calculator

This is a feature-rich calculator built using JavaScript, HTML, and CSS. The calculator performs basic arithmetic operations, square calculations, reciprocal operations, and includes memory functions for storing and recalling values. 

---

## Features

### Basic Operations
- Addition (`+`)
- Subtraction (`-`)
- Multiplication (`*`)
- Division (`/`)
- Modulus (`%`)

### Advanced Operations
- Square (`^2`)
- Reciprocal (`1/x`)
- Decimal support (`.`)

### Memory Functions
- **M+**: Add the current value to memory.
- **M-**: Subtract the current value from memory.
- **MRC**: Recall the value stored in memory.
- **MC**: Clear the memory.

### Utility Functions
- Erase one character.
- Clear all inputs.

### Keyboard Support
- Number input using the keyboard.
- Enter to calculate.
- Arithmetic operator input.
- Decimal point entry.

---

## How to Use

1. Clone or download this repository.
2. Open the `index.html` file in any modern browser.
3. Use the on-screen buttons or your keyboard to perform calculations.

---

## Notes

- You cannot enter an operation without entering a digit first.
- The square function can handle cases like `(3+5)^2` and `25 + ((16)^2) + 215`.
- The `1/x` function does not work for operators; it only works for digits.
- The decimal point (`.`) can only be added once in a number. If there is an operator, a new decimal point can be added for the next number.
- Result edge cases have been thoroughly handled to ensure accurate outputs.

---

