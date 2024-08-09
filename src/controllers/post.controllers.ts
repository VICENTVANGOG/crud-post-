import { Ipost } from "../models/Ipost"

export class postController {

  url: string
  constructor(url: string) {
    this.url = url;
  }



  async getPost(endpoint: string): Promise<Ipost> {
    const response = await fetch(`${this.url}/${endpoint}`);

    const data = await response.json()
    console.log(response.status)
    return data;

  }

  async postPost(endpoint: string, dataPost: Ipost) {
    const response = await fetch(`${this.url}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPost),
    });

    console.log(response.status);

    const data = response.json();
    if (response.status != 201) {
      throw new Error("No se puede publicar ciudad");
    }

    return data



  }



}

