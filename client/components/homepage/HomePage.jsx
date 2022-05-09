import React, {
  useState,
  useEffect
} from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import herald from '@client/herald/herald'
import IndexPage from './indexPage/IndexPage.jsx'
import ContentPage from './contentPage/ContentPage.jsx'
import FooterPage from './footerPage/footerPage.jsx'
import style from './HomePage.css'
import Loading from '@client/components/Loading/Loading.jsx'

export default function HomePage() {

  const [loading, setLoading] = useState(true)
  const [dataReceived, setDateReceived] = useState(false)
  const [pages, setPages] = useState([])
  const [pagesElem, setPagesElem] = useState([])
  const [assembled, setAssembled] = useState(false)

  useEffect(() => {
    herald.get('/open/allPages')
    .then(res => {
      console.log('allPages:', res.data)
      setPages(
        res.data.map(page => {
          return (
            <div class = 'section' id = { page._id }>
              <div className = { style.sectionHeight }>
                {
                  page.type === 'indexPage' ? <IndexPage pageData = { page }/> : 
                  page.type === 'footerPage' ? <FooterPage pageData = { page }/> : 
                  <ContentPage pageData = { page }/>
                }
              </div>
            </div>
          )
        })
      )
      console.log('mounted')
      setDateReceived(true)
    })
  }, [])
  
  useEffect(() => {
    console.log('pages changed')
    if (dataReceived) {
      console.log('data received, processing... ')
      setPagesElem(
        <ReactFullpage
          scrollingSpeed = {900}
          dragAndMove = {'vertical'}
          verticalCentered = {false}

          render={({state, fullpageApi}) => {
            console.log('in render', pages)
            return (
              pages
            )
          }}
        />
      )
      console.log('assembled')
      setAssembled(true)
    }
  }, [pages, dataReceived])

  useEffect(() => {
    if (assembled) {
      setLoading(false)
    }
    console.log('loaded', assembled)
  }, [pagesElem, assembled])

  useEffect(() => {
    console.log('loading:', loading, 'pagesElem', pagesElem)
  }, [loading])

  return (
    loading ? <Loading/> : pagesElem
  )

}