import { pageWrapper } from '@/hoc'
import { Button, Input, Form } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormAuthWrapper } from '@/components'

const { Item } = Form
const { Password } = Input

function SignIn() {
  return (
    <FormAuthWrapper
      buttonActionText={'Войти'}
      buttonLink={
        <Button type={'link'} href={'/sign-up'}>
          Пройти регистрацию
        </Button>
      }
    >
      <Item
        label={'Логин'}
        name={'login'}
        rules={[
          {
            required: true,
            message: 'Введите логин!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder={'Введите ваш логин'} />
      </Item>

      <Item
        label={'Пароль'}
        name={'password'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Введите пароль!',
          },
          {
            min: 6,
            message: 'Пароль должен содержать не меньше 6 символов!',
          },
        ]}
      >
        <Password
          prefix={<LockOutlined />}
          placeholder={'Введите ваш пароль'}
        />
      </Item>
    </FormAuthWrapper>
  )
}

export default pageWrapper(SignIn)
