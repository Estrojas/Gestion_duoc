"use server"
import {eliminarProspecto, ingresarCarrera, ingresarListaEspera, ingresarProspecto, ingresarSeguimiento, updateProspecto, updateCarrera } from './SupabaseClient'
import {Prospecto} from '../ModelosDatos/Prospecto'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {Carrera} from '../ModelosDatos/Carrera'
import {Seguimiento} from '../ModelosDatos/seguimiento'
import {listaEspera} from '../ModelosDatos/listaEspera'

export const ingresarProspectoAction = async (formData: any): Promise<void> => {
    
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
            redirect("/dashboard/prosp");
        } else if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    redirect("/dashboard/prosp");
}

export const borrarProspectoAction = async (formData: any): Promise<void> => {
    console.log("flag")
    const {rut} = Object.fromEntries(formData);

    try{
        console.log("Flag 2")
        const {data, error} = await eliminarProspecto(rut);
        //revalidatepath no funciona por el momento
        revalidatePath("/dashboard/prosp");
        if (data) {
            console.log("Prospecto eliminado");
            console.log("data",data);
            //redirect("/dashboard/prosp");
        } else if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    revalidatePath("/dashboard/prosp");
}

export const modProspectoAction = async (formData: any): Promise<void> => {

    interface UpdatedFields {
        nombre?: any;
        apellido?: any;
        correo?: any;
        telefono?: any;
        estado?: any;
        Matriculador?: any;
        aut_corr?: any;
        aut_tel?: any;
        [key: string]: any; // Esto es una firma de índice
      }
    
    const {
        rut,
        dv,
        nombre,
        apellido,
        correo,
        telefono,
        estado,
        Matriculador,
        aut_corr,
        aut_tel,
    } = Object.fromEntries(formData);

    const updatedFields: UpdatedFields = {
        nombre,
        apellido,
        correo,
        telefono,
        estado,
        Matriculador,
        aut_corr,
        aut_tel
    }

    Object.keys(updatedFields).forEach((key)=>
        (updatedFields[key] === "" || undefined) && delete updatedFields[key]
    )

    try{
        const {error} = await updateProspecto(updatedFields,rut);
        if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    redirect("/dashboard/prosp");
}
export const ingresarCarreraAction = async (formData: any): Promise<void> => {
    
    const {
        id_carr,
        nombre_carr,
        cupos_di,
        cupos_vesp,
        tipo,
        precio_mat
    } = Object.fromEntries(formData);

    try{
        const carrera: Carrera = {
            id_carr: null,
            nombre_carr: '',
            cupos_di: null,
            cupos_vesp: null,
            tipo: '',
            precio_mat: null,
            mat_di: 0,
            mat_vesp: 0
        };
        carrera.id_carr = id_carr;
        carrera.nombre_carr = nombre_carr;
        carrera.cupos_di = cupos_di;
        carrera.cupos_vesp = cupos_vesp;
        carrera.tipo = tipo;
        carrera.precio_mat = precio_mat;

        const {data, error} = await ingresarCarrera(carrera);
        if (data) {
            console.log("data",data);
        } else if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    redirect("/dashboard/carreras");
}

export const ingresarSeguimientoAction = async (formData: any): Promise<void> => {
    
    const {
        rut_pro,
        contactado,
        observaciones,
    } = Object.fromEntries(formData);

    try{
        const seguimiento: Seguimiento = {
            rut_pro: null,
            contactado: false,
            observaciones: "",
        };
        seguimiento.rut_pro = rut_pro;
        seguimiento.contactado = contactado === "Si" ? true : false;
        seguimiento.observaciones = observaciones


        const {data, error} = await ingresarSeguimiento(seguimiento);
        if (data) {
            console.log("data",data);
        } else if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    redirect("/dashboard/prosp");
}

export const ingresarListaEsperaAction = async (formData: any): Promise<void> => {
    
    const {
        rut_pro_lista,
        id_carr_lista,
    } = Object.fromEntries(formData);

    try{
        const lista: listaEspera = {
            rut_pro_lista: null,
            id_carr_lista: "",
        };
        lista.rut_pro_lista = rut_pro_lista;
        lista.id_carr_lista = id_carr_lista;


        const {data, error} = await ingresarListaEspera(lista);
        if (data) {
            console.log("data",data);
        } else if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    redirect("/dashboard/prosp");
}
export const modCarreraAction = async (formData: any): Promise<void> => {
    interface UpdatedFields {
        nombre_carr?: any;
        cupos_di?: any;
        cupos_vesp?: any;
        tipo?: any;
        precio_mat?: any;
        mat_di?: any;
        mat_vesp?: any;
        [key: string]: any; // Esto es una firma de índice
      }

      const {
        id_carr,
        nombre_carr,
        cupos_di,
        cupos_vesp,
        tipo,
        precio_mat,
        mat_di,
        mat_vesp
      } = Object.fromEntries(formData);

    const updatedFields: UpdatedFields = {
        id_carr,
        nombre_carr,
        cupos_di,
        cupos_vesp,
        tipo,
        precio_mat,
        mat_di,
        mat_vesp
    }

    Object.keys(updatedFields).forEach((key)=>
        (updatedFields[key] === "" || undefined) && delete updatedFields[key]
    )

    try{
        console.log("updated",updatedFields)
        const {error} = await updateCarrera(updatedFields,id_carr);
        if (error) {
            console.log("error",error);
        }
    } catch(error) {
        console.log("Error")
        console.error(error);
    }
    redirect("/dashboard/carreras");

}


