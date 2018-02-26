// Basic calculator for Free Code Camp
// Author: Br3ntor
let calcBuff = ['0'];
let lastCalc = [];
let lastValue = [];
const buf = document.getElementById('buffer');
const answer = document.getElementById('answer');
const buttons = document.getElementsByClassName('button');
const calc = {
  add: function(x, y) {
    x = Number(x);
    y = Number(y);
    return x + y;
  },
  sub: function(x, y) {
    x = Number(x);
    y = Number(y);
    return x - y;
  },
  mul: function(x, y) {
    x = Number(x);
    y = Number(y);
    return x * y;
  },
  div: function(x, y) {
    x = Number(x);
    y = Number(y);
    return x / y;
  }
};

// Update display
//    Pretty sure this whole function could be re - 
//    written a lot cleaner with more functions inside,
//    it feels like too many things are happening in the
//    same space.
function update(event) {
  console.log(event.target.innerHTML);
  const input = event.target.innerHTML;
  const lastItem = calcBuff.length - 1;
  const numChk = /\d/;
  const dotChk = /\./;
  const opChk = /[\+\−\×\÷]/;
  lastValue = [];
  lastCalc = [];

  // if calcBuff array is zeroed and input is digit
  if (calcBuff.length === 1 && calcBuff[0] === '0' && numChk.test(input)) {
    calcBuff[0] = input;
    answer.innerHTML = calcBuff[lastItem];
    // To take care of state after equals is pressed
  } else if (calcBuff.length === 1 && answer.innerHTML !== '0' && opChk.test(input)) {
    calcBuff[0] = answer.innerHTML;
    calcBuff.push(input);
    buf.innerHTML = calcBuff.join(' ');

    // if calcBuff array is not empty
  } else {

    // if input is a digit and lastItem is digit
    if (numChk.test(input) && numChk.test(calcBuff[lastItem]) && !/e/.test(calcBuff[lastItem])) {
      if (answer.innerHTML.length < 22) {
        calcBuff[lastItem] = calcBuff[lastItem].concat(input);
        answer.innerHTML = calcBuff[lastItem];
      }
    }

    // if input is digit and lastItem is operator    
    if (numChk.test(input) && opChk.test(calcBuff[lastItem].slice(-1))) {
      calcBuff.push(input);
      answer.innerHTML = input;
    }

    // if input is an operator and lastItem is digit
    if (opChk.test(input) && numChk.test(calcBuff[lastItem])) {
      if (calcBuff[lastItem].slice(-1) === '.') {
        calcBuff[lastItem] = calcBuff[lastItem].slice(0, -1);
        calcBuff.push(input);
        buf.innerHTML = calcBuff.join(' ');
      } else {
        calcBuff.push(input);
        buf.innerHTML = calcBuff.join(' ');
      }
    }

    // if input is an operator and lastItem is operator
    if (opChk.test(input) && opChk.test(calcBuff[lastItem].slice(-1))) {
      calcBuff[lastItem] = input;
      console.log(buf.innerHTML.slice(-1));
      buf.innerHTML = calcBuff.join(' ');
    }

    // if input is decimal (\.) and last item is digit and doesn't contain decimal
    if (dotChk.test(input) && !/e/.test(calcBuff[lastItem])) {
      if (numChk.test(calcBuff[lastItem]) && !dotChk.test(calcBuff[lastItem])) {
        calcBuff[lastItem] = calcBuff[lastItem].concat(input);
        answer.innerHTML = calcBuff[lastItem];
      }
      if (opChk.test(calcBuff[lastItem])) {
        calcBuff.push('0' + input);
        answer.innerHTML = calcBuff[lastItem + 1];
      }
    }

    // neg/pos button
    if (input === '±' && !isNaN(calcBuff[lastItem])) {
      if (calcBuff.length === 1 && calcBuff[0] === '0') {
        calcBuff[0] = answer.innerHTML;
      }
      if (/e/.test(calcBuff[lastItem])) {
        calcBuff[lastItem] = (calcBuff[lastItem] * -1).toExponential();
        answer.innerHTML = calcBuff[lastItem];
      } else {
        calcBuff[lastItem] = (calcBuff[lastItem] * -1).toString();
        answer.innerHTML = calcBuff[lastItem];
      }
    }

    // back button
    if (input === 'Back' && !isNaN(calcBuff[lastItem]) && !/[Ie]/.test(answer.innerHTML)) {
      if (calcBuff[lastItem].length === 2 && /\-/.test(calcBuff[lastItem])) {
        calcBuff[lastItem] = '0';
        answer.innerHTML = '0';
      } else {
        calcBuff[lastItem] = calcBuff[lastItem].slice(0, calcBuff[lastItem].length - 1);
      }
      if (calcBuff[lastItem] === '') {
        calcBuff.pop();
        answer.innerHTML = '0';
      } else {
        answer.innerHTML = calcBuff[lastItem];
      }
      if (calcBuff.length === 0) {
        calcBuff = ['0'];
        answer.innerHTML = calcBuff[lastItem];
      }
    }

    // C button
    if (input === 'C') {
      buf.innerHTML = '';
      answer.innerHTML = '0';
      calcBuff = ['0'];
    }

    // CE button
    if (input === 'CE' && !isNaN(calcBuff[lastItem])) {
      let lastNum = buf.innerHTML.search(/[\d\.\-]+$/);
      answer.innerHTML = '0';
      if (calcBuff.length === 1) {
        calcBuff[0] = '0';
      } else {
        calcBuff.pop();
      }
    }
    if (input === 'CE' && opChk.test(calcBuff[calcBuff.length - 1].slice(-1))) {
      answer.innerHTML = '0';
    }

    // Output length logic
    if (answer.innerHTML.length > 14 && answer.innerHTML.length < 19) {
      answer.style.fontSize = '40px';
    } else if (answer.innerHTML.length > 18 && answer.innerHTML.length < 23) {
      answer.style.fontSize = '30px';
    } else if (answer.innerHTML.length > 22) {
      answer.innerHTML = Number(calcBuff[0]).toExponential();
    } else {
      answer.style.fontSize = '';
    }
    if (buf.innerHTML.length >= 31) {
      buf.innerHTML = '...' + calcBuff.join(' ').slice(-40);
      console.log(buf.innerHTML.length);
    }
  }
}

// Process calBuff Array
function equals() {
  let input = calcBuff.slice(0, 3);

  if (calcBuff.length === 1 && lastCalc.length === 2) {
    console.log(lastCalc);
    calcBuff = lastValue.concat(lastCalc);
  }
  if (/[\+\−\×\÷]/.test(calcBuff[calcBuff.length - 1]) && !/e/.test(calcBuff[calcBuff.length - 1])) {
    calcBuff.push(answer.innerHTML);
  }
  if (calcBuff.length % 2 > 0 && calcBuff.length > 2) {
    lastCalc = calcBuff.slice(-2);
    console.log('***');
    console.log(calcBuff);
    while (calcBuff.length > 1) {
      input = calcBuff.slice(0, 3);
      if (input[1] === '+') {
        calcBuff.splice(0, 3, calc.add(input[0], input[2]));
      }
      if (input[1] === '−') {
        calcBuff.splice(0, 3, calc.sub(input[0], input[2]));
      }
      if (input[1] === '×') {
        calcBuff.splice(0, 3, calc.mul(input[0], input[2]));
      }
      if (input[1] === '÷') {
        calcBuff.splice(0, 3, calc.div(input[0], input[2]));
      }
    }

    console.log(calcBuff);

    calcBuff[0] = calcBuff[0].toString();
    answer.innerHTML = calcBuff;
    buf.innerHTML = '';

    if (calcBuff[0].length > 14 && calcBuff[0].length < 19) {
      answer.style.fontSize = '40px';
    } else if (calcBuff[0].length > 18) {
      answer.style.fontSize = '30px';
    } else {
      answer.style.fontSize = '';
    }
    console.log(calcBuff);
  }
  lastValue = calcBuff;

  if (lastCalc.length !== 0) {
    calcBuff = ['0'];
  }
}

// Assigns event listener to each button element
Array.from(buttons, (element) => {
  const input = /[\.\d\+\−\×\÷\±BackCE]/;

  if (input.test(element.innerHTML)) {
    element.addEventListener('click', update);
  }

  if (element.innerHTML === '=') {
    element.addEventListener('click', equals);
  }
});

// Keyboard functionality
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  const num = (Number(keyName) >= 0) ? document.getElementById('num' + keyName) : '';
  let op = '';

  console.log(keyName);

  function whiteBG(element) {
    element.classList.remove('simclick');
  }

  function clickSim(element) {
    element.click();
    element.classList.add('simclick');
    setTimeout(whiteBG, 100, element);
  }

  switch (keyName) {
    case '+':
      op = document.getElementById('add');
      break;
    case '-':
      op = document.getElementById('sub');
      break;
    case '*':
      op = document.getElementById('mul');
      break;
    case '/':
      op = document.getElementById('div');
      break;
    case '.':
      op = document.getElementById('decimal');
      break;
    case 'Enter':
      op = document.getElementById('equals');
      break;
    case 'Backspace':
      op = document.getElementById('back');
      break;
    case 'Delete':
      op = document.getElementById('ce');
      break;
    case 'Escape':
      op = document.getElementById('c');
      break;
    default:
      op = '';
      break;
  }

  if (Number(num.innerHTML) >= 0) {
    clickSim(num);
  } else if (op) {
    clickSim(op);
  }
});