import React, { Component } from "react";
import { StatusBar, ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from "react-native";
import Storage from '../helper/Storage'
import {LogBox} from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

class home extends Component 
{

  constructor(props) {
    super(props)
    this.state = {
      userData: {}
    }
    this.getUserData()
  }

  getUserData = () => 
  {
    Storage.firebase.database().ref('Users/' + Storage.userUID).on('value', (data) => {
      this.state.userData = data.toJSON()
      Storage.userData = this.state.userData
      this.setState({
        userData: this.state.userData
      })
      if (this.state.userData.bookingmessage != 'empty') {
        Alert.alert(
          "Booking Message",
          this.state.userData.bookingmessage,
          [

            {
              text: "OK", onPress: () => {
                Storage.firebase.database().ref('Users/' + Storage.userUID).update({
                  bookingmessage: 'empty'
                })
              }
            }
          ]
        );
      }
    })
  }

  signOut = () => {
    this.setState({
      loader: true
    }, () => {
      Storage.firebase.auth().signOut().then(() => {
        this.props.navigation.replace('signIn')
      }, (error) => {
        console.log('Sign Out Error', error);
      });
    })
  }

  render() {
    if (this.state.userData.Type == 1) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#003f5c" />
          {this.state.loader == true && (
            <View style={styles.loaderView}>
              <ActivityIndicator color="#E4CC24" size="large" />
            </View>
          )}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.logo}>Hello,</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                justifyContent: 'flex-end',
                fontSize: 30,
                color: '#fb5b5a',
                marginTop: '5%',
                marginBottom: '-4%',
                textAlign: 'left',
                marginLeft: '17%',
                marginBottom: '2%',
              }}>
              {this.state.userData.Name}{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{marginBottom: '4%', marginHorizontal: '4%'}}
              onPress={() => {
                this.signOut();
              }}>
              <Text style={styles.S}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              marginHorizontal: '2%',
              flexDirection: 'row',
              height: 45,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('registerAutomobile');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Register Automobile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('MRVehicle');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Manage Register Automobile
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'space-between',
              marginHorizontal: '2%',
              flexDirection: 'row',
              height: 45,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('maps');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Find Resources
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('Mechanic');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Select Service Provider
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 30,
              justifyContent: 'space-between',
              marginHorizontal: '2%',
              flexDirection: 'row',
              height: 45,
            }}>
            {/* <TouchableOpacity style={{ borderRadius: 6, justifyContent: 'center', alignItems: 'center', width: '45%', backgroundColor: "#465881", }}>
              <Text style={{ textAlign: 'center', color: 'white' }}>
                Book appointment
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('selectSolution');
              }}
              >
              <Text style={{textAlign: 'center', color: 'white'}}>
                Self Guide
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={this.state.userData.registerWorkshop != undefined}
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor:
                  this.state.userData.registerWorkshop != undefined
                    ? 'gray'
                    : '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('driverP');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Manage My Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#003f5c" />
          {this.state.loader == true && (
            <View style={styles.loaderView}>
              <ActivityIndicator color="#E4CC24" size="large" />
            </View>
          )}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.logo}>Hello,</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontWeight: 'bold',
                justifyContent: 'flex-end',
                fontSize: 30,
                color: '#fb5b5a',
                marginTop: '5%',
                marginBottom: '-4%',
                textAlign: 'left',

                marginLeft: '17%',
                marginBottom: '2%',
              }}>
              {this.state.userData.Name}{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{marginBottom: '4%', marginHorizontal: '4%'}}
              onPress={() => {
                this.signOut();
              }}>
              <Text style={styles.S}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'space-between',
              marginBottom: '4%',
              marginHorizontal: '2%',
              flexDirection: 'row',
              marginTop: '4%',
              height: 45,
            }}>
            <TouchableOpacity
              disabled={this.state.userData.registerWorkshop != undefined}
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor:
                  this.state.userData.registerWorkshop != undefined
                    ? 'gray'
                    : '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('Workshop');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Register Workshop
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('manageRequest');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Manage request
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'space-between',

              marginHorizontal: '2%',
              flexDirection: 'row',
              height: 45,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Respond To Customer
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Update Maintenance Status
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 20,
              justifyContent: 'space-between',
              marginHorizontal: '2%',
              flexDirection: 'row',
              height: 45,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Add Solution
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 6,
                justifyContent: 'center',
                alignItems: 'center',
                width: '45%',
                backgroundColor: '#465881',
              }}
              onPress={() => {
                this.props.navigation.navigate('driverProfile');
              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                My Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
  S: {
    marginBottom: '45%',
    color: 'white',
    fontSize: 18,
  },
  loaderView: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 2,
    backgroundColor: 'rgba(255,255,255, 0.7)',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
  },
  logo: {
    fontStyle: "italic",
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginTop: '5%',
    marginBottom: '-4%',
    textAlign: 'left',
    marginHorizontal: '4%',
  },
});

export default home;