import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import { Spin } from 'antd'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Spin fullscreen size={'large'} />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
