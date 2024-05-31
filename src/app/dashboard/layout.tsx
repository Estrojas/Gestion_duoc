import SideBar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/NavBar/Navbar";
import { ReactNode } from "react";
import styles from '@/components/dashboard.module.css';

const layout = ({ children } : {children: ReactNode}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <SideBar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
            </div>
        </div>
    );
}
export default layout;