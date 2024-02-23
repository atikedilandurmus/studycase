import axios from "axios";
import { domainPayman } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllCompanyTransaction = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${domainPayman}/api/v1/companytransaction`, 
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Company transaction:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching company transaction:", error);
        throw error;
    }
}

export const getTransactionDetailById = async (companyTransactionId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${domainPayman}/api/v1/companytransaction/${companyTransactionId}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Details get successfully", response.data);
        return response.data;
    } catch {
        console.error("Error fetching details company transaction:", error);
        throw error;
    }
}
