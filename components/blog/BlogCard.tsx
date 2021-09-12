import styles from './BlogCard.module.css'
interface childProps {
  image: string;
  title: string;
  desc: string;
}
const BlogCard = (props: any) => {
  const {
    title,
    desc
  } = props
  return (
    <div>
      <div className={styles.cardWrap}>
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardDesc}>{desc}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard