import Image from 'next/image'
import photo from '../../public/photo.jpg'
import styles from '../../styles/About.module.css'
import { useState } from 'react'
import Router from 'next/router'
import SmallNavigation from '../../components/common/SmallNavigation'
const About = () => {
  const [onNavigation, setOnNavigation] = useState<boolean>(false)
  const skillList = [
    {
      id: 'HTML',
      name: 'HTML',
      backgroundColor: '#ede574',
      items: ['HTML5', 'Canvas', 'SVG'],
    },
    {
      id: 'CSS',
      name: 'CSS',
      backgroundColor: '#f9d423',
      items: ['CSS3', 'Less', 'Sass']
    },
    {
      id: 'JavaScript',
      name: 'JS',
      backgroundColor: '#fc913a',
      items: ['JavaScript', 'ES6', 'TypeScript']
    },
    {
      id: 'Vue',
      name: 'Vue',
      backgroundColor: '#ff4e50',
      items: ['Vue', 'Vue Router', 'Vuex']
    },
    {
      id: 'React',
      name: 'React',
      backgroundColor: '#ff7761',
      items: ['React hook', 'React Router', 'Redux']
    },
    {
      id: 'Tools',
      name: 'Tools',
      backgroundColor: '#fd8f8f',
      items: ['webpack', 'Negix', 'Git']
    }
  ]
  const background = () => {
    const bgStyles = [ 'rightLight', 'rightDark', 'leftLight', 'leftDark' ]
    return (
      <aside className={styles.backgroundAside}>
        {
          bgStyles.map((itemStyle) => <div key={itemStyle} className={styles[itemStyle]}></div>)
        }
      </aside>
    )
  }
  const authorPhoto = () => {
    return (
      <div className={styles.photo}>
        <Image src={photo} alt="author"></Image>
      </div>
    )
  }
  const introduceContent = () => {
    return (
      <div className={styles.introduceContent}>
        <div className={styles.title}>Hello!</div>
        <div>
          <p>😉 我是张烁</p>
          <p>💻 一名前端开发工程师</p>
          <p>🎨 这个小站是我学习及运用前端知识的试验田</p>
          <p>📝 也将是我对知识学习、实践过程的记录平台</p>
          <p>👏 同时欢迎大家来我的<a target="_blank" rel="noreferrer" href="https://github.com/hishosho">github</a>溜达</p>
        </div>
      </div>
    )
  }
  const main = () => {
    return (
      <main className={styles.main}>
        <section className={styles.introduce}>
          {authorPhoto()}
          {introduceContent()}
        </section>
      </main>
    )
  }
  const skills = () => {
    const itemStyle = {
      width: `calc((100vw - 20%) / ${skillList.length})`,
      height: `calc(100vh / ${skillList.length + 1})`
    }
    return (
      <section className={styles.footer}>
        {
          skillList.map(skill => (
            <div 
              key={skill.id}
              className={styles.more}
              style={{background: skill.backgroundColor, ...itemStyle}}
            >
              <p>
                {skill.name}
              </p>
              <p 
                className={styles.skillItems}
              >
                { skill.items.map(item =><span key={item}>{item}</span>)}
              </p>
            </div>
          ))
        }
      </section>
    )
  }
  const navigation = () => {
    return (
      <div
        className={styles.navigation}
        onMouseEnter={() => setOnNavigation(true)}
        onMouseLeave={() => setOnNavigation(false)}
      >
        <SmallNavigation 
          enter={onNavigation}
        />
      </div>
    )
  }
  return (
    <div className={styles.aboutWrapper}>
      {navigation()}
      {background()}
      {main()}
      {skills()}
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default About