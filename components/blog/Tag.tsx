import { useState } from 'react'
import styles from './Tag.module.css'

interface childProp {
  name: string;
  isActive: boolean;
  propClass: string;
  changeState: Function;
}

const Tag = (props: any) => {
  const {
    name,
    isActive,
    propClass,
    changeState
  } = props
  return (
    <div className={`${styles.main} ${propClass} ${isActive && styles.active}`}
         onClick={() => changeState(!isActive)}>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default Tag