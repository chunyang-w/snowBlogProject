import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import style from './SideBar.css'
import {
  Input,
  Divider,
} from 'antd'

const { Search } = Input

export default function SideBar(props) {
  const [tagList, setTagList] = useState([])

  useEffect(() => {
    const tagCollection = new Map()
    const tempList = []
    props.tags.forEach((tag) => {
      if (!tagCollection.has(tag.tag)) {
        tagCollection.set(tag.tag, 1)
      } else {
        tagCollection.set(tag.tag, tagCollection.get(tag.tag) + 1)
      }
    })
    tagCollection.forEach(( val, key) => {
      tempList.push({
        key,
        val,
        chosen: false
      })
    })
    setTagList(tempList)
    console.log('sidebar',tempList)
  }, [props.tags])

  return (
    <div className = { style.container }>
      <div className = { style.searchContainer }>
        <Divider>搜索</Divider>
        <Search
          placeholder="Search for Article..."
          allowClear
          size="large"
          onSearch = {(e) => {
            console.log('search:', props,e)
            props.search(e)
          }}
      />
      </div>
      <div className = { style.categoryContainer }>
        <div className = {style.divider}>
          <Divider>分类</Divider>
        </div>
        <div className = { style.tagsContainer }>
          {
            tagList.map((tag) => {
              return (
                <div
                  className = {
                    tag.key === props.currentTag ? style.tagPairChosen : style.tagPair
                  }
                  key = { tag.key }
                  onClick = { (e) => {
                    props.changeTag(e.target.innerHTML === props.currentTag ? '' : e.target.innerHTML)
                  }}
                  >
                  <a className = { style.tagName }>{ tag.key }</a>
                  <p className = { style.count }>({ tag.val })</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

function flipTag(tagList, tag) {
  for (let i = 0; i < tagList.length; i++) {
    if (tagList[i].key === tag) {
      console.log('matched!', !tagList[i].chosen, tagList)
      tagList[i].chosen = !tagList[i].chosen
    } else {
      tagList[i].chosen = false
    }
  }
  return tagList
}