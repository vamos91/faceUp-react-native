import React, { useState } from 'react';
import { StyleSheet, ImageBackground, TextInput, Button } from 'react-native';

//import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');

    return (
        <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

            <TextInput
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='John'
                leftIcon={
                    <Icon
                        name='user'
                        size={24}
                        color="#eb4d4b"
                    />
                }
                onChangeText={(val) => setPseudo(val)}
            />

            <Button
                icon={
                    <Icon
                        name="arrow-right"
                        size={20}
                        color="#eb4d4b"
                    />
                }

                title="Go to Map"
                type="solid"
                onPress={() => { props.navigation.navigate('BottomNavigator', { screen: 'Gallery' }) }}
            />

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});



export default HomeScreen