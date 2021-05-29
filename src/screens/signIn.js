import * as React from 'react';
import { StatusBar, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import firebase from 'firebase'
import Storage from '../helper/Storage'
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
export default class signIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      continueLoader: false
    }
    var firebaseConfig = {
      apiKey: "AIzaSyAvTxaCk2ktzjz05en0o20sLVHDikd3czA",
      authDomain: "automobile-assistance-3f848.firebaseapp.com",
      projectId: "automobile-assistance-3f848",
      storageBucket: "automobile-assistance-3f848.appspot.com",
      messagingSenderId: "643519722134",
      appId: "1:643519722134:web:d7f7a6005751d9ab2f08b7",
      measurementId: "G-RFSCHV54ED"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app()
    }
    Storage.firebase = firebase;

  }

  signIn = () =>
   {
    if (this.state.email == "") {
      alert('Email cannot be empty.')
      this.setState({
        continueLoader: false
      })
      return
    }
    if (this.state.password == "") {
      alert('Password cannot be empty.')
      this.setState({
        continueLoader: false
      })
      return
    }
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        this.setState({
          continueLoader: false
        })
        var user = Storage.firebase.auth().currentUser;
        Storage.userUID = user.uid;
        Storage.userDetails = user
        this.props.navigation.replace('home')
      }).catch((error) => {
        alert(error.message)
        this.setState({
          continueLoader: false
        })
      });
  }

  render() 
  {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor="#003f5c" />
        <Text style={styles.logo}>Welcome </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={this.state.email}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            onChangeText={(value) => this.setState({ email: value })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            value={this.state.password}
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#FFFFFF"
            onChangeText={(value) => this.setState({ password: value })}
          />
        </View>

        {/* <RadioForm style={styles.radio}
          radio_props={hobbies}
          onPress={this.showScreen.bind(this, hobbies)}
        /> */}
        <TouchableOpacity
          disabled={this.state.continueLoader}
          style={styles.Btn}
          onPress={() => 
                    {
                      this.setState({continueLoader: true}, () => {this.signIn()})
                    }
                  }>
          {
            this.state.continueLoader == true ?
              <ActivityIndicator
                color="white"
                size="large"
              />
              :
              <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>
          }
        </TouchableOpacity>


        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('signUp')
        }}>
          <Text style={{ color: 'lightblue', fontSize: 16 }}>
            Dont have an account?
        </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",

  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#fb5b5a",
    marginVertical: '15%',
  },
  inputV: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    flexDirection: "column",

  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  radio: {
    width: "80%",
    borderRadius: 30,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    color: "white",
    padding: 20,

  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    alignSelf: "flex-end",
    color: "white",
    fontSize: 11,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,

    padding: 10,

  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  Btn: {
    width: "75%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,

    flexDirection: "row",
    color: "white",
  },
  loginText: {
    color: "white",
  },
  alternativeLayoutButtonContainer: {
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