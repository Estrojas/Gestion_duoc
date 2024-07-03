'use client'
import { obtenerUser, obtenerProsPend,obtenerProsMat,
        obtenerProspectosPorMatriculador } from "@/app/Connection/SupabaseClient";
import Card from "@/components/Card/Card";
import CardPorc from "@/components/CardPorc/CardPorc";
import ListaPendientes from "@/components/ListaPendientes/ListaPendientes";
import styles from './repUsers.module.css';
import { useState , useEffect } from "react";

interface Params {
    id: string;
}

const reportesUserPage = ({params} : {params: Params}) => {
    
    const {id} = params;

    const [user , setUser] = useState<any>();

    const [numTotalProspectos, setNumTotalProspectos] = useState<number>(0);
    const [numMatriculados, setNumMatriculados] = useState<number>(0);
    const [numPend, setNumPend] = useState<number>(0);

    const [dataProps, setDataProps] = useState<any[]>([]);

    useEffect(() => {
        const fecthProspecto = async () => {
            const {data, error} = await obtenerProspectosPorMatriculador(parseInt(id));
            if(data){
                setDataProps(data);
                setNumTotalProspectos(data.length);
            }
        };
        const fecthUser = async () => {
            const data = await obtenerUser(parseInt(id));
            if(data){
                setUser(data);
            }
        };
        
        const fetchData = async () => {
            const {data, error} = await obtenerProsMat(parseInt(id));
            if(data){
                setNumMatriculados(data.length);
            }else{
                console.log(error);
            }
        };
        const fetchPend = async () => {
            const {data, error} = await obtenerProsPend(parseInt(id));
            if(data){
                setNumPend(data.length);
                setDataProps(data);
            }else{
                console.log(error);
            }
        }
        fecthUser();
        fecthProspecto();
        fetchData();
        fetchPend();
    }, []);


    
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <h1 className={styles.titulo}>Reportes {user?.nombre} {user?.apellido}</h1>
                <div className={styles.cards}>
                    <Card numero_prospectos={numTotalProspectos} titulo="Numero de Prospectos Atendidos"/>
                    <Card numero_prospectos={numMatriculados} titulo="N° Prospectos Matriculados"/>
                    <Card numero_prospectos={numPend} titulo="N° Prospectos Pendientes"/>
                    <CardPorc numero_prospectos={Math.round((numMatriculados/numTotalProspectos)*100)} titulo="Porcentaje de Conversion"/>
                </div>
                <ListaPendientes id={id}/>
            </div>
        </div>
    );
    }
export default reportesUserPage;