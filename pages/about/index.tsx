import Image from 'next/image'
import photo from '../../public/photo.jpg'
import styles from '../../styles/About.module.css'
const About = () => {
  return (
    <div className={styles.aboutWraper}>
      <aside className={styles.backgroundAside}>
        <div className={styles.rightFirst}></div>
        <div className={styles.rightSecond}></div>
        <div className={styles.leftFirst}></div>
        <div className={styles.leftSecond}></div>
      </aside>
      <main className={styles.main}>
        <section className={styles.introduce}>
          <div className={styles.photo}>
            <Image src={photo} alt="author"></Image>
          </div>
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
        </section>
      </main>
      <section className={styles.footer}>
        <div className={styles.more} style={{background: '#ede574'}}><span>HTML</span></div>
        <div className={styles.more} style={{background: '#f9d423'}}><span>CSS</span></div>
        <div className={styles.more} style={{background: '#fc913a'}}><span>JS</span></div>
        <div className={styles.more} style={{background: '#ff4e50'}}><span>Vue</span></div>
        <div className={styles.more} style={{background: '#ff7761'}}><span>React</span></div>
        <div className={styles.more} style={{background: '#fd8f8f'}}><span>Tools</span></div>
      </section>
    </div>
  )
}

export default About