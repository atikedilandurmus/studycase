import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { AddProviderName, deleteProvider, editProvider, getAllProviders, getProviderDetails } from '../apiconfig/provider';
import { getAllCompanyTransaction, getTransactionDetailById } from '../apiconfig/companytranstaction';

const { width, height } = Dimensions.get('window');

const CompanyTransactionManagementScreen = () => {
   
    const [transaction, setTransaction] = useState([]);
    useEffect(() => {
        getAllCompanyTransaction().then((data) => {
            setTransaction(data);
        }).catch((error) => {
            console.error("Error setting transaction:", error);
        });
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Company Transaction Management</Text>
            <View style={styles.header}>
                <Text style={styles.headerText}>Company</Text>
                <Text style={[styles.headerText, { marginLeft: -25 }]}>Integration Name</Text>
            </View>

            <FlatList
                data={transaction}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.providerItem}
                    
                >
                    <Text style={{fontWeight:600,  flex: 1, }}>{item.companyName}</Text>
                    <Text style={{fontWeight:600,  flex: 1}}>{item.companyIntegrationName}</Text>
                    <TouchableOpacity  onPress={() => {
                      Alert.prompt(
                        'Enter Password',
                        'Please enter your password to view details:',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: async (password) => {
                              if (password === 'your_password') {
                                const detail = await getTransactionDetailById(item.id)
                                Alert.alert(
                                  'Detail Information',
                                  `ID: ${detail.id}\nName: ${detail.companyName}\nCompany Integration Name: ${detail.companyIntegrationName}\nCompany Payment Method: ${detail.companyPaymentMethodName}\nUsername: ${detail.username}\nFirst Name: ${detail.firstName}\nLast Name: ${detail.lastName}\nAmount: ${detail.amount}\nCurrency: ${detail.currency}`,
                                  [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                                  { cancelable: false }
                                );
                              } else {
                                Alert.alert('Incorrect Password', 'Please try again.', [{ text: 'OK', onPress: () => console.log('ok') }], {
                                  cancelable: false,
                                });
                              }
                            },
                            style: 'default',
                          },
                        ],
                        'secure-text'
                      );
                    }}>
                    <AntDesign name="eye" size={22} color="red" />
                  </TouchableOpacity>        
                </TouchableOpacity>
                )}
            />

        
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width* 0.05,
    width: width, 
    height: height, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: width* 0.05,
  },
  providerItem: {
    paddingBottom: width *0.025,
    paddingTop: width *0.025,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: width *0.025,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: '900',
    flex: 1,
},
});

export default CompanyTransactionManagementScreen;