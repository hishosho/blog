import { useEffect, useState, useCallback, useRef } from 'react'
import Navigation from '../../components/common/Navigation'
import styles from '../../styles/BlogDetail.module.css'
import Router from 'next/router'
import { markdownData } from '../../mock/data'
import BlogService from '../../services/BlogService'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import SunLogo from '../../components/common/SunLogo'
import WaterCanvas from '../../components/blog/WaterCanvas'

const BlogDetail = (props: any) => {
  const [articleContent, setArticleContent] = useState<string>('')
  const [catalogue, setCatalogue] = useState<any>([])
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
      <>
        <div className={styles.navigation}>
          <SunLogo
            size={{ width: 65, height: 65, r: 65 / 4 }}
            translate={{ x: 65 / 2, y: 65 / 2 }}
            color="#FFE194"
          />
          <Navigation
            list={[{ id: 'home', name: 'home' }, { id: 'blog', name: 'blog' }, { id: 'about', name: 'about' }]}
            callBack={goto}
          />
        </div>
        <div className={styles.header}>
          {title()}
        </div>
      </>
    )
  }
  const goto = useCallback((id: string) => {
    const path = id === 'home' ? '' : id
    Router.push(`/${path}`)
  }, [])

  const catalogueHtml = () => {
    return (
      <aside
        className={styles.menu}
      >
        <h2
          className={styles.catalogueTitle}
        >
          目录
        </h2>
        <ul>
          {
            catalogue.map((item: any, i: number) => {
              return (
                <li
                  style={{ paddingLeft: item.level * 10 }}
                  className={styles.catalogueItem}
                  key={`${item.level}-${item.content}-${i}`}
                >
                  <a
                    data-catalogue={`${item.level}@${item.content}`}
                    className={styles.catalogueItemLink}
                    onClick={() => setActive(`${item.level}@${item.content}`)}
                  >
                    {item.content}
                  </a>
                </li>
              )
            })
          }
        </ul>
      </aside>
    )
  }

  const setActive = (id: string) => {
    const title: any = document.getElementById(id)
    title.scrollIntoView({
      block: 'center'
    })
  }

  const content = () => {
    return (
      <>
        <main
          className={styles.main}
        >
          {catalogueHtml()}
          <article>
            <div
              dangerouslySetInnerHTML={{ __html: articleContent }}
            >
            </div>
          </article>
        </main>
      </>
    )
  }

  const buildCatalogue = useCallback(() => {
    const tiitleArr = props.detail.content.match(/(#{1,5})\s.*\n/g)
    const navArr = tiitleArr.map((item: any) => ({
      content: item.replace(/(#{1,5}\s)|(\n)/g, ''),
      level: item.match(/#{1,5}/)[0].length
    }))
    setCatalogue(navArr)
  }, [props.detail.content])

  const buildArticleContent = useCallback(() => {
    const renderer = new marked.Renderer()
    renderer.heading = (text: string, level: number) => {
      return `<h${level} id=${level}@${text} class='title-anchor'>${text}</h${level}>`
    }
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
  }, [props.detail.content])

  const activeCatalogue = useCallback((ele) => {
    const catalogueEle = document.querySelector(`a[data-catalogue='${ele.id}']`)

    document.querySelectorAll('a[data-catalogue]').forEach(ele => {
      ele.classList.remove('active')
    })
    catalogueEle && catalogueEle.classList.add('active')
  }, [])

  const scrollObserve = useCallback(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      entries.reverse().forEach(entry => {
        if (entry.isIntersecting) {
          activeCatalogue(entry.target)
        }
      })
    })
    document.querySelectorAll('.title-anchor').forEach(ele => {
      intersectionObserver.observe(ele)
    })
  }, [activeCatalogue])

  const toTop = () => {
    return (
      <div className={styles.toTop}>
        <WaterCanvas
          size={{ width: 60, height: 60 }}
          background='rgb(185, 225, 255, .7)'
          borderColor='rgb(185, 225, 255, .5)'
        />
        <div className={styles.arrow}>^</div>
      </div>
    )
  }

  useEffect(() => {
    buildCatalogue()
    buildArticleContent()
    setTimeout(() => {
      scrollObserve()
    })
  }, [buildArticleContent, buildCatalogue, scrollObserve])

  return (
    <div className={styles.detailWraper}>
      {detailHeader()}
      {content()}
      {toTop()}
    </div>
  )
}

BlogDetail.getInitialProps = async (ctx: any) => {
  // const { success, data } = BlogService.getBlogDetail(ctx.query.id)
  return {
    detail: markdownData
  }
}

export default BlogDetail