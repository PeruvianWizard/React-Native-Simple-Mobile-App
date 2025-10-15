import React, { useEffect, useRef} from 'react'
import { Animated, View, } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const Android = () => {
    const iconValue = useRef(new Animated.Value(0)).current;

    const inter = iconValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.4]
    });

    const startAndroidAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(iconValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(iconValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }

    useEffect(() => {
        startAndroidAnimation();
    }, [])

    return (
        <View style={{flex: 1}}>
            <Animated.View style={{ transform: [{scale: inter}] }}>
                <AntDesign name="android" size={70} color="black" />
            </Animated.View>
        </View>
    );
}

export default Android;

