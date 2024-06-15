import styles from "@/components/Sidebar/Sidebar.module.css"
import Link from "next/link"
import { MdBoy, MdDashboard, MdLogout, MdOutlinePersonAdd, MdOutlinePersonSearch, MdPerson } from "react-icons/md"
import MenuLink from "./MenuLink/MenuLink"
import { title } from "process"
import Image from "next/image"

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
        path: "/prospectos",
        icon: <MdBoy/>
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
      {
        title: "Registrar Usuario",
        path: "/dashboard/users/registrar-user/",
        icon: <MdOutlinePersonAdd/>
      },
      {
        title: "Modificar Usuario",
        path: "/dashboard/users/upd-user/",
        icon: <MdOutlinePersonSearch/>
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
      {
        title: "Modificar Prospecto",
        path: "/dashboard/upd-user/",
        icon: <MdOutlinePersonSearch/>
      },
      
    ]
  },
  {
    title: "Otros",
    list:[
      {
        title: "Enviar Mail",
        path: "/dashboard/send-email",
        icon: <MdBoy/>
      },
      {
        title: "Seguimientos",
        path: "/dashboard/seguimientos",
        icon: <MdBoy/>
      },
      {
        title: "Carreras",
        path: "/dashboard/carreras",
        icon: <MdBoy/>
      }
    ]
  }
]
export default function SideBar(){
    return(
        <div className={styles.container}>
          <div className={styles.user}>
            <Image className={styles.userImage} src="/img/noavatar.jpg" alt="" width="50" height="50"/>
            <div className={styles.userDetails}>
              <span className={styles.userName}> Esteban Rojas</span>
              <span className={styles.userRole}> Administrador</span>
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