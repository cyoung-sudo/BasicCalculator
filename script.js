class Calculator {
  constructor(previousNumberElement, currentNumberElement) {
    this.previousNumberElement = previousNumberElement
    this.currentNumberElement = currentNumberElement
    this.clear()
  }

  clear() {
    this.currentNumber = ""
    this.previousNumber = ""
    this.operation = undefined
  }

  delete() {
    this.currentNumber = this.currentNumber.toString().slice(0, -1)
  }

  appendNumber(num) {
    if (num === "." && this.currentNumber.includes(".")) return
    this.currentNumber = this.currentNumber.toString() + num.toString()
  }

  chooseOperation(opt) {
    if (this.currentNumber === "") return
    if (this.previousNumber !== "") {
      this.compute()
    }
    this.operation = opt
    this.previousNumber = this.currentNumber
    this.currentNumber = ""
  }

  compute() {
    let result
    const prev = parseFloat(this.previousNumber)
    const curr = parseFloat(this.currentNumber)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.operation) {
      case "+":
        result = prev + curr
        break
      case "-":
        result = prev - curr
        break
      case "*":
        result = prev * curr
        break
      case "÷":
        result = prev / curr
        break
      default:
        return
    }
    this.currentNumber = result
    this.operation = undefined
    this.previousNumber = ""
  }

  getDisplayNumber(num) {
    const strNum = num.toString()
    const intDigits = parseFloat(strNum.split(".")[0])
    const decDigits = strNum.split(".")[1]
    let intDisplay
    if (isNaN(intDigits)) {
      intDisplay = ""
    } else {
      intDisplay = intDigits.toLocaleString("en", {
        maximumFractionDigits: 0 })
    }
    if (decDigits != null) {
      return `${intDisplay}.${decDigits}`
    } else {
      return intDisplay
    }
  }

  updateDisplay() {
    this.currentNumberElement.innerText = this.getDisplayNumber(this.currentNumber)
    if (this.operation != null) {
      this.previousNumberElement.innerText = 
        `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`
    } else {
      this.previousNumberElement.innerText = ""
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalButton = document.querySelector("[data-equal]")
const deleteButton = document.querySelector("[data-delete]")
const clearButton = document.querySelector("[data-clear]")
const previousNumberElement = document.querySelector("[data-previous]")
const currentNumberElement = document.querySelector("[data-current]")

const calculator = new Calculator(previousNumberElement, currentNumberElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener("click", button => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener("click", button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
  calculator.delete()
  calculator.updateDisplay()
})
