const testeArray = [1,2,3,4,5];
const novoArray = testeArray.filter((val, index, arr) => {
    return val > 3;
})

console.log(novoArray)