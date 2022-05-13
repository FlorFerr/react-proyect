import axios from 'axios'

const baseUrl = 'https://api.punkapi.com/v2/beers'


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

export {baseUrl, getProducts}


