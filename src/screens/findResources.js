import React, { Component } from "react";
import { Image, View, TouchableOpacity, PermissionsAndroid } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import Storage from '../helper/Storage';


export default class findResources extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userLocation: {
                latitude: 0.0000, longitude: 0.0000
            },
            userLocate: false,
            region: {
                latitude: 33.6844,
                longitude: 73.0479,
                latitudeDelta: 0.2222,
                longitudeDelta: 0.2221,
            },
            workShopLocations: []
        }

        this.getWorkshopLocations()
    }

    getWorkshopLocations = () => {
        Storage.firebase.database().ref('WorkshopsList').on('value', (data) => {
            var list = []
            this.state.workShopLocations
            list = data.toJSON()
            for (var index in list) {
                this.state.workShopLocations.push(list[index])
            }

        })
    }

    getCurretLocation = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(info => {
                this.state.userLocation.latitude = info.coords.latitude
                this.state.userLocation.longitude = info.coords.longitude
                this.setState({
                    userLocate: true,
                    userLocation: this.state.userLocation
                })
                var region = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                    latitudeDelta: this.state.region.latitudeDelta,
                    longitudeDelta: this.state.region.longitudeDelta,
                }
                this.map.animateToRegion(region, 500)
            });
        } else {
            console.log("Camera permission denied");
        }
    }

    onRegionChange = region => {
        this.setState({
            region
        })
    }
    render() 
    {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <MapView
                    ref={ref => this.map = ref}
                    style={{ flex: 1 }}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                >
                    {
                        this.state.userLocate == true &&
                        <Marker coordinate={this.state.userLocation}>
                            <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: '#4081EC', borderWidth: 2, borderColor: 'white' }}>

                            </View>
                        </Marker>

                    }
                    {
                        this.state.workShopLocations.map((res) => {
                            var coords = {
                                latitude: Number(res.Lat),
                                longitude: Number(res.lng)
                            }
                            return (
                                <Marker coordinate={coords} onPress={() => {
                                    this.props.navigation.navigate('details',
                                     {
                                        details: res
                                    })
                                }}>
                                    <TouchableOpacity >
                                        <Image style={{ height: 30, width: 30 }} source={require('../../images/workshop.png')} />
                                    </TouchableOpacity>
                                </Marker>


                            )
                        })

                    }

                </MapView>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', height: 50, width: 50, borderRadius: 50, bottom: 50, right: 15, backgroundColor: 'white', borderWidth: 0.5, borderColor: "lightgray" }}
                    onPress={() => {
                        this.state.userLocation = {
                            latitude: 0.0000, longitude: 0.0000
                        }
                        this.setState({
                            userLocation: this.state.userLocation,
                            userLocate: false
                        }, () => {
                            this.getCurretLocation()
                        })
                    }}
                >
                    <MaterialIcons name='my-location' size={28} color='#3886EA' />
                </TouchableOpacity>
            </View>
        )
    }
}
