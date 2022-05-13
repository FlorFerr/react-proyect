import axios from 'axios'

export const baseUrl = 'https://api.punkapi.com/v2'

export async function getProducts (url){
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
