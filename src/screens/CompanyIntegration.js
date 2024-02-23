import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { getAllCompany } from '../apiconfig/company';
import { getAllProviders } from '../apiconfig/provider';
import { getAllAccountGroup, getAllPaymentMethod, getAllTransactionStatus, getAllTransactionType } from '../apiconfig/enum';
import { addCompanyIntegration, deleteIntegration, editCompanyInt, getAllCompanyIntegration, getDetailById } from '../apiconfig/companyintegration';

const { width, height } = Dimensions.get('window');


const CompanyIntegrationScreen = () => {
  const [modalVisibleCompany, setModalVisibleCompany] = useState(false);
  const [modalVisibleProvider, setModalVisibleProvider] = useState(false);
  const [modalVisibleAccountGroup, setModalVisibleAccountGroup] = useState(false);
  const [modalVisiblePaymentMethod, setModalVisiblePaymentMethod] = useState(false);
  const [modalVisibleTransactionType, setModalVisibleTransactionType] = useState(false);
  const [modalVisibleTransactionStatus, setModalVisibleTransactionStatus] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const [company, setCompany] = useState([]);
  const [provider, setProvider] = useState([]);
  const [companyInt, setCompanyInt] = useState([]);
  const [accountgroup, setAccountGroup] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionType, setTransactionType] = useState('');

  const [newCompanyName, setNewCompanyName] = useState('');
  const [newIntegrationName, setNewIntegrationName] = useState('');
  const [newProviderName, setNewProviderName] = useState('');
  const [newAccountGroup, setNewAccountGroup] = useState('');
  const [newPaymentMethod, setNewPaymentMethod] = useState('');
  const [newTransactionType, setNewTransactionType] = useState('');
  const [newTransactionStatus, setNewTransactionStatus] = useState('');

  const [companyId, setCompanyId] = useState('');
  const [providerId, setProviderId] = useState('');

  const [companyIntId, setCompanyIntId] = useState('');
  const [accountgroupId, setAccountId] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [transactionTypeId, setTransactionTypeId] = useState('');
  const [transactionStatusId, setTransactionStatusId] = useState('');

  const [editingCompanyIntId, setEditingCompanyIntId] = useState(null);
  const [editingCompanyIntName, setEditingCompanyIntName] = useState("");
  const [editingCompanyIntCompanyName, setEditingCompanyIntCompanyName] = useState("");
  const [editingCompanyIntCompanyId, setEditingCompanyIntCompanyId] = useState([]);
  const [editingCompanyIntProviderName, setEditingCompanyIntProviderName] = useState([]);
  const [editingCompanyIntProviderId, setEditingCompanyIntProviderId] = useState([]);

  useEffect(() => {
    getAllCompany().then((data) => {
        setCompany(data);
    }).catch((error) => {
        console.error("Error setting companies:", error);
    });  
    getAllProviders().then((data) => {
        setProvider(data);
    }).catch((error) => {
        console.error("Error setting provider:", error);
    }); 
    getAllAccountGroup().then((data) => {
      setAccountGroup(data);
    }).catch((error) => {
      console.error("Error settings account group: ", error)
    })
    getAllPaymentMethod().then((data) => {
      setPaymentMethod(data);
    }).catch((error) => {
      console.error("Error settings account group: ", error)
    })
    getAllTransactionStatus().then((data) => {
      setTransactionStatus(data);
    }).catch((error) => {
      console.error("Error settings transaction status: ", error)
    })
    getAllTransactionType().then((data) => {
      setTransactionType(data);
    }).catch((error) => {
      console.error("Error settings transaction type: ", error)
    })
    getAllCompanyIntegration().then((data) =>{
      setCompanyInt(data);
    }).catch((error) =>{
      console.error("Error fetching integration", error);
    })
  }, []);

 

  const renderShowAll = () => {
    return (
      <FlatList
        data={companyInt}
        style={{ paddingBottom: height * 0.04}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row',  alignItems:'center',borderBottomWidth: 1, borderBottomColor: '#ccc', }}>
            {editingCompanyIntId === item.id ? (
              <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
                <View style={{width: width * 0.66, marginBottom: width * 0.03, marginTop: width * 0.03 }}>
                  <TextInput 
                    style={styles.inputProviderEdit} 
                    value={editingCompanyIntName} 
                    onChangeText={text => setEditingCompanyIntName(text)} />
                  <TextInput 
                    style={styles.inputProviderEdit} 
                    value={editingCompanyIntCompanyName} 
                    onChangeText={text => setEditingCompanyIntCompanyName(text)} 
                  />
                  <TextInput 
                    style={styles.inputProviderEdit} 
                    value={editingCompanyIntProviderName} 
                    onChangeText={text => setEditingCompanyIntProviderName(text)} 
                  />

                </View>
                <View>
                  <TouchableOpacity
                    style={{marginLeft: width * 0.08}}
                    onPress={() => {          
                      editCompanyInt(item.id, editingCompanyIntCompanyId, editingCompanyIntProviderId, editingCompanyIntName, companyInt, setCompanyInt)
                      .then(() => {
                        setEditingCompanyIntId(null);
                        // setEditingCompanyIntName("");
                        // setEditingCompanyIntCompanyId(null);
                        // setEditingCompanyIntCompanyName("");
                        // setEditingCompanyIntProviderId(null);
                        // setEditingCompanyIntProviderName("");
                      })
                      .catch((error) => console.error("Error updating company int name:", error));

                    }}
                  >
                    <AntDesign name="checkcircle" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.providerItemCom, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                   
                          >
                  <Text  style={{fontWeight:600,  flex: 1}}>{item.name}</Text>
                </TouchableOpacity>
  
                <View style={{flexDirection:'row',}}>
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
                              const detail = await getDetailById(item.id)
                              Alert.alert(
                                'Detail Information',
                                `ID: ${detail.id}\nName: ${detail.name}\nProvider: ${detail.providerName}\nCompany: ${detail.companyName}`,
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
                    setNewIntegrationName(item.name);
                    setCompanyIntId(item.id);
                  }}>
                    <AntDesign name="eye" size={23} color="black"/>
                  </TouchableOpacity>        
                  <TouchableOpacity onPress={ () => {
                    setEditingCompanyIntId(item.id);
                    setEditingCompanyIntName(item.name);
                    setEditingCompanyIntCompanyId(item.companyId);
                    setEditingCompanyIntCompanyName(item.companyName);
                    setEditingCompanyIntProviderId(item.providerId);
                    setEditingCompanyIntProviderName(item.providerName);
                  }}>
                    <AntDesign name="edit" size={23} color="#fc7e0f" style={{marginLeft: width * 0.02}} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => {deleteIntegration(item.id, setCompanyInt,companyInt) }}>
                    <MaterialIcons name="delete" size={23} color="red" style={{marginLeft: width * 0.02}}/>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View> 
        )}
      />
    );
  }

  const renderInputWithModal = (placeholder, value, onChangeText, setModalVisible, modalVisible, data, setState, setId, setValue) => {
    return (
      <TouchableOpacity style={styles.inputProvider} onPress={() => setModalVisible(true)}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          value={value}
          onChangeText={(text) => onChangeText(text)}
          editable={false}
        />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainerCompany}>
            <View style={styles.modalContent}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.providerItemCom}
                    onPress={() => {
                      setState(item.name);
                      setId(item.id);
                      setModalVisible(false);
                      setValue(item.name); 
                    }}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  };
  
  
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Integration Management</Text>
            <View style={styles.modalContainer}>
              <View>
                <TextInput
                  style={styles.inputProvider}
                  placeholder="Integration Name"
                  placeholderTextColor="#ccc"
                  value={newIntegrationName}
                  onChangeText={setNewIntegrationName}
                />
                {renderInputWithModal("Company Name", newCompanyName, setNewCompanyName, setModalVisibleCompany, modalVisibleCompany, company, setNewCompanyName, setCompanyId, setNewCompanyName)}
                {renderInputWithModal("Provider Name", newProviderName, setNewProviderName, setModalVisibleProvider, modalVisibleProvider, provider, setNewProviderName, setProviderId, setNewProviderName)}
                {renderInputWithModal("Account Group", newAccountGroup, setNewAccountGroup, setModalVisibleAccountGroup, modalVisibleAccountGroup, accountgroup, setNewAccountGroup, setAccountId, setNewAccountGroup)}
                {renderInputWithModal("Payment Method", newPaymentMethod, setNewPaymentMethod, setModalVisiblePaymentMethod, modalVisiblePaymentMethod, paymentMethod, setNewPaymentMethod, setPaymentMethodId, setNewPaymentMethod)}
                {renderInputWithModal("Transaction Status", newTransactionStatus, setNewTransactionStatus, setModalVisibleTransactionStatus, modalVisibleTransactionStatus, transactionStatus, setNewTransactionStatus, setTransactionStatusId, setNewTransactionStatus)}
                {renderInputWithModal("Transaction Type", newTransactionType, setNewTransactionType, setModalVisibleTransactionType, modalVisibleTransactionType, transactionType, setNewTransactionType, setTransactionStatusId, setNewTransactionType)}
             </View>
             <View style={{flexDirection:'row', alignItems:'center'}}>
              <TouchableOpacity style={styles.addButton} onPress={() => addCompanyIntegration(newIntegrationName, companyId, providerId, setCompanyInt,companyInt)}>
                  <Text style={{color: 'white'}}>Add New Integration</Text>
              </TouchableOpacity>

              </View>
              <TouchableOpacity
                style={styles.inputShowInt}
                onPress={() => setShowAll((prev) => !prev)}
              >
                <Text style={{ textAlign: 'center', color: 'white' }}>
                  {showAll ? 'Hide All Company Integration' : 'Show All Company Integration'}
                </Text>
              </TouchableOpacity>
              <View style={styles.header}>
                <Text style={styles.headerText}>Company Integrations</Text> 
              </View>
              <View>
                {showAll && renderShowAll()}
              </View>

            </View>
          
        </ScrollView>
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: width * 0.02
  },
  modalContainerCompany: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems:'center'
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius: 15,
    padding: width * 0.03,
    maxHeight: '80%',
    width: width * 0.8
    },
  providerItemCom: {
    padding: width * 0.02,
    width:  width * 0.64,
    flexDirection:'row'
  },
  inputProvider: {
    width: width * 0.86,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: width * 0.03,
    marginRight:width * 0.1, 
    padding: width * 0.02
  },
  inputProviderEdit: {
    width: width * 0.6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: width * 0.02,
    marginVertical:width * 0.01,
  },
  inputShowInt: {
    width: width * 0.86,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: width * 0.04,
    padding: width * 0.027,
    backgroundColor:'#db0000'
  },
  addButton: {
    backgroundColor: '#275169',
    padding: width * 0.027,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: width * 0.04,
    width: width * 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: width * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: width * 0.03
  },
  headerText: {
    fontWeight: '900',
    flex: 1,
  },
});

export default CompanyIntegrationScreen;
