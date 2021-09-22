import { useRef, useEffect, useState, useCallback } from 'react'
import Navigation from '../../components/common/Navigation'
import styles from '../../styles/BlogDetail.module.css'
import Router from 'next/router'
import { markdownData } from '../../mock/data'
import BlogService from '../../services/BlogService'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const BlogDetail = (props: any) => {
  const [articleContent, setArticleContent] = useState<string>('')
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
        <main
          className={styles.main}
        >
          <aside
            className={styles.menu}
          >
            <h2>目录</h2>
          </aside>
          <article>
            <div
              dangerouslySetInnerHTML={{__html:articleContent}}
            >
            </div>
          </article>
        </main>
      </>
    )
  }

  useEffect(() => {
    const renderer = new marked.Renderer()
    marked.setOptions({
      renderer: renderer, 
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: (code) => {
        return hljs.highlightAuto(code).value
      }
    })
    setArticleContent(marked(props.detail.content))
  }, [articleContent, props.detail])

  return (
    <div className={styles.detailWraper}>
      {detailHeader()}
      {content()}
    </div>
  )
}

BlogDetail.getInitialProps = async (ctx: any) => {
  const { success, data } = BlogService.getBlogDetail(ctx.query.id)
  return {
    detail: markdownData
  }
}

export default BlogDetail