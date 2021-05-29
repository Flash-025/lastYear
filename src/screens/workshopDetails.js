import React, { Component } from "react";
import {
    StatusBar, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList,
    Linking, Modal, Switch, TextInput, ToastAndroid
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Storage from '../helper/Storage'

export default class workshopDetails extends Component 
{
    constructor(props) {
        super(props)
        this.state = {
            details: props.route.params.details,
            services: [],
            popup: false,
            time: ''
        }

        for (let index = 0; index < Object.keys(props.route.params.details.service).length; index++) {
            this.state.services.push({
                name: props.route.params.details.service[index].name,
                price: props.route.params.details.service[index].price,
                switch: false
            })

        }
    }

    renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ marginHorizontal: '4%', marginTop: 5, flexDirection: 'row', height: 40, alignItems: 'center' }}>
                <View style={{ width: '40%' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        {index + 1}:  {item.name}
                    </Text>
                </View>
                <View>
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        Rs.{item.price}
                    </Text>
                </View>
            </View>
        )
    }

    OpenDialer = () => {
        Linking.openURL(`tel:${this.state.details.PhoneNo}`)
    }

    setModalVisible = () => {
        this.setState({
            popup: !this.state.popup
        })
    }

    bookAppointment = ({ item, index }) => 
    {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginLeft: 15, width: '25%' }}>
                    <Text>
                        {
                            item.name
                        }
                    </Text>
                </View>
                <View style={{ width: '25%', justifyContent: 'center' }}>
                    <Switch
                        trackColor={{ false: "gray", true: "#9FE166" }}
                        thumbColor={'#E0E5E6'}
                        onValueChange={() => {
                            this.toggleSwitch(index)
                        }}
                        value={item.switch}
                    />
                </View>
                <View style={{ width: '55%', justifyContent: "center", alignItems: 'center' }}>
                    <Text>
                        Rs. {item.price}
                    </Text>
                </View>

            </View>
        )
    }

    toggleSwitch = (index) => {
        if (this.state.services[index].switch == false) {
            this.state.services[index].switch = true
        } else {
            this.state.services[index].switch = false
        }
        this.setState({

        })
    }

    bookRequest = () => 
    {
        if (this.state.time == '') {
            alert('Kindly give time slot of your request')
            return
        }
        var services = []
        for (let index = 0; index < this.state.services.length; index++) {
            if (this.state.services[index].switch == true) {
                services.push(this.state.services[index])
            }
        }

        var ref = Storage.firebase.database().ref('Users/' + this.state.details.userId + '/registerWorkshop/' + this.state.details.UID + '/Booking')
        var data = {
            username: Storage.userData.Name,
            user_phoneNo: Storage.userData.PhoneNo,
            services: services,
            time: this.state.time,
            userId: Storage.userUID
        }
        ref.push(data).then((res) => {
            Storage.firebase.database().ref('Users/' + this.state.details.userId + '/registerWorkshop/' + this.state.details.UID + '/Booking/' + res.key).update({
                UID: res.key,
            });
        })
        this.setModalVisible();
        ToastAndroid.showWithGravity(
            "Booking done successfully!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginHorizontal: '4%', marginTop: 30 }}>
                    <Text style={styles.logo}>
                        Workshop Details
                   </Text>
                    <Text style={{ marginTop: 10, color: 'white', fontSize: 20 }}>
                        Workshop:   {this.state.details.Name}
                    </Text>
                    <Text style={{ marginTop: 10, color: 'white', fontSize: 20 }}>
                        Owner:          {this.state.details.OwnerName}
                    </Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                        <Text style={{ color: 'white', fontSize: 20 }}>
                            Phone no:    {this.state.details.PhoneNo}
                        </Text>
                        <TouchableOpacity style={{ width: 120 }} onPress={() => {
                            this.OpenDialer()
                        }}>
                            <FontAwesome name='phone' size={25} color='#50AD01' />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={{ marginTop: 30, alignSelf: 'center', borderRadius: 6, justifyContent: 'center', alignItems: 'center', height: 40, width: 200, backgroundColor: "#465881", }}
                    onPress={() => {
                        this.setModalVisible();
                    }}
                >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Book appointment</Text>
                </TouchableOpacity>

                <Text style={[styles.logo, { marginHorizontal: '4%' }]}>
                    Services
                   </Text>
                <FlatList
                    data={this.state.services}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.name}
                />
                <TouchableOpacity style={styles.SignupBtn} onPress={() => {
                    this.props.navigation.goBack()
                }}>
                    <Text style={[styles.loginText, { fontSize: 16 }]}
                    >Go back</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.popup}
                    onRequestClose={() => {
                        this.setModalVisible();
                    }}>
                    <View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
                        <View style={{ justifyContent: 'center', height: '7%', borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', marginLeft: '5%' }}
                                onPress={() => {
                                    this.setModalVisible();
                                }}
                            >
                                <Ionicons name='arrow-back' size={25} color={'black'} />

                            </TouchableOpacity>

                        </View>
                        <View style={{ height: '93%', justifyContent: "space-between" }}>
                            <FlatList
                                data={this.state.services}
                                renderItem={this.bookAppointment}
                                keyExtractor={item => item.name}
                            />
                            <View>
                                <View style={{ marginHorizontal: '4%' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18 }}>
                                        Time for booking
                                    </Text>
                                    <TextInput

                                        value={this.state.time}
                                        style={{ borderRadius: 5, alignSelf: 'center', marginVertical: 20, justifyContent: 'center', alignItems: 'center', width: 300, height: 40, borderWidth: 1 }}
                                        placeholder="Time i.e. 9:30 am"
                                        placeholderTextColor="black"
                                        onChangeText={(value) => this.setState({ time: value })}
                                    />
                                </View>
                                <TouchableOpacity style={{ borderRadius: 5, alignSelf: 'center', marginBottom: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen', width: 300, height: 40 }}
                                    onPress={() => {
                                        this.bookRequest()
                                    }}

                                >
                                    <Text style={{ fontSize: 16 }}>
                                        Book
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>
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