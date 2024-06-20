import React, { useEffect } from 'react';
import { View, Text } from 'react-native'
import {connect} from 'react-redux'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

const GalleryScreen = (props) => {
    console.log('test:', props.photos)
    return (
        <View>
            {
                props.photos.photo.map((photo, i) => (
                    <Card key={i}>
                        <Card.Image source={{ uri: photo }}>
                        </Card.Image>
                    </Card>
                ))
            }
        </View>  
    );
};

// const mapStateToProps = (state) => {
//     return { photos: state.arrayOfPhoto }
// }

function mapStateToProps(state) {
    return { photos: state }
}

export default connect(
    mapStateToProps,
    null
)(GalleryScreen);