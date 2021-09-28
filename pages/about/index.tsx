import Image from 'next/image'
import photo from '../../public/photo.jpg'
import styles from '../../styles/About.module.css'
import { useState } from 'react'
import Router from 'next/router'
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
      name: 'JavaScript',
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
          <p>萨达萨达萨达萨达萨达萨达萨达萨达萨达，萨达萨达萨达萨达。</p>
          <p>萨达萨达萨达萨达萨达萨达萨达萨达萨达，萨达萨达萨达萨达。</p>
          <p>萨达萨达萨达萨达萨达萨达萨达萨达萨达，萨达萨达萨达萨达。</p>
          <p>萨达萨达萨达萨达萨达萨达萨达萨达萨达，萨达萨达萨达萨达。</p>
          <p>萨达萨达萨达萨达萨达萨达萨达萨达萨达，萨达萨达萨达萨达。</p>
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
  const smallNav = () => {
    const enterNavigation = (state: boolean) => {
      setOnNavigation(state)
    }
    const navigations = [
      {
        id: 'home',
        name: 'Home',
        path: '/'
      },
      {
        id: 'blog',
        name: 'blog',
        path: '/blog'
      },
      {
        id: 'about',
        name: 'About',
        path: '/about'
      }
    ]
    
    return (
      <div
        className={styles.navigation}
        onMouseEnter={() => enterNavigation(true)}
        onMouseLeave={() => enterNavigation(false)}
      >
        <ul
          className={styles.navigationList}
        >
          <li className={styles.navigationItem}>Menu</li>
          {
            navigations.map((nav, i) => (
              <li 
                key={nav.id}
                className={`${styles.navigationItem} ${onNavigation ? styles.navActive : styles.navUnActive}`}
                style={{transform: onNavigation===false ? `translate(${100 * i}%)` : '', transitionDelay: `.${i}s`, cursor: 'pointer'}}
                onClick={() => Router.push(nav.path)}
              >
                {nav.name}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
  return (
    <div className={styles.aboutWrapper}>
      {smallNav()}
      {background()}
      {main()}
      {skills()}
    </div>
  )
}

export default About