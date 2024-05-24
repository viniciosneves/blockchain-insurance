import styled from "styled-components"
import { Heading } from "./components/Heading"
import { NavBar } from "./components/NavBar"
import { Label } from "./components/Label"
import { Box } from "./components/Box"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { Footer } from "./components/Footer"
import { Textarea } from "./components/Textarea"

const StyledContainer = styled.section`
  width: 590px;
  max-width: 80%;
  margin: 0 auto;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`
const StyledActions = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`

const StyledHeader = styled.header`
  margin: 80px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    gap: 24px;
    justify-content: center;
  }
`

function App() {


  return (
    <>
      <NavBar />
      <main>
        <StyledContainer>

          <StyledHeader>
            <ul>
              <li>
                <Button $secondary>Carregar contas</Button>
              </li>
              <li>
                <Button $secondary>Buscar apólice</Button>
              </li>
            </ul>
          </StyledHeader>

          <Heading>
            Gerenciamento de Apólice
          </Heading>

          <Box>
            <StyledForm>
              <fieldset>
                <Label>
                Endereço segurado
                </Label>
                <Input 
                  placeholder="Endereço segurado"
                /> 
              </fieldset>
              <fieldset>
                <Label>
                  Detalhes da apólice
                </Label>
                <Input 
                  placeholder="Detalhes da apólice"
                /> 
              </fieldset>
              <fieldset>
                <Label>
                Valor do prêmio
                </Label>
                <Input placeholder="Valor do prêmio"/> 
              </fieldset>
              <fieldset>
                <Label>
                Valor da cobertura
                </Label>
                <Input placeholder="Valor da cobertura"/> 
              </fieldset>
              <fieldset>
                <Label>
                  Detalhes do Envio
                </Label>
                <Textarea placeholder="Detalhes do Envio"/> 
              </fieldset>
            </StyledForm>
            <StyledActions>
              <Button>
                Criar apólice
              </Button>
            </StyledActions>
          </Box>

          <Heading>
            Gerenciamento de Sinistro
          </Heading>

          <Box>
            <StyledForm>
              <fieldset>
                <Label>
                  Status do Sinistro:
                </Label>
                <p>Status</p>
              </fieldset>
            </StyledForm>
            <StyledActions>
              <Button>
              Submeter sinistro
              </Button>
            </StyledActions>
          </Box>

        </StyledContainer>

        <Footer />
      </main>

    </>
  )
}

export default App
