import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <>
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado <Check />
              </Button>
            ) : (
              <Button
                onClick={handleConnectCalendar}
                variant="secondary"
                size="sm"
              >
                Conectar <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button disabled={!isSignedIn}>
            Próximo Passo <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
