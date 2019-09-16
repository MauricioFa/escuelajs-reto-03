const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';
const xhttp = new XMLHttpRequest();

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    xhttp.onreadystatechange = event => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          var data = JSON.parse(xhttp.responseText)
          resolve(data)
        }
        else {
          reject(url_api);
        }
      }
    };
    xhttp.open('GET', url_api, false);
    xhttp.send();
  })
}

var dataone, datatwo

fetchData(API)
  .then(data1 => {
    dataone = data1
    console.log('Primero Llamado...')
    return fetchData(`${API}${data1.results[0].id}`)
  })
  .then(data2 => {
    datatwo = data2
    console.log('Segundo Llamado...')
    return fetchData(data2.origin.url)
  })
  .then(data3 => {
    console.log('Tercero Llamado...')
    console.log(`Personajes: ${dataone.info.count}`);
    console.log(`Primer Personaje: ${datatwo.name}`);
    console.log(`Dimensión: ${data3.dimension}`);
  })
  .catch(error => console.log(error))