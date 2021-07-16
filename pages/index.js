import { Box } from '../src/components/Box'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { MainGrid } from '../src/components/MainGrid'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { useEffect, useState } from 'react'
import { ProfileComponentBox } from '../src/components/ProfileRelations'

const ProfileSidebar = (props) => {
  return(
    <Box as='aside'>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className='boxLink' href={`https://github.com/${props.githubUser}.png`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home( props ) {
  const githubUser = props.githubUser
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
    fetch('https://api.github.com/users/omariosouto/followers')
      .then((response) => response.json())
      .then((response) => setSeguidores(response))

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '2c16929835f2068184ec8b0e297633',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 'query': `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((response) => {
      const comunityFromDato = response.data.allCommunities
      setComunity(comunityFromDato)
    })
  } , [])

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const dataForm = new FormData(e.target)

    const comunidade = {
      title: dataForm.get('title'),
      imageUrl: dataForm.get('image'),
      creatorSlug: githubUser,
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comunidade)
    })
    .then(async (response) => {
      const dados = await response.json()
      const comunidade = dados.registroCriado
      setComunity([...comunity, comunidade])
    })

  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className='profileArea' style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser}/>
        </div>
        <div className='wellcomeArea' style={{ gridArea: 'wellcomeArea' }}>
          <Box>
            <h1 className='title'>
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box >
            <h2 className='subTitle'>O que você deseja fazer</h2>
            <form onSubmit={(e) => handleSubmitForm(e)}>
              <div>
                <input 
                  placeholder='Qual vai ser o nome da sua comunidade?' 
                  name='title' 
                  aria-label='Qual vai ser o nome da sua comunidade?'
                  type='text'
                />
              </div>
              <div>
                <input 
                  placeholder='Coloque uma URL para usarmos de capa' 
                  name='image' 
                  aria-label='Coloque uma URL para usarmos de capa'
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className='profileRelationsArea' style={{ gridArea: 'profileRelationsArea' }}>
        
        <ProfileComponentBox title='Seguidores' array={seguidores}/>
        
        <ProfileComponentBox title='Comunidades' array={comunity}/>
        
        <ProfileComponentBox title='Amigos' array={favoritePeople}/>
        
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, 
  }
} 