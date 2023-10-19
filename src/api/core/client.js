class Client {
  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  get(url) {
    const result = new Promise((res, rej) => {
      fetch(url, { method: 'GET' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then((data) => {
          res(data)
        })
        .catch((error) => {
          rej(error)
        })
    })

    return result
  }
}

const client = new Client()
export default client
