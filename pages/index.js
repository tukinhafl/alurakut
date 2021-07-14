import { Box } from '../src/components/Box'
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

export default function Home() {
  const githubUser = 'tukinhafl'
  const [comunity, setComunity] = useState([{
    id: '172462138746192461287',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])
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
  } , [])
  

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const dataForm = new FormData(e.target)

    const comunidade = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image')
    }
    setComunity([...comunity, comunidade])
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
