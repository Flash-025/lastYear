import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signInScreen from './src/screens/signIn'
import signUpScreen from './src/screens/signUp'
import homeScreen from './src/screens/home'
import registerAutomobile from './src/screens/registerAutomobile'
import manageRegisterVehicle from './src/screens/manageRegisterVehicle'
import findResources from './src/screens/findResources';
import registerWorkshop from './src/screens/registerWorkshop'
import selectMechanic from './src/screens/selectMechanic';
import workshopDetails from './src/screens/workshopDetails'
import manageRequests from './src/screens/manageRequests'
import driverProfile from './src/screens/driverProfile';
import serviceProviderProfile from './src/screens/serviceProviderProfile';
import selectSolution from './src/screens/selectSolution';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="signIn" component={signInScreen} />
        <Stack.Screen name="signUp" component={signUpScreen} />
        <Stack.Screen name="home" component={homeScreen} />
        <Stack.Screen name="registerAutomobile" component={registerAutomobile}/>
        <Stack.Screen name="MRVehicle" component={manageRegisterVehicle} />
        <Stack.Screen name="maps" component={findResources} />
        <Stack.Screen name="Workshop" component={registerWorkshop} />
        <Stack.Screen name="Mechanic" component={selectMechanic} />
        <Stack.Screen name="details" component={workshopDetails} />
        <Stack.Screen name="manageRequest" component={manageRequests} />
        <Stack.Screen name="driverProfile" component={driverProfile} />
        <Stack.Screen name="serviceProviderP" component={serviceProviderProfile}/>
        <Stack.Screen name="selectSolution" component={selectSolution} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;