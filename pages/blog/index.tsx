import { useRef, useEffect, useState } from 'react'
import WaveCanvas from '../../components/blog/WaveCanvas'
import BlogCard from '../../components/blog/BlogCard'
import { debounce } from '../../util/index'
import styles from '../../styles/Blog.module.css'
import cardImg from './1.jpeg'

const Blog = () => {
  const blogRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  useEffect(() => {
    const resize = () => {
      const width: number = blogRef.current && blogRef.current.offsetWidth || 0
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
      <div className={styles.blogList}>
        <BlogCard 
          image={cardImg}
          title='标题标题标题标题标标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题题标题标题标题标题'
          desc='描述描述描述描述描述描述描述'/>
      </div>
    </div>
  )
}

export default Blog