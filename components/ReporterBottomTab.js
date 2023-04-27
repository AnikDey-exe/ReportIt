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

export default function ReporterBottomTab({ navigation, currentTab }) {
    return (
        <View style={styles.bottomTab}>
            <TouchableOpacity
                style={currentTab === 'UserHome' ? styles.selectedTab: styles.unselectedTab}
                onPress={() => {
                    navigation.navigate('UserHome')
                    changeStack('UserHome')
                }}>
                <Image
                    source={require('../assets/images/homeAlt.png')}
                    style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity
                style={currentTab === 'File' ? styles.selectedTab: styles.unselectedTab}
                onPress={() => {
                    navigation.navigate('File')
                    changeStack('File')
                }}>
                <Image
                    source={require('../assets/images/contract.png')}
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