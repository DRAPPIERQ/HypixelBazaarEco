const handleApiError = (error, reject) => {
  console.log(
    'Error',
    error.response,
    error.request,
    error.message,
    'Reject',
    reject
  )
  // If there was a problem, we want to
  // dispatch the error condition
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(err.response.data)
    console.log('Response error', error.response.status)
    let message = ''
    // reject(error.response)
    switch (error.response.status) {
      case 409:
        message = "Conflit : l'email existe déjà"
        break
      case 410:
        message = "La ressource n'est plus disponible"
        break
      case 400:
        message = 'Merci de vérifier les champs du formulaire'
        break
      case 404:
        message = "La ressource n'existe pas"
        break
      case 401:
        message = "Erreur d'authentification. Merci de vérifier vos informations de connexion."
        break
    }
    return reject({ message })
    // console.log(err.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('Request error', error.request)
    if (!error.response) {
      // network error
      return reject({ message: 'Un problème réseau est survenu, impossible de joindre le serveur.' })
    }

    // reject(error.request)
    let message = ''
    // reject(error.response)
    switch (error.response.status) {
      case 410:
        message = "La ressource n'est plus disponible"
        break
      case 400:
        message = 'Merci de vérifier les champs du formulaire'
        break
      case 404:
        message = "La ressource n'existe pas"
        break
    }
    return reject({ message: message || "Une erreur s'est produite sur le serveur" })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('message', error.message)
    return reject({ message: error.message })
  }
}

export default handleApiError

