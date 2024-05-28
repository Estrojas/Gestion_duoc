import Link from "next/link"
export default function SideBar(){
    return(
        <ul>
            {" "}
            Gestion Prospectos Duoc
            <li>
              <Link href="/registrar-user"> User</Link>
            </li>
            <li>
              <Link href="prospectos">Prospectos</Link>
            </li>
          </ul>
    )
}