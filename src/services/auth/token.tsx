const getToken = () => {
    const token = sessionStorage.getItem('token')
    const authHeader = `Bearer ${token}`
    const config = {
      headers: {
        "Authorization": authHeader
      }
    }
    
    return config
  }
  
  const token = getToken()
  
  export default token