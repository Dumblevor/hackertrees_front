const devUrl = '/api'
const prodUrl = "https://hackertree1.herokuapp.com/api"
const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl

export default baseUrl