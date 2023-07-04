import {Link} from 'react-router-dom'
import styles from './LinkButton.module.css'
export const LinkButton = (props) => {
    return <div className={styles.linkBody}>
        <Link className={styles.link} to={props.btn.url}>
            <div className={styles.title}>{props.btn.title}</div>
            <div className={styles.name}>{props.btn.name}</div>
        </Link>
    </div>
}