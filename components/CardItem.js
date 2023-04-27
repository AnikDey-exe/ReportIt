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

export default function CardItem({ data, onView, onDelete, deletable }) {
    return (
        <View style={styles.cardHolder}>
            <Text style={styles.cardTitle}>{data.name} </Text>
            
            {data.address !== '' ? <Text style={styles.cardSubtitle}>{data.address} </Text> : null}
            {data.street !== '' ? <Text style={styles.cardSubtitle}>{data.street} </Text> : null}
            {data.city !== '' ? <Text style={styles.cardSubtitle}>{data.city} </Text> : null}
            {data.country !== '' ? <Text style={styles.cardSubtitle}>{data.country} </Text> : null}
            {data.status !== '' ? <Text style={styles.cardSubtitle}>{data.status} </Text> : null}

            {deletable ? 
            <TouchableOpacity
                onPress={onDelete}
                style={styles.deleteButton}>
                <Text style={{ color: 'red' }}> x </Text>
            </TouchableOpacity> : null}

            <TouchableOpacity
                onPress={onView}
                style={styles.viewButton}>
                <Text style={styles.viewText}> View </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardHolder: {
        marginTop: 20,
        shadowOpacity: 7.5,
        shadowRadius: 2.5,
        shadowColor: 'black',
        elevation: 10,
        shadowOffset: { width: 2.5, height: 2.5 },
        backgroundColor: 'white',
        padding: 20
    },
    cardTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        color: '#359c3f'
    },
    cardSubtitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10
    },
    deleteButton: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    viewButton: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#359c3f',
        marginTop: 20,
        height: 40,
        justifyContent: 'center'
    },
    viewText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        alignSelf: 'center',
        color: 'white',
        marginTop: 2.5
    }
})