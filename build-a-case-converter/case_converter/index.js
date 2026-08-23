
function getUpperCase (string){
    return string.toUpperCase();


}
function getLowerCase (string){
    return string.toLowerCase();


}


function getSentenceCase(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
console.log(getSentenceCase("hello world"))
console.log(getSentenceCase("HELLO WORLD"))
console.log(getSentenceCase("heLLo woRLD"))

function getProperCase(string){
    return string.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

}
console.log(getProperCase("hello world"))
console.log(getProperCase("HELLO WORLD"))
console.log(getProperCase("heLLo woRLD"))
module.exports ={
      getUpperCase,
    getLowerCase,
    getSentenceCase,
  
    getProperCase,

};

