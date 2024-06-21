"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react'; // Importa useState de react
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import '../styles/login.css'
import { obtenerUserForEmail } from './Connection/SupabaseClient';

const supabaseUrl = 'https://pmuoxymxmexmjrpuwiuq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdW94eW14bWV4bWpycHV3aXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjY5ODcsImV4cCI6MjAyOTY0Mjk4N30.ZXxrLp3Vs6uulEe96ITrN0Vty1PtxzCOAnLJ7ZOQ8qU';
const supabase = createClient(supabaseUrl, supabaseKey);
export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [apellido, setApellido] = useState('');

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      console.log("email",email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error de inicio de sesión:', error.message);
        Swal.fire({
          title: "Problemas.",
          text: "Email y/o contraseña incorrectos",
          icon: "error"
        });
      } else {
        console.log('Usuario autenticado:', data.user);
        localStorage.setItem('ID', data.user.id)
        if (data.user){
          const {data, error} = await obtenerUserForEmail(email || "");
          if(data){
            localStorage.setItem('Nombre', data[0].nombre);
            localStorage.setItem('Apellido', data[0].apellido);
            localStorage.setItem('Rol', data[0].rol);
            localStorage.setItem('Rut', data[0].rut);
          }
        }
        if (data.user && data.user.email){
          localStorage.setItem('Email', data.user.email)
        }
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <>
      <div className="d-flex min-vh-100 flex-column justify-content-center p-4" style={{
        backgroundImage: "url('img/background-login.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundColor: '#666'
      }}>
      <div className="container">

          <div id="contenedorMensajes" className="text-center mt-5"></div>

          <div className="card mx-auto p-3" style={{ width: '26rem', background : '#182237', color : 'white' }}>
              <img src="img/logo_duoc.png" className="card-img-top" alt="Logo Duoc" width="80" />
              <h5 className="text-center fw-bold mt-2">Gestión de Prospectos Admisión</h5>
              <div className="card-body">
                  <form >
                      <div className="mb-3">
                          <label className="form-label">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                  className="bi bi-envelope-at-fill me-2" viewBox="0 0 16 16">
                                  <path
                                      d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                                  <path
                                      d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791" />
                              </svg>
                              Correo Electrónico
                          </label>
                          <input type="email"  placeholder="ejemplo@duocuc.cl" className="form-control form-control-sm" id="email"
                              name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      </div>
                      <div className="mb-3">
                          <label className="form-label">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                  className="bi bi-shield-lock-fill me-2" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd"
                                      d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5" />
                              </svg>
                              Contraseña
                          </label>
                          <input type="password"   placeholder="********" className="form-control form-control-sm" id="password"
                              name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <div className="d-grid gap-2">
                          <button type="submit" className="btn btn-bg-customer  fw-bold" onClick={handleLogin}>
                              Ingresar
                          </button>
                      </div>
                      <div className="mt-3">
                          <a href="/restaurar-password" className="btn  btn-bg-customer-warning d-block" >
                              Restaurar Contraseña
                          </a>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </div>

    </>
  );
}
