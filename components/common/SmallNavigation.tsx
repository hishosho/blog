import Router from 'next/router'
import styles from './SmallNavigation.module.css'

interface ChildProp {
  enter: boolean;
}
const SmallNavigation = (props: ChildProp) => {
  const {
    enter
  } = props

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
    <ul
      className={styles.list}
    >
      <li className={styles.item}>Menu</li>
      {
        navigations.map((nav, i) => (
          <li 
            key={nav.id}
            className={`${styles.item} ${enter ? styles.navActive : styles.navUnActive}`}
            style={{transform: enter===false ? `translate(${100 * i}%)` : '', transitionDelay: `.${i}s`, cursor: 'pointer'}}
            onClick={() => Router.push(nav.path)}
          >
            {nav.name}
          </li>
        ))
      }
    </ul>
  )
}

export default SmallNavigation