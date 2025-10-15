import  { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "./screens/CalendarScreen";
import testScreen from "./screens/testScreen";

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown:false }} initialRouteName="Calendar">
                <Stack.Screen name="Calendar" component={CalendarScreen}/>
                <Stack.Screen name="Test" component={testScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}