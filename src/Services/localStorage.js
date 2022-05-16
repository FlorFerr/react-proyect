const localStorageService = (name, key)=>{
    localStorage.setItem(name, JSON.stringify(key));
  }
  

  export {localStorageService}