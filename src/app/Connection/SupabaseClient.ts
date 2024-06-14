// supabaseClient.ts

import { createClient } from '@supabase/supabase-js';
import { User } from '../ModelosDatos/User';
import { Prospecto } from '../ModelosDatos/Prospecto';

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
    export async function obtener2(q: string){
      const regex = new RegExp(q,"i");
      console.log(q)
      if(q === ""){ //Si no hay nada en el input
        const data = await supabase
        .from('Usuarios')
        .select('*');
        return data;
      }else{
        const { data, error } = await supabase
        .from('Usuarios')
        .select('*')
        .ilike('nombre', q);
        return data;
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
        .from('User')
        .delete()
        .eq('rut', rut);
        return { data, error };
    }
    export async function obtenerNombreUser(rut: number) {
        const { data, error } = await supabase
        .from('User')
        .select('nombre, apellido')
        .eq('rut', rut);
    
      if (error) {
        console.error('Error fetching user:', error);
        return { data: null, error };
      }
    
      const nombreCompleto = data ? `${data[0].nombre} ${data[0].apellido}` : null;
    
      return { data: nombreCompleto, error: null };
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
        return { data, error };
    }
    export async function obtenerProspecto(rut: number) {
        const { data, error } = await supabase
        .from('Prospectos')
        .select('*')
        .eq('rut', rut);
        return { data, error };
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