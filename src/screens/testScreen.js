import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, userNavigate } from '@react-navigation/native'
import SOS from '../SOSAnimation'
import Android from '../AndroidAnimation';

// In Javascript
const getFullName = (firstName, secondName, thirdName) => {
    return firstName + ' ' + secondName + ' ' + thirdName;
};

const Hello = () => {
    return <Text>This is a cat</Text>;
};

//can also be declared as const Hi = props => {} or const Hi = ({name}) -> {}
const Hi = (props) => {
    const [greet, setGreet] = useState(false);
    const [count, setCount] = useState(0);
    const navigation = useNavigation();

    return (
        <View style={{flex: 1, backgroundColor: 'rgba(9, 210, 96, 1)'}}>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={{textAlign: 'center'}}>
                    Hello, my name is {props.name}!
                </Text>
                <SOS />
                <Button 
                    onPress={() => {
                        if(greet){
                            setGreet(false);
                        }
                        else {
                            setGreet(true);
                        } 
                        setCount(count + 1);
                    }}            
                    disabled={count > 4? true : false}
                    title={!greet? "Greet me please " + count : "Thank you! " + count}
                />
                {count > 4? 
                    <Button 
                        onPress={() => navigation.navigate("Calendar")}
                        title={"Bye!"}
                    />
                : true}
            </View>
        </View>
    );
};

// Javascript code can be executed within {}, such as getFullName()
const Cat = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1,
                          alignItems: 'center', //alignItems aligns chid components
                          backgroundColor: '#f103',
            }}>  
                <Text>Hello, I am {getFullName('Chewy', 'Poopy', 'Kelly')}!</Text>
                <TextInput 
                    style={{
                        height: 40,
                        width: 300,
                        borderColor: 'gray',
                        borderWidth: 1,
                        //alignSelf: 'center',  //alignSelf aligns the component itsef
                    }}

                    defaultValue = "What's your name?"
                />
                <View style={{flex: 1, paddingTop: 60}}>
                    <Android />
                </View>
            </View>
            <Hi name='Chewy' />
            <View style={{flex: 1, backgroundColor: '#ff0000ff'}}>
                {/* alignItems is used to align children within the cross-axis of their containers*/}
                {/* justifyContent is used to align children within the main-axis of their containers*/}
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
                        <Text style={{textAlign: 'center'}}>Hi</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#fa2f'}}>
                        <Text style={{textAlign: 'center'}}>Hello</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, justifyContent: 'center', ackgroundColor: '#f707'}}>
                        <Text style={{textAlign: 'center'}}>Hallo</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#abdf'}}>
                        <Text style={{textAlign: 'center'}}>Ciao</Text>
                    </View>        
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Cat;