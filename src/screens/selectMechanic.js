import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text, TextInput, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Storage from '../helper/Storage'

class selectMechanic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listMechanic: [],
    };
    this.fetchListVehicles();
  }

  fetchListVehicles = () => {
    Storage.firebase
      .database()
      .ref('WorkshopsList')
      .on('value', data => {
        var list = [];
        this.state.listMechanic = [];
        list = data.toJSON();
        for (var index in list) {
          this.state.listMechanic.push(list[index]);
        }
        this.setState({
          listMechanic: this.state.listMechanic,
        });
      });
  };

  // deleteWorkshop = item => {
  //   Storage.firebase
  //     .database()
  //     .ref('Users/' + item.userId + '/registerWorkshop/' + item.UID)
  //     .remove();
  //   Storage.firebase
  //     .database()
  //     .ref('WorkshopsList/' + item.Id)
  //     .remove();
  // };

  renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      key={index}
      style={{
        borderWidth: 1,
        borderColor: '#465881',
        width: '95%',
        alignSelf: 'center',
        height: 65,
        borderRadius: 5,
        marginBottom: 10,
      }}
      onPress={() => {
        this.props.navigation.navigate('details', {
          details: item,
        });
      }}>
      <View
        style={{
          marginHorizontal: '2%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: 'white', padding: 5}}>
            Workshop: {item.Name}
          </Text>
          <Text style={{color: 'white', padding: 5}}>
            Owner: {item.OwnerName}
          </Text>
        </View>

        {/* <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => {
                    Alert.alert(
                        "Confirmation",
                        "Are you sure you want to delete " + `'${item.Name}'` + ' Workshop',
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => this.deleteWorkshop(item) }
                        ]
                    );
                }}>
                    <Text style={{ color: '#ED1C24', fontSize: 16 }}>
                        Remove
                    </Text>
                </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Workshops List </Text>
        <FlatList
          data={this.state.listMechanic}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
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
export default selectMechanic