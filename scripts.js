//requiring file system and gibrish module
const fs = require('fs');
const Gibrish = require("gibrish");
//gibrish constructor
var g = new Gibrish();

//file system reader function
fs.readFile('mujeres.csv', 'utf8' , (err, data) => {
  if (err) return console.error(err);
  const arr = data.split("\n").map(line => line.split(','));
//list of processed names
  var femNames = [];
//loop processing names
  for (let i=1; i<arr.length; i++) {
    femNames.push(arr[i][0]);
  };

//gibrish function processing fake names with markov chains
//Ord is how many letters ahead calculate probability. cant is how many names outputs
  function genNames(ord, cant) {
    var nameList = [];

    g.options.order= ord;
    g.push(femNames);

    if (typeof cant != "number") cant= 1;
  
    for (var i=0; i < cant; i++) {
        var newName = g.generate();

        if (newName.length < 3) {
            i-=1;
            continue;
        } else {
            newName = newName.toLowerCase(); 
            nameList.push(newName.replace(newName[0], newName[0].toUpperCase()));
        }

    }
    return nameList;
}

console.log(genNames(3, 10));


});
