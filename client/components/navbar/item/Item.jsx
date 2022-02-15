import style from './Item.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Item(props){
  const navigate = useNavigate()
  return (
    <div className={style.container}
      onClick = {
        () => navigate(props.linkPath)
      }
    >
      { props.itemName }
    </div>
  )
}