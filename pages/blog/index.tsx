import { useRef, useEffect, useState, useCallback } from 'react'
import WaveCanvas from '../../components/blog/WaveCanvas'
import WaterCanvas from '../../components/blog/WaterCanvas'
import Tag from '../../components/blog/Tag'
import BlogCard from '../../components/blog/BlogCard'
import { debounce } from '../../util/index'
import styles from '../../styles/Blog.module.css'

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
    
  }, [blogRef.current])
  return (
    <div ref={blogRef}>
      <WaveCanvas 
        width={width}
        height={250}
        colors={['rgba(255,98,87,.6)', 'rgba(255,118,87,.6)', 'rgba(255,138,87,.6)', 'rgba(255,158,87,.6)']}
      />
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