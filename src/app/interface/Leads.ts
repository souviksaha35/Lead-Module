export interface Leads {
    
        _id: number,
        title: string, // Designation
        firstName: string,
        lastName: string,
        email: string,
        assignee: string,
        leadStatus: string,
        leadSource: string,
        leadRating: number, // Or enum
        phone: string, 
        companyName: string,
        industry: string,
        addressLine1: string,
        addressLine2: string,
        city: string,
        state: string,
        country: string,
        zipcode: string,
    
}