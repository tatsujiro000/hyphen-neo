import { client } from "../../../libs/client";


export default async function handler(req, res) {
    console.log(req.method)

  type Content = {
    title: string
    body?: string
  }
  
  client.create<Content>({
    endpoint: 'gifts',
    // Since `content` will be of type `Content`, no required fields will be missed.
    content: {
      title: 'test',
      body: 'test',
    },
  })

}