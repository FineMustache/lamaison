/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform, Linking, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroImage,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroARPlane,
  ViroBox,
  ViroARImageMarker,
  ViroARTrackingTargets
} from '@viro-community/react-viro';

const medidasModel = {
    "p25": {
      pos: [0, 0, 0],
      scale: [0.01, 0.01, 0.01],
      rotation: [0, 0, 0]
    },
    "round.obj": {
      pos: [0, 0, 0],
      scale: [0.0003, 0.0003, 0.0003],
      rotation: [90, 0, 0]
    },
    "p24": {
      pos: [0, 0, 0],
      scale: [0.001, 0.001, 0.001],
      rotation: [0, 180, 0]
    },
    "p30": {
      pos: [0, 0, 0],
      scale: [0.001, 0.001, 0.001],
      rotation: [0, 180, 0]
    },
    "p23": {
      pos: [0, 0, 0],
      scale: [0.001, 0.001, 0.001],
      rotation: [90, 0, 90]
    },
    "p29": {
      pos: [0, 0, 0],
      scale: [0.0025, 0.0025, 0.0025],
      rotation: [0, 0, 0]
    }
  }

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  export default Nav = (props) =>{

    const arNavigatorRef = React.useRef(null);
    
    function AR() {
      const [pos, setPos] = useState(medidasModel['p' + props.id].pos)

      ViroARTrackingTargets.createTargets({
        felipe: {
          source: require('../../target.png'),
          orientation: 'Down',
          physicalWidth: 0.12,
        },
      });
  
      ViroMaterials.createMaterials({
        face: {
          shininess: 1.0,
          lightingModel: 'Blinn',
          diffuseTexture: { uri: props.textura },
        },
      });
  
      function onInitialized(state, reason) {
        console.log('guncelleme', state, reason);
        if (state === ViroConstants.TRACKING_NORMAL) {
          // Lógica para quando o rastreamento está funcionando normalmente
        } else if (state === ViroConstants.TRACKING_NONE) {
          // Lógica para quando o rastreamento não está disponível
        }
      }

      return (
        // <ViroARScene onTrackingUpdated={onInitialized}>
  
  
        // </ViroARScene>
        <ViroARScene onTrackingUpdated={onInitialized}>
          <ViroARImageMarker target="felipe" onAnchorFound={() => console.log("achou")}>
            <ViroAmbientLight color="#FFFFFF" />
            <Viro3DObject
              source={{ uri: props.obj }}
              position={medidasModel["p" + props.id].pos}
              scale={medidasModel["p" + props.id].scale}
              rotation={medidasModel["p" + props.id].rotation}
              type="OBJ"
              materials="face"
            />
          </ViroARImageMarker>
        </ViroARScene>
      );
    };
    
    return(
      <View style={{flex: 1, position: 'relative'}}>
        <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: AR,
        }}
        style={styles.f1}
        ref={arNavigatorRef}

      />
      </View>
    )
  }

  var styles = StyleSheet.create({
    f1: { flex: 1 },
    helloWorldTextStyle: {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',
    },
  });