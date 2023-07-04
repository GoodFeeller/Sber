import {Header} from "../header/Header.jsx";
import {LinkButton} from "./link-button/LinkButton.jsx";
import styles from './Home.module.css'

const tasks = [
    {
        id: 0,
        title: `Levels`,
        url: `/levels`,
        name: 'Создать таблицу уровней'
    },
    {
        id: 1,
        title: `DB Request Constructor`,
        url: `/db-constructor`,
        name: 'Создать конструктор отчётов'
    }
]
export const Home = () => {

    return <div>
        <Header/>
        <div className={styles.content}>
            {tasks.length?tasks.map(elem => (
                <LinkButton key={elem.id} btn={elem}/>
            )): <div>NO data</div>}
        </div>
    </div>
}