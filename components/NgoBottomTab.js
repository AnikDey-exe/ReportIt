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
import auth from '@react-native-firebase/auth';
import { changeStack } from '../navigation.service';

export default function NgoBottomTab({ navigation, currentTab }) {
    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('NgoHome')
                }}
                style={currentTab === 'NgoHome' ? styles.selectedTab: styles.unselectedTab}>
                <Image
                    source={require('../assets/images/homeAlt.png')}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ReportMaps')
                }}
                style={currentTab === 'ReportMaps' ? styles.selectedTab: styles.unselectedTab}>
                <Image
                    source={require('../assets/images/maps-and-flags.png')}
                    style={{ width: 30, height: 30, marginLeft: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity
                style={currentTab === 'Reports' ? styles.selectedTab: styles.unselectedTab}
                onPress={() => {
                    navigation.navigate('Reports')
                }}>
                <Image
                    source={require('../assets/images/list.png')}
                    style={{ width: 30, height: 30, marginLeft: 5 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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