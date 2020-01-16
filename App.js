import React,{Component} from 'react';
import {View, Text} from 'react-native';
import { GoogleSignin,  GoogleSigninButton,statusCodes } from 'react-native-google-signin';

export default class App extends Component{

  state={
    userInfo:''
  }

  componentDidMount(){

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      iosClientId: '606626062536-1sbi8b995riot8kfpdkjcfi8qjjgr683.apps.googleusercontent.com', // only for iOS
      webClientId: '606626062536-00u4mdefnnavepsa93h53f4qd0toqjg4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
      accountName: '', // [Android] specifies an account name on the device that should be used
    })

  }

 async signIn(){
    GoogleSignin.signOut()
    try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert("SIGN_IN_CANCELLED")
            } else if (error.code === statusCodes.IN_PROGRESS) {
              alert("IN_PROGRESS")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              alert("PLAY_SERVICES_NOT_AVAILABLE")
            } else {
              alert("Unknown Error!")
            }
          }
      };

  render(){
    return(
             <View style={{alignSelf:'center',justifyContent:'center',flex:1}}>
                <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.signIn}
                  disabled={this.state.isSigninInProgress} />
             </View>
    )
  }
}
