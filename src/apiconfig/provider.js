import axios from "axios";
import { domainPayman } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllProviders = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(`${domainPayman}/api/v1/provider`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Providers:" ,response.data);
        return response.data;
    } catch (error) {
        console.error("error fetching provider:", error);
        throw error;
    }
}

export const AddProviderName = async (newProviderName, setProvider, provider) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post(`${domainPayman}/api/v1/provider`,  {
            name: newProviderName
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const newProvider = response.data;
        setProvider([...provider, newProvider]);

        console.log("yeni eklendi");
        return response.data;
    } catch (error) {
        console.error("Error adding provider:", error);
        throw error;
    }
}
  
export const editProvider = async (providerId, editingProviderName, provider, setProvider) => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.put(
            `${domainPayman}/api/v1/provider/${providerId}`,
            { 
                id: providerId,
                name: editingProviderName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (Array.isArray(provider)) {
            const updatedProvider = provider.map(providerItem => {
                if (providerItem.id === providerId) {
                    return { ...providerItem, name: editingProviderName };
                }
                return providerItem;
            });
            setProvider(updatedProvider);
        }

        console.log('Provider name updated successfully');

        return response.data;
    } catch (error) {
        console.error('Error updating provider name: ', error);
        throw error;
    }
};

export const getProviderDetails = async (providerId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const response = await axios.get(
            `${domainPayman}/api/v1/provider/${providerId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching provider details:", error);
        throw error;
    }
}


export const deleteProvider = async (providerId, setProvider, provider) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        await axios.delete(`${domainPayman}/api/v1/provider/${providerId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const updatedProvider = provider.filter(item => item.id !== providerId);
        setProvider(updatedProvider);

        console.log('Provider deleted successfully');
    } catch (error) {
        console.error("Error deleting provider:", error);
        throw error;
    }
}