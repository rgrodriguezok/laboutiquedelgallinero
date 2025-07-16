import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";


export default function Admin() {
    const { admin } = useAuthContext();

    if (!admin) {
        return (
            <Navigate to="/login" replace />
        )
    }
    return (
        <div>
            <header style={{
                backgroundColor: "black", padding: "10px",
                textAlign: "center", color: "white", width: "100%"
            }}>
                <h1>Componente Admin</h1>
            </header>
        </div>
     
    )
}