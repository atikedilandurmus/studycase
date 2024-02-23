import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext'


const fetchFonts = async () => {
    await Font.loadAsync({
      'NunitoExtraBold': require('../../assets/fonts/static/Nunito-ExtraBold.ttf'),
      'NunitoItalic': require('../../assets/fonts/static/Nunito-Italic.ttf'),
      'NunitoBoldItalic': require('../../assets/fonts/static/Nunito-BoldItalic.ttf'),
    });
  };

const Login = () => {  

    const {login} = useContext(AuthContext);

    useEffect(() => {
        fetchFonts();
    }, []);

    const [email, setEtmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#bb2d35','#7a90b2', '#a5c6bf',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 2, y: 0 }}
                style={styles.sideView}>
            </LinearGradient>
            <View style={styles.content}>
                <Text style={styles.logintext}>Sign In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-Mail"
                    placeholderTextColor="#bcc9c5" 
                    value={email}
                    onChangeText={text => setEtmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#bcc9c5" 
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginbutton} onPress={() => {login(email, password)}} >
                    <Text style={styles.loginbuttontext}>Sign In</Text>
                </TouchableOpacity>
                <Text style={{color:'#8190a7', textAlign:'center', marginTop:8}}>Don't have an account ? Register</Text>

            </View>
            
            <LinearGradient
                colors={['#bb2d35','#7a90b2', '#a5c6bf',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1.2 }}
                style={styles.bottomView}>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logintext: {
        color: '#384c71',
        fontSize: 24,
        fontFamily:'NunitoBoldItalic',
        marginBottom:8
    },
    sideView: {
        transform: [{ rotate: '0deg' }],
        backgroundColor: 'white',
        width: 580,
        height: 450,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 400,
        borderBottomLeftRadius: 600, 
        marginTop:-150,
        marginLeft:-30
    },
    bottomView: {
        transform: [{ rotate: '300deg' }],
        backgroundColor: 'white',
        width: 650,
        height: 900,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 700,
        borderTopRightRadius: 700,
        borderTopLeftRadius: 900, 
        borderBottomLeftRadius: 900, 
        marginTop:20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#8792ac',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        marginTop: 10,
        marginBottom: 5,
        letterSpacing:2,
        fontSize:12
      },
    content:{
        margin:33,
    },
    loginbutton:{
        width:'100%',
        backgroundColor:'#384c71',
        padding:12,
        borderRadius:4,
        marginTop:38
    },
    loginbuttontext:{
        color:'white',
        textAlign:'center'
    }
});
export default Login ;