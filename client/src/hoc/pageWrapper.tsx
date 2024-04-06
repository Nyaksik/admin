import { FC, useEffect, useState } from 'react'
import { App, Layout } from 'antd'
import { LocalStorageService } from '@/services'
import { REFRESH_TOKEN } from '@/constant'
import { HeaderComponent } from '@/components'

const { Content } = Layout

export const pageWrapper = (Component: FC) => {
  return function () {
    const [refreshToken, setRefreshToken] = useState(null)

    useEffect(() => {
      setRefreshToken(LocalStorageService.getItem(REFRESH_TOKEN))
    }, [])

    return (
      <App className={'app'}>
        <Layout id={'layout'}>
          {refreshToken && <HeaderComponent />}
          <Content id={'main'} style={{ flexGrow: 1 }}>
            <Component />
          </Content>
        </Layout>
      </App>
    )
  }
}
