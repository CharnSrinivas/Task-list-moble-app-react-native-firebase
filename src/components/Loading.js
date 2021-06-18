import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 50, color: 'red' }}>Loading ..</Text>
        </View>
    )
}

