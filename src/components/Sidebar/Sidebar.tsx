'use client';
import styles from "@/components/Sidebar/Sidebar.module.css"
import Link from "next/link"
import { MdBoy, MdDashboard, MdLogout, MdOutlinePersonAdd, MdPerson, MdEmail,MdAddCall, MdCardTravel,MdOutlineViewList } from "react-icons/md"
import MenuLink from "./MenuLink/MenuLink"
import { title } from "process"
import Image from "next/image"
import { useEffect, useState } from "react"

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard/>
      },
      {
        title: "Formulario Prospectos",
        path: "/formulario_prospectos",
        icon: <MdOutlineViewList/>
      },
      
    ],
  },
  {
    title: "Usuarios",
    list:[
      {
        title: "Usuarios",
        path: "/dashboard/users",
        icon: <MdPerson/>
      },
      
    ]
  },
  {
    title: "Prospectos",
    list:[
      {
        title: "Ver Prospectos",
        path: "/dashboard/prosp",
        icon: <MdPerson/>
      },
      {
        title: "Registrar Prospecto",
        path: "/dashboard/prosp/add",
        icon: <MdOutlinePersonAdd/>
      },
      
    ]
  },
  {
    title: "Otros",
    list:[
      {
        title: "Enviar Mail",
        path: "/dashboard/send-email",
        icon: <MdEmail/>
      },
      {
        title: "Seguimientos",
        path: "/dashboard/seguimientos",
        icon: <MdAddCall/>
      },
      {
        title: "Carreras",
        path: "/dashboard/carreras",
        icon: <MdCardTravel/>
      }
    ]
  }
]


export default function SideBar(){

  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [apellido, setApellido] = useState('');



  useEffect(() => {
      setNombre(localStorage.getItem('Nombre') || '');
      setRol(localStorage.getItem('Rol') || '');
      setApellido(localStorage.getItem('Apellido') || '');
  }, []);
  


    return(
        <div className={styles.container}>
          <div className={styles.user}>
            <Image className={styles.userImage} src="/img/noavatar.jpg" alt="" width="50" height="50"/>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{nombre} {apellido}</span>
              <span className={styles.userRole}> {rol}</span>
            </div>
          </div>
          <ul className={styles.list}>
            {menuItems.map(
              cat=>(
                <li key={cat.title}>
                  <span className={styles.cat}>
                  {cat.title}
                  </span>
                  {cat.list.map((item)=>(
                    <MenuLink item={item} key={item.title}/>
                  ))}
                </li>
              ))}
          </ul>
          <button className={styles.logout}>
            <MdLogout/>
            Cerrar Sesión
          </button>
        </div>
    )
}