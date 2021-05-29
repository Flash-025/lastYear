import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, Modal, Switch, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from '../helper/Storage'
import Ionicons from 'react-native-vector-icons/Ionicons'

class registerWorkshop extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            OwnerName: '',
            PhoneNo: '',
            Lat: '',
            lng: '',
            popup: false,
            services: [
                {
                    name: 'A/C Repair',
                    switch: false,
                    price: ""
                },
                {
                    name: 'Batteries',
                    switch: false,
                    price: ""
                },
                {
                    name: 'Belts',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Brake Fluid Flush',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Brakes service',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Clutches',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Coolant Service',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Engines Check',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Exhaust',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Filters services',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Fuel Injection Service',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Electrical Work',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Suspension',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Tires, Wheels',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Transmission',
                    switch: false,
                    price: ""
                }
                ,
                {
                    name: 'Tune Ups',
                    switch: false,
                    price: ""
                }
            ]
        }
    }

    registerWorship = () => {
        if (this.state.Name == '') {
            alert('Name cannot be empty')
            return
        }
        if (this.state.OwnerName == '') {
            alert('Owner name required')
            return
        }
        if (this.state.PhoneNo == '') {
            alert('Phone number cannot be empty')
            return
        }
        if (this.state.Lat == '') {
            alert('Latitude cannot be empty')
            return
        }
        if (this.state.lng == '') {
            alert('Longitude cannot be empty')
            return
        }
        var ref = Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerWorkshop')
        var data = {
            Name: this.state.Name,
            OwnerName: this.state.OwnerName,
            PhoneNo: this.state.PhoneNo,
            Lat: this.state.Lat,
            lng: this.state.lng,
            userId: Storage.userUID,
            service: []
        }
        for (let index = 0; index < this.state.services.length; index++) {
            if (this.state.services[index].switch == true) {
                data.service.push({
                    name: this.state.services[index].name,
                    price: this.state.services[index].price == '' ? 0 : this.state.services[index].price
                })
            }
        }
        ref.push(data).then((res) => {
            Storage.firebase.database().ref('Users/' + Storage.userUID + "/registerWorkshop/" + res.key).update({
                UID: res.key,
            });
            var workshopRef = Storage.firebase.database().ref('WorkshopsList')
            data.UID = res.key
            workshopRef.push(data).then((response) => {
                Storage.firebase.database().ref('WorkshopsList/' + response.key).update({
                    Id: response.key,
                });
                this.props.navigation.goBack()
            })
        });
    }

    setModalVisible = () => {
        this.setState({
            popup: !this.state.popup
        })
    }

    setPrice = (value, index) => {
        this.state.services[index].price = value
        this.setState({
            services: this.state.services
        })
    }

    renderItem = ({ item, index }) => (
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
                <TextInput
                    onChangeText={(value) => {
                        this.setPrice(value, index)
                    }}
                    value={item.price}
                    placeholder="Enter price"
                    keyboardType="numeric"
                />
            </View>
        </View>
    );

    toggleSwitch = (index) => {
        if (this.state.services[index].switch == false) {
            this.state.services[index].switch = true
        } else {
            this.state.services[index].switch = false
        }
        this.setState({
            services: this.state.services
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Workshop Registration </Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Workshop Name"
                        autoCapitalize="none"
                        placeholderTextColor="#FFFFFF"

                        onChangeText={value => this.setState({ Name: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Owner Name"
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize="none"
                        onChangeText={value => this.setState({ OwnerName: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Phone number"
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize="none"
                        onChangeText={value => this.setState({ PhoneNo: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Latitude"
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize="none"
                        onChangeText={value => this.setState({ Lat: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Longitude"
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize="none"
                        onChangeText={value => this.setState({ lng: value })}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 20 }} onPress={() => {
                    this.setModalVisible();
                }}>
                    <Text style={{ color: 'lightblue', fontSize: 16 }}>
                        Add your services.
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.SignupBtn}>
                    <Text style={[styles.loginText, { fontSize: 16 }]}
                        onPress={() => {
                            this.registerWorship()
                        }}>Register</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.popup}
                    onRequestClose={() => {

                        this.setModalVisible();
                    }}
                >
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
                        <View style={{ height: '93%' }}>
                            <FlatList
                                data={this.state.services}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.name}
                            />
                        </View>

                    </View>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#003f5c",
            alignItems: "center",

        },
        logo: {
            fontWeight: "bold",
            fontSize: 30,
            color: "#fb5b5a",
            marginBottom: 40,
            marginVertical: '15%',
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
export default registerWorkshop