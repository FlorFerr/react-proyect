import axios from 'axios';

const beerUrl = 'https://api.punkapi.com/v2/beers'
const burgerUrl= 'https://my-burger-api.herokuapp.com/burgers'

async function getProducts (url, method){
  try{
    const response = await axios({
      url: `${url}`,
      method: `${method}`,
    })
    return response
  }catch(e){
    console.log(e)
  }
}

export { beerUrl, burgerUrl, getProducts }