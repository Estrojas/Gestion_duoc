"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function RestorePage() {

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundImage: 'url("img/background-login.jpg")', backgroundSize: 'cover', backgroundPosition: 'center center', backgroundColor: '#666' }}>
      
      <div className="mx-auto">
          <div className="card p-3" style={{ width: '26rem' }} >
            <div className="card-head">
              <h5 className="text-center fw-bold mt-2">
                Ingresa tu email
              </h5>
            </div>
            <div className="card-body">
              <form >
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control form-control-sm"  required   />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning fw-bold ">Restaurar Contraseña</button>
                </div>
                <div className="mt-3">
                  <Link href="/" className="text-decoration-none mt-3 text-primary fw-bold">
                    Volver al login
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
