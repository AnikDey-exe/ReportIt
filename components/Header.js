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

export default function Header({headerTitle}) {
    return (
        <Text style={styles.title}> {headerTitle} </Text>
    )
}

const styles = StyleSheet.create({
    title: { 
        marginLeft: 30, 
        marginTop: 40, 
        fontSize: 35, 
        color: 'black', 
        fontFamily: 'Poppins-SemiBold' 
    }
})