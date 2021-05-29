import * as React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Storage from '../helper/Storage';

class raw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solutions: [
        {solution1: 'one ', method: ' panture'},
        {solution2: 'two ', method: ' break fail'},
        {solution3: 'three ', method: ' terminal'},
        {solution4: 'four', method: ' nosol'},
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>solution List </Text>
        <FlatList
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
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginBottom: 40,
    marginVertical: '15%',
    marginHorizontal: '4%',
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

  SignupBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },
  loginText: {
    color: 'white',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  alternativeLayout: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    padding: 10,
  },
});
export default raw;
