//"use client"
import { Prospecto } from "@/app/ModelosDatos/Prospecto";
import styles from "./SingleProspect.module.css";
import { useState, useEffect } from "react";
import { obtenerProspecto2, obtenerUser,obtenerCarreras2 } from "@/app/Connection/SupabaseClient";
import { modProspectoAction } from "@/app/Connection/accion";
import Link from "next/link";

interface Params {
    id: string;
}

const SingleProspect = async ({params} : {params: Params}) => {
    const {id} = params;
    /*
    const [prospecto, setProspecto] = useState<Prospecto>();
    const [matriculador, setMatriculador] = useState<any>();
    const [carreras, setCarreras] = useState<any[]>([]);
    useEffect(() => {
        const fecthCarreras  = async () => {
            const {data,error} = await obtenerCarreras2();
            if(data){
                setCarreras(data);
            }else{
                console.log("Error al obtener carreras");
            }
        }
        const fecthProspecto = async () => {
            const prospecto = await obtenerProspecto(parseInt(id));
            setProspecto(prospecto);
            const matriculador = await obtenerUser(prospecto.Matriculador);
            setMatriculador(matriculador);
        }
        fecthProspecto();
        fecthCarreras();
    }, []);*/
    const prospecto :any = await obtenerProspecto2(parseInt(id));

    const matriculador = await obtenerUser(prospecto.Matriculador);

    const {data,error} = await obtenerCarreras2();
    const carreras = data;

    return(
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                {}
                <h2 className={styles.titulo}>Información Prospecto</h2>
                <h2 className={styles.infoProspecto}>{prospecto.rut}-{prospecto.dv}</h2>
                <h2 className={styles.infoProspecto}>{prospecto.nombre} {prospecto.apellido}</h2>
                <h4 className={styles.infoProspectoCarrera}>Carrera de Interes:</h4>
                <h4 className={styles.infoProspectoCarrera}>{prospecto.carr_1 || "Sin carrera de interes"}</h4>
                <h4 className={styles.infoProspectoCarrera}>{prospecto.carr_2 || "Sin carrera de interes"}</h4>
                <h4 className={styles.infoProspectoCarrera}>{prospecto.carr_3 || "Sin carrera de interes"}</h4>
                <h1 className={styles.titulo}>Matriculado por</h1>
                <h2 className={styles.infoProspecto}>{matriculador.nombre} {matriculador.apellido}</h2>
                <h2 className={styles.infoProspecto}>El {prospecto.created_at.toString().slice(0,10).split('-').reverse().join('-')}</h2>
                
            </div>
            <div className={styles.formContainer}>
                <form action={modProspectoAction} className={styles.form}>
                    <label> Nombre Prospecto</label>
                    <input className="text-black" type="text" placeholder={prospecto.nombre} name='nombre' />
                    <label> Apellido Prospecto</label>
                    <input className="text-black" type="text" placeholder={prospecto.apellido} name='apellido' />
                    <label> Correo</label>
                    <input className="text-black" type="text" placeholder={prospecto.correo} name='correo' />
                    <label> Telefono</label>
                    <input className="text-black" type="number" placeholder={prospecto.telefono} name='telefono' />
                    <input type="hidden" name="rut" value={prospecto.rut}/>
                    <input type="hidden" name="dv" value={prospecto.dv}/>
                    <input type="hidden" name="aut_corr" value={prospecto.aut_corr}/>
                    <input type="hidden" name="aut_tel" value={prospecto.aut_tel}/>
                    <input type="hidden" name="Matriculador" value={prospecto.Matriculador}/>
                    <label> Estado</label>
                    <select name='estado' id="estado">
                        <option value={prospecto.estado}>{prospecto.estado}</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Matriculado">Matriculado</option>
                        <option value="No matriculado">No matriculado</option>
                    </select>
                    <select name="carr_1">
                        <option value={prospecto.carr_1}>Carrera de Interes 1</option>
                        <option value="No">Sin carrera de interes</option>
                        {Array.isArray(carreras) && carreras.map((carrera) => (  
                            <option key={carrera.id_carr} value={carrera.nombre_carr}>{carrera.nombre_carr}</option>
                        ))}
                    </select>
                    <select name="carr_2">
                        <option value={prospecto.carr_2}>Carrera de Interes 2</option>
                        <option value="No">Sin carrera de interes</option>
                        {Array.isArray(carreras) && carreras.map((carrera) => (  
                            <option key={carrera.id_carr} value={carrera.nombre_carr}>{carrera.nombre_carr}</option>
                        ))}
                    </select>
                    <select name="carr_3">
                        <option value={prospecto.carr_3}>Carrera de Interes 3</option>
                        <option value="No">Sin carrera de interes</option>
                        {Array.isArray(carreras) && carreras.map((carrera) => (  
                            <option key={carrera.id_carr} value={carrera.nombre_carr}>{carrera.nombre_carr}</option>
                        ))}
                    </select>

                    <button type="submit">Modificar</button>

                </form>
                <Link href="/dashboard/prosp">
                        <button type="button" className={styles.buttonCancel}>
                            Cancelar
                        </button>
                    </Link>
            </div>
        </div>
    );
};
export default SingleProspect;