import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequest (request, response) {
  if (request.method === 'POST') {
    const TOKEN = '4e81f1e3b4f68fecdfa348cc828505'
    const client = new SiteClient(TOKEN)
  
    const registroCriado = await client.items.create({
      itemType: '977040',
      ...request.body,
    })

    response.json({
      dados: "Algum dado",
      registroCriado: registroCriado,
    })

    return;
  }

  response.status(404).json({
    message: "Ainda nao temos nada no GET."
  })
}