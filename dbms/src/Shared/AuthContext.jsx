import { createContext,useState } from "react";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
    const [auth,setAuth] = useState({});
    const [admin,setAdmin] = useState({});
    return <AuthContext.Provider value={{auth,setAuth,admin,setAdmin}}>{children}</AuthContext.Provider>;
}
export default AuthContext;