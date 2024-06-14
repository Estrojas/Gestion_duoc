'use client'
import styles from './Pagination.module.css';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

const Pagination = ({}) => {

    const searchParams = useSearchParams();
    const {replace} = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") || "1";

    const params = new URLSearchParams(searchParams);
    const ITEM_PER_PAGE = 10;

    const hasPrev = ITEM_PER_PAGE * (parseInt(page)-1) > 0;
    const hasNext = ITEM_PER_PAGE * (parseInt(page)-1) + ITEM_PER_PAGE < 1000; 

    const handleChangePage = (type: string) => {
        if(type === "prev"){
            params.set("page",`${parseInt(page)-1}`);
        }else{
            params.set("page",`${parseInt(page)+1}`);
        }
        replace(`${pathname}?${params}`);
    }
    return(
        <div className={styles.container}>
            <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Anterior</button>
            <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>Siguiente</button>
        </div>
    )
}
export default Pagination;