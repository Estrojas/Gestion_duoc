"use client"
import { usePathname } from "next/navigation";
import styles from "./MenuLink.module.css"
import Link from "next/link";

const MenuLink = ({item}: any) => {
    const pathname = usePathname();
    return(
        <Link className={styles.container} href={item.path}>
            {item.icon}
            {item.title}
        </Link>
    )
}
export default MenuLink;