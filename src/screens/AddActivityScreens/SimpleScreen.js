import React from "react";
import { Button, View, Text, Image, TextInput, ActivityIndicator, StyleSheet, ActionSheetIOS, PixelRatio, TouchableOpacity } from "react-native";
import Colors from "../../themes/Colors";
import ImagePicker from 'react-native-image-picker';
import Toast, { DURATION } from 'react-native-easy-toast'

export default class SimpleScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerStyle: styles.header,
        headerLeft: <Text onPress={() => { navigation.goBack() }} style={styles.backBtn} >Cancel</Text>,
        headerTitle: <Text style={styles.title}>Add New Activity</Text>
    });

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            activityDesc: "",
            activityTotal: "",
            imagePicked: null,
        };
    }

    onOpenImagePicker = () => {

        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
            const image = {
                uri: response.uri,
                type: 'image/jpeg',
                name: 'image' + '-' + Date.now() + '.jpg'
            }

            if (image.uri != undefined)
                this.setState({ imagePicked: image })

        });
    };

    onPressAddActivity = async () => {
        const body = new FormData();

        body.append('image', this.state.imagePicked);
        body.append('user_id', '1');
        body.append('description', this.state.activityDesc)
        body.append('total', this.state.activityTotal)

        const url = `http://localhost:3000/addActivity`;

        const result = await this.addActivity(url, body)

        if (result.success == true) {
            this.refs.toast.show('Successfully!', 500, () => {
                this.props.navigation.goBack()
            });
        } else {
            this.refs.toast.show('An error occurred!')
        }
    }

    addActivity = async (url, body) => {
        this.setState({ loading: true })

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })

        this.setState({ loading: false })

        return result.json()
    }


    render() {
        return <View style={styles.wrapper}>
            <Toast ref="toast" />

            <TextInput
                style={[styles.inputTexts, styles.descriptionInput]}
                placeholder="Write something about it?"
                onChangeText={(text) => this.setState({ activityDesc: text })}
                multiline={true}
                value={this.state.activityDesc}
            />
            <TextInput
                style={styles.inputTexts}
                placeholder="Total"
                onChangeText={(text) => this.setState({ activityTotal: text })}
                value={this.state.activityTotal}
            />
            <TouchableOpacity onPress={this.onOpenImagePicker} style={styles.centerWrapper}>
                <View style={[styles.image, styles.imageContainer, { marginBottom: 20 }]}>
                    {this.state.imagePicked === null ? <Text>Select a Photo</Text> :
                        <Image style={styles.image} source={this.state.imagePicked} />
                    }
                </View>
            </TouchableOpacity>

            <Button
                onPress={this.onPressAddActivity}
                title="Add Activity"
                color="#841584"
                accessibilityLabel="Add Activity"
            />

            {
                this.state.loading && (
                    <ActivityIndicator
                        style={styles.indicator}
                        color="#C00"
                        size="large"
                    />
                )
            }
        </View >;

    }
}

let styles = StyleSheet.create({
    inputTexts: {
        paddingLeft: 20, paddingRight: 20, height: 40,
        margin: 20,
        borderColor: 'gray', borderWidth: 1
    },
    descriptionInput: {
        height: 120
    },
    centerWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        flex: 1
    },
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    backBtn: {
        color: '#fff',
        marginLeft: 15
    },
    header: {
        backgroundColor: Colors.default_blue
    },
    title: {
        fontSize: 16,
        color: "#fff"
    },
    imageContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});