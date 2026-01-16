import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export const Private = () => {

     const [message, setMessage] = useState("");
     const [email, setEmail] = useState("");
     const [error, setError] = useState(null);

     const navigate = useNavigate();

     useEffect(() => {

          const token = localStorage.getItem("jwt-token");

          if (!token) {
               navigate("/login");
               return;
          }

          fetch(`${import.meta.env.VITE_BACKEND_URL}/private`, {


               headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token

               }
          })

               .then(resp => {
                    if (!resp.ok) {
                         throw new Error("Token invalido o expirado");
                    }

                    return resp.json();

               })
               .then(data => {

                    setEmail(data.msg);
                    setMessage("sesion privada para el usuario");

               })
               .catch(err => {
                    setError(err.message);
                    localStorage.removeItem("jwt-token");
                    navigate("/login");


               });

     }, []);

     const handleLogout = () => {
          localStorage.removeItem("jwt-token");
          navigate("/login");
     };

     return (

          <div className=" col-5 container mt-5 ">

               <h1> Zona Privada</h1>

               {error && (<div className="alert alert-danger mt 3">
                    {error}

               </div>

               )}


               {!error && (

                    <div className="alert alert-success mt-3">
                         <p> <strong> Email: </strong> {email}</p>
                         <p><strong>Mensaje: </strong> {message}</p>

                    </div>

               )}
               <button className="btn btn-danger p-2 ms-2 wi" style={{ width: '100px', height: '50px' }} onClick={handleLogout}>
                    Exit
               </button>
          </div>

     );
}













