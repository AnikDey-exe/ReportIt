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

export default function AltHeader({headerTitle, top}) {
    return (
        <Text style={[styles.title, {marginTop: top}]}> {headerTitle} </Text>
    )
}

const styles = StyleSheet.create({
    title: { 
        marginLeft: 10, 
        fontSize: 35, 
        color: 'black', 
        fontFamily: 'Poppins-SemiBold' 
    }
})