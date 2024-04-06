import { pageWrapper } from '@/hoc'
import { Button } from 'antd'
import { useNavigate, useRouteError } from 'react-router-dom'
import { LocalStorageService } from '@/services'
import { PATHS, REFRESH_TOKEN } from '@/constant'
import { useEffect } from 'react'

const IS_REFRESH_TOKEN = LocalStorageService.getItem(REFRESH_TOKEN)
const BUTTON = {
  to: IS_REFRESH_TOKEN ? PATHS.home : PATHS.signIn,
  text: IS_REFRESH_TOKEN
    ? 'Вернуться на главную'
    : 'Вернуться на страницу входа',
}

function Error() {
  const navigate = useNavigate()
  const error = useRouteError() as { status: number }

  useEffect(() => {
    if (error.status === 401) {
      navigate(PATHS.signIn)
    }
  }, [error.status, navigate])

  return (
    <>
      <h1>Произошла ошибка {error.status}</h1>
      <Button type={'link'} href={BUTTON.to}>
        {BUTTON.text}
      </Button>
    </>
  )
}

export default pageWrapper(Error)
