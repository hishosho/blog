import styles from './Navigation.module.css'

interface NavItem {
  id: string;
  name: string;
}

interface childProp {
  list: NavItem[];
  callBack: Function;
}

const Navigation = (prop: childProp) => {
  const {
    list,
    callBack
  } = prop

  const navItem = ({ id, name }: NavItem) => {
    return (
      <li
        key={id}
        className={styles.item}
        data-hover={name}
        onClick={() => callBack(id)}
      >
        {name}
      </li>
    )
  }

  return (
    <ul>
      {list.map((item: NavItem) => navItem(item))}
    </ul>
  )
}

export default Navigation