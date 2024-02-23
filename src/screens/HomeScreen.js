import React, { useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Home = () => {
    const {logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
                <Text style={styles.hellotext}>Hello</Text>

                {/* <TouchableOpacity style={{marginLeft:90,marginTop:40}} onPress={() => {logout()}}>
                    <Text>Log out</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    hellotext:{
        color: '#384c71',
        fontSize: 24,
        fontFamily:'NunitoBoldItalic',
        
    },

});

export default Home ;