import styles from './Header.module.css'
import {Link} from 'react-router-dom'
export const Header = () => {
    return <header className={styles.header}>
        <div className={styles.title}>Second Task</div>
        <Link className={`${styles.home} btn`} to='/'>Home</Link>
    </header>
}