class STNApiClient {
  /**
   *  API client for Saturn Admin backend.
   * @param baseUrl: string
   */
  constructor(public baseUrl:string) {
    this.baseUrl = baseUrl
  }

  get(url:string) {
    let GETUrl = `${this.baseUrl}${url}`
    try {
      return fetch(GETUrl)
        .then(response => response.json())
        .then(response => {return response})
    } catch(error) {
      return error
    }
  }
}

export default STNApiClient;
