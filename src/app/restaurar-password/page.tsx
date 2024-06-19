"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import '../../styles/login.css'

export default function RestorePage() {

  return (
    <>
      
<div
  className="d-flex min-vh-100 flex-column justify-content-center p-4"
  style={{
    backgroundImage: "url('img/background-login.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundColor: '#666'
  }}
  
>
  <div className="container">
    <div className="card mx-auto p-3" style={{width : '26rem'}}>
      <img
        src="img/logo_duoc.png"
        className="card-img-top"
        alt="Logo Duoc"
      />
      <h5 className="text-center fw-bold mt-2">Gestión de Prospectos Admisión</h5>
      <div className="card-body">
        <form >
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control form-control-sm"
              required
              value=""
              id="email"
              name="email"
              placeholder="ejemplo@duocuc.cl"
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-bg-customer-warning d-block">
              Recuperar Password
            </button>
          </div>
          
        </form>
        <div className="mt-3">
          <a
            href="/"
            className="text-decoration-none text-primary fw-bold"
          >
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
