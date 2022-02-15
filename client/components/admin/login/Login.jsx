import React, { useState } from 'react'
import style from '@client/components/admin/login/Login.css'
// import herald from '../../../herald/herald'
import herald from '@client/herald/herald.js'

import { Input, Button } from 'antd'
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'
function Login() {

  const [username, setUsername] = useState('')
  const [passwd, setPasswd] = useState('')

  function submit() {
    herald.get('/login')
      .then(res => {
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