import {Header} from "../header/Header.jsx";
import {useState, useEffect} from 'react'
import styles from './Levels.module.css'
import LevelsService from "../../http/LevelsService.js";


const Levels = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const data = await LevelsService.getFirstLevels()
            setData(data)
        }
        fetchData();
    }, [])

    const getNewLevel = (e) => {
        const getData = async () => {
            let id = e.target.id.split('/')[0]
            let level = e.target.id.split('/')[1]
            if (data.find(elem => elem.value == id).ifLeaf) {
                level = level.split('_')[0] + '_' + (Number(level.split('_')[1]) + 1)
                const resData = await LevelsService.getNewLevel({id: id, level: level})
                data.find(e => e.value == id).label = resData.label
                data.find(e => e.value == id).ifLeaf = resData.ifLeaf
                e.target.id = id + '/' + level;
                e.target.innerText += ' - ' + resData.label
            }
        }
        getData()
    }

    return <div>
        <Header/>
        <div className={styles.body}>
            {data.length ?
                <table className={styles.table}>
                    <tbody>
                    <tr>
                        <th>ID</th>
                        <th className={styles.infoTh}>Info</th>
                    </tr>
                    {data.map(elem =>
                        <tr key={`tr-${elem.value}`}>
                            <td className={styles.id} key={elem.value}>
                                {elem.value}
                            </td>
                            <td className={styles.info} key={`${elem.value}/${elem.label}`} id={`${elem.value}/level_1`} onClick={getNewLevel}>
                                {elem.label}
                            </td>
                        </tr>
                    )
                    }
                    </tbody>
                </table> : <div/>
            }
        </div>
    </div>
}

export default Levels