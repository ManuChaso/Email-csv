self.onmessage = (e) => {
    const {data, filters} = e.data
    if(filters.length){
        const newData = data.filter(element => {
          const pass = [];
          const operators = {
            'equal': (value1, value2) => value1 == value2,
            'greater': (value1, value2) => value1 < value2,
            'less': (value1, value2) => value1 > value2,
            'greaterEqual': (value1, value2) => value1 <= value2,
            'lessEqual': (value1, value2) => value1 >= value2,
          }
    
          filters.forEach(filter => {
              const done = operators[filter.operator](filter.value, element[filter.propertie]);
              console.log(done)
              pass.push(done)
          });
    
          if(pass.every(value => value === true)){
            console.log('Coincide')
            return element
          }else{
            console.log('Nada')
          }
        });
    
        postMessage(newData)
      }else{
        postMessage([])
      }
}