export const API = {
    login: "secure/SignIn",
    authorise: "secure/Authorise",
    refreshToken: "secure/Token",
    forgotPswd: "secure/ForgotPassword",
    userEntitlements: "auth/UserEntitlements",
    fileUpload: "files/File/INSPECTION",
    notification: "Register",
    fileURL: "files/File",
    profile: "Profile/GetProfile",
    state: "Lookups/Countries",
    inspectionReport: "PropertyInspection/InspectionReport",

    // Owner
    ownerPropertyList: "Owners/OwnerPropertyList",
    getTenant: "Owners/GetTenantsByOwnerLinkedProperties",
    propertyDetail: "Properties/FindByID",
    tenantDetail: "Tenants/FindByID",
    ownerDetail: "Owners/FindByID",

    // Tenant
    tenantPropertyDetails: "Tenants/GetTenantLinkedProperties",

    // Payments
    payment: "Payments/GETPDC",
    getPaymentDetails: "Payments/GetPaymentDetails",
    updatePaymentStatus: "Payments/UpdatePaymentStatus",
    getPaymentsHistory: "Payments/GetRentalPaymentDetails"
};

export const URL = {
    devUrl: "https://pre-dev-web-app-service.azurewebsites.net/",
    devNodeUrl: "https://pre-dev-web-api-svc-node.azurewebsites.net/"
}


