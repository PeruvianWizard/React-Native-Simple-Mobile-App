import React, { useEffect, useRef }from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const SOS = () => {
    const expandCircle1 = useRef(new Animated.Value(0)).current;
    const expandCircle2 = useRef(new Animated.Value(0)).current;
    const expandCircle3 = useRef(new Animated.Value(0)).current;
    const expandAlert = useRef(new Animated.Value(0)).current;
    

    // interpolate lets you map a value from one range to another using linear interpolation
    const interpolation1 = expandCircle1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.8]
    });

    const interpolation2 = expandCircle2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1.05]
    });

    const interpolation3 = expandCircle3.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.9]
    })

    const interpolateAlert = expandAlert.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8]
    })

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.stagger(
                35,
                [
                    Animated.timing(expandCircle1, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(expandCircle2, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(expandCircle3, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(expandAlert, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    })
                ]),
                Animated.delay(2000),
                Animated.timing(expandCircle1, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(expandCircle2, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(expandCircle3, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
                Animated.timing(expandAlert, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }

    useEffect(() => {
        startAnimation()
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: '#ffffffff', justifyContent: 'center', alignItems: 'center'}}>
            <Animated.View
                style={[ styles.circleContainer1, {transform: [{scale: interpolation1}]} ]}>
                <Animated.View 
                    style={[ styles.circleContainer2, {transform: [{scale: interpolation2}]} ]}>
                    <Animated.View
                        style={[ styles.circleContainer3, {transform: [{scale: interpolation3}]} ]}>
                        <Animated.View style={{ transform: [{scale: interpolateAlert}] }}> 
                            <Ionicons name="alert" size={60} color="#fff" />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>            
        </View>
    );
}



const styles = StyleSheet.create({
    circleContainer1: {
        position: 'absolute', 
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 185, 185, 1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleContainer2: {
        position: 'absolute', 
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 146, 146, 1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleContainer3: {
        position: 'absolute', 
        height: 70,
        width: 70,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 0, 0, 1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SOS;