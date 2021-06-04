import * as React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import Storage from '../helper/Storage';
import {Picker} from '@react-native-picker/picker';
import {LogBox} from 'react-native';
export default class driverProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Name: '',
      // PhoneNo: '',
      // CNIC: '',
      // Email: '',
      // Password: '',
      // type: 1,
      listProfile: [],
    };
    this.fetchProfile();
  }

  fetchProfile = () => {
    Storage.firebase
      .database()
      .ref('Users/' + Storage.userUID)
      .on('value', data => {
        var list = [];
        this.state.listProfile = [];
        list = data.toJSON();
        for (var index in list) {
          this.state.listProfile.push(list[index]);
        }
        this.setState({
          listProfile: this.state.listProfile,
        });
      });
  };

  deleteProfile = uid => {
    Storage.firebase
      .database()
      .ref('Users/' + Storage.userUID)
      .remove();
  };
  // storeUserDateToDateBase = () => {
  //   Storage.firebase
  //     .database()
  //     .ref('Users/' + Storage.userUID)
  //     .set({
  //       Name: this.state.Name,
  //       Email: this.state.Email,
  //       PhoneNo: this.state.PhoneNo,
  //       CNIC: this.state.CNIC,
  //       Type: this.state.type,
  //       bookingmessage: 'empty',
  //     })
  //     .then(() => {
  //       this.props.navigation.goBack();
  //     });
  // };

  renderItem = ({item, index}) => (
    <View
      key={index}
      style={{
        borderWidth: 1,
        borderColor: '#465881',
        width: '95%',
        alignSelf: 'center',
        height: 65,
        borderRadius: 5,
        marginBottom: 10,
      }}>
      <View
        style={{
          marginHorizontal: '2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: 'white', padding: 5}}>{item.Name}</Text>
          <Text style={{color: 'white', padding: 5}}>{item.Email}</Text>
        </View>
        <View>
          <Text style={{color: 'white', padding: 5}}>Nmae: {item.Name}</Text>
          <Text style={{color: 'white', padding: 5}}>email: {item.Email}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center'}}
        onPress={() => {
          Alert.alert(
            'Confirmation',
            'Are you sure you want to delete your account ' +
              `'${item.Name}' '${item.Email}'`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.deleteProfile(item.UID)},
            ],
          );
        }}>
        <Text style={{color: '#ED1C24', fontSize: 16}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>User Profile</Text>
        <FlatList
          data={this.state.listProfile}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

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
