"use client";

import { createClient } from '@supabase/supabase-js';
import '../../styles/login.css'
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'
import Notiflix from 'notiflix';


const supabaseUrl = 'https://pmuoxymxmexmjrpuwiuq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdW94eW14bWV4bWpycHV3aXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNjY5ODcsImV4cCI6MjAyOTY0Mjk4N30.ZXxrLp3Vs6uulEe96ITrN0Vty1PtxzCOAnLJ7ZOQ8qU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function RestorePage() {

  const [email, setEmail] = useState('');
  const router = useRouter();

 

  const recuperarPassword = async (event : any) => {
    event.preventDefault();

    try {
      const resp = await supabase.auth.resetPasswordForEmail(
        email, {
          redirectTo: 'localhost:3000/cambiar-password'
        }
      );
      if (resp) {
        Notiflix.Report.success("Exito", "Revise su correo electronico y siga las instrucciones", "OK")
        console.log('Exito', resp);
      }

    } catch (error) {
      console.error('Error a recuperar la password:', error);
      Notiflix.Report.failure("Problemas", "No fue posible recuperar la password", "OK")
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center p-4 bg-cover bg-center bg-gray-700" style={{
        backgroundImage: "url('img/background-login.jpg')"
      }}>
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <img src="img/logo_duoc.png" alt="Logo Duoc" className="w-20 mx-auto mb-4" />
            <h5 className="text-center font-bold mt-2">Gestión de Prospectos Admisión</h5>
            <div className="card-body">
              <form>
                <div className="mb-4">
                  <label className="block mb-2">Correo Electrónico</label>
                  <input
                    type="email"
                    className="w-full p-2 bg-gray-700 rounded-md"
                    required
                    id="email"
                    name="email"
                    placeholder="ejemplo@duocuc.cl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <button type="submit" onClick={recuperarPassword} className="w-full p-2 bg-yellow-500 rounded-md text-white">
                    Recuperar Password
                  </button>
                </div>
              </form>
              <div className="mt-3">
                <a href="/" className="text-decoration-none text-blue-500 font-bold">
                  Volver al login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
