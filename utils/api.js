import axios from 'axios'
const baseUrl = 'https://8511-186-77-198-83.ngrok-free.app/api'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const loginServer = newObject => {
  const request = axios.post(`${baseUrl}/login/`, newObject)
  return request.then(response => response.data)
}

const descargarDOCX = newObject => {
  const request = axios.post(`${baseUrl}/descargar/`, newObject, {
    responseType: 'stream'
  })
  return request.then(response => response.data)
}


// const deletePerson = id => {
//   const request = axios.delete(`${baseUrl}/${id}`)
//   return request
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

export default { loginServer, descargarDOCX }