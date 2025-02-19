import React, { useState, useEffect } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak } from "./Keycloak";

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        keycloak
            .init({ onLoad: "login-required", checkLoginIframe: false })
            .then(authenticated => setIsAuthenticated(authenticated))
            .catch(error => console.error("Keycloak initialization error:", error));
    }, []);

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            {isAuthenticated ? children : <p>Loading authentication...</p>}
        </ReactKeycloakProvider>
    );
};

export default AuthProvider;
