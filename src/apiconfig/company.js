import axios from "axios";
import { domainPayman } from "../config";

// AsyncStorage'ten tokeni al
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllCompany = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(`${domainPayman}/api/v1/company`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Companies: " , response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
}

export const addCompanyName = async (newCompanyName, setCompany, company) => {
    try {
        // asyncStorageten tokeni al
        const token = await AsyncStorage.getItem('userToken');
        // tokenı kullanarak request gönder
        const response = await axios.post(`${domainPayman}/api/v1/company`,  {
            name: newCompanyName
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Yeni şirketi listeye ekle
        const newCompany = response.data;
        setCompany([...company, newCompany]);

        console.log("yeni eklendi");
        return response.data;
    } catch (error) {
        console.error("Error adding company:", error);
        throw error;
    }
}
export const getCompanyDetails = async (companyId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(
            `${domainPayman}/api/v1/company/${companyId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching company details:", error);
        throw error;
    }
}


export const editCompany = async (companyId, editingCompanyName, company, setCompany) => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.put(
            `${domainPayman}/api/v1/company/${companyId}`,
            { 
                id: companyId,
                name: editingCompanyName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (Array.isArray(company)) {
            const updatedCompanies = company.map(companyItem => {
                if (companyItem.id === companyId) {
                    return { ...companyItem, name: editingCompanyName };
                }
                return companyItem;
            });
            setCompany(updatedCompanies);
        }

        console.log('Company name updated successfully');

        return response.data;
    } catch (error) {
        console.error('Error updating company name: ', error);
        throw error;
    }
};



export const deleteCompany = async (companyId, setCompany, company) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        await axios.delete(`${domainPayman}/api/v1/company/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const updatedCompanies = company.filter(item => item.id !== companyId);
        setCompany(updatedCompanies);

        console.log('Company deleted successfully');
    } catch (error) {
        console.error("Error deleting company:", error);
        throw error;
    }
}
