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

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#7272AB' }}>
                <Image
                    source={require('../assets/images/disagree.png')}
                    style={styles.appIcon} />

                <View style={styles.startContainer}>
                    <Text style={styles.titleText}> Report It </Text>
                    <Text style={styles.mottoText}> Helping children one at a time. </Text>

                    <TouchableOpacity style={styles.startButton}
                        onPress={() => {
                            this.props.navigation.navigate('Choose')
                        }}>
                        <Text style={styles.startText}> GET STARTED </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appIcon: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginTop: '25%'
    },
    startContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%'
    },
    titleText: {
        color: 'white',
        //fontWeight: 'bold',
        fontSize: 40,
        // alignSelf: 'center', 
        marginLeft: '9%',
        fontFamily: 'Poppins-Medium'
        // marginTop: '50%'
    },
    mottoText: {
        color: 'white',
        fontSize: 15,
        //alignSelf: 'center', 
        marginLeft: '11%',
        fontFamily: 'Poppins-Regular'
    },
    startButton: {
        // position: 'absolute',
        // bottom: 50,
        backgroundColor: '#7272AB',
        borderColor: 'white',
        borderWidth: 0.5,
        // marginLeft: '12.5%', 
        alignSelf: 'center',
        width: '75%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 50
    },
    startText: { 
        color: 'white', 
        fontSize: 15, 
        alignSelf: 'center', 
        fontFamily: 'Poppins-Light', 
        marginTop: 2.5
    }
})