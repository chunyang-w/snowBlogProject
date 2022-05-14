import React, {
  useState,
  useEffect
} from 'react'
import {
  useSelector,
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import style from './ArticleList.css'
import SideBar from './sideBar/SideBar.jsx'
import ArticleCard from './articleCard/ArticleCard.jsx'
import herald from '@client/herald/herald'
import { v4 } from 'uuid'
import { Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



export default function ArticleList() {

  const clientType = useSelector((state) => state.window.deviceType)
  const navigate = useNavigate()
  const [tagCollection, setTagCollection] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [articleCollection, setArticleCollection] = useState([])
  const [minTime, setMinTime] = useState(Number.MAX_SAFE_INTEGER)
  const [scrollSignal, setScrollSignal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadArticle(minTime, currentSearch, currentTag)
      .then(res => {
        console.log('loadArticle:', res)
        setArticleCollection(res.data)
        setMinTime(getMinTime(res.data, minTime))
      })
    herald.get('/open/tags')
      .then(res => {
        console.log(res.data)
        setTagCollection(res.data)
      })
    function handleScroll(e) {
      const [scrollHeight, offset] = [e.target.scrollHeight, e.target.scrollTop + e.target.clientHeight]
      console.log(scrollHeight , offset)
      if (offset >= scrollHeight) {
        setIsLoading(true)
        setScrollSignal(v4())
        console.log('need load more')
      }
    }
    const scrollElem = document.getElementById('scrollElem')
    scrollElem.addEventListener('scroll', handleScroll)
    return () => {
      scrollElem.removeEventListener('scroll', handleScroll)
    }
  }, [currentTag])

  useEffect(() => {
    loadArticle(minTime, currentSearch, currentTag)
      .then(res => {
        const originArticleList = articleCollection.slice()
        console.log('loadArticle:', res)
        for (let i = 0; i < res.data.length; i++) {
          originArticleList.push(res.data[i])
        }
        originArticleList.sort((elem1, elem2) => {
          elem2.created - elem1.created 
        })
        setArticleCollection(originArticleList)
        setMinTime(getMinTime(originArticleList, minTime))
        setIsLoading(false)
        if (res.data.length === 0) {
          message.info('已加载全部内容')
        }
      })
  }, [scrollSignal])

  useEffect(async () => {
    await loadArticle(minTime, currentSearch, currentTag)
      .then(res => {
        console.log('loadArticle:', res)
        setArticleCollection(res.data)
        setMinTime(getMinTime(res.data, minTime))
      })
  }, [currentSearch])

  return (
    <div className = { style.container }>
      <div className = { style.sideBar }>
        {
          clientType === 'client' ?
          <SideBar
            tags = { tagCollection }
            currentTag = { currentTag }
            changeTag = { (tag) => {
              setMinTime(Number.MAX_SAFE_INTEGER)
              setCurrentTag(tag)
            }}
            search = {(search) => {
              setMinTime(Number.MAX_SAFE_INTEGER)
              setCurrentSearch(search)
            }}
          />
          :
          null
        }
      </div>

      <div 
      id = 'scrollElem' className = {  style.main }>
        <div
          className = { clientType === 'client' ? style.clientContainer : style.mobileContainer }
          >
          {
            articleCollection.map( article => (
              <ArticleCard
                key = { article._id }
                article = { article }
                onClick = {
                  () => {
                    console.log('cardClicked')
                    navigate(`/articlePage/${article._id}`)
                  }
                }
              />
            ))
          }
        </div>
        <div className = { style.loadingArea }>
          {
              isLoading ? <Spin indicator = { antIcon } /> : <></>
          }
        </div>
      </div>

    </div>
  )
}

function loadArticle(minTime, keyword, tag) {
  return herald.get('/open/article', {
    params: {
      filter: JSON.stringify(
        {
          articleTitle: keyword,
          created: minTime,
          tag: tag
        }
      )
    }
  })
}

function getMinTime(articles, minTime) {
  let res
  articles.forEach(article => {
    if(article.created <= minTime) {
      res = article.created
      minTime = res
    }
  })
  console.log('minTime:', res)
  return res
}