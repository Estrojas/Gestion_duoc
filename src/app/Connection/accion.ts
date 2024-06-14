import { ingresarProspecto } from './SupabaseClient'
import {Prospecto} from '../ModelosDatos/Prospecto'

export const ingresarProspectoAction = async (formData: any): Promise<void> => {
    "use server"
    const {
        rut,
        dv,
        nombre,
        apellido,
        correo,
        telefono,
        estado,
        aut_corr,
        aut_tel,
    } = Object.fromEntries(formData);

    try{
        console.log("HOLA ESTEBAN");
        const prospecto: Prospecto = {
            rut: null,
            dv: '',
            nombre: '',
            apellido: '',
            correo: '',
            telefono: null,
            estado: 'Pendiente',
            Matriculador: null,
            aut_corr: false,
            aut_tel: false
        };
        prospecto.rut = rut;
        prospecto.dv = dv;
        prospecto.nombre = nombre;
        prospecto.apellido = apellido;
        prospecto.correo = correo;
        prospecto.telefono = telefono;
        prospecto.estado = estado;
        prospecto.Matriculador = 19048645;
        prospecto.aut_corr = aut_corr === "true" ? true : false;
        prospecto.aut_tel = aut_tel === "true" ? true : false;
        console.log("flag");
        console.log(prospecto);

        const {data, error} = await ingresarProspecto(prospecto);
        if (data) {
            console.log("data",data);
        } else if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
}