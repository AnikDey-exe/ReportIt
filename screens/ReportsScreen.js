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
    Image,
    TextInput,
    FlatList
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import NgoBottomTab from '../components/NgoBottomTab';
import SearchBar from '../components/SearchBar';
import CardItem from '../components/CardItem';
import AltHeader from '../components/AltHeader';
import { getAllReports } from '../database/services/getAllReports';
import { search } from '../utils/search';
import { sort } from '../utils/sort';

export default class ReportsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            reports: [],
            email: auth().currentUser.email,
            sorter: 'A-to-Z',
            value: ''
        },
            this.arrayholder = []
    }

    sortDates(a, b) {
        return Date.parse(new Date(a.dateFiled)) - Date.parse(new Date(b.dateFiled))
    }

    async componentDidMount() {
        this.setState({
            reports: await getAllReports()
        })
        this.arrayholder = await getAllReports()
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, index }) => {
        return (
            <CardItem
            data={item}
            onView={()=>{this.props.navigation.navigate('ReportDetails', {
                        id: item.report_id
            })}}
            onDelete={()=>{
                this.delete(item)
            }}
            deletable={false}/>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AltHeader
                headerTitle="Reports"
                top={30}/>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                sorter: this.state.sorter === "A-to-Z" ? "Z-to-A" : "A-to-Z"
                            })

                            setTimeout(() => {
                                let sortedData = sort(this.state.sorter, this.arrayholder)
                                this.arrayholder = sortedData
                                this.setState({
                                    reports: sortedData
                                })
                            }, 1000)
                        }}
                        style={styles.sortButton}>
                        <Text
                            style={styles.sortText}> {this.state.sorter} </Text>
                    </TouchableOpacity>
                    <SearchBar
                    onChange={text => {
                        this.setState({
                            value: text,
                            reports: search(this.arrayholder, text)
                        })
                    }}
                    searchValue={this.state.value}/>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                value: ''
                            })
                            setTimeout(() => {
                                this.setState({
                                    reports: search(this.arrayholder, this.state.value)
                                })
                            }, 1000)

                        }}
                        style={styles.clearButton}>
                        <Text style={styles.clearText}> x </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <FlatList
                        style={styles.reportsContainer}
                        key={this.keyExtractor}
                        data={this.state.reports}
                        renderItem={this.renderItem} />
                </ScrollView>

                <NgoBottomTab
                    navigation={this.props.navigation}
                    currentTab="Reports"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backText: {
        fontFamily: 'Poppins-Regular',
        color: 'black',
        marginLeft: 12.5,
        position: 'absolute',
        top: 20,
        fontSize: 17.5
    },
    headerTitle: {
        marginTop: 30,
        marginLeft: 10,
        fontSize: 35,
        color: 'black',
        fontFamily: 'Poppins-SemiBold'
    },
    headerContainer: {
        flexDirection: 'row',
        width: '92.5%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10
    },
    sortButton: {
        backgroundColor: 'white',
        width: '22.5%',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sortText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15
    },
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
    },
    clearButton: {
        backgroundColor: '#a5a5d6',
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    clearText: {
        fontFamily: 'Poppins-Regular',
        color: 'white',
        fontSize: 30
    },
    reportsContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30
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
    selectedTab: {
        width: 75,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#a5a5d6',
    },
    unselectedTab: {
        width: 75,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    }
})