import {createStackNavigator} from '@react-navigation/stack';
//screens
import ApproveScreen from '../screens/ApproveLicences';

const LicenceStack = createStackNavigator();

const LicenseStackScreen = () => {
  return (
    <LicenceStack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
      })}
      initialRouteName="ApproveHome">
      <LicenceStack.Screen name="ApproveHome" component={ApproveScreen} />
    </LicenceStack.Navigator>
  );
};

export default LicenseStackScreen;
