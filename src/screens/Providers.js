import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet,Alert ,Dimensions} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
import { AddProviderName, deleteProvider, editProvider, getAllProviders, getProviderDetails } from '../apiconfig/provider';


const { width, height } = Dimensions.get('window');

const ProviderManagementScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newProviderName, setNewProviderName] = useState('');
    const [provider, setProvider] = useState([]);
    const [providerId, setProviderId] = useState('');
    const [editingProviderId, setEditingProviderId] = useState(null);
    const [editingProviderName, setEditingProviderName] = useState("");

 
    useEffect(() => {
        getAllProviders().then((data) => {
            setProvider(data);
        }).catch((error) => {
            console.error("Error setting providers:", error);
        });
        getProviderDetails(providerId).then((data) => {
            setProvider(data);
        }).catch((error) => {
            console.error("Error setting provider details:", error);
        });
    }, []);


    const renderShowAll = () => {
      return(
      <FlatList
      data={provider}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        
          <View style={{ flexDirection: 'row',  alignItems:'center',borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            {editingProviderId === item.id ? (
              <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
                <View style={{width: width * 0.66 }}>
                  <TextInput 
                    style={styles.inputProviderEdit} 
                    value={editingProviderName} 
                    onChangeText={text => setEditingProviderName(text)} />
                
                </View>
                <View>
                  <TouchableOpacity
                    style={{marginLeft: width * 0.08}}
                    onPress={() => {          
                      editProvider(item.id, editingProviderName, provider, setProvider)
                      .then(() => {
                        setEditingProviderId(null);
                        setEditingProviderName("");
                      })
                      .catch((error) => console.error("Error updating provider name:", error));

                    }}
                  >
                    <AntDesign name="checkcircle" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={{width: width * 0.67 }}>
                    <TouchableOpacity
                  style={[styles.providerItemCom, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                  >
                        <Text style={{fontWeight:600,  flex: 1}}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity   onPress={() => {
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
                            const detail = await getProviderDetails(item.id)
                            Alert.alert(
                              'Detail Information',
                              `ID: ${detail.id}\nName: ${detail.name}\n`,
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
                  setNewProviderName(item.name);
                  setProviderId(item.id);
                }}>
                <AntDesign name="eye" size={22} color="black" />
              </TouchableOpacity>        
              <TouchableOpacity onPress={() => {
                setEditingProviderId(item.id);
                setEditingProviderName(item.name);
              }}>
                <AntDesign name="edit" size={23} color="#fc7e0f" style={{marginLeft: width * 0.02}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => {deleteProvider(item.id, setProvider,provider) }}>
                <MaterialIcons name="delete" size={23} color="red"style={{marginLeft: width * 0.02}}/>
              </TouchableOpacity>
            </View>
            </>
          )}
          </View>
        )}
      
      />
      );
    }
    
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Provider Management</Text>
            <TouchableOpacity 
                style={styles.addButtonProvider} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={{color: 'white'}}>Add Provider</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.containerInside}>
                        <TouchableOpacity
                            style={styles.inputProvider}
                        >
                            <TextInput
                                placeholder="Provider Name"
                                placeholderTextColor="#ccc"
                                value={newProviderName}
                                onChangeText={setNewProviderName}     
                            />
                        </TouchableOpacity>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={styles.addButton} 
                                onPress={() => {AddProviderName(newProviderName, setProvider, provider)
                                  setModalVisible(false);
                                }}  
                            >
                                <Text style={{color: 'white'}}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.addButton} 
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={{color: 'white'}}>Cancel</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.header}>
                <Text style={styles.headerText}>Providers</Text>
            </View>
            <View>
              {renderShowAll()}
            </View>

            
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
  modalContainer: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin: width * 0.13
  },
  modalContainerProvider: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    margin:20,
    alignItems:'center'
  },
  modalContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
    width: '80%',
    },
  providerItemCom: {
    padding: width *0.025,
  },
  containerInside: {
    paddingTop: width * 0.07,
    paddingBottom: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
    borderRadius:20
  },
  inputProvider: {
    width: width * 0.57,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: width * 0.02,
    marginLeft: width * 0.1,
    marginRight:width * 0.1, 
    padding: width * 0.02
  },
  addButton: {
    backgroundColor: '#275169',
    paddingTop: width * 0.022,
    paddingBottom: width * 0.022,
    marginBottom:  width * 0.02,
    width: width * 0.20,
    margin:width * 0.03,
    borderRadius: 15,
    alignItems:'center'
  },
  addButtonProvider: {
    backgroundColor: '#275169',
    padding: width * 0.03,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: width * 0.05,
    
  },
  inputProviderEdit: {
    width: width * 0.6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: width * 0.02,
    marginVertical:width * 0.03,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: width * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: '900',
    flex: 1,
  },
});

export default ProviderManagementScreen;