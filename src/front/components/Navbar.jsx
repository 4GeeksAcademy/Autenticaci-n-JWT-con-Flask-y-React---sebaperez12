import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container col-5">
				
					<span className="navbar-brand mb-0 h1 ">Autenticación JWT con Flask y React</span>
				
				<div className="ml-auto">
				
					<Link to="/Login">
						<button className="btn btn-info p-2 ms-2 ">Login</button>
					</Link>

					<Link to="/Signup">
						<button className="btn btn-success p-2  ms-2" >Signup</button>
					</Link>


				</div>
			</div>
		</nav>
	);
};