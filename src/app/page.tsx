"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react'; // Importa useState de react
import Link from 'next/link';
import Swal from 'sweetalert2'
import  { useRouter } from 'next/navigation'

const supabase = createClient('https://knqqlgyngkipshrlcoms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucXFsZ3luZ2tpcHNocmxjb21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNDgxOTQsImV4cCI6MjAyOTgyNDE5NH0.F5RNdW8tPyc_l-gjECVawgdyxUPr057uNLdl9If1kio')
export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleLogin = async (event : any) => {
    event.preventDefault();
    
    try {
      const { data,error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error de inicio de sesión:', error.message);
        Swal.fire({
          title: "Problemas..",
          text: "Email y/o password incorrectos",
          icon: "error"
        });
      } else {
        console.log('Usuario autenticado:', data.user);
        localStorage.setItem('ID' , data.user.id)
        router.push('/home');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundImage: 'url("img/background-login.jpg")', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundColor: '#666' }}>
        <div className="mx-auto">
          <div className="card p-3 b" style={{ width: '26rem' }} >
            <img src="img/logo-duoc-sin-bg.png" className="card-img-top"  alt="Logo Duoc" />
            <h5 className="text-center fw-bold mt-2">
              Gestión de Prospectos Admisión
            </h5>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control form-control-sm" required  value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label> 
                  <input type="password" className="form-control form-control-sm" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-success  fw-bold">Ingresar</button>
                </div>
                <div className="mt-3">
                  <Link href="restaurar-password" className="text-decoration-none mt-3 text-primary fw-bold">
                    ¿Haz olvidado tu contraseña? Click aqui!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
