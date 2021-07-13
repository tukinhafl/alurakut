import { Box } from '../src/components/Box'
import { MainGrid } from '../src/components/MainGrid'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { useState } from 'react'

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
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

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
        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Comunidades ({ comunity.length })
          </h2>
          
          <ul>
            {comunity.map(elm => {
              return (
                <li key={elm.id}>
                  <a href={`/users/${elm.title}`}>
                    <img src={elm.image}/>
                    <span>{elm.title}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className='smallTitle'>
            Amigos ({ favoritePeople.length })
          </h2>
          
          <ul>
          {favoritePeople.map(elm => {
            return (
              <li key={elm}>
                <a href={`/users/${elm}`}>
                  <img src={`https://github.com/${elm}.png`}/>
                  <span>{elm}</span>
                </a>
              </li>
            )
          })}
        </ul>
        </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
