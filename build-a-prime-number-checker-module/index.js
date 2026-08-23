function isPrime(number) {
      if (number < 2){
        return false
    }
    for(let i = 2; i < number; i++){
        if (number  % i === 0){
            return false
        }
    }
    return true
}
console.log(isPrime(23))
console.log(isPrime(29))
console.log(isPrime(4))
console.log(isPrime(10))

module.exports ={
    isPrime
}