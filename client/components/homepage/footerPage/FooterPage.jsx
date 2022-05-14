import style from './FooterPage.css'
import React, {
  useEffect,
  useState
} from 'react'
import fontSize2className, {  } from '@client/util/fontSize2className'
import { Divider } from 'antd'
import herald from '@client/herald/herald'
import { useNavigate, Link } from 'react-router-dom'

export default function IndexPage(props) {

  const [articles, setArticles] = useState([])
  const [links, setLinks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    console.log('in footer logging props.pageData, props.clientType', props.pageData, props.clientType)
    setLinks(props.pageData.textLinkList.length >= 5 ? props.pageData.textLinkList.slice(0,5) : props.pageData.textLinkList)
    herald.get('/open/article', {
      params: {
        filter: JSON.stringify(
          {
            articleTitle: '',
            created: Number.MAX_SAFE_INTEGER,
            tag: ''
          }
        )
      }
    })
    .then(res => {
      console.log('in footer, response from article.get:', res)
      setArticles(res.data.length >= 5 ? res.data.slice(0,5) : res.data)
    })
  }, [])

  return (
    <div
      className = { style.container }
    >
      <div className = { style.imageContainer }>
        <div className = { style.imageWrapper }>
          {/* <img
            className = { style.imageBox }
            src = { props.pageData.imageUrl }
          ></img> */}
        </div>
      </div>
      <div className = { style.descriptionContainer }>
        <div className = { style.descriptionCenterBox }>
          <div className = { style.descriptionDetail }>
            <div className = { style.descriptionHeader }>
              近期文章
            </div>

            <Divider/>
            
            <div className = { style.descriptionItemBox }>
            {
              articles.map((article) => {
                const tagAttrs = {
                  class: 'snow-blog-font-small snow-blog-link snow-blog-font',
                  href: 'javascript:void(0)',
                  onClick: () => {
                    console.log('clicked')
                    navigate('/articlePage/' + article._id)
                  }
                }
                const tag = React.createElement(
                  'a',
                  tagAttrs,
                  article.articleTitle
                )
                return tag
              })
            }
            </div>

          </div>

          <div className = { style.descriptionDetail }>
            <div className = { style.descriptionHeader }>
              相关链接
            </div>

            <Divider/>

            <div className = { style.descriptionItemBox }>
              {
                props.pageData.textLinkList.map((link) => {
                  const tagAttrs = {
                    class: 'snow-blog-font-small snow-blog-link snow-blog-font',
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

        <div className = { style.footerBar }>
          { props.pageData.extraInfo }
        </div>
      </div>
    </div>
  )
}
