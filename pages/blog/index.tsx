import { useRef, useEffect, useState, useCallback } from 'react'
import Navigation from '../../components/common/Navigation'
import Sun from '../../components/common/Sun'
import Tag from '../../components/blog/Tag'
import BlogCard from '../../components/blog/BlogCard'
import { debounce } from '../../util/index'
import styles from '../../styles/Blog.module.css'
import Router from 'next/router'
import BlogService from '../../services/BlogService'
import { blogs, propulerBlogs, blogTags, someBlogList } from '../../mock/data'

interface Blog {
  id: number;
  title: string;
  desc: string;
}

interface Tag {
  id: number;
  name: string;
  isActive: boolean;
}

const Blog = (props: any) => {
  const blogRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)
  const [blogList, setBlogList] = useState<Blog[]>(props.blogs)
  const [blogTags, setBlogTags] = useState<Tag[]>(props.blogTags)
  const [popularBlogs] = useState<Blog[]>(props.propulerBlogs)
  const [isScroll, setIsScroll] = useState<boolean>(false)

  // TODO useCallback 待学习知识点
  const changeState = useCallback((id: number, state: boolean) => {
    setTimeout(() => {
      // const updateState = await BlogService.updateBlogTagState({id, state})
      const newTagList = blogTags.concat()
      newTagList.map(tag => {
        if (tag.id === id) {
          tag.isActive = state
        }
      })
      setBlogTags(newTagList)
      setBlogList(someBlogList)
    }, 200)
  }, [blogTags])

  const goto = useCallback((id: string) => {
    const path = id === 'home' ? '' : id
    Router.push(`/${path}`)
  }, [])

  useEffect(() => {
    const resize = () => {
      const width: number = blogRef.current && blogRef.current.scrollWidth || 0
      setWidth(width)
    }

    resize()

    window.addEventListener('resize', debounce(resize))

    const scoll = () => {
      setIsScroll(document.documentElement.scrollTop > 220)
    }

    window.addEventListener('scroll', scoll)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', scoll)
    }
    
  }, [])
  return (
    <div 
      ref={blogRef}
      className={styles.blogWrap}>
        <Sun
          color="#FFE194"
          size={{width: width, height: 250, r: 250 }}
          translate={{ x: width / 2, y: 250 * 1.5 }}
        />
        <div 
          className={styles.navigation}
          style={{background: `${isScroll ? '#FFB391' : ''}`}}>
          <Navigation
            list={[{id: 'home', name: 'home'}, {id: 'blog', name: 'blog'}, {id: 'about', name: 'about'}]}
            background='#FFB391'
            callBack={goto}
          />
        </div>
      <main className={styles.main}>
       <section className={styles.list}>
         {
           blogList.map(({ id, title, desc }) => (
            <div 
              className={styles.card}
              key={id}
              onClick={() => Router.push(`/blog/detail?id=${id}`)}>
              <BlogCard
                id={id}
                title={title}
                desc={desc}/>
            </div>)
           )
         }
        </section>
        <section  className={styles.categories}>
          <div className={styles.title}>文章分类</div>
            {
              blogTags.map(({ id, name, isActive }) => (
                  <Tag
                    key={id}
                    propClass={`${styles.tags} ${styles.tag}`}
                    name={name}
                    isActive={isActive}
                    changeState={(state: any) => changeState(id, state)}
                  />
                )
              )
            }
        </section>
        <section className={styles.popular}>
          <div className={styles.title}>热门文章</div>
          <ul className={styles.popularList}>
            {
              popularBlogs.map(({ id, title }) => (
                  <li
                    key={id}
                    className={styles.popularBlog}
                    onClick={() => Router.push(`/blog/detail?id=${id}`)}
                  >
                    { title }
                  </li>
                )
              )
            }
          </ul>
        </section>
      </main>
    </div>
  )
}

Blog.getInitialProps= async () => {
  // const blogs = BlogService.getBlogs()
  // const propulerBlogs = BlogService.getPropulerBlogs()
  // const blogTags = BlogService.getBlogTags()

  return {
    blogs: blogs,
    propulerBlogs: propulerBlogs,
    blogTags: blogTags
  }
}

export default Blog