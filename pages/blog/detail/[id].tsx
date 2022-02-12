import { useEffect, useState, useCallback, useRef } from 'react'
import Navigation from '../../../components/common/Navigation'
import styles from '../../../styles/BlogDetail.module.css'
import Router from 'next/router'
import { markdownData } from '../../../mock/data'
import BlogService from '../../../services/BlogService'
import marked from 'marked'
import hljs from '../../../util/highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import SunLogo from '../../../components/common/SunLogo'
import WaterCanvas from '../../../components/blog/WaterCanvas'
import SmallNavigation from '../../../components/common/SmallNavigation'

import fetch from 'node-fetch'

const BlogDetail = (props: any) => {
  const [articleContent, setArticleContent] = useState<string>('')
  const [catalogue, setCatalogue] = useState<any>([])
  const [isScroll, setIsScroll] = useState<boolean>(false)
  const [onNavigation, setOnNavigation] = useState<boolean>(false)
  const title = () => {
    return (
      <div className={styles.titleWraper}>
        <div className={styles.title}>{props.detail.title}</div>
        <div className={styles.desc}>{props.detail.desc}</div>
      </div>
    )
  }
  const smallNav = () => {
    return (
      <div
        className={styles.smallNav}
        onMouseEnter={() => setOnNavigation(true)}
        onMouseLeave={() => setOnNavigation(false)}
      >
        <SmallNavigation
          enter={onNavigation}
        />
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
        {smallNav()}
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
            catalogue && catalogue.map((item: any, i: number) => {
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
          <article className={styles.article}>
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
    const titleArr = props.detail.content.match(/(#{1,5})\s.*\n/g)
    const navArr = titleArr && titleArr.map((item: any) => ({
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
      <div className={styles.toTop}
        onClick={() => document.documentElement.scrollTop = 0}
      >
        <WaterCanvas
          size={{ width: 60, height: 60 }}
          background='rgb(255, 192, 203, .7)'
          borderColor='rgb(255, 192, 203, .5)'
        />
        <div className={styles.arrow}></div>
      </div>
    )
  }

  

  useEffect(() => {
    buildCatalogue()
    buildArticleContent()
    setTimeout(() => {
      scrollObserve()
    })

    const scoll = () => {
      setIsScroll(document.documentElement.scrollTop > 600)
    }
    window.addEventListener('scroll', scoll)

    return () => {
      window.removeEventListener('scroll', scoll)
    }
  }, [buildArticleContent, buildCatalogue, scrollObserve])

  return (
    <div className={styles.detailWraper}>
      {detailHeader()}
      {content()}
      {isScroll && toTop()}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}

export async function getStaticPaths() {
  console.log('call getStaticPaths')
   // 博客列表
   const blogsRes: any = await fetch('http://127.0.0.1:3000/blogs/publishedBlogs')
   const blogsData = await blogsRes.json()
 
   let blogs = []
   if (blogsData && blogsData.code) {
     blogs = blogsData.data
   }

  const paths = blogs.map((blog:any) => ({
    params: {
      id: blog._id.toString()
    }
  }))


  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }: any) {
  const detailRes = await fetch(`http://127.0.0.1:3000/blogs/blogDetail?id=${params.id}`)
  const detailData:any = await detailRes.json()

  let detail = ''
  if (detailData && detailData.code) {
    detail = detailData.data
  }
  return {
      props: {
        detail
      },
      revalidate: 10
  }
}

export default BlogDetail