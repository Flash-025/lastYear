import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from '../helper/Storage'

class registerAutomobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Model: '',
            AutoNo: '',
            selectedLabe2: '0',
            selectedLabel: '0'
        }
    }

    registerVehicle = () => {
        if (this.state.Model == "") {
            alert('Model cannot be empty.')
            return
        }
        if (this.state.AutoNo == "") {
            alert('Automobile number cannot be empty.')
            return
        }
        if (this.state.selectedLabel == "0") {
            alert('Please choose category')
            return
        }
        if (this.state.selectedLabe2 == "0") {
            alert('Please choose company')
            return
        }
        var ref = Storage.firebase.database().ref('Users/' + Storage.userUID + '/registerAutomobile')
        var data = {
            Model: this.state.Model,
            RegNo: this.state.AutoNo,
            category: this.state.selectedLabel,
            company: this.state.selectedLabe2
        }
        ref.push(data).then((res) => {
            Storage.firebase.database().ref('Users/' + Storage.userUID + "/registerAutomobile/" + res.key).update({
                UID: res.key,
            });
            this.props.navigation.goBack()
        });
        // Storage.firebase.database().ref('Users/' + Storage.userUID + '/' + 'registerAutomobile').set(
        //     {
        //       Name: this.state.Name,
        //       Email: this.state.Email,
        //       PhoneNo: this.state.PhoneNo,
        //       CNIC: this.state.CNIC,
        //       Type: this.state.type,
        //     }
        //   ).then(() => {
        //     console.log('INSERTED !');
        //     this.props.navigation.goBack()
        //   });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.logo}>Automobile Registration </Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Model i.e., 1998"
                        autoCapitalize="none"
                        placeholderTextColor="#FFFFFF"
                        keyboardType={"numeric"}
                        onChangeText={value => this.setState({ Model: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Enter Automobile Number"
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize="none"
                        onChangeText={value => this.setState({ AutoNo: value })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Picker
                        style={styles.inputText}
                        selectedValue={this.state.selectedLabel}
                        onValueChange={(value) => this.setState({
                            selectedLabel: value
                        })}
                    >
                        <Picker.Item label="Select Catagory " value="0" color="white"> </Picker.Item>
                        <Picker.Item label="Bike " value="Bike"> </Picker.Item>
                        <Picker.Item label="Car " value="Car"> </Picker.Item>
                    </Picker>
                </View>
                <View style={styles.inputView}>
                    <Picker
                        style={styles.inputText}
                        selectedValue={this.state.selectedLabe2}
                        onValueChange={(value) => this.setState({
                            selectedLabe2: value
                        })}
                    >
                        <Picker.Item label="Select Company " value="0" color="#465881"> </Picker.Item>
                        <Picker.Item label="Honda " value="Honda"> </Picker.Item>
                        <Picker.Item label="Toyota " value="Toyota"> </Picker.Item>
                        <Picker.Item label="Suzuki " value="Suzuki"> </Picker.Item>
                        <Picker.Item label="Audi " value="Audi"> </Picker.Item>
                        <Picker.Item label="Mitsubishi " value="Mitsubishi"> </Picker.Item>
                        <Picker.Item label="BMW " value="BMW"> </Picker.Item>
                        <Picker.Item label="Lexus " value="Lexus"> </Picker.Item>

                    </Picker>

                </View>

                <TouchableOpacity style={styles.SignupBtn}>
                    <Text style={[styles.loginText, { fontSize: 16 }]}
                        onPress={() => {
                            this.registerVehicle()
                        }}>Register</Text>
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
export default registerAutomobile