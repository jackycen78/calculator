smallDisplay =  document.querySelector('#smallDisplay')
bigDisplay =  document.querySelector('#bigDisplay')

clearButton = document.querySelector('#clear')
deleteButton = document.querySelector('button[data-key="8"]')
button0 = document.querySelector('button[data-key="48"]')
button1 = document.querySelector('button[data-key="49"]')
button2 = document.querySelector('button[data-key="50"]')
button3 = document.querySelector('button[data-key="51"]')
button4 = document.querySelector('button[data-key="52"]')
button5 = document.querySelector('button[data-key="53"]')
button6 = document.querySelector('button[data-key="54"]')
button7 = document.querySelector('button[data-key="55"]')
button8 = document.querySelector('button[data-key="56"]')
button9 = document.querySelector('button[data-key="57"]')
addButton = document.querySelector('button[data-key="107"]')
subtractButton = document.querySelector('button[data-key="109"]')
multiplyButton = document.querySelector('button[data-key="106"]')
divideButton = document.querySelector('button[data-key="111"]')
equalButton = document.querySelector('button[data-key="13"]')
decimalButton = document.querySelector('button[data-key="110"]')

const numbers = [button0, button1, button2, button3, button4, 
                 button5, button6, button7, button8, button9]
let newNumber = true;


numbers.forEach(number => number.addEventListener('click', updateValue))
deleteButton.addEventListener('click', updateValue)
addButton.addEventListener('click', addOperation)
subtractButton.addEventListener('click', addOperation)
multiplyButton.addEventListener('click', addOperation)
divideButton.addEventListener('click', addOperation)
clearButton.addEventListener('click', clear)
equalButton.addEventListener('click', operate)

document.addEventListener('keydown', keyPressed)
function keyPressed(e){
    if (isFinite(e.key)){
        updateValue(e)
    }
    else if (['+', '-', '*', '/'].includes(e.key)){
        console.log(e)
        addOperation(e)
    }
    else if (e.key == 'Enter'){
        operate()
    }
    else if (e.key == 'Backspace'){
        deleteDigit()
    }
    else if (e.key == '.'){
        addDecimal()
    }
}

function addOperation(e){
    let operation = e.target.innerHTML
    if (e.type == 'keydown'){
        operation = e.key
        if (operation == '/'){
            operation = '÷'
        }
    }
    else if (e.type == 'click'){
        operation = e.target.innerHTML
    } 

    let operators = ['+', '-', '*', '÷']
    if (operators.includes(smallDisplay.innerHTML.slice(-1))){
        if (!bigDisplay.innerHTML){
            smallDisplay.innerHTML = smallDisplay.innerHTML.slice(0, -1) + operation
        }
        else{
            operate()
            smallDisplay.innerHTML = bigDisplay.innerHTML + ' ' + operation
            bigDisplay.innerHTML = ''
        }
    }
    else{
        smallDisplay.innerHTML = bigDisplay.innerHTML + ' ' + operation
        bigDisplay.innerHTML = ''
    }
}

function updateValue (e){
    let newDigit = ''
    if (e.type == 'keydown'){
        if (isFinite(e.key)){
            newDigit = e.key
        }
    }
    else if (e.type == 'click'){
        newDigit = e.target.innerHTML
    }

    console.log(smallDisplay.innerHTML)
    if (smallDisplay.innerHTML.slice(-2) == '= ' && newNumber == true){
        bigDisplay.innerHTML = newDigit
        newNumber = false
    }
    else if (e.key == 'Backspace' || e.target.innerHTML == 'DELETE'){
        deleteDigit();
    }
    else if (bigDisplay.innerHTML == '0'){
        bigDisplay.innerHTML = newDigit
    }
    else if (bigDisplay.innerHTML.length < 10){
        bigDisplay.innerHTML = bigDisplay.innerHTML + newDigit
    }        
}

function deleteDigit(){
    bigDisplay.innerHTML = bigDisplay.innerHTML.slice(0, -1)
    if (!bigDisplay.innerHTML){
        bigDisplay.innerHTML = 0
    }
}

function addDecimal(){
    if (bigDisplay.innerHTML.length < 9 && !bigDisplay.innerHTML.includes('.')){
        bigDisplay.innerHTML = bigDisplay.innerHTML + '.'
    }
}

function clear(){
    smallDisplay.innerHTML = ''
    bigDisplay.innerHTML = 0
}

function operate(){
    let operator = smallDisplay.innerHTML.slice(-1)
    if (!bigDisplay.innerHTML){

    }

    else if (operator == '+'){
        let add = bigDisplay.innerHTML
        bigDisplay.innerHTML = +parseFloat((+bigDisplay.innerHTML + +smallDisplay.innerHTML.slice(0, -2)).toFixed(3))
        smallDisplay.innerHTML = smallDisplay.innerHTML + ' ' + add + ' = ' 
        newNumber = true
    }
    else if (operator == '-'){
        let subtract = bigDisplay.innerHTML
        bigDisplay.innerHTML = +parseFloat((+smallDisplay.innerHTML.slice(0, -2) - +bigDisplay.innerHTML).toFixed(3))
        smallDisplay.innerHTML = smallDisplay.innerHTML + ' ' + subtract + ' = ' 
        newNumber = true
    }
    else if (operator == '*'){
        let multiply = bigDisplay.innerHTML
        bigDisplay.innerHTML = +parseFloat((+bigDisplay.innerHTML * +smallDisplay.innerHTML.slice(0, -2)).toFixed(3))
        smallDisplay.innerHTML = smallDisplay.innerHTML + ' ' + multiply + ' = ' 
        newNumber = true
    }
    else if (operator == '÷'){
        let divide = bigDisplay.innerHTML
        if (divide == '0'){
            alert('Cannot divide by 0!')
        }
        else{
            bigDisplay.innerHTML = +parseFloat((+smallDisplay.innerHTML.slice(0, -2) / +bigDisplay.innerHTML).toFixed(3))
            smallDisplay.innerHTML = smallDisplay.innerHTML + ' ' + divide + ' = ' 
            newNumber = true
        }
    }
}