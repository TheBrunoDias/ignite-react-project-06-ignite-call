import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'
import { signIn } from 'next-auth/react'

export default function ConnectCalendar() {
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
            <Button
              onClick={() => signIn('google')}
              variant="secondary"
              size="sm"
            >
              Conectar <ArrowRight />
            </Button>
          </ConnectItem>

          <Button>
            Próximo Passo <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}