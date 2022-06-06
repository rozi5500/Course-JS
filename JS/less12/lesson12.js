// Recursion
// GitHub

array = [-145, -4, -716, -19, -15, -53];

count = Infinity;

array.forEach(element => {
  if(element < count){
    count = element;
  }
});

console.log(count);

const deepObj = {
  one: {
    two: {
      three: {}
    }
  },
  innerOne: {
    innerTwo: {
      innerThree: {
        four: 4,
        six: { },
        five: [
          { user: { name: 'Victor' } }
        ]
      }
    }
  }
};

let deepCount = -Infinity;

const deepCounter = (obj, count = 0) => {
  if (typeof obj !== 'object' && obj !== null) {
    if (deepCount < count) {
      deepCount = count;
    }

    return;
  }

  const objValues = Object.values(obj);

  for (const value of objValues) {
    deepCounter(value, ++count);
  }
  

  return deepCount;
  
}

const result = deepCounter(deepObj);

console.log(result);

