import { Button, StyleSheet, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import React from 'react';

export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  async function verifyPermission() {
    if (permission.status === ImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (permission.status === ImagePicker.PermissionStatus.DENIED) {
      Toast.show('You need to grant camera access to use this app');

      return false;
    }

    return true;
  }

  return (
    <View style={styles.container}>
      <Button onPress={async () => {
      if (await verifyPermission()) {
        try {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
          });

          if (!result.canceled) {
            const uri = result.assets[0].uri;

            console.log(uri);
          } else {
            console.error('Cancelled!');
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        console.error('Please check camera permission!', {
          textColor: 'red'
        });
      }
    }}>Take Picture</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
