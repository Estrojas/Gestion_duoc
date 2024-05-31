import styles from "@/components/Sidebar/Sidebar.module.css"
import Link from "next/link"
import { MdBoy, MdDashboard, MdOutlinePersonSearch, MdPerson } from "react-icons/md"
import MenuLink from "./MenuLink/MenuLink"
import { title } from "process"

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
        title: "Prospectos",
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
        path: "/usuarios",
        icon: <MdPerson/>
      },
      {
        title: "Registrar Usuario",
        path: "/dashboard/registrar-user/",
        icon: <MdOutlinePersonSearch/>
      },
      {
        title: "Modificar Usuario",
        path: "/upd-user/",
        icon: <MdOutlinePersonSearch/>
      },
      
    ]
  },
  {
    title: "Configuración",
    list:[
      {
        title: "Configuracion",
        path: "/usuarios",
        icon: <MdBoy/>
      }
    ]
  }
]
export default function SideBar(){
    return(
        <div className={styles.container}>
          <div className={styles.user}>
            <img className={styles.userImage} src="/img/noavatar.jpg" alt="" width="50" height="50"/>
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
        </div>
    )
}