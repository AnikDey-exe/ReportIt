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
    TextInput,
    ImageBackground
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { changeStack } from '../navigation.service';
import ReporterBottomTab from '../components/ReporterBottomTab';
import {getUserDetails} from '../database/services/getUserDetails';

export default function UserHomeScreen({ navigation }) {
    const [email, setEmail] = useState(auth().currentUser.email)
    const [firstName, setFirstName] = useState('')
    const [reporter, setReporter] = useState({})

    useEffect(()=>{
        async function getUser() {
            setReporter(await getUserDetails(email))
            console.log(reporter) 
        }
        getUser();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View
                style={styles.sideTag}>
                    <Text> </Text>
                </View>
                <Text style={styles.headerTitle}> Hello {reporter.first_name}! </Text>
            </View>

            <Text style={styles.typeText}> Reporter </Text>

            <View style={styles.reportsContainer}>
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate("UserReports")
                }}
                style={styles.reportsButton}>
                    <Text style={styles.reportsText}> My Reports </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.signOutButton}
                onPress={() => {
                    auth().signOut()
                        .then(() => {
                            navigation.navigate('Home')
                            changeStack('Home')
                        })
                }}>
                <Text style={styles.signOutText}> Sign Out </Text>
            </TouchableOpacity>
            
            <ReporterBottomTab
            currentTab="UserHome"
            navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 40
    },
    sideTag: {
        backgroundColor: '#a5a5d6',
        width: 7.5,
        height: 50,
    },
    headerTitle: { 
        marginLeft: 20, 
        fontSize: 35, 
        color: 'black', 
        fontFamily: 'Poppins-SemiBold' 
    },
    typeText: { 
        marginLeft: 32.5, 
        fontSize: 20, 
        color: 'grey', 
        fontFamily: 'Poppins-SemiBold' 
    },
    reportsContainer: {
        width: '82.5%', 
        height: '50%', 
        backgroundColor: '#d6d6d6', 
        alignSelf: 'center', 
        marginTop: '15%', 
        borderRadius: 20, 
        justifyContent: 'center'
    },
    reportsButton: {
        alignSelf: 'center',
        width: 120, 
        backgroundColor: '#a5a5d6', 
        justifyContent: 'center', 
        height: 50, 
        borderRadius: 30
    },
    reportsText: {
        alignSelf: 'center', 
        color: 'white', 
        fontFamily: 'Poppins-Regular'
    },
    signOutButton: {
        position: 'absolute', 
        bottom: 80
    },
    signOutText: { 
        marginTop: 0, 
        marginLeft: 35, 
        fontSize: 17.5, 
        color: '#eb3b3b', 
        fontFamily: 'Poppins-Bold' 
    },
    bottomTab: { 
        width: '100%', 
        height: 60, 
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 0, 
        justifyContent: 'space-around', 
        backgroundColor: 'white', 
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowOpacity: 10,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 15,
        shadowOffset: { width: 5, height: 5 },
        alignItems: 'center'
    },
    selectedTab: {
        backgroundColor: '#a5a5d6',
        width: 75,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    unselectedTab: {
        width: 75,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
})