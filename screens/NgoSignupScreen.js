import React, { useEffect, useState } from 'react';
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
    Image,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Realm, { User } from 'realm';
import auth from '@react-native-firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import registerAccount from '../database/services/auth/register';

export default function NgoSignupScreen({ route, navigation }) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }}>
                <Text style={styles.backText}> {'< Back'} </Text>
            </TouchableOpacity>
            <Image
                source={require('../assets/images/rocket.png')}
                style={styles.thumbnail} />
            <Text style={styles.title}> Register </Text>
            <KeyboardAvoidingView
                style={styles.inputContainer}
                behavior='padding' enabled>
                <Text style={styles.inputLabel}> FIRST NAME </Text>
                <TextInput
                    style={styles.inputField}
                    placeholder=""
                    value={firstName}
                    onChangeText={(text) => {
                        setFirstName(text)
                    }} />

                <Text style={[styles.inputLabel, {marginTop: 20}]}> LAST NAME </Text>
                <TextInput
                    style={styles.inputField}
                    placeholder=""
                    value={lastName}
                    onChangeText={(text) => {
                        setLastName(text)
                    }} />

                <Text style={[styles.inputLabel, {marginTop: 20}]}> NGO EMAIL (Not personal) </Text>
                <TextInput
                    style={styles.inputField}
                    placeholder=""
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                    }} />

                <Text style={[styles.inputLabel, {marginTop: 20}]}> PASSWORD </Text>
                <TextInput
                    style={styles.inputField}
                    placeholder=""
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setPassword(text)
                    }} />
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.ngoButton2}
                onPress={() => {
                    registerAccount(firstName, lastName, email, password, 'ngo')
                }}>
                <Text style={[styles.buttonText, { color: 'white' }]}> Sign Up </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
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
        fontSize: 35,
        fontFamily: 'Poppins-Medium',
        color: 'black',
        marginTop: 30,
        marginLeft: '8%'
    },
    ngoButton2: {
        alignSelf: 'center',
        width: '82.5%',
        backgroundColor: '#7272AB',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 20,
        position: 'absolute',
        bottom: '3%'
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
    },
    thumbnail: {
        alignSelf: 'center',
        width: 250,
        height: 250,
        marginTop: '10%'
    },
    inputContainer: {
        position: 'absolute',
        bottom: '12.5%',
        width: '100%',
        backgroundColor: 'white'
    },
    inputLabel: { 
        marginLeft: '10%', 
        fontSize: 12.5, 
        fontFamily: 'Poppins-Regular' 
    },
    inputField: { 
        borderBottomWidth: 1, 
        width: '80%', 
        marginLeft: '10.5%', 
        borderBottomColor: '#b3b3b3', 
        marginTop: -15, 
        paddingLeft: 0, 
        paddingBottom: 0 
    }
});