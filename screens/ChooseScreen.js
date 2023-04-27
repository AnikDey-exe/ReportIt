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

export default function ChooseScreen({ navigation }) {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }}>
                <Text style={styles.backText}> {'< Back'} </Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/images/share.png')}
                style={{
                    alignSelf: 'center',
                    width: 250,
                    height: 250,
                    marginTop: '15%'
                }} />
            <Text style={styles.title}> CHOOSE </Text>
            <Text style={styles.subtitle}> Select between an NGO or a reporter. </Text>
            <View style={{ backgroundColor: '#7272AB', height: '37.5%', marginTop: '15%', borderTopLeftRadius: 35, borderTopRightRadius: 35, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.ngoButton}
                    onPress={() => {
                        navigation.navigate('Select', {
                            type: 'ngo'
                        })
                    }}>
                    <Text style={styles.buttonText}> NGO </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ngoButton2}
                    onPress={() => {
                        navigation.navigate('Select', {
                            type: 'reporter'
                        })
                    }}>
                    <Text style={[styles.buttonText, { color: 'white' }]}> REPORTER </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%'
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
        borderRadius: 10
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
    backText: {
        fontFamily: 'Poppins-Regular', 
        color: 'black', 
        marginLeft: '8%', 
        position: 'absolute', 
        top: 20, 
        fontSize: 17.5
    }
});