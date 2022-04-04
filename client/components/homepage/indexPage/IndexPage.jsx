import React,{
  useEffect
} from 'react'
import { useSelector } from 'react-redux'
import style from './IndexPage.css'
import fontSize2className, {  } from '@client/util/fontSize2className'

export default function IndexPage(props) {

  const clientType = useSelector((state) => state.window.deviceType)
  useEffect(() => {
    console.log('logging props.pageData, props.clientType', props.pageData, props.clientType)
  })

  return (
    <div
      style = { clientType === 'mobile' ? columnFlex : rowFlex }
      className = { style.container }
    >
      <div className = { style.imageContainer }>
        <div className = { style.imageWrapper }>
          <img
            className = { style.imageBox }
            src = { props.pageData.imageUrl }
          ></img>
        </div>
      </div>
      <div className = { style.descriptionContainer }>
        <div className = { style.descriptionCenterBox }>
        {
          props.pageData.textLinkList.map((link) => {
            const tagAttrs = {
              class: fontSize2className(link),
            }
            if (link.clickable) {
              tagAttrs.href = link.linkTarget
              tagAttrs.target = '_blank'
            }
            const tag = React.createElement(
              link.clickable ? 'a' : 'p',
              tagAttrs,
              link.content
            )
            return tag
          })
        }
        </div>
      </div>
    </div>
  )
}

const columnFlex = {
  flexDirection: 'column'
}

const rowFlex = {
  flexDirection: 'row'
}