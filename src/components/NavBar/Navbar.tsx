'use client'

import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { MdNotifications, MdPublic, MdSearch } from 'react-icons/md';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.tittle}>Gestion Prospectos Duoc</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch/>
          <input type="text" placeholder="Buscar" className={styles.input}/>
        </div>
        <div className={styles.icons}>
          <MdPublic size={20}/>
          <MdNotifications size={20}/>
        </div>
      </div>
    </div>
  );
};