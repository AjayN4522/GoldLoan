import Keycloak from "keycloak-js";
import TenantDetails from "./Pages/TenantDetails";

// Function to get dynamic Keycloak settings (from URL, env, or API)
const getKeycloakConfig = async () => {
  // Example: Extracting from URL like `http://localhost:3000/muthoot/12345`
  // const pathSegments = window.location.pathname.split("/").filter(Boolean);
  // const realm = pathSegments[0] || process.env.REACT_APP_KEYCLOAK_REALM || "defaultRealm";
  const realm = TenantDetails();
  const clientId =
    pathSegments[1] ||
    process.env.REACT_APP_KEYCLOAK_CLIENT_ID ||
    "defaultClient";
  if (realm && !clientId)
    return {
      url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8080",
      realm: realm, // Only realm, no clientId
    };
  else if (realm && clientId) {
    return {
      url: process.env.REACT_APP_KEYCLOAK_URL || "http://localhost:8080",
      realm: realm,
      clientId: clientId,
    };
  }
};

// Initialize Keycloak with dynamic config
const keycloakConfig = getKeycloakConfig();
const keycloak = new Keycloak({
  url: keycloakConfig.url + "/auth",
  realm: keycloakConfig.realm,
  clientId: keycloakConfig.clientId,
});

export { keycloak, keycloakConfig };
