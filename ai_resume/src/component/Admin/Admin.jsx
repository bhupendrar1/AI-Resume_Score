import styles from './Admin.module.css'
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';

const Admin = () => {
return (
    <div className={styles.Admin}>
    <div className={styles.AdminBlock}>

        <Skeleton variant="rectangular" sx={{ borderRadius: "20px" }} width={280} height={280} />

    <div className={styles.AdminCard}>
        <h2>CodingHunger</h2>
        <p style={{ color: "blue" }}>bhupi2310030@gmail.com</p>
        <h3>Score : 50%</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt optio aliquam adipisci accusamus! A amet tempora eligendi porro, velit fugit doloribus autem numquam quas. Dolorem ab iste consectetur voluptatem debitis.</p>
    </div>

    <div className={styles.AdminCard}>
        <h2>CodingHunger</h2>
        <p style={{ color: "blue" }}>bhupi2310030@gmail.com</p>
        <h3>Score : 50%</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt optio aliquam adipisci accusamus! A amet tempora eligendi porro, velit fugit doloribus autem numquam quas. Dolorem ab iste consectetur voluptatem debitis.</p>
    </div>

    <div className={styles.AdminCard}>
        <h2>CodingHunger</h2>
        <p style={{ color: "blue" }}>bhupi2310030@gmail.com</p>
        <h3>Score : 50%</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt optio aliquam adipisci accusamus! A amet tempora eligendi porro, velit fugit doloribus autem numquam quas. Dolorem ab iste consectetur voluptatem debitis.</p>
    </div>

    <div className={styles.AdminCard}>
        <h2>CodingHunger</h2>
        <p style={{ color: "blue" }}>bhupi2310030@gmail.com</p>
        <h3>Score : 50%</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt optio aliquam adipisci accusamus! A amet tempora eligendi porro, velit fugit doloribus autem numquam quas. Dolorem ab iste consectetur voluptatem debitis.</p>
    </div>

    <div className={styles.AdminCard}>
        <h2>CodingHunger</h2>
        <p style={{ color: "blue" }}>bhupi2310030@gmail.com</p>
        <h3>Score : 50%</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt optio aliquam adipisci accusamus! A amet tempora eligendi porro, velit fugit doloribus autem numquam quas. Dolorem ab iste consectetur voluptatem debitis.</p>
    </div>

    </div>
    </div>
)
}

export default WithAuthHOC(Admin);
