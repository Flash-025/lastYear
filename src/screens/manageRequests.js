import React, { Component } from "react";
import { StatusBar, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import Storage from '../helper/Storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'

export default class manageRequests extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookingList: [],
            servicesRequested: [],
            details: {}
        }

        this.getBooking()
    }

    getBooking = () => {
        Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerWorkshop').on('value', (data) => {
            var list = []
            var details = []
            list = data.toJSON()
            for (var index in list) {
                list = list[index]
            }
            this.state.details = list
            var bookList = list.Booking
          
            for (var iteration in bookList) {
                this.state.bookingList.push(bookList[iteration])
            }
            this.setState({
                bookingList: this.state.bookingList
            })
        })
    }

    acceptBooking = (item) => 
    {
        Storage.firebase.database().ref('Users/' + item.userId).update(
            {
                bookingmessage: 'Your booking was confirmed!'
            }
        ).then(() => {
            Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerWorkshop/' +  this.state.details.UID + '/Booking/' +item.UID).update({
                accepted: 'true'
            })
            this.props.navigation.goBack()
        });
    }

    rejectBooking = (item) => 
    {
        Storage.firebase.database().ref('Users/' + item.userId).update(
            {
                bookingmessage: 'Your booking was cancelled!'
            }
        ).then(() => {
            Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerWorkshop/' +  this.state.details.UID + '/Booking/' +item.UID).remove()
            this.props.navigation.goBack()
        });
    }

    renderItem = ({ item, index }) => {
        return (
         <View style={{
                borderWidth: 1, borderColor: '#465881', marginHorizontal: '4%', alignSelf: 'center', width: '92%',
                borderRadius: 5, marginVertical: 10
             }}>
                <View style={{ padding: 10 }}>

                    <Text style={{ color: 'white', }}>
                        Booking by:          {item.username}
                    </Text>
                    <Text style={{ marginVertical: 5, color: 'white', }}>
                        Phone number:   {item.user_phoneNo}
                    </Text>
                    <Text style={{ color: 'white', }}>
                        Time:                     {item.time}
                    </Text>
                    <Text style={{ marginBottom: 20, color: "#fb5b5a", textAlign: 'center', fontSize: 18 }}>Bookings</Text>
                    {
                        Object.values(item.services).map((response, iteration) => {
                            return (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: 'white', width: '40%' }}>
                                        {iteration + 1}: {response.name}
                                    </Text>
                                    <Text style={{ color: 'white', }}>
                                        {' '} Rs. {response.price}
                                    </Text>

                                </View>
                            )
                        })
                    }

                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {
                            item.accepted != undefined ?

                                <Text style={{ marginLeft: 5, color: '#50AD01', fontSize: 16 }} >Accepted</Text>
                                 :
                                <>
                                    <TouchableOpacity style={{ marginRight: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                        onPress={() => {
                                            this.acceptBooking(item)
                                        }}
                                    >
                                        <FontAwesome name='check-circle' size={25} color='#50AD01' />
                                        <Text style={{ marginLeft: 5, color: '#50AD01', fontSize: 16 }} >
                                            Accept
                            </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                        onPress={() => {
                                            this.rejectBooking(item)
                                        }}
                                    >
                                        <Entypo name='circle-with-cross' size={25} color='#F60000' />
                                        <Text style={{ marginLeft: 5, color: '#F60000', fontSize: 16 }}>
                                            Cancel
                            </Text>
                                    </TouchableOpacity>
                                </>
                        }

                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Bookings</Text>
                <FlatList
                    data={this.state.bookingList}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />

                <TouchableOpacity style={styles.SignupBtn} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Text style={[styles.loginText, { fontSize: 16 }]}
                    >Go back</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#003f5c",
        },
        logo: {
            marginHorizontal: '4%',
            fontSize: 30,
            color: "#fb5b5a",
            marginTop: 30,
        },
        input: {
            width: 350,
            height: 55,
            backgroundColor: "#465881",
            margin: 10,
            padding: 8,
            color: "white",
            borderRadius: 14,
            fontSize: 18,
            fontWeight: "500",

        },
        SignupBtn: {
            width: "80%",
            backgroundColor: "#fb5b5a",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 10,
            alignSelf: 'center'
        },
        loginText: {
            color: "white",

        },
        inputView: {
            width: "80%",
            backgroundColor: "#465881",
            borderRadius: 25,
            height: 50,
            marginBottom: 10,
            justifyContent: "center",
            padding: 20,
        },
        inputText: {
            height: 50,
            color: "white",
            borderWidth: 1
        },
        alternativeLayout: {
            margin: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            borderRadius: 25,
            height: 50,
            marginBottom: 20,
            padding: 10,


        },
    });

