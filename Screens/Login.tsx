import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import hideIcon from './Assets/hide.png';
import eyeIcon from './Assets/eye.png';
import {API, URL} from '../APIConstants';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

function Login() {
  // const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [imageSource, setImageSource] = useState(hideIcon);
  const [loading, setLoading] = useState(false); 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    setImageSource((prevImage: any) =>
      prevImage === hideIcon ? eyeIcon : hideIcon,
    );
  };

  const loginAPICall = async () => {
    if (!mail || !password) {
      Alert.alert('Error', 'Email and Password cannot be empty');
      return;
    }

    setLoading(true); // ✅ Start loader when API call begins

    const url = `${URL.devUrl}${API.login}`;
    console.log('API Request URL:', url);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer',
        correlationID: '1',
        traceTag: '1',
      },
      mode: 'cors', // ✅ Allow cross-origin requests
      body: JSON.stringify({
        State: '',
        MFA_Token: '',
        UserID: mail,
        Password: password,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log('Response Status:', response.status);
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      if (data.StatusCode === 200) {
        Alert.alert('SUCCESS');
        // authorizeApiCall(data.Data);
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or error occurred.');
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Network Error', error.message);
    } finally {
      setLoading(false); // ✅ Stop loader after API call completes (success or error)
    }
  };

  const authorizeApiCall = async (param: any) => {
    setLoading(true);
    const url = `${URL.devUrl}${API.authorise}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        traceTag: '1',
        correlationID: '1',
      },
      body: JSON.stringify(param),
    };

    try {
      console.log('Sending API Request to:', url);
      console.log('Request Options:', requestOptions);

      const response = await fetch(url, requestOptions);

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Response Raw Text:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed Response Data:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        throw new Error('Invalid JSON response from server');
      }

      if (data.StatusCode === 200) {
        const accessToken = data.Data?.AccessToken;
        Alert.alert('Success');
        userEntitlementsApiCall(accessToken);
        // if (accessToken) {
        //   await AsyncStorage.setItem('accessToken', accessToken);
        // }
      } else {
        Alert.alert(
          'Authorization Failed',
          'Invalid credentials or error occurred.',
        );
      }
    } catch (error) {
      console.error('API Error:', error?.message || 'Unknown error');

      if (error instanceof Error) {
        console.error('Error Stack:', error.stack);
      }
    } finally {
      setLoading(false);
    }
  };

  const userEntitlementsApiCall = async (param: any) => {
    setLoading(true);
    const url = `${URL.devUrl}${API.userEntitlements}`;

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        traceTag: '1',
        correlationID: '1',
        Authorization: `Bearer ${param}`,
        espsid: '1',
        Sid: '1',
      },
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log('Response Status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json(); // ✅ Only parse JSON once
      console.log('Response Data:', data);

      if (data.StatusCode === 200) {
        // debugger;

        if (!navigation || typeof navigation.reset !== 'function') {
          console.error('🚨 Navigation is not available');
          Alert.alert('Navigation Error', 'Cannot navigate to Dashboard.');
          return;
        }

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Dashboard'}],
          }),
        );
      } else {
        Alert.alert(
          'Authorization Failed',
          'Invalid credentials or error occurred.',
        );
      }
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Network Error', `${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./Assets/background.png')}
        style={styles.backgroundImage}
      />

      <View style={styles.centerView}>
        <Image source={require('./Assets/logo.png')} style={styles.logo} />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            keyboardType="email-address"
            onChangeText={setMail}
          />
          <Image source={require('./Assets/mail.png')} style={styles.icon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={isPasswordVisible}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image source={imageSource} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* ✅ Show Loader When API Call is in Progress */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0b76c2"
            style={styles.loader}
          />
        ) : (
          <TouchableOpacity style={styles.button} onPress={loginAPICall}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Login</Text>
              <Image
                source={require('./Assets/right-arrow.png')}
                style={styles.arrowImage}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.environmentLabel}>Pre-Dev(1.0.0)</Text>
      <Text style={styles.headingLabel}>Sign in your {'\n'} Account</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
  },
  centerView: {
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    height: height / 2.5,
    width: width - 60,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    width: 300,
    height: 70,
    alignSelf: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    width: 22,
    height: 22,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#0b76c2',
    marginTop: 10,
    height: 50,
    width: width - 100,
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  loader: {
    marginTop: 20, // ✅ Adds space above the loader
  },
  headingLabel: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
  environmentLabel: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    fontSize: 18,
    color: 'black',
    padding: 10,
  },
});

export default Login;
