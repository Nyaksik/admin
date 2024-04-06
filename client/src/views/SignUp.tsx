import { Button, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { FormAuthWrapper } from '@/components'
import { pageWrapper } from '@/hoc'
import { PATHS } from '@/constant'

const { Item } = Form
const { Password } = Input

function SignUp() {
  return (
    <FormAuthWrapper
      buttonActionText={'Зарегистрироваться'}
      apiMethod={'signUp'}
      buttonLink={
        <Button type={'link'} href={PATHS.signIn}>
          На страницу входа
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
        hasFeedback
      >
        <Password
          prefix={<LockOutlined />}
          placeholder={'Введите ваш пароль'}
        />
      </Item>

      <Item
        label={'Подтвердите пароль'}
        name={'confirm'}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Повторите пароль!',
          },
          {
            min: 6,
            message: 'Пароль должен содержать не меньше 6 символов!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Пароли не совпадают!'))
            },
          }),
        ]}
      >
        <Password
          prefix={<LockOutlined />}
          placeholder={'Повторите введенный пароль'}
        />
      </Item>
    </FormAuthWrapper>
  )
}

export default pageWrapper(SignUp)
