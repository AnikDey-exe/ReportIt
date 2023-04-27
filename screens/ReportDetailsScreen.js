import React, { useEffect, useState, useCallback } from 'react';
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
    TextInput,
    FlatList
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Realm from 'realm';
import auth from '@react-native-firebase/auth';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { getReportDetails } from '../database/services/getReportDetails';
import { updateReport } from '../database/services/updateReport';

export default function ReportDetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const [email, setEmail] = useState(auth().currentUser.email)
    const [reportData, setReportData] = useState({})
    const [accountType, setAccountType] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getDetails() {
            setLoading(true);
            let data = await getReportDetails(id, email)
            setReportData(data[0])
            setAccountType(data[1])
            setLoading(data[2])
        }
        getDetails();

        
    }, [])

    return (
        <View style={styles.container}>
             <TouchableOpacity style={styles.backButton} onPress={() => {
                    navigation.goBack()
                }}>
                    <Text style={styles.backText}> {'< Back'} </Text>
                </TouchableOpacity>
            {loading === false ?
            (<ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.nameTitle}>{reportData.name}</Text>
                    <View style={styles.alertContainer}>
                        <Text style={styles.alertText}> ! </Text>
                    </View>
                </View>
                {reportData.description !== '' ? 
                <Text style={styles.description}> {reportData.description} </Text> 
                : <Text style={styles.description}>No description</Text>}
                
                {reportData.address !== '' ? <View style={styles.bigCard}>
                    <Text style={styles.addressText}> Address </Text>
                    <Image
                    source={require('../assets/images/maps-and-flags.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}/>
                    <Text style={styles.infoText}>{reportData.address} </Text>
                </View>: null}
                
                {reportData.street !== '' ? <View style={styles.bigCard}>
                    <Text style={styles.streetText}> Street </Text>
                    <Image
                    source={require('../assets/images/maps-and-flags.png')}
                    style={{
                        width: 30,
                        height: 30,
                    }}/>
                    <Text style={styles.infoText}> {reportData.street} </Text>
                </View> : null}
                
                <View style={[styles.cardContainer, {marginTop: 30}]}>
                {reportData.city !== '' ? 
                    <View style={[styles.smallCard, {width: reportData.state !== '' ?'45%':'100%', }]}>
                        <Text style={styles.cardText}> City </Text>
                        <Text style={styles.infoText2}> {reportData.city} </Text>
                    </View>: null}
                {reportData.state !== '' ? 
                    <View style={[styles.smallCard, {width: reportData.city !== '' ?'45%':'100%', }]}>
                        <Text style={styles.cardText}> State </Text>
                        <Text style={styles.infoText2}> {reportData.state} </Text>
                    </View>
                    : null}
                </View>

                <View style={[styles.cardContainer, {marginTop: 0}]}>
                {reportData.country !== '' ? 
                    <View style={[styles.smallCard, {width: reportData.zip !== '' ?'45%':'100%', }]}>
                        <Text style={styles.cardText}> Country </Text>
                        <Text style={styles.infoText2}> {reportData.country} </Text>
                    </View>
                    : null}
                {reportData.zip !== '' ? 
                    <View style={[styles.smallCard, {width: reportData.country !== '' ?'45%':'100%', }]}>
                        <Text style={styles.cardText}> Zip </Text>
                        <Text style={styles.infoText2}> {reportData.zip} </Text>
                    </View>
                    : null}
                </View>
                
                {reportData.longitude != null && reportData.latitude != null ? 
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: parseFloat(reportData.latitude),
                        longitude: parseFloat(reportData.longitude),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Marker coordinate={{
                        latitude: parseFloat(reportData.latitude),
                        longitude: parseFloat(reportData.longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}/>
                </MapView> : null}
                {reportData.status === 'open' && accountType === 'ngo'?
                <TouchableOpacity 
                onPress={async()=>{
                    setReportData(await updateReport(id, email))
                }}
                style={styles.pursueButton}>
                    <Text style={styles.pursueText}> Pursue </Text>
                </TouchableOpacity>: null}
                
            </ScrollView>) : <Text style={styles.loadingText}> Loading </Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1 
    },
    map: {
        //...StyleSheet.absoluteFillObject,
        height: 300,
        width: '90%',
        margin: 20
    },
    loadingText: {
        fontSize: 30, 
        alignSelf: 'center', 
        fontFamily: 'Poppins-Regular',
        marginTop: '50%'
    },
    pursueText: {
        color: 'white',
        alignSelf: 'center', 
        fontFamily: 'Poppins-Regular'
    },
    pursueButton: {
        alignSelf: 'center', 
        width: '90%', 
        backgroundColor: '#359c3f', 
        marginBottom: 40, 
        height: 50, 
        justifyContent: 'center'
    },
    cardText: {
        position: 'absolute', 
        fontFamily: 'Poppins-SemiBold', 
        fontSize: 17.5, 
        top: 10,
        color: 'black'
    },
    streetText: {
        marginTop: 0, 
        fontFamily: 'Poppins-Regular', 
        fontSize: 17.5
    },
    addressText: {
        marginTop: 0,
        fontFamily: 'Poppins-Bold', 
        fontSize: 17.5, 
        color: 'black'
    },
    description: { 
        fontFamily: 'Poppins-Regular', 
        marginLeft: 27.5, 
        fontSize: 17.5, 
        marginTop: -15 
    },
    alertText: { 
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 20 
    },
    alertContainer: { 
        width: 30, 
        height: 30, 
        marginTop: 12.5, 
        backgroundColor: '#c21717', 
        marginLeft: 15, 
        borderRadius: 50, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    backButton: {
        width: 100,
        margin: 30
    },
    backText: {
        fontFamily: 'Poppins-Regular', 
        color: 'black', 
        fontSize: 17.5 
    },
    headerContainer: { 
        flexDirection: 'row', 
        margin: 30, 
        marginTop: 0 
    },
    nameTitle: { 
        fontSize: 35, 
        color: 'black', 
        fontFamily: 'Poppins-SemiBold' 
    },
    bigCard: { 
        backgroundColor: '#c9c9c9', 
        width: '85%', 
        borderRadius: 15, 
        height: 140, 
        alignItems: 'center', 
        alignSelf: 'center',
        marginTop: 20, 
        justifyContent: 'center' 
    },
    infoText: {
        marginTop: 10, 
        fontFamily: 'Poppins-Regular'
    },
    cardContainer: {
        flexDirection: 'row', 
        margin: 30, 
        justifyContent: 'space-between',
    },
    infoText2: {
        marginTop: 10, 
        fontFamily: 'Poppins-Regular', 
        fontSize: 17.5
    },
    smallCard: { 
        backgroundColor: '#c9c9c9', 
    //width: reportData.state !== '' ?'45%':'100%', 
        borderRadius: 15, 
        height: 150, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})