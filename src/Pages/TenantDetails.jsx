import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TenantDetails() {
    const { tenantDomain } = useParams(); // Get "muthoot.com" from URL
    const navigate=useNavigate()

    // Split domain into name and extension
    const [tenantName, domainExtension] = tenantDomain.split(".");

    const isTenantExists=async(tenantName,domainExtension)=>{
        console.log(tenantName,domainExtension)
        const tenant=await axios.get(`http://localhost:8001/tenant/getTenantByTenantNameAndTenantDomain/${tenantName}/.${domainExtension}`)
        console.log(tenant.data.data)
        sessionStorage.setItem('tenant_id',tenant.data.data[0].tenant_id)
        navigate('/')
    }

    useEffect(()=>{
        
       return ()=> isTenantExists(tenantName,domainExtension)
    },[tenantName,domainExtension])

    return `${tenantName}.${domainExtension}`
}

export default TenantDetails;
