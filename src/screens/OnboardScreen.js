import React, {useEffect} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
const Onboard = ({navigation}) => {

    useEffect(() => {
        fetchFonts();
      }, []);

      const handleLoginPress = () => {
        navigation.navigate('Login'); 
      };
    
      const handleRegisterPress = () => {
        navigation.navigate('Register'); 
      };
    
    return (
        <LinearGradient
            colors={['#bb2d35','#7a90b2', '#1aa28d',]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 2, y: 1 }}
            style={styles.container}>
            <View style={styles.circle1}></View>

            <Image source={require('../../assets/logo.png')} style={styles.image}/>
            <View style={{flexDirection:'row', marginTop:100}}>
                <Text style={{color:'white', fontSize:20, fontFamily:'NunitoBoldItalic',  letterSpacing:4}}>Welcome To</Text>
                <Text style={{color:'#0f1f58', fontSize:20, fontFamily:'NunitoBoldItalic', letterSpacing:4}}> Yenwise </Text>
            </View>
            <Text style={{color:'white', fontSize:13, fontFamily:'NunitoItalic',  letterSpacing:1, textAlign:'center', marginTop:20, padding:10}}>Discover the seamless integration capabilities that consolidate a diverse array of payment solutions, transcending traditional financial boundaries and propelling towards future innovation.</Text>

            <View style={styles.buttonview}>
                <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
            
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logintext: {
        margin: 30,
        color: 'white',
        fontSize: 24,
        marginTop:100
    },
    image:{
        width:'50%',
        marginTop:100
    },
    loginButton:{
        backgroundColor:'#384c71',
        width:'70%',
        padding:10,
        borderRadius:10,
        alignItems:'center',
        borderColor:'#384c71',
        borderWidth:1,
    },
    loginButtonText:{
        color:'white'
    },
    registerButton:{
        width:'70%',
        padding:10,
        borderColor:'#384c71',
        borderWidth:1,
        marginTop:10,
        borderRadius:10,
        alignItems:'center'
    },
    registerButtonText:{
        color:'white'
    },
    buttonview:{
        width:'100%',
        marginTop:'60%',
        alignItems:'center'
    }
});

export default Onboard;
