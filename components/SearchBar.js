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

export default function SearchBar({ onChange, searchValue }) {
    return (
        <TextInput
            style={styles.searchBar}
            onChangeText={onChange}
            placeholder="Search"
            value={searchValue} />
    )
}

const styles = StyleSheet.create({
    searchBar: {
        //borderColor: 'grey',
        //borderWidth: 1, 
        borderRadius: 10,
        fontFamily: 'Poppins-Regular',
        width: '60%',
        backgroundColor: 'white',
        shadowOpacity: 7.5,
        shadowRadius: 2.5,
        shadowColor: 'black',
        elevation: 10,
        shadowOffset: { width: 2.5, height: 2.5 },
        paddingLeft: 20,
        height: 50
    }
})