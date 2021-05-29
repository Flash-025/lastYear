import * as React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Storage from '../helper/Storage';
import {Picker} from '@react-native-picker/picker';
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

export default class driverProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      PhoneNo: '',
      CNIC: '',
      Email: '',
      Password: '',
      type: 1,
    };
  }

  Go = () =>
   {
       
    
    };
   
  storeUserDateToDateBase = () => {
    Storage.firebase
      .database()
      .ref('Users/' + Storage.userUID)
      .set({
        Name: this.state.Name,
        Email: this.state.Email,
        PhoneNo: this.state.PhoneNo,
        CNIC: this.state.CNIC,
        Type: this.state.type,
        bookingmessage: 'empty',
      })
      .then(() => {
        this.props.navigation.goBack();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>User Profile</Text>

        <TouchableOpacity
          style={styles.SignupBtn}
          onPress={() => {
            this.signUp();
          }}>
          <Text style={styles.loginText}>1st Button </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignupBtn}
          onPress={() => {
            this.signUp();
          }}>
          <Text style={styles.loginText}>2nd Button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.SignupBtn}
          onPress={() => {
            this.signUp();
          }}>
          <Text style={styles.loginText}>3rd Button</Text>
        </TouchableOpacity>

        <View style={styles.ExitBtn}>
          <TouchableOpacity
            onPress={() => {
              this.signUp();
            }}>
            <Text style={styles.loginText}>Exit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginTop: '15%',
    marginBottom: '5%',
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#465881',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },

  ExitBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '30%',
    
  },
  SignupBtn: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
});
