import styles from './BlogCard.module.css'
import Image from 'next/image'
interface childProps {
  image: string;
  title: string;
  desc: string;
}
const BlogCard = (props: any) => {
  const {
    image,
    title,
    desc
  } = props
  return (
    <div>
      <div className={styles.cardWrap}>
        <Image
          className={styles.cardImage}
          src={image}
          width={200}
          height={200}
          alt=''
        />
        <div className={styles.cardContent}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardDesc}>{desc}</div>
        </div>
      </div>
    </div>
  )
}

export default BlogCard