import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, ToastAndroid } from 'react-native';
import Storage from '../helper/Storage'
import { Picker } from '@react-native-picker/picker';
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

export default class signUp extends React.Component 
{

  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      PhoneNo: '',
      CNIC: '',
      Email: '',
      Password: '',
      type: 1
    }
  
  }

  signUp = () => 
  {

    if (this.state.CNIC == "") {
      alert('CNIC required')
      this.setState({
        signUpLoader: false
      })
      return
    }
    if (this.state.PhoneNo == "") {
      alert('Phone number cannot be empty.')
      this.setState({
        signUpLoader: false
      })
      return
    }
    if (this.state.Name == "") {
      alert('Name cannot be empty.')
      this.setState({
        signUpLoader: false
      })
      return
    }
    if (this.state.Email == "") {
      alert('Email cannot be empty.')
      this.setState({
        signUpLoader: false
      })
      return
    }
    if (this.state.Password == "")
     {
      alert('Password cannot be empty.')
      this.setState({
        signUpLoader: false
      })
      return
    }
    Storage.firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
      .then((result) => {
        var user = Storage.firebase.auth().currentUser;
        Storage.userUID = user.uid;
        Storage.userDetails = user
        //
        this.storeUserDateToDateBase()
        ToastAndroid.showWithGravity(
          ' Signup Successfully! Please login To Access The System ',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        this.setState({
          signUpLoader: false
        })
      });

      
  }

  storeUserDateToDateBase = () => {
    Storage.firebase.database().ref('Users/' + Storage.userUID).set(
      {
        Name: this.state.Name,
        Email: this.state.Email,
        PhoneNo: this.state.PhoneNo,
        CNIC: this.state.CNIC,
        Type: this.state.type,
        bookingmessage: 'empty'
      }
    ).then(() => {
      this.props.navigation.goBack()
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>User Registration</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder='Enter Name'
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
            onChangeText={(value) => this.setState({ Name: value })}
          />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder='Phone Number'
            autoCapitalize="none"
            placeholderTextColor="#FFFFFF"
            keyboardType={"numeric"}
            onChangeText={(value) => this.setState({ PhoneNo: value })}
          />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder='Your CNIC'
            keyboardType={"numeric"}
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
            onChangeText={(value) => this.setState({ CNIC: value })}
          />
        </View>

        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder='Email'
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"

            onChangeText={(value) => this.setState({ Email: value })}
          />
        </View>


        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder='Password'
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(value) => this.setState({ Password: value })}
          />
        </View>
        <View style={styles.inputView}>
          <Picker
          style={{ color: "white"}}
            mode='dropdown'
            selectedValue={this.state.type}
           
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                type: itemValue
              })
            }>
            <Picker.Item label="Driver" value="1" />
            <Picker.Item label="Service Provider" value="2" />
          </Picker>

        </View>
        <TouchableOpacity style={styles.SignupBtn} onPress={() => {
          this.signUp()
        }}>
          <Text style={styles.loginText}
          >Signup</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#003f5c',
      alignItems: 'center',
    },
    logo: {
      fontWeight: "bold",
      fontSize: 30,
      color: "#fb5b5a",
      marginTop: '15%',
      marginBottom: '5%'
    },
    input: {
      width: 350,
      height: 55,
      backgroundColor: "#465881",
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',

    },

    SignupBtn: {
      width: "80%",
      backgroundColor: "#fb5b5a",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 10
    },
    loginText: {
      color: "white"

    },
    inputView: {
      width: "80%",
      backgroundColor: "#465881",
      borderRadius: 25,
      height: 50,
      marginBottom: 20,
      justifyContent: "center",
      padding: 20
    },
    inputText: {
      height: 50,
      color: "white"
    }
  });