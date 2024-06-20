import React, {useEffect, useRef, useState} from 'react';
import { View, Text, Button } from 'react-native'
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import {connect} from 'react-redux'


const CameraScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const isFocused = useIsFocused();

    let camera = useRef(null)

    useEffect(() => {

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    if (hasPermission && isFocused) {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} type={type} ref={ref => (camera = ref)}>

                </Camera>
                <Button title="flip"
                    onPress={() => {
                        setType(
                            type == Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                />
                <Button 
                title="Snap"
                    onPress={async () => {
                        if (camera) {
                            let photo = await camera.takePictureAsync({ quality: 0.3 });
                            console.log(photo)
                            const formData = new FormData()
                            formData.append('avatar', {
                                uri: photo.uri,
                                type: 'image/jpeg',
                                name: 'user_avatar.jpg',
                            })
                            const responseFromServer = await fetch('https://faceup-cloudinary.herokuapp.com/upload', {
                                method: 'POST',
                                body: formData
                            })
                            const responseFromServerJson = await responseFromServer.json()
                            console.log("responseFromServerJson : ", responseFromServerJson.url)
                            props.getImgFromCloud(responseFromServerJson.url)
                        }
                    }}
                />
            </View>
        )
    }
    else {
        return <View style={{ flex: 1 }} />;
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
       getImgFromCloud: function(img){
           dispatch({type: 'cloud', imgFromCloud: img})
       }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(CameraScreen);