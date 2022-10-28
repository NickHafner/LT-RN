import HomeScreen from "@/screens/Home";
import LoginScreen from "@/screens/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const StackNav = createNativeStackNavigator();

const Navigation: React.FC<{}> = ({}) => {
    return <StackNav.Navigator initialRouteName="Login">
        <StackNav.Screen name="Login" options={{ headerShown: false}} component={LoginScreen} />
        <StackNav.Screen name="Home" options={{ headerShown: false}} component={HomeScreen} />
    </StackNav.Navigator>
}

export default Navigation;