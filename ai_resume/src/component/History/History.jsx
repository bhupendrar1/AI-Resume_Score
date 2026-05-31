import styles from './History.module.css'
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';

const History = () => {
return (
    <div className={styles.History}>
        <div className={styles.HistoryCardBlock}>

            <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={266} height={200} />
        
        <div className={styles.HistoryCard}>
        <div className={styles.cardPercentage}>80%</div>
        <h2>Frontend Developer</h2>
        <p>Resume Name : Resume.pdf</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, libero sed, itaque, minima esse fugiat facilis vero.</p>
        <p>Dated : 2022-06-28</p>   
        </div>

        <div className={styles.HistoryCard}>
        <div className={styles.cardPercentage}>80%</div>
        <h2>Frontend Developer</h2>
        <p>Resume Name : Resume.pdf</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, libero sed, itaque, minima esse fugiat facilis vero.</p>
        <p>Dated : 2022-06-28</p>   
        </div>

        <div className={styles.HistoryCard}>
        <div className={styles.cardPercentage}>80%</div>
        <h2>Frontend Developer</h2>
        <p>Resume Name : Resume.pdf</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, libero sed, itaque, minima esse fugiat facilis vero.</p>
        <p>Dated : 2022-06-28</p>   
        </div>

        <div className={styles.HistoryCard}>
        <div className={styles.cardPercentage}>80%</div>
        <h2>Frontend Developer</h2>
        <p>Resume Name : Resume.pdf</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, libero sed, itaque, minima esse fugiat facilis vero.</p>
        <p>Dated : 2022-06-28</p>   
        </div>

        <div className={styles.HistoryCard}>
        <div className={styles.cardPercentage}>80%</div>
        <h2>Frontend Developer</h2>
        <p>Resume Name : Resume.pdf</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo, libero sed, itaque, minima esse fugiat facilis vero.</p>
        <p>Dated : 2022-06-28</p>   
        </div>

        </div>

    </div>
)
}

export default WithAuthHOC(History);
