import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { Login } from "./components/Auth/Login";
import { Register } from "./components/Auth/Register";

const App = () => {
	return (<>
		<nav>
			<Link to="/signin">Login</Link>
			<Link to="/signup">Register</Link>
		</nav>

		<h1> Main App Page </h1>
		<Routes>
			<Route path="/signin" element={<Login />} />
			<Route path="/signup" element={<Register />} />
		</Routes>
	</>);
}

export default App;