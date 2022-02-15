import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import style from './HomePage.css'

export default class NavBar extends React.Component {
  render () {
    return (
      <ReactFullpage
        scrollingSpeed = {1000}
        dragAndMove = {'vertical'}
        verticalCentered = {false}

        render={({state, fullpageApi}) => {
          return (
            <div className={ style.fullPageContainer }>
              <ReactFullpage.Wrapper>
                <div className='section' id="section1">
                  <div className={style.innerPage}>s</div>
                </div>
                <div className='section' id="section2">
                  <div className={style.innerPage}>s</div>
                </div>
              </ReactFullpage.Wrapper>
            </div>
          )
        }}
      />
    )
  }
}