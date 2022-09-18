import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery');
        }, 4000);
    })

    return (
        <SafeAreaView className=" bg-[#00CCBB] flex-1 justify-center items-center">
            <Animatable.Image
                source={require('../assets/food_loading.gif')}
                animation="slideInUp"
                iterationCount={1}
                className="h-96 w-96"
            />
            <Animatable.Text
                animation="slideInUp"
                iterationCount={1}
                className="text-lg my-10 text-white font-bold text-center"
            >
                Preparing your order!
            </Animatable.Text>

        </SafeAreaView>
    )
}

export default PreparingOrderScreen