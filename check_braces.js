const fs = require('fs');
const content = fs.readFileSync('components/prototype-viewer.tsx', 'utf8');

let braces = 0;
let parens = 0;
let brackets = 0;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '{') braces++;
  if (char === '}') braces--;
  if (char === '(') parens++;
  if (char === ')') parens--;
  if (char === '[') brackets++;
  if (char === ']') brackets--;
  
  if (braces < 0) {
    console.log('Negative braces at index ' + i);
    console.log(content.substring(Math.max(0, i - 50), i + 50));
    break;
  }
}

console.log('Braces:', braces);
console.log('Parens:', parens);
console.log('Brackets:', brackets);
