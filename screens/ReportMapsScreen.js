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
import NgoBottomTab from '../components/NgoBottomTab';
import { getPursuedReports } from '../database/services/getPursuedReports';
import { reportSchema } from '../database/schemas/Report';

export default function ReportMapsScreen({ route, navigation }) {
    const [email, setEmail] = useState(auth().currentUser.email)
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [focusLat, setFocusLat] = useState(0)
    const [focusLon, setFocusLon] = useState(0)
    const [selectedItem, setSelectedItem] = useState(null)
    const [currIdx, setCurrIdx] = useState(0)

    async function getReports() {
        setLoading(true)
        const app = new Realm.App({
            id: "xxxx",
            timeout: 1000
        });

        const credentials = Realm.Credentials.anonymous();
        let user;
        let realm;
        try {
            user = await app.logIn(credentials);

            realm = await Realm.open({
                schema: [reportSchema],
                sync: {
                    user: user,
                    flexible: true
                },
            });

            await realm.subscriptions.update((subs) => {
                const reports = realm
                    .objects("Reports")
                subs.add(reports);
            });
            console.log("subscribed")
        } catch (err) {
            console.error("Failed to log in", err);
        }

        var data = realm.objects("Reports");

        var userData = data.filtered(`pursuer='${email}'`);

        var sortedData = userData.sorted('name', false);
        console.log(sortedData)

        setReports([...sortedData])
        setFocusLat(parseFloat(sortedData[0].latitude))
        setFocusLon(parseFloat(sortedData[0].longitude))

        setLoading(false)

        setTimeout(() => {
            user.logOut()
        }, 2000)
    }

    useEffect(() => {
        getReports();
    }, [])

    return (
        <View style={styles.overallContainer}>
            <Text style={styles.screenTitle}> Map</Text>
            {loading === false ?
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: focusLat,
                        longitude: focusLon,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.5,
                    }}
                >
                    {reports.map((item, i) => {
                        return (
                            <Marker
                                key={i}
                                onPress={() => {
                                    // navigation.navigate('ReportDetails', {
                                    //     id: item.report_id
                                    // })
                                    setSelectedItem(item)
                                    setCurrIdx(i)
                                }}
                                coordinate={{
                                    latitude: parseFloat(item.latitude),
                                    longitude: parseFloat(item.longitude),
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }} />
                        )
                    })}

                </MapView> : null}
            {/* <TouchableOpacity
                onPress={()=>{
                    console.log(reports[0].latitude)
                }}>
                    <Text> Check </Text>
                </TouchableOpacity> */}
            {selectedItem !== null ?
                <View style={styles.bottomSheet}>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedItem(reports[currIdx - 1])
                            setCurrIdx(currIdx - 1)
                            setFocusLat(parseFloat(reports[currIdx - 1].latitude))
                            setFocusLon(parseFloat(reports[currIdx - 1].longitude))
                        }}
                        disabled={currIdx === 0 ? true : false}
                        style={styles.backButton}>
                        <Text style={styles.buttonText}> {'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.bottomSheetTitle}> {selectedItem.name} </Text>
                    <Text style={styles.description}> {selectedItem.description} </Text>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => {
                            navigation.navigate('ReportDetails', {
                                id: selectedItem.report_id
                            })
                        }}
                    >
                        <Text style={styles.viewText}> View </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedItem(reports[currIdx + 1])
                            setCurrIdx(currIdx + 1)
                            setFocusLat(parseFloat(reports[currIdx + 1].latitude))
                            setFocusLon(parseFloat(reports[currIdx + 1].longitude))
                        }}
                        disabled={currIdx === reports.length - 1 ? true : false}
                        style={styles.forwardButton}>
                        <Text style={styles.buttonText}> {'>'}</Text>
                    </TouchableOpacity>
                </View> : null}

            <NgoBottomTab
                navigation={navigation}
                currentTab="ReportMaps" />
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
        width: '100%',
        height: '100%'
    },
    overallContainer: {
        flex: 1
    },
    screenTitle: {
        position: 'absolute',
        top: 30,
        zIndex: 9,
        alignSelf: 'center',
        fontFamily: 'Poppins-SemiBold',
        color: 'black',
        fontSize: 20
    },
    bottomSheet: {
        width: '100%',
        height: '30%',
        position: 'absolute',
        bottom: 40,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowOpacity: 10,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 15,
        shadowOffset: { width: 5, height: 5 },
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
    bottomSheetTitle: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 40,
        marginTop: 35
    },
    description: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'Poppins-Regular',
        marginLeft: 42.5,
        marginTop: 10
    },
    viewButton: {
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#359c3f',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 50
    },
    viewText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        alignSelf: 'center',
        color: 'white',
        marginTop: 2.5
    },
    forwardButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
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
    unselected: {
        width: 75,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    selected: {
        backgroundColor: '#a5a5d6',
        width: 75,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
});