import { useRef, useEffect, useState, useCallback } from 'react'
import Navigation from '../../components/common/Navigation'
import Sun from '../../components/common/Sun'
import Tag from '../../components/blog/Tag'
import BlogCard from '../../components/blog/BlogCard'
import { debounce } from '../../util/index'
import styles from '../../styles/Blog.module.css'
import Router from 'next/router'

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

const Blog = () => {
  const blogRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [blogList, setBlogList] = useState<Blog[]>([
    { id: 1, title: '[Vue]基础学习', desc: 'Vue基本用法介绍' },
    { id: 2, title: '[Vue-router]基础学习', desc: 'Vue-router基本用法介绍' }
  ])
  const [tagList, setTagList] = useState<Tag[]>([
    { id: 1, name: 'React', isActive: false },
    { id: 2, name: 'Vue', isActive: false },
    { id: 3, name: 'JavaScript', isActive: false },
    { id: 4, name: 'CSS', isActive: false },
    { id: 5, name: 'Canvas', isActive: false }
  ])
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([
    { id: 1, title: '[Vue]基础学习', desc: 'Vue基本用法介绍' },
    { id: 2, title: '[Vue-router]基础学习', desc: 'Vue-router基本用法介绍' }
  ])

  // TODO useCallback 待学习知识点
  const changeState = useCallback((id: number, state: boolean) => {
    setTimeout(() => {
      const newTagList = tagList.concat()
      newTagList.map(tag => {
        if (tag.id === id) {
          tag.isActive = state
        }
      })
      setTagList(newTagList)
    }, 200)
  }, [])

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

    return () => {
      window.removeEventListener('resize', resize)
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
          className={styles.navigation}>
          <Navigation
            list={[{id: 'home', name: 'home'}, {id: 'blog', name: 'blog'}, {id: 'about', name: 'about'}]}
            callBack={goto}
          />
        </div>
      <main className={styles.main}>
       <section className={styles.list}>
         {
           blogList.map(({ id, title, desc }) => (
            <div className={styles.card}
                  key={id}>
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
              tagList.map(({ id, name, isActive }) => (
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
                  <li key={id}
                      className={styles.popularBlog}>{ title }</li>
                )
              )
            }
            <li></li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Blog