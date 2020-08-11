import React from 'react'
import {Text, View} from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const Test = () => {
    const onSwipe = (diraction) => alert(diraction)
    return( 
        <View style={{height: 200, marginTop: "auto"}}>
            <GestureRecognizer
                onSwipe={onSwipe}
                config={config}
                style={{
                flex: 1,
                backgroundColor: 'blue'
                }}
                >
            </GestureRecognizer>
        </View>
        
    )
}
const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

export default Test