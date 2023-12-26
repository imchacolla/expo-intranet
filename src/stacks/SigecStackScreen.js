import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigecScreen from '../screens/Sigec';
import SigecDetalleScreen from '../screens/SigecDetalle';
const SigecStack = createStackNavigator();

const SigecStackScreen = () => {
  return (
    <SigecStack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}
      initialRouteName="SigecHome">
      <SigecStack.Screen name="SigecHome" component={SigecScreen} />
      <SigecStack.Screen name="DetalleSigec" component={SigecDetalleScreen} />
    </SigecStack.Navigator>
  );
};
export default SigecStackScreen;
