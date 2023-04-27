import React, { useEffect } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Realm, { User } from 'realm';
import auth from '@react-native-firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function SelectScreen({ route, navigation }) {
    const { type } = route.params;

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }}>
                <Text style={styles.headerText}> {'< Back'} </Text>
            </TouchableOpacity>
            <View style={styles.overallContainer}>
                <View style={styles.loginContainer}>
                    <Text style={[styles.buttonText, { color: 'white', fontSize: 15 }]}> For existing members </Text>
                    <Image
                        source={require('../assets/images/investment.png')}
                        style={{
                            //alignSelf: 'center',
                            width: 125,
                            height: 125,
                        }} />
                    <TouchableOpacity style={styles.ngoButton2}
                    onPress={()=>{
                        if (type =='reporter') {
                            navigation.navigate('UserLogin')
                        } else if (type === 'ngo') {
                            navigation.navigate('NgoLogin')
                        }
                    }}>
                        <Text style={[styles.buttonText, { color: 'white' }]}> LOGIN </Text>
                    </TouchableOpacity>
                </View>
                <Text style={[styles.buttonText, { color: 'grey', marginTop: '10%', fontSize: 20 }]}> - OR - </Text>
                <View style={styles.signupContainer}>
                    <Text style={[styles.buttonText, { color: 'grey', fontSize: 15 }]}> Are you new here? </Text>
                    <Image
                        source={require('../assets/images/rocket.png')}
                        style={{
                            //alignSelf: 'center',
                            width: 125,
                            height: 125,
                        }} />
                    <TouchableOpacity style={styles.ngoButton}
                        onPress={() => {
                            if (type === 'reporter') {
                                navigation.navigate('UserSignup')
                            } else if (type === 'ngo') {
                                navigation.navigate('NgoSignup')
                            }
                        }}>
                        <Text style={styles.buttonText}> SIGN UP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%',
        //justifyContent: 'center'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: 'black',
        alignSelf: 'center',
        marginTop: 30
    },
    subtitle: {
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 10
    },
    ngoButton: {
        alignSelf: 'center',
        width: '60%',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: 20,
        borderColor: '#7272AB',
        borderWidth: 1,
    },
    ngoButton2: {
        alignSelf: 'center',
        width: '60%',
        backgroundColor: '#7272AB',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Poppins-Regular',
        alignSelf: 'center',
        marginTop: 2.5,
        color: '#7272AB'
    },
    headerText: { 
        fontFamily: 'Poppins-Regular', 
        color: 'black', 
        marginLeft: '17.5%', 
        position: 'absolute', 
        top: 25, 
        fontSize: 17.5 
    },
    overallContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        backgroundColor: '#7272AB',
        width: 250,
        alignSelf: 'center',
        height: 250,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupContainer: {
        backgroundColor: 'white',
        width: 250,
        alignSelf: 'center',
        height: 250,
        marginTop: '10%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
});