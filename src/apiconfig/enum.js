import axios from "axios";
import { domainPayman } from "../config";

// AsyncStorage'ten tokeni al
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllAccountGroup = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(`${domainPayman}/api/v1/enum/accountgroup`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Acount Group:" , response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching accout group:", error);
        throw error;
    }
}

export const getAllPaymentMethod = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(`${domainPayman}/api/v1/enum/paymentmethod`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Payment Method:" , response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment method:", error);
        throw error;
    }
}
export const getAllTransactionStatus = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(`${domainPayman}/api/v1/enum/transactionstatus`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Transaction status:" , response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction status:", error);
        throw error;
    }
}
export const getAllTransactionType = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(`${domainPayman}/api/v1/enum/transactiontype`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Transaction type:" , response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction type:", error);
        throw error;
    }
}
