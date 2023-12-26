import {createStackNavigator} from '@react-navigation/stack';

import SettingScreen from '../screens/Settings';
const StackSetting = createStackNavigator();

const SettingStackScreen = () => {
  return (
    <StackSetting.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}
      initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingScreen} />
    </StackSetting.Navigator>
  );
};

export default SettingStackScreen;
