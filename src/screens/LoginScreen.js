import React from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import Colors from "../themes/Colors";
import LinearGradient from 'react-native-linear-gradient';
import Animation from 'lottie-react-native';

import balloons from '../../resources/animation/balloons.json';

const FBSDK = require('react-native-fbsdk');
const {
   AccessToken,
   GraphRequest,
   GraphRequestManager,
   LoginManager
} = FBSDK;

export const callback = (error, result) => {
   if (error) {
      console.log(error);
      return error
   } else {
      console.log(result);
      return result;
   }
}
export default class LoginScreen extends React.Component {
   static navigationOptions = ({ navigation }) => ({
      headerStyle: styles.header,
      header: null,
      headerTitle: <Text style={styles.title}>Login</Text>
   });

   constructor(props) {
      super(props);
      console.disableYellowBox = true;
   }

   loginWithFacebook = () => {
      LoginManager.logInWithReadPermissions(['public_profile']).then(
         function (result) {
            if (result.isCancelled) {
            } else {
               AccessToken.getCurrentAccessToken().then(
                  (data) => {
                     let accessToken = data.accessToken

                     const infoRequest = new GraphRequest(
                        '/me?',
                        {
                           accessToken: accessToken,
                           parameters: {
                              fields: {
                                 string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                              }
                           }
                        },
                        responseInfoCallback = (error: ?Object, result: ?Object) => {
                           if (error) {
                              alert('Error fetching data: ' + error.toString());
                           } else {
                              alert('Result Name: ' + result.name);
                           }
                        }
                     );
                     // Start the graph request.
                     new GraphRequestManager().addRequest(infoRequest).start();

                  }
               )
            }
         },
         function (error) {
            alert('Login failed with error: ' + error);
         }
      );
   }

   componentDidMount() {
      this.animation.play();
   }

   render() {
      return (
         <View style={styles.wrapper}>
            <ImageBackground source={require('../../resources/BGImage.png')} style={styles.imageBG} >

               <LinearGradient
                  colors={['#3023AEEF', '#F67060EF']}
                  style={[styles.imageBG]}
                  start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 1.0 }}>

                  <Animation
                     ref={animation => {
                        this.animation = animation;
                     }}
                     style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: 450
                     }}
                     loop={true}
                     source={balloons}
                  />

                  <TouchableOpacity style={styles.loginFBButton} onPress={this.loginWithFacebook}>
                     <LinearGradient colors={['#5B7BD5', '#4864B1']}
                        start={{ x: 0.5, y: 0.0 }} end={{ x: 0.5, y: 1.0 }}
                        style={styles.linearGradient}>
                        <Text style={[styles.buttonText]}>
                           Sign in with Facebook
          					</Text>
                     </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginEmail} onPress={this.loginWithFacebook}>
                     <Text style={[styles.buttonText]}>
                        Sign up with Email
          					</Text>
                  </TouchableOpacity>


               </LinearGradient>
            </ImageBackground>
         </View>
      );
   }
}

let styles = StyleSheet.create({
   header: {
      backgroundColor: Colors.default_blue
   },
   blur: {
      backgroundColor: 'rgba(255,255,255,0.8)'
   },

   wrapper: {
      flex: 1,
      alignItems: 'center',
   },
   imageBG: {
      width: '100%',
      alignItems: 'center',
      height: '100%',
   },
   loginFBButton: {
      width: 270,
      position: 'absolute',
      bottom: 80
   },
   linearGradient: {
      paddingLeft: 15,
      height: 40,
      justifyContent: 'center',
      paddingRight: 15,
      width: '100%',
      shadowColor: 'rgba(0,0,0,0.2)',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 1,
      borderRadius: 4
   },
   buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      color: '#ffffff',
      backgroundColor: 'transparent',
   },
   loginEmail: {
      justifyContent: 'center',
      width: 270,
      height: 40,
      position: 'absolute',
      bottom: 30,
      borderColor: '#fff',
      borderWidth: 1,
   },
   title: {
      fontSize: 16,
      color: "#fff"
   }
});