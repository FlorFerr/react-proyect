import axios from 'axios'

const beerUrl = 'https://api.punkapi.com/v2/beers'
const burgerUrl= 'https://my-burger-api.herokuapp.com/burgers'

async function getProducts (url){
  try{
    const response = await axios({
      url: `${url}`,
      method: 'GET',
    })
    return response
  }catch(e){
    console.log(e)
  }
}

export {beerUrl, getProducts, burgerUrl}


//https://my-burger-api.herokuapp.com/burgers?_page=7&_limit=2
//https://my-burger-api.herokuapp.com/burgers?name=Blondie
//El name tiene que estar escrito exactamente igual, los espacios son %20


