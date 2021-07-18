import { Box } from '../src/components/Box'
import { AlurakutMenu, ProfileComponentBox } from '../src/lib/AluraKutCommons'
import { MainGrid } from '../src/components/MainGrid'
import { ProfileSidebar } from './index'
import { useEffect, useState } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

export default function ScrapsScreen( props, { messages } ) {
  const githubUser = props.githubUser
  const [mensagens, setMensagens] = useState('')
  const [comunity, setComunity] = useState([])
  const favoritePeople = [
    {name: 'juunegreiros', id: 1 }, 
    {name: 'omariosouto', id: 2}, 
    {name: 'peas', id: 3}, 
    {name: 'rafaballerini', id: 4},
    {name: 'marcobrunodev', id: 5},
    {name: 'phmc99', id: 6}
  ]
  const [seguidores, setSeguidores] = useState([])

  useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '2c16929835f2068184ec8b0e297633',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'query': `query {
        allMessages {
          id
          message
        }
      }` })
    })
    .then((response) => response.json())
    .then((response) => {
      // const messageFromDato = response.data.allMessages
      // setMensagens(messageFromDato)
    })
  } ,[])

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const dataForm = new FormData(e.target)
   
    const message = {
      message: dataForm.get('message'),
    }
    
    fetch('/api/scraps', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })
    .then(async (response) => {
      const dados = await response.json()
      const messages = dados.registroCriado
      setMensagens([...mensagens, messages])
    })
  }
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <Box>
          <h2 className='subTitle'>Deixe um recado</h2>
            <form onSubmit={(e) => handleSubmitForm(e)}>
              <div>
                <input 
                  placeholder='Escreva aqui o seu recado' 
                  name='message' 
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>     
              <button>
                Enviar recado
              </button>
            </form>
        </Box>
      </MainGrid>
      {/* <ProfileComponentBox title='Seguidores' array={seguidores}/>
        
      <ProfileComponentBox title='Comunidades' array={comunity}/> */}
      
      {/* <ProfileComponentBox title='Amigos' array={favoritePeople}/> */}
    </>
  )
}

export const getServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);
  // const messages = mensagens
  return {
    props: {
      githubUser,
      // messages,
    }
  }
}