import styled from "styled-components"
import { Heading } from "./components/Heading"
import { NavBar } from "./components/NavBar"
import { Label } from "./components/Label"
import { Box } from "./components/Box"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { Footer } from "./components/Footer"
import { Textarea } from "./components/Textarea"
import Web3 from 'web3';
import { useState } from "react"
import Alert from "./components/Alert"

// Defina o ABI e o endereço do contrato aqui
const policyContractABI = [] // ABI do Contrato de Apólice
const policyContractAddress = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'; // Endereço do Contrato de Apólice
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Conexão Web3

const policyContract = new web3.eth.Contract(policyContractABI, policyContractAddress);

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

  const [accounts, setAccounts] = useState([]); // Contas Ethereum
  const [policyDetails, setPolicyDetails] = useState(''); // Detalhes da Apólice
  const [claimStatus, setClaimStatus] = useState(''); // Status do Sinistro
  const [newPolicyData, setNewPolicyData] = useState({ // Dados para criar uma nova apólice
    insuredAddress: '',
    premium: '',
    coverage: '',
    shipmentDetails: ''
  });
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(null); // Erros

  // Carregar contas Ethereum
  const loadAccounts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const accs = await web3.eth.getAccounts();
      setAccounts(accs);
    } catch (error) {
      setError("Erro ao carregar contas: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Criar uma nova apólice
  const createPolicy = async (event) => {
    event.preventDefault()
    setIsLoading(true);
    setError(null);
    try {
      const { insuredAddress, premium, coverage, shipmentDetails } = newPolicyData;
      await policyContract.methods.createPolicy(insuredAddress, premium, coverage, shipmentDetails).send({ from: accounts[0] });
    } catch (error) {
      setError("Erro ao criar apólice: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar detalhes da apólice
  const fetchPolicy = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const policyId = "" /* Substitua pelo ID da apólice */;
      const details = await policyContract.methods.getPolicyDetails(policyId).call();
      setPolicyDetails(JSON.stringify(details));
    } catch (error) {
      setError("Erro ao buscar apólice: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Submeter um sinistro
  const submitClaim = async (event) => {
    event.preventDefault()
    setIsLoading(true);
    setError(null);
    try {
      const policyId = "" /* Substitua pelo ID da apólice para qual o sinistro está sendo submetido */;
      const claimAmount = "" /* Substitua pelo valor do sinistro */;
      await policyContract.methods.submitClaim(policyId, claimAmount).send({ from: accounts[0] });
    } catch (error) {
      setError("Erro ao submeter sinistro: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main>
        <StyledContainer>

          <StyledHeader>
            <ul>
              <li>
                <Button $secondary onClick={loadAccounts}>Carregar contas</Button>
              </li>
              <li>
                <Button $secondary onClick={fetchPolicy}>Buscar apólice</Button>
              </li>
            </ul>
          </StyledHeader>

          <Heading>
            Gerenciamento de Apólice
          </Heading>
          <Heading>
            Detalhes da Apólice: {policyDetails}
          </Heading>

          <Box>
            <StyledForm onSubmit={createPolicy}>
              <fieldset>
                <Label>
                  Endereço segurado
                </Label>
                <Input
                  placeholder="Endereço segurado"
                  value={newPolicyData.insuredAddress}
                  onChange={(e) => setNewPolicyData({ ...newPolicyData, insuredAddress: e.target.value })}
                />
              </fieldset>
              <fieldset>
                <Label>
                  Valor do prêmio
                </Label>
                <Input
                  placeholder="Valor do prêmio"
                  value={newPolicyData.premium}
                  onChange={(e) => setNewPolicyData({ ...newPolicyData, premium: e.target.value })}
                />
              </fieldset>
              <fieldset>
                <Label>
                  Valor da cobertura
                </Label>
                <Input placeholder="Valor da cobertura" />
              </fieldset>
              <fieldset>
                <Label>
                  Detalhes do Envio
                </Label>
                <Textarea
                  placeholder="Detalhes do Envio"
                  value={newPolicyData.coverage}
                  onChange={(e) => setNewPolicyData({ ...newPolicyData, coverage: e.target.value })}
                />
              </fieldset>
              <StyledActions>
                <Button disabled={isLoading} type="submit">
                  Criar apólice
                </Button>
              </StyledActions>
            </StyledForm>
          </Box>

          <Heading>
            Gerenciamento de Sinistro
          </Heading>

          <Box>
            <StyledForm onSubmit={submitClaim}>
              <fieldset>
                <Label>
                  Status do Sinistro:
                </Label>
                <p>{claimStatus || 'N/D'}</p>
              </fieldset>
              <StyledActions>
                <Button>
                  Submeter sinistro
                </Button>
              </StyledActions>
            </StyledForm>
          </Box>

          {/* Exibição de erros */}
          {error && <Alert variant="error">{error}</Alert>}

        </StyledContainer>

        <Footer />
      </main>

    </>
  )
}

export default App
