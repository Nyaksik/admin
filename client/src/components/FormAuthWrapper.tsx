import { Button, Card, Flex, Form } from 'antd'
import { ReactNode } from 'react'
import { useFetch, useUser } from '@/hooks'
import { API } from '@/api'
import { UserSignIn } from '@/types'

const { Item, useForm } = Form

interface Payload {
  login: string
  password: string
}

interface Props {
  children: ReactNode
  buttonActionText: string
  buttonLink: ReactNode
  apiMethod?: 'signIn' | 'signUp'
}

export function FormAuthWrapper({
  children,
  buttonActionText,
  buttonLink,
  apiMethod = 'signIn',
}: Props) {
  const { login } = useUser()
  const [form] = useForm()
  const { fetchData, loading } = useFetch()

  const onSubmit = async () => {
    const values = await form.validateFields()

    const { data } = await API.auth[apiMethod].post<Payload, UserSignIn>(values)

    login(data)
  }

  return (
    <Flex style={{ height: '100dvh' }} justify={'center'} align={'center'}>
      <Card>
        <Form
          disabled={loading}
          form={form}
          layout={'vertical'}
          onSubmitCapture={fetchData(onSubmit)}
        >
          {children}

          <Item>
            <Button
              loading={loading}
              type={'primary'}
              block
              htmlType={'submit'}
            >
              {buttonActionText}
            </Button>
          </Item>

          <div style={{ textAlign: 'center' }}>{buttonLink}</div>
        </Form>
      </Card>
    </Flex>
  )
}
