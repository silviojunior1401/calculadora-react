import React, { useState } from "react";
import './Calculator.css'

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
	displayValue: '0',
	clearDisplay: false,
	operation: null,
	values: [0, 0],
	current: 0
}


const Calculator = (props) => {
	const [state, setState] = useState(initialState); 

	function setOperation(operation) {
		if(state.current === 0) {
			setState(state => ({ ...state, operation, current: 1, clearDisplay: true }))
		} else {
			const equals = operation === '='
			const currentOperation = state.operation
			const values = [...state.values]

			switch (currentOperation) {
				case '+':
					values[0] = values[0] + values[1]
					break
				case '-':
					values[0] = values[0] - values[1]
					break
				case '*':
					values[0] = values[0] * values[1]
					break
				case '/':
					values[0] = values[0] / values[1]
					break
				default:
					values[0] = state.values[0]
			}
			
			if(isNaN(values[0]) || !isFinite(values[0])) {
				return
			}

			values[1] = 0

			setState(state => ({
				...state, 
				displayValue: values[0],
				operation: equals ? null : operation,
				current: equals ? 0 : 1,
				clearDisplay: !equals,
				values
			}))
		}
	}	

	function addDigit(n) {
		if (n === '.' && state.displayValue.includes('.')){
			return
		}

		const clearDisplay = state.displayValue === '0' || state.clearDisplay
		const currentValue = clearDisplay ? '' : state.displayValue
		const displayValue = currentValue + n
		setState(state => ({ ...state, displayValue, clearDisplay: false }))

		if(n !== '.') {
			const i = state.current
			const newValue = parseFloat(displayValue)
			const values = [...state.values]
			values[i] = newValue
			setState(state => ({ ...state, values }))
		}
	}

	function clearMemory() {
		setState({ ...initialState })
	}
	
	const adDigit = n => addDigit(n)
	const stOperation = op => setOperation(op)

    return (
		<div className="calculator">
			<Display value={state.displayValue} />
			<Button label="AC" click={() => clearMemory()} triple/>
			<Button label="/" click={stOperation} operation/>
			<Button label="7" click={adDigit}/>
			<Button label="8" click={adDigit}/>
			<Button label="9" click={adDigit}/>
			<Button label="*" click={stOperation} operation/>
			<Button label="4" click={adDigit}/>
			<Button label="5" click={adDigit}/>
			<Button label="6" click={adDigit}/>
			<Button label="-" click={stOperation} operation/>
			<Button label="1" click={adDigit}/>
			<Button label="2" click={adDigit}/>
			<Button label="3" click={adDigit}/>
			<Button label="+" click={stOperation} operation/>
			<Button label="0" click={adDigit} double/>
			<Button label="." click={adDigit}/>
			<Button label="=" click={stOperation} operation/>
		</div>
	);
}

export default Calculator;