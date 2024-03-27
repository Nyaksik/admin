import { FC } from 'react'
import { App, Layout } from 'antd'

const { Content } = Layout

export const pageWrapper = (Component: FC) => {
  return () => (
    <App className={'app'}>
      <Layout id={'layout'}>
        <Content id={'main'} style={{ flexGrow: 1 }}>
          <Component />
        </Content>
      </Layout>
    </App>
  )
}
