const numbers = [2,5, 4, 6, 7,8]
const conditions = [3, 4, 7]; // Array of conditions

const filteredNumbers = numbers.filter((number) => conditions.includes(number));

console.log(filteredNumbers);
