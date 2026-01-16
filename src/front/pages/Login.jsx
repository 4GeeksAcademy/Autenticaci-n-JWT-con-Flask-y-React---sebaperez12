import { useState } from "react";
import { UNSAFE_ErrorResponseImpl, useNavigate } from "react-router-dom";


export const Login = () => {


     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [err, setErr] = useState(null);
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setErr(null);

          try {
               const backend = import.meta.env.VITE_BACKEND_URL;
               const resp = await fetch(`${backend}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),

               });

               const data = await resp.json().catch(() => ({}));

               if (!resp.ok) {

                    throw new Error(data.msg || "Error de login")

               }

               localStorage.setItem("jwt-token", data.token);

               navigate("/private");

          }

          catch (error) {
               setErr(error.message);
          }

     };

     return (

          <div className="container col-5 mt-5 mx-auto ">

               <h1>Login</h1>

               {err && <div className="alert alert-danger mt-3">{err}</div>}

               <form onSubmit={handleSubmit} className="mt-3">

                    <div className=" mb-3 p-8">
                         <label htmlFor="email" className="form-label">Dirección deEmail</label>

                         <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                         />
                         <div id="emailHelp" className="form-text">No compartas tu contraseña.</div>
                    </div>

                    <div className="mb-3">
                         <label htmlFor="password" className="form-label">Password</label>
                         <input
                              type="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                         />
                    </div>

                    <button type="submit" className="btn btn-info">Login</button>
               </form>

          </div>
     );


}

/* export const Login = async (email, password) => {
     const resp = await fetch(`https://automatic-palm-tree-pj5r5r7xwqrxfrjp4-3001.app.github.dev/login`, { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }) 
     })

     const data = await resp.json()

     if(!resp.ok) {
          throw new Error(data.msg || "Error en el login")
     }

     // Guarda el token en la localStorage
     // También deberías almacenar el usuario en la store utilizando la función setItem
     localStorage.setItem("jwt-token", data.token);

     return data
} */