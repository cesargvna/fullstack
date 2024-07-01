// const t = [1, -1, 3]
//
// t.push(5)
//
// console.log(t.length) // se imprime 4
// console.log(t[1])     // se imprime -1
//
// t.forEach(value => {
//   console.log(value)  // se imprimen los números 1, -1, 3, 5 cada uno en su propia línea
// })

// const t = [1, -1, 3];
//
// const t2 = t.concat(5); // crea un nuevo array
//
// console.log(t); // se imprime [1, -1, 3]
// console.log(t2); // se imprime [1, -1, 3, 5]

//map
// const t = [1, 2, 3];
//
// const m1 = t.map((value) => value * 2);
// console.log(m1); // se imprime [2, 4, 6]
//

// const t = [1, 2, 3, 4, 5];
//
// const [first, second, ...rest] = t;
//
// console.log(first, second); // se imprime 1, 2
// console.log(rest); // se imprime [3, 4 ,5]

//object
const object1 = {
  name: "Arto Hellas",
  age: 35,
  education: "PhD",
};

const object2 = {
  name: "Full Stack web application development",
  level: "intermediate studies",
  size: 5,
};

const object3 = {
  name: {
    first: "Dan",
    last: "Abramov",
  },
  grades: [2, 3, 5, 3],
  department: "Stanford University",
};
console.log(object1.name); // se imprime Arto Hellas
const fieldName = "age";
console.log(object1[fieldName]); // se imprime 35

object1.address = "Helsinki";
object1["secretnumber"] = 12341;
console.log(object1.secretnumber); // se imprime 12341
