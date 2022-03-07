import React, {
  useState,
  useEffect
} from 'react'
import {
  useSelector,
} from 'react-redux'
import style from './ArticleList.css'
import SideBar from './sideBar/SideBar.jsx'
import ArticleCard from './articleCard/ArticleCard.jsx'
import herald from '@client/herald/herald'
import { v4 } from 'uuid'
export default function ArticleList() {

  const clientType = useSelector((state) => state.window.deviceType)
  const [tagCollection, setTagCollection] = useState([])
  const [currentTag, setCurrentTag] = useState('')
  const [currentSearch, setCurrentSearch] = useState('')
  const [articleCollection, setArticleCollection] = useState([])
  const [minTime, setMinTime] = useState(Number.MAX_SAFE_INTEGER)
  const [scrollSignal, setScrollSignal] = useState(0)

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
      if (offset >= scrollHeight) {
        setScrollSignal(v4())
        console.log('need load more')
      }
    }
    scrollElem.addEventListener('scroll', handleScroll)
    return function unmountListener() {
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

      <div className = {  style.main }>
        <div
          id = 'scrollElem'
          className = { clientType === 'client' ? style.clientContainer : style.mobileContainer }
          >
          {
            articleCollection.map( article => (
              <ArticleCard
                key = { article._id }
                article = { article }
              />
            ))
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
    console.log(article.created)
    if(article.created <= minTime) {
      res = article.created
      minTime = res
    }
  })
  console.log('minTime:', res)
  return res
}