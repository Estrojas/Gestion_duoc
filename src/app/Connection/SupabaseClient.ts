// supabaseClient.ts

import { createClient } from '@supabase/supabase-js';
import { User } from '../ModelosDatos/User';
import { Prospecto } from '../ModelosDatos/Prospecto';

const supabaseUrl = 'https://pmuoxymxmexmjrpuwiuq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdW94eW14bWV4bWpycHV3aXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjY5ODcsImV4cCI6MjAyOTY0Mjk4N30.ZXxrLp3Vs6uulEe96ITrN0Vty1PtxzCOAnLJ7ZOQ8qU';
const supabase = createClient(supabaseUrl, supabaseKey);


    export async function ingresarUser(user: User) {
    const { data, error } = await supabase
      .from('User')
      .insert([user]);
    return { data, error };
  }

    export async function obtenerUser(rut: number) {
        const { data, error } = await supabase
        .from('User')
        .select('*')
        .eq('rut', rut);
        return { data, error };
    }
    export async function obtenerUsers() {
        const { data, error } = await supabase
        .from('User')
        .select('*');
        return { data, error };
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
        .from('User')
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
        const { data, error } = await supabase
        .from('Prospecto')
        .insert([prospecto]);
        return { data, error };
    }
    export async function obtenerProspecto(rut: number) {
        const { data, error } = await supabase
        .from('Prospecto')
        .select('*')
        .eq('rut', rut);
        return { data, error };
    }
    export async function obtenerNombreProspecto(rut: number) {
        const { data, error } = await supabase
        .from('Prospecto')
        .select('nombre, apellido')
        .eq('rut', rut);
    
      if (error) {
        console.error('Error fetching user:', error);
        return { data: null, error };
      }
    
      const nombreCompleto = data ? `${data[0].nombre} ${data[0].apellido}` : null;
    
      return { data: nombreCompleto, error: null };
    }
    export async function obtenerProspectos() {
        const { data, error } = await supabase
        .from('Prospecto')
        .select('*');
        return { data, error };
    }
    export async function obtenerAdmisionEspecial() {
        const { data, error } = await supabase
        .from('Prospecto')
        .select('*')
        .eq('tipoAdmision', 'Especial');
        return { data, error };
    }

    export async function actualizarProspecto(prospecto: Prospecto) {
        const { data, error } = await supabase
        .from('Prospecto')
        .update(prospecto)
        .eq('rut', prospecto.rut);
        return { data, error };
    }

    export async function eliminarProspecto(rut: number) {
        const { data, error } = await supabase
        .from('Prospecto')
        .delete()
        .eq('rut', rut);
        return { data, error };
    }

    export async function obtenerProspectosAtendidosPor(rut: number) {
        const { data, error } = await supabase
        .from('Prospecto')
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