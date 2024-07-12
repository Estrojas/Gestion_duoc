// supabaseClient.ts

import { createClient } from '@supabase/supabase-js';
import { User } from '../ModelosDatos/User';
import { Prospecto } from '../ModelosDatos/Prospecto';
import { Carrera } from '../ModelosDatos/Carrera'
import { Seguimiento } from '../ModelosDatos/seguimiento'
import {listaEspera} from '../ModelosDatos/listaEspera'


const supabaseUrl = 'https://pmuoxymxmexmjrpuwiuq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdW94eW14bWV4bWpycHV3aXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjY5ODcsImV4cCI6MjAyOTY0Mjk4N30.ZXxrLp3Vs6uulEe96ITrN0Vty1PtxzCOAnLJ7ZOQ8qU';


const supabase = createClient(supabaseUrl, supabaseKey);


    export async function ingresarUser(user: User) {
    const { data, error } = await supabase
      .from('Usuarios')
      .insert([user]);
    return { data, error };
  }

    export async function obtenerUser(rut: number) {
        const { data, error } = await supabase
        .from('Usuarios')
        .select('*')
        .eq('rut', rut);
        if (data){
          return data[0];}
        else{
          return { data: null, error };
        }
    }
    export async function obtenerUserForEmail(email: string) {
      const { data, error } = await supabase
      .from('Usuarios')
      .select('*')
      .eq('correo', email);
      return { data, error };
  }

    export async function obtenerUsuarios(){
      let { data, error } = await supabase
      .from('Usuarios')
      .select('*')
      return { data, error };     
    }
    export async function obtener(q: string,page: number){
      const regex = new RegExp(q,"i");
      const ITEM_PER_PAGE = 10;
      const start = (page - 1) * ITEM_PER_PAGE;
      const end = start + ITEM_PER_PAGE - 1;
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .range(start, end);
        return { data, error };
      }else{
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .ilike('nombre', q)
        .range(start, end);
        return { data, error };
      }
    }
    export async function obtener2(q: string,page: number){
      const regex = new RegExp(q,"i");
      const ITEM_PER_PAGE = 10;
      const start = (page - 1) * ITEM_PER_PAGE;
      const end = start + ITEM_PER_PAGE - 1;
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const { data, error } = await supabase
        .from('Usuarios')
        //.select('*')
        .select('rut,dv, nombre, apellido, correo, telefono, rol, created_at')
        .range(start, end);
        return { data, error };
      }else{
        const { data, error } = await supabase
        .from('Usuarios')
        //.select('*')
        .select('rut,dv, nombre, apellido, correo, telefono, rol, created_at')
        .ilike('nombre', q)
        .range(start, end);
        return { data, error };
      }
    }
    export async function obtenerNumeroUsers() {
      const { data, error } = await supabase
      .from('User')
      .select('*');
      console.log(data)
      if(data){
        return data.length;
      }else{
        return 0;
      }
      //return { data, error };
  }
    export async function actualizarUser(user: User) {
        const { data, error } = await supabase
        .from('User')
        .update(user)
        .eq('rut', user.rut);
        return { data, error };
    }
    export async function eliminarUser(rut: number) {
        const { data, error } = await supabase
        .from('Usuarios')
        .delete()
        .eq('rut', rut);
        console.log("data funcion",data);
        console.log("error funcion",error);
        return { data, error };
    }

    export async function obtenerUserRut(rut: number) {
        const { data, error } = await supabase
        .from('Usuarios')
        .select('rut')
        .eq('rut', rut);
        return { data, error };
    }

    export async function login(email: string, password: string){
      const { data, error } = await supabase
      .from('User')
      .select('correo, password')
      .eq('correo', email)
      .eq('password', password)

      if (error) {
        console.error('Error fetching user:', error);
        return {data: null, error};
      }else{
        console.log(data);
        return data;
      }
    }

    export async function ingresarProspecto(prospecto: Prospecto) {
      console.log("flag");
        const { data, error } = await supabase
        .from('Prospectos')
        .insert([prospecto]);
        console.log("data",data);
        console.log("error",error);
        return { data, error };
    }
    export async function obtenerProspecto(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*, telefono, carr_1, carr_2, carr_3')
        //.select('rut, dv, nombre, apellido, correo, telefono, estado, Matriculador, created_at , aut_tel, aut_corr, carr_1, carr_2, carr_3')
        .eq('rut', rut);
        if (data){
          return data[0];
        }else{
          return { data: null, error };
        }
    }
    export async function obtenerProspecto2(rut: number) {
      const { data, error } = await supabase
      .from('Prospectos')
      .select('*')
      .eq('rut', rut);
      if (data){
        return data[0];
      }else{
        return { data: null, error };
      }
    }
    export async function obtenerProspectos() {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*');
        //console.log(data);
        return { data, error };
    }

    export async function actualizarProspecto(prospecto: Prospecto) {
        const { data, error } = await supabase
        .from('Prospectos')
        .update(prospecto)
        .eq('rut', prospecto.rut);
        return { data, error };
    }
    export async function updateProspecto(data: any, rut: number) {
        const { error } = await supabase
        .from('Prospectos')
        .update(data)
        .eq('rut', rut);
        return { error };

    }

    export async function eliminarProspecto(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .delete()
        .eq('rut', rut);

        return { data, error };
    }

    export async function obtenerProspectosAtendidosPor(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .eq('atendidoPor', rut);
        return { data, error };
    }

    export async function signup(User: User){
        const { data, error } = await supabase.auth.signUp({
            email: User.correo,
            password: User.password
        });
        ingresarUser(User);
        if (error) {
            console.error('Error fetching user:', error);
            return {data: null, error};
        }else{
            console.log(data);
            return {data, error};
        }
    }
    export async function numeroDeProspectos(){
        const { data, error } = await supabase 
        .from('Prospectos')
        .select('*',{count: 'exact'});
        return {data,error};
    }

    export async function obtenerProspectosPorEstado(estado: string){
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*', {count: 'exact'})
        .eq('estado', estado);
        return { data, error };
    }
    export async function obtenerUltimosProspectos(){
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .order('created_at', {ascending: false})
        .range(0, 6);
        return { data, error };
    }
    export async function ingresarCarrera(carrera: Carrera) {
        const { data, error } = await supabase
        .from('Carreras')
        .insert([carrera]);
        return { data, error };
    }

    export async function obtenerCarreras(q: string,page: number){
      const regex = new RegExp(q,"i");
      const ITEM_PER_PAGE = 10;
      const start = (page - 1) * ITEM_PER_PAGE;
      const end = start + ITEM_PER_PAGE - 1;
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const { data, error } = await supabase
        .from('Carreras')
        .select('*')
        .order('nombre_carr', {ascending: true})
        .range(start, end);
        return { data, error };
      }else{
        const { data, error } = await supabase
        .from('Carreras')
        .select('*')
        .ilike('nombre', q)
        .range(start, end);
        return { data, error };
      }
    }
    export async function obtenerCarrera(id_carr: string) {
        const { data, error } = await supabase
        .from('Carreras')
        //.select('*')
        .select('id_carr, nombre_carr, cupos_di, cupos_vesp, precio_mat, mat_di, mat_vesp, tipo')
        .eq('id_carr', id_carr);
        if (data){
          return data[0];
        }else{
          return { data: null, error };
        }
    }

    export async function obtenerAllCarreras(){
        const { data, error } = await supabase
        .from('Carreras')
        //.select('*')
        .select('id_carr, nombre_carr, cupos_di, cupos_vesp, precio_mat, mat_di, mat_vesp, tipo')
        if(data){
          return data;
        }else{
          return { data: null, error };
        }
    }
    export async function obtenerCarreras2(){
        const { data, error } = await supabase
        .from('Carreras')
        .select('*')
        return { data, error };
    }
    export async function ingresarSeguimiento(seguimiento: Seguimiento) {
        const { data, error } = await supabase
        .from('seguimiento')
        .insert([seguimiento]);
        console.log("La data es ",data);
        console.log("El error es ",error);
        return { data, error };
    }
    export async function obtenerSeguimiento(id: number) {
        const { data, error } = await supabase
        .from('seguimiento')
        .select('id, rut_pro, observaciones, contactado, created_at, Prospectos (rut , nombre, apellido)') 
        .eq('id', id);
        if (data){
          return data[0];
        }else{
          return { data: null, error };
        }
    }
    export async function obtenerSeguimientos(q: string,page: number){
      const regex = new RegExp(q,"i");
      const ITEM_PER_PAGE = 10;
      const start = (page - 1) * ITEM_PER_PAGE;
      const end = start + ITEM_PER_PAGE - 1;
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const { data, error } = await supabase
        .from('seguimiento')
        .select('*')
        .range(start, end);
        return { data, error };
      }else{
        
        const { data, error } = await supabase
        .from('seguimiento')
        .select('*')
        .ilike('rut_pro', q)
        .range(start, end);
        return { data, error };
      }
    }

    export async function obtenerSeguimientosPrueba(q: string,page: number){
      const regex = new RegExp(q,"i");
      const ITEM_PER_PAGE = 10;
      const start = (page - 1) * ITEM_PER_PAGE;
      const end = start + ITEM_PER_PAGE - 1;
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const { data, error } = await supabase
        .from('seguimiento')
        .select('id, rut_pro, observaciones, contactado, created_at, Prospectos (rut , nombre, apellido)')   
        .order('created_at', {ascending: false})
        .range(start, end);
        return { data, error };
      }else{
        
        const { data, error } = await supabase
        .from('seguimiento')
        .select('id, rut_pro, observaciones, contactado, created_at, Prospectos (rut , nombre, apellido)')
        .eq('rut_pro', parseInt(q))
        //.or(`rut_pro.eq.${parseInt(q)},Prospectos(nombre).ilike.${q}`)
        //.ilike('rut_pro', q)
        .order('created_at', {ascending: false})
        .range(start, end);
        return { data, error };
      }
    }
    export async function obtenerSeguimientosPorProspecto(q: string,page: number){
      const regex = new RegExp(q,"i");
      const ITEM_PER_PAGE = 10;
      const start = (page - 1) * ITEM_PER_PAGE;
      const end = start + ITEM_PER_PAGE - 1;
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const { data, error } = await supabase
        .from('seguimiento')
        .select('id, rut_pro, observaciones, contactado, created_at, Prospectos (rut , nombre, apellido)') 
        .order('created_at', {ascending: false})
        .range(start, end);
        return { data, error };
      }else{
        
        const { data, error } = await supabase
        .from('seguimiento')
        .select('*')
        .ilike('rut_pro', q)
        .order('created_at', {ascending: false})
        .range(start, end);
        return {data, error }
      }
  }
    export async function ingresarListaEspera(listaEspera: listaEspera) {
        const { data, error } = await supabase
        .from('lista_espera')
        .insert([listaEspera]);
        return { data, error };
    }
    export async function obtenerListaEspera(id_carr_lista: String) {
        const { data, error } = await supabase
        .from('lista_espera')
        .select('rut_pro_lista, id_carr_lista, created_at, Prospectos (nombre, apellido, telefono, estado)')
        .eq('id_carr_lista', id_carr_lista)
        .order('created_at', {ascending: true});
        if (data){
          console.log("data",data)
          return data;
        }else{
          return { data: null, error };
        }
      }

    export async function updateCarrera(data: any, id_carr: string) {
        const { error } = await supabase
        .from('Carreras')
        .update(data)
        .eq('id_carr', id_carr);
        return { error };
    }
    
    export async function obtenerProspectosPorMatriculador(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .eq('Matriculador', rut);
        return { data, error };
    }
    export async function obtenerProsPend(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .eq('Matriculador', rut)
        .eq('estado', 'Pendiente')
        .order('created_at', {ascending: true});
        return { data, error };
    }
    export async function obtenerProsMat(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .eq('Matriculador', rut)
        .eq('estado', 'Matriculado');
        return { data, error };
    }
    export async function obtenerProsNotMat(rut: number) {
      const { data, error } = await supabase
      .from('Prospectos')
      .select('*')
      .eq('Matriculador', rut)
      .eq('estado', 'No Matriculado');
      return { data, error };
  }
  export async function updateUsuario(data: any, rut: number) {
    const { error } = await supabase
    .from('Usuarios')
    .update(data)
    .eq('rut', rut);
    return { error };

}
  export async function deleteCarrera(id_carr: string) {
    const { data, error } = await supabase
    .from('Carreras')
    .delete()
    .eq('id_carr', id_carr);
    return { data, error };
  }

  export async function obtenerProspectoForEmail(rut : any){
    const { data, error } = await supabase
    .from('Prospectos')
    .select()
    .eq('rut', rut);
    return { data, error };
  }

  export async function eliminarSeguimiento(id: number) {
    const { data, error } = await supabase
    .from('seguimiento')
    .delete()
    .eq('id', id);
    return { data, error };
  }

  export async function eliminarListaEspera(rut_pro_lista: number, id_carr_lista: string) {
    const { data, error } = await supabase
    .from('lista_espera')
    .delete()
    .eq('rut_pro_lista', rut_pro_lista)
    .eq('id_carr_lista', id_carr_lista);
    return { data, error };
  }
