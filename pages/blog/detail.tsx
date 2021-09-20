import { useRef, useEffect, useState, useCallback } from 'react'
import Navigation from '../../components/common/Navigation'
import styles from '../../styles/BlogDetail.module.css'
import Router from 'next/router'
import content from '*.png'
const BlogDetail = () => {
  const title = () => {
    return (
      <div className={styles.titleWraper}>
        <div className={styles.title}>[Vue-router]基础学习</div>
        <div className={styles.desc}>Vue-router基本用法介绍</div>
      </div>
    )
  }
  const detailHeader = () => {
    return (
      <div className={styles.header}>
        <Navigation
          list={[{id: 'home', name: 'home'}, {id: 'blog', name: 'blog'}, {id: 'about', name: 'about'}]}
          callBack={goto}
        />
        {title()}
      </div>
    )
  }
  const goto = useCallback((id: string) => {
    const path = id === 'home' ? '' : id
    Router.push(`/${path}`)
  }, [])

  const content = () => {
    return (
      <>
        <main className={styles.main}>
          <aside className={styles.menu}>
            <h2>目录</h2>
          </aside>
          <article>Vue-router基本用法介绍Vue-router基本用法介绍Vue-router基本用法介绍Vue-router基本用法介绍Vue-router基本用法介绍Vue-router基本用法介绍Vue-router基本用法介绍Vue-router基本用法介绍</article>
        </main>
      </>
    )
  }


  return (
    <div className={styles.detailWraper}>
      {detailHeader()}
      {content()}
    </div>
  )
}

export default BlogDetail