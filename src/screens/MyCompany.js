import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import { addCompanyName, deleteCompany, editCompany, getAllCompany, getCompanyDetails } from '../apiconfig/company';
import { MaterialIcons, AntDesign } from '@expo/vector-icons'; 
  

const { width, height } = Dimensions.get('window');

const CompanyManagementScreen = () => {
    const [company, setCompany] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState('');
    const [companyId, setCompanyId] = useState('');

    const [editingCompanyId, setEditingCompanyId] = useState(null);
    const [editingCompanyName, setEditingCompanyName] = useState([]);


    useEffect(() => {
        getAllCompany().then((data) => {
            setCompany(data);
        }).catch((error) => {
            console.error("Error setting companies:", error);
        });  
        getCompanyDetails(companyId).then((data) => {
            setCompany(data);
        }).catch((error) => {
            console.error("Error setting company details:", error);
        });
    }, []);

    const renderShowAll = () => {
      return(
      <FlatList
      data={company}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        
          <View style={{ flexDirection: 'row',  alignItems:'center',borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            {editingCompanyId === item.id ? (
              <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
                <View style={{width: width * 0.66, }}>
                  <TextInput 
                    style={styles.inputCompanyEdit} 
                    value={editingCompanyName} 
                    onChangeText={text => setEditingCompanyName(text)} />
                
                </View>
                <View>
                  <TouchableOpacity
                        style={{marginLeft: width * 0.08}}
                        onPress={() => {
                          editCompany(item.id, editingCompanyName, company, setCompany)
                            .then(() => {
                              setEditingCompanyId(null);
                              setEditingCompanyName("");
                            })
                            .catch((error) => console.error("Error updating company name:", error));
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
                  style={[styles.companyItemCom, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                  >
                        <Text style={{fontWeight:600,  flex: 1 }}>{item.name}</Text>
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
                            const detail = await getCompanyDetails(item.id)
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
                  setNewCompanyName(item.name);
                  setCompanyId(item.id);
                }}>
                <AntDesign name="eye" size={22} color="black" />
              </TouchableOpacity>        
              <TouchableOpacity onPress={() => {
                setEditingCompanyId(item.id);
                setEditingCompanyName(item.name);
              }}>
                <AntDesign name="edit" size={23} color="#fc7e0f" style={{marginLeft: width * 0.02}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => {deleteCompany(item.id, setCompany,company) }}>
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
    
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Company Management</Text>
            <TouchableOpacity 
                style={styles.addButtonComp} 
                onPress={() => setModalVisible(true)}
            >
                <Text style={{color: 'white'}}>Add Company</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.containerInside}>
                        <TouchableOpacity
                            style={styles.inputCompany}
                        >
                            <TextInput
                                placeholder="Company Name"
                                placeholderTextColor="#ccc"
                                value={newCompanyName}
                                onChangeText={setNewCompanyName}     
                            />
                        </TouchableOpacity>



                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity 
                                style={styles.addButton} 
                                onPress={() => {
                                  addCompanyName(newCompanyName, setCompany, company)
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
                <Text style={styles.headerText}>Companies</Text> 
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
  companyItemCom: {
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
  inputCompanyEdit:{
    width: width * 0.6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: width * 0.02,
    marginVertical:width * 0.03,
  },
  inputCompany: {
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
  
  addButtonComp: {
    backgroundColor: '#275169',
    padding: width * 0.03,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: width * 0.05,
    
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

export default CompanyManagementScreen;
