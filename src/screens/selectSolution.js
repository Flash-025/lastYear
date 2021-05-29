import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from '../helper/Storage'

class selectSolution extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     solutions: 
        //     [
        //         {solution1:'one ' , method:" panture"},
        //             {solution2 :'two ' , method:" break fail"},
        //             {solution3 :'three ' , method:" terminal"},
        //             {solution4 :'four' , method:" nosol"},

        //     ]
        // }   
    }
    render() {
        return (
          <View style={styles.container}>
             <Text style={styles.logo}>solution List </Text>
            {/* <FlatList
              data={this.state.solutions}
              renderItem={({item}) => (
                <Text style={{fontSize: 100}}>{item.method}</Text>
              )}
            />
            <TouchableOpacity
              style={styles.SignupBtn}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Text style={[styles.loginText, {fontSize: 16}]}>Go back</Text>
            </TouchableOpacity> */}
            //////////////////////// ////////////////////////
            
              <Text style={styles.logo}>User Profile</Text>

              <TouchableOpacity
                style={styles.SignupBtn}
               >
                <Text style={styles.loginText}>1st Button </Text>
              </TouchableOpacity>
              <TouchableOpacity
              >
                <Text style={styles.loginText}>2nd Button</Text>
              </TouchableOpacity>
              <TouchableOpacity
              >
                <Text style={styles.loginText}>3rd Button</Text>
              </TouchableOpacity>

              
            
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },

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
  //////////////////////////////////////
  
});
export default selectSolution