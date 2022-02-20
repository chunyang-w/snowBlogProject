import React, { useState } from 'react'
import style from '@client/components/admin/login/Login.css'
import herald from '@client/herald/herald.js'

import { Input, Button, message } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { setLoginState } from '@client/store/adminLogin/adminLogin'

import { useNavigate } from 'react-router-dom'

function Login() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [passwd, setPasswd] = useState('')
  const [loading, setLoading] = useState(false)

  function submit() {
    setLoading(true)
    herald.post('/login', {
      username,
      passwd
    })
      .then(res => {
        setLoading(false)
        if (res.data.token) {
          dispatch(setLoginState({
            needLogin: false,
            token: res.data.token,
            username: res.data.username
          }))
          message.success('Login success')
          navigate('/admin')
        }
        console.log(res)
      })
  }

  return (
    <div className={ style.container }>
      <div className= { style.loginContainer }>
        <div>
          <h1>Admin Login</h1>
        </div>
        <div className={ style.formArea }>
          <Input
            value = { username }
            size="large"
            placeholder="Admin username"
            prefix={ <UserOutlined/> }
            onChange = { (e) => setUsername(e.target.value) }
            />
          <Input.Password
            value = { passwd }
            onChange = { (e) => setPasswd(e.target.value) }
            size="large"
            placeholder="password"
            iconRender={visible => (
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              )}
            />
          <Button
            loading = { loading }
            onClick = { () => { submit() } }
          >Login</Button>
        </div>
      </div>
      <div className={ style.bg}>
        <div className={ style.polygon1 }></div>
        <div className={ style.polygon2 }></div>
        <div className={ style.polygon3 }></div>
      </div>
    </div>
  )
}

export default Login