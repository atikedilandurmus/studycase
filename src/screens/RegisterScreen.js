import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';


const fetchFonts = async () => {
    await Font.loadAsync({
      'NunitoExtraBold': require('../../assets/fonts/static/Nunito-ExtraBold.ttf'),
      'NunitoItalic': require('../../assets/fonts/static/Nunito-Italic.ttf'),
      'NunitoBoldItalic': require('../../assets/fonts/static/Nunito-BoldItalic.ttf'),
    });
  };

const Login = () => {
    useEffect(() => {
        fetchFonts();
      }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#bb2d35','#7a90b2', '#a5c6bf',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 2, y: 0 }}
                style={styles.sideView}>
            </LinearGradient>
            <View style={styles.content}>
                <Text style={styles.logintext}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="E-Mail"
                    placeholderTextColor="#bcc9c5" 
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#bcc9c5" 
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#bcc9c5" 
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginbutton}>
                    <Text style={styles.loginbuttontext}>Sign Up</Text>
                </TouchableOpacity>
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
        marginTop:0,
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