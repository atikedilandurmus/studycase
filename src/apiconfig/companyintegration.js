import axios from "axios";
import { domainPayman } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const addCompanyIntegration = async (newIntegrationName, companyId, providerId, setCompanyInt, companyInt) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post(`${domainPayman}/api/v1/companyintegration`, 
        {
            name: newIntegrationName,
            companyId: companyId,
            providerId: providerId,
            isActive: true,
            apiToken: "{{$randomUUID}}",
            callbackUrlDeposit: "{{$randomUrl}}",
            callbackUrlWithdrawal: "{{$randomUrl}}",
            messageWhenIntegrationIsPassive: "{{$randomLoremSentence}}",
            redirectUrlBeforeUserPayment: "{{$randomUrl}}",
            redirectUrlAfterUserPayment: "{{$randomUrl}}",
            logoUrl: "{{$randomUrl}}"
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const newCompanyInt = response.data;
        setCompanyInt([...companyInt, newCompanyInt]);
        console.log("Company integration added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding company integration:", error);
        throw error;
    }
}

export const getAllCompanyIntegration = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${domainPayman}/api/v1/companyintegration`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Company integration:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching company integration:", error);
        throw error;
    }
}

export const getDetailById = async (companyIntegrationId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${domainPayman}/api/v1/companyintegration/${companyIntegrationId}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Details get successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching details company integration:", error);
        throw error;
    }
}

export const deleteIntegration = async (companyIntegrationId, setCompanyInt, companyInt) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        await axios.delete(`${domainPayman}/api/v1/companyintegration/${companyIntegrationId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (Array.isArray(companyInt)) {
            const updatedCompIntg = companyInt.filter(item => item.id !== companyIntegrationId);
            setCompanyInt(updatedCompIntg);
            console.log('Company Integration deleted successfully');
        } else {
            console.error('Error deleting Company Integration: companyintegration is not an array');
        }
    } catch (error) {
        console.error('Error updating company integration:', error.response ? error.response.data : error.message);
        throw error;
    }
}


export const editCompanyInt = async (companyIntegrationId, companyId, providerId,editingCompanyIntName, companyInt, setCompanyInt) => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.put(
            `${domainPayman}/api/v1/companyintegration/${companyIntegrationId}`,
            {
                id: companyIntegrationId,
                name: editingCompanyIntName,
                companyId: companyId,
                providerId: providerId,
                isActive: true,
                apiToken: "apitoken",
                callbackUrlDeposit: "randomUrl",
                callbackUrlWithdrawal: "randomUrl",
                messageWhenIntegrationIsPassive: "randomLoremSentence",
                redirectUrlBeforeUserPayment: "randomUrl",
                redirectUrlAfterUserPayment: "randomUrl",
                logoUrl: "randomUrl"
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (Array.isArray(companyInt)) {
            const updatedCompIntg = companyInt.map(item => {
                if (item.id === companyIntegrationId) {
                    return { ...item, 
                        name: editingCompanyIntName,    
                        companyId: companyId,
                        providerId: providerId };
                }
                return item;
            });
            setCompanyInt(updatedCompIntg);
        }

        console.log('company integration updated successfully');
        return response.data;

    } catch (error) {
        console.error('Error updating company integration : ', error);
        throw error;
    };
    
}
