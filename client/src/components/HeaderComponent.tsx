import { Button, Layout } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useFetch, useUser } from '@/hooks'
import { API } from '@/api'

const { Header } = Layout

export function HeaderComponent() {
  const { fetchData, loading } = useFetch()
  const { logout } = useUser()

  const onLogout = async () => {
    await API.auth.logout.post()

    logout()
  }

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <Button loading={loading} onClick={fetchData(onLogout)}>
        <LogoutOutlined />
      </Button>
    </Header>
  )
}
