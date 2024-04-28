import 'bootstrap/dist/css/bootstrap.min.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://knqqlgyngkipshrlcoms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucXFsZ3luZ2tpcHNocmxjb21zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyNDgxOTQsImV4cCI6MjAyOTgyNDE5NH0.F5RNdW8tPyc_l-gjECVawgdyxUPr057uNLdl9If1kio')
export default function homePage() {

    const usuario = supabase.auth.getUser();
    console.log(usuario)

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
  