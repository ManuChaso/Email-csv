export default function parseCSV(data){
    const newArray = [];
    newArray.push(Object.keys(data[0]).join(','))
    data.forEach(element => {
        const properties = Object.keys(element);
        const cadena = [];
        properties.forEach(propertie => {
            cadena.push(element[propertie])
        })
        newArray.push(cadena.join(','))
    });

    console.log(newArray)

    return newArray.join('\r\n')
}