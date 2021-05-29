import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from '../helper/Storage'

class manageRegisterVehicle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listVehicles: []
        }
        this.fetchListVehicles()
    }
    fetchListVehicles = () => {
        Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerAutomobile').on('value', (data) => {
            var list = []
            this.state.listVehicles = []
            list = data.toJSON()
            for (var index in list) {
                this.state.listVehicles.push(list[index])
            }
            this.setState({
                listVehicles: this.state.listVehicles
            })
        })
    }

    deleteVehicle = (uid) => {
        Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerAutomobile/' + uid).remove();
    }


    renderItem = ({ item, index }) => (
        <View key={index} style={{
            borderWidth: 1, borderColor: '#465881', width: '95%', alignSelf: 'center', height: 65,
            borderRadius: 5, marginBottom: 10
        }}>
            <View style={{ marginHorizontal: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: 'white', padding: 5 }}>
                        {item.category}
                    </Text>
                    <Text style={{ color: 'white', padding: 5 }}>
                        {item.company}
                    </Text>
                </View>
                <View>
                    <Text style={{ color: 'white', padding: 5 }}>
                        Model: {item.Model}
                    </Text>
                    <Text style={{ color: 'white', padding: 5 }}>
                        Reg no: {item.RegNo}
                    </Text>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                    Alert.alert(
                        "Confirmation",
                        "Are you sure you want to delete " + `'${item.company}' '${item.Model}'` ,
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => this.deleteVehicle(item.UID) }
                        ]
                    );
                    
                }}>
                    <Text style={{ color: '#ED1C24', fontSize: 16 }}>
                        Delete
                    </Text>
                </TouchableOpacity>


            </View>

        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Vehciles List </Text>
                <FlatList
                    data={this.state.listVehicles}
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
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#003f5c",
        },
        logo: {
            fontWeight: "bold",
            fontSize: 30,
            color: "#fb5b5a",
            marginBottom: 40,
            marginVertical: '15%',
            marginHorizontal: '4%'
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
export default manageRegisterVehicle