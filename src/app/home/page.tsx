import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';
import SupabaseClient from '@supabase/supabase-js';
import {User} from '../ModelosDatos/User';
import { ingresarUser, obtenerNombreUser, obtenerUser, obtenerUsers } from '../Connection/SupabaseClient';


const supabase = createClient('https://knqqlgyngkipshrlcoms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucXFsZ3luZ2tpcHNocmxjb21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNDgxOTQsImV4cCI6MjAyOTgyNDE5NH0.F5RNdW8tPyc_l-gjECVawgdyxUPr057uNLdl9If1kio')
export default function homePage() {

    const usuario = supabase.auth.getUser();
    console.log(usuario)

    const newUser: User = {
      rut: 12345678,
      dv: 'K',
      correo: 'test@test.com',
      password: 'password',
      nombre: 'Test',
      apellido: 'User',
      rol: 'Administrativo',
      telefono: 123456789,
    };
    const ingresarUsuario = async () => {
      const { data, error } = await ingresarUser(newUser);
  
      if (error) {
        console.error('Error creating user:', error);
      } else {
        console.log('User created:', data);
      }
    };
  
    //ingresarUsuario();

    const obtenerUsuario = async (rut: number) => {
      const {data, error} = await obtenerUser(rut);
      if(error){
        console.error('Error getting user:', error);
      } else {
        console.log('User found:', data);
      }
      return data;
    };
    /*obtenerUsuario(12345678); Funciona, lo muestra por la consola del prompt*/

    const obtenerUsarios = async () => {
      const {data, error} = await obtenerUsers();
      if(error){
        console.error('Error getting users:', error);
      } else {
        console.log('Users found:', data);
      }
    };
    /*obtenerUsarios();*/
    const obtenerNombreUsuario = async (rut: number) => {
      const {data, error} = await obtenerNombreUser(rut);
      if(error){
        console.error('Error getting user:', error);
      } else {
        console.log('User found:', data);
      }
    };
    obtenerNombreUsuario(12345678);
    

    return (
      <>
        <div className="mx-auto">
            <div className="card p-3" style={{ width: '26rem' }} >
              <div className="card-head">
                <h5 className="text-center fw-bold mt-2">
                  Bienvenido: 
                </h5>
              </div>
              <div className="card-body">
              </div>
            </div>
          </div>
      </>
    );
  }
