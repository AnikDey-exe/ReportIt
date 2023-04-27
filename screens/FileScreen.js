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
    FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { changeStack } from '../navigation.service';
import { List } from 'realm';
import { set } from 'react-native-reanimated';
import ReporterBottomTab from '../components/ReporterBottomTab';
import Header from '../components/Header';
import { createId } from '../utils/createId';
import { getCurrentDate } from '../utils/getCurrentDate';
import { reportSchema } from '../database/schemas/Report';

export default function FileScreen({ navigation }) {
    const [email, setEmail] = useState(auth().currentUser.email)
    const [buttonState, setButtonState] = React.useState('automatic')
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [latitude, setLatitude] = React.useState("")
    const [longitude, setLongitude] = React.useState("")
    const [finalLat, setFinalLat] = React.useState("")
    const [finalLng, setFinalLng] = React.useState("")
    const [street, setStreet] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [zip, setZip] = React.useState("")
    const [data, setData] = React.useState([
        {
            day: "Sunday"
        },
        {
            day: "Monday"
        },
        {
            day: "Tuesday"
        },
        {
            day: "Wednesday"
        },
        {
            day: "Thursday"
        },
        {
            day: "Friday"
        },
        {
            day: "Saturday"
        }
    ])

    async function doSomething(text) {
        setAddress(text)
        if (address.length > 1) {
            try {
                const response = await fetch('https://api.geoapify.com/v1/geocode/autocomplete?text=' + text + '&format=json&apiKey=xxxx');
                const json = await response.json();
                setData(json.results)
            } catch (error) {
                console.log(error);
            }
        } else {
            setData([])
        }
    }

    async function getLatLon(text) {
        if (address === '') {
            var addressString = ''
            if (street !== '') {
                addressString = addressString + street + ', '
            }
            if (city !== '') {
                addressString = addressString + city + ', '
            }
            if (state !== '') {
                addressString = addressString + state + ', '
            }
            if (country !== '') {
                addressString = addressString + country + ', '
            }
            if (zip !== '') {
                addressString = addressString + zip + ', '
            }

            try {
                const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressString + '&key=xxxx');

                const json = await response.json();
                const lat = json.results[0].geometry.location.lat;
                const lng = json.results[0].geometry.location.lng;

                return await [lat, lng]
            } catch (error) {
                console.log(error)
            }
        } else {
            var reqError = false;
            try {
                const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + text + '&key=xxxx');

                const json = await response.json();
                const lat = json.results[0]?.geometry?.location?.lat;
                const lng = json.results[0]?.geometry?.location?.lng;

                if (json.status !== 'OK') {
                    reqError = true;
                }

                return await [lat, lng, reqError]
            } catch (error) {
                console.log(error)
                reqError = true;
                return [0, 0, reqError]
            }
        }
    }

    async function getAddress(lat, lng) {
        var reqError = false;
        try {
            const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=xxxx')
            const json = await response.json();

            const address = json.results[0]?.formatted_address;

            if (json.status !== 'OK') {
                reqError = true;
            }

            return await [address, reqError]
        } catch (error) {
            console.log(err)
            reqError = true;
            return ['', reqError]
        }
    }

    async function fileReport() {
        var lat = latitude;
        var lng = longitude;
        var addr = address;
        var str = street;
        var ct = city;
        var st = state;
        var cntry = country;
        var zipNum = zip;
        var getLatLngReqError = false;
        var getAddressReqError = false;
        var id = await createId();
        var report_id = await createId();
        var filer = email;
        var reportName = name;
        var reportDescription = description;
        var fDate = await getCurrentDate();

        if (lat === '' && lng === '') {
            const latlng = await getLatLon(address);
            lat = latlng[0];
            lng = latlng[1];

            getLatLngReqError = latlng[2];
        }

        if (addr === '' && str === '' && ct === '' && st === '' && cntry === '' && zipNum === '') {
            const addrs = await getAddress(lat, lng);
            addr = addrs[0];

            getAddressReqError = addrs[1];
        }

        console.log(getAddressReqError)
        console.log('final lat', lat)
        console.log('final lng', lng)
        console.log('final addr', addr)

        if (!getLatLngReqError && !getAddressReqError) {
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

            let item1;
            realm.write(() => {
                item1 = realm.create('Reports', {
                    _id: id,
                    report_id: report_id,
                    filer: filer,
                    status: 'open',
                    dateFiled: fDate.toString(),
                    pursuer: '',
                    name: reportName,
                    description: reportDescription,
                    address: addr,
                    longitude: lng.toString(),
                    latitude: lat.toString(),
                    street: str,
                    city: ct,
                    state: st,
                    country: cntry,
                    zip: zipNum
                });
                console.log('Added data.')
            });

            var data = realm.objects("Reports");
            console.log('Data', data);
            alert("You have filed a report.")

            setTimeout(() => {
                user.logOut()
            }, 2000)
        } else {
            alert('The fields you have entered are invalid/incomplete. Please check again.')
        }
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                    setAddress(item.formatted)
                    setData([])
                }}>
                <Text style={{ fontFamily: 'Poppins-Regular', marginLeft: 10, marginTop: 10 }}>{item.formatted}</Text>
            </TouchableOpacity>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header
            headerTitle="File"/>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setButtonState('automatic')
                        setStreet('')
                        setCity('')
                        setState('')
                        setCountry('')
                        setZip('')
                        setLatitude('')
                        setLongitude('')
                    }}
                    style={buttonState === 'automatic' ? styles.selected : styles.unselected}>
                    <Text style={buttonState === 'automatic' ? styles.selectedText : styles.unselectedText}> Automatic </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setButtonState('manual')
                        setAddress('')
                        setLatitude('')
                        setLongitude('')
                    }}
                    style={buttonState === 'manual' ? styles.selected : styles.unselected}>
                    <Text style={buttonState === 'manual' ? styles.selectedText : styles.unselectedText}> Manual </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setButtonState('latlon')
                        setStreet('')
                        setCity('')
                        setState('')
                        setCountry('')
                        setZip('')
                        setAddress('')
                    }}
                    style={buttonState === 'latlon' ? styles.selected : styles.unselected}>
                    <Text style={buttonState === 'latlon' ? styles.selectedText : styles.unselectedText}> LAT/LON </Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.inputContainer}
                behavior="padding" enabled>
                <ScrollView>
                    {buttonState === "automatic" ? (
                        <View style={{
                            //remove this if keyboard avoiding view removed
                            marginBottom: '30%'
                        }}>
                            <Text style={styles.inputLabel}> NAME </Text>
                            <TextInput
                                style={styles.textInputUnfocused}
                                placeholder=""
                                value={name}
                                onChangeText={(text) => {
                                    setName(text)
                                }}
                            />
                            <Text style={styles.inputLabel}> ADDRESS </Text>
                            <TextInput
                                style={styles.textInputUnfocused}
                                placeholder=""
                                value={address}
                                onChangeText={(text) => {
                                    doSomething(text)
                                }}
                            //onBlur={() => { setData([]) }}
                            />
                            {address.length > 2 && data != [] ? <FlatList
                                style={{ 
                                    borderWidth: 0.5, 
                                    borderBottomColor: 'black', 
                                    width: '80%', 
                                    alignSelf: 'center',
                                    shadowOpacity: 5,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 15,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: 'white'
                                }}
                                keyExtractor={keyExtractor}
                                data={data}
                                renderItem={renderItem} /> :
                                null}

                            <Text style={styles.inputLabel}> DESCRIPTION </Text>
                            <TextInput
                                style={[styles.textInputUnfocused,{marginBottom: 20}]}
                                placeholder=""
                                multiline={true}
                                maxLength={300}
                                value={description}
                                onChangeText={(text) => {
                                    setDescription(text)
                                }}
                            />
                        </View>
                    ) : (
                        <View>
                            {buttonState === "manual" ? (
                                <View>
                                    <Text style={styles.inputLabel}> NAME </Text>
                                    <TextInput
                                        style={styles.textInputUnfocused}
                                        placeholder=""
                                        value={name}
                                        onChangeText={(text) => {
                                            setName(text)
                                        }}
                                    />
                                    <Text style={styles.inputLabel}> STREET </Text>
                                    <TextInput
                                        style={styles.textInputUnfocused}
                                        placeholder=""
                                        value={street}
                                        onChangeText={(text) => {
                                            setStreet(text)
                                        }}
                                    />
                                    <View style={styles.halfhalfView}>
                                        <View style={{ width: '45%' }}>
                                            <Text style={styles.inputLabel}> CITY </Text>
                                            <TextInput
                                                style={styles.textInputUnfocused}
                                                placeholder=""
                                                value={city}
                                                onChangeText={(text) => {
                                                    setCity(text)
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '45%' }}>
                                            <Text style={styles.inputLabel}> STATE </Text>
                                            <TextInput
                                                style={styles.textInputUnfocused}
                                                placeholder=""
                                                value={state}
                                                onChangeText={(text) => {
                                                    setState(text)
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.twotooneView}>
                                        <View style={{ width: '60%' }}>
                                            <Text style={styles.inputLabel}> COUNTRY </Text>
                                            <TextInput
                                                style={styles.textInputUnfocused}
                                                placeholder=""
                                                value={country}
                                                onChangeText={(text) => {
                                                    setCountry(text)
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '30%' }}>
                                            <Text style={styles.inputLabel}> ZIP </Text>
                                            <TextInput
                                                style={styles.textInputUnfocused}
                                                placeholder=""
                                                value={zip}
                                                onChangeText={(text) => {
                                                    setZip(text)
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.inputLabel}> DESCRIPTION </Text>
                                    <TextInput
                                        style={[styles.textInputUnfocused, {marginBottom: 20 }]}
                                        placeholder=""
                                        multiline={true}
                                        maxLength={300}
                                        value={description}
                                        onChangeText={(text) => {
                                            setDescription(text)
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={{ marginBottom: '30%' }}>
                                    <Text style={styles.inputLabel}> NAME </Text>
                                    <TextInput
                                        style={styles.textInputUnfocused}
                                        placeholder=""
                                        value={name}
                                        onChangeText={(text) => {
                                            setName(text)
                                        }}
                                    />
                                    <View style={styles.halfhalfView}>
                                        <View style={{ width: '45%' }}>
                                            <Text style={styles.inputLabel}> LAT </Text>
                                            <TextInput
                                                style={styles.textInputUnfocused}
                                                placeholder=""
                                                value={latitude}
                                                onChangeText={(text) => {
                                                    setLatitude(text)
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '45%' }}>
                                            <Text style={styles.inputLabel}> LON </Text>
                                            <TextInput
                                                style={styles.textInputUnfocused}
                                                placeholder=""
                                                value={longitude}
                                                onChangeText={(text) => {
                                                    setLongitude(text)
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <Text style={styles.inputLabel}> DESCRIPTION </Text>
                                    <TextInput
                                        style={styles.textInputUnfocused}
                                        placeholder=""
                                        multiline={true}
                                        maxLength={300}
                                        value={description}
                                        onChangeText={(text) => {
                                            setDescription(text)
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity
                onPress={() => {
                    fileReport()
                }}
                style={[styles.postButton, {opacity: name === '' ? 0.5 : 1}]}
                disabled={name === '' ? true : false}>
                <Text style={styles.selectedText}> Post </Text>
            </TouchableOpacity>


            <ReporterBottomTab
            currentTab="File"
            navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    selected: {
        backgroundColor: '#a5a5d6',
        width: '25%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    unselected: {
        width: '25%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    selectedText: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        alignSelf: 'center'
    },
    unselectedText: {
        fontFamily: 'Poppins-Regular'
    },
    textInputFocused: {
        borderBottomWidth: 1,
        width: '80%',
        marginLeft: '10%',
        borderBottomColor: '#b3b3b3',
        marginTop: -15,
        paddingLeft: 0,
        paddingBottom: 0,
        zIndex: 99
    },
    textInputUnfocused: {
        borderBottomWidth: 1,
        width: '80%',
        marginLeft: '10%',
        borderBottomColor: '#b3b3b3',
        marginTop: -15,
        paddingLeft: 0,
        paddingBottom: 0,
        zIndex: 1
    },
    title: { 
        marginLeft: 30, 
        marginTop: 40, 
        fontSize: 35, 
        color: 'black', 
        fontFamily: 'Poppins-SemiBold' 
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginTop: 0, 
        width: '90%', 
        alignSelf: 'center' 
    },
    inputContainer: {
        position: 'absolute',
        width: '90%',
        bottom: '30%',
        backgroundColor: 'white',
        margin: 20,
        alignSelf: 'center',
        borderRadius: 15,
        height: 300
    },
    inputLabel: { 
        marginLeft: '9.5%', 
        fontSize: 12.5, 
        fontFamily: 'Poppins-Regular', 
        marginTop: 20 
    },
    postButton: {
        position: 'absolute', 
        bottom: '15%', 
        right: '5.5%', 
        width: 90, 
        height: 40, 
        borderRadius: 25, 
        backgroundColor: '#a5a5d6', 
        justifyContent: 'center',
    },
    halfhalfView: { 
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    twotooneView: { 
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        marginLeft: '-2.5%' 
    },
    bottomTabContainer: {
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