import { useState, useCallback, useRef, createRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ToastAndroid, Animated } from 'react-native';
import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, ScrollView, State } from 'react-native-gesture-handler';



export default function Prod({ route }) {
    const [visible, setVisible] = useState(false)
    const [panEnabled, setPanEnabled] = useState(false)

    SplashScreen.preventAutoHideAsync();

    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const pinchRef = createRef();
    const panRef = createRef();

    const onPinchEvent = Animated.event([{
        nativeEvent: { scale }
    }],
        { useNativeDriver: true });

    const onPanEvent = Animated.event([{
        nativeEvent: {
            translationX: translateX,
            translationY: translateY
        }
    }],
        { useNativeDriver: true })

    const handlePinchStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
            setPanEnabled(true)
        }

        const nScale = nativeEvent.scale;
        if (nativeEvent.state === State.END) {
            if (nScale < 1) {
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true
                }).start();
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();

                setPanEnabled(false)
            }
        }
    }

    const [fontsLoaded] = useFonts({
        'kaneda_gothic': require('./font/kaneda/kaneda-gothic-regular-webfont.otf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const openLink = () => {
        fetch("https://lamaison.glitch.me/produto/" + route.params.produto.id, { method: 'GET' })
            .then(response => response.json())
            .then(async response => {
                if (response.textura !== null) {
                    await Linking.openURL('lmscan://lmscan?id=' + route.params.produto.id).catch(err => {
                        ToastAndroid.show("Instale o LaMaison Scan", ToastAndroid.SHORT)
                    })
                } else {
                    ToastAndroid.show("Modelo Indisponível :(", ToastAndroid.SHORT)
                }
            })

    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={styles.v} onLayout={onLayoutRootView}>
                <View style={{ display: visible ? 'flex' : 'none', height: '100%', position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: 'rgba(0,0,0,.8)', zIndex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <PanGestureHandler
                        onGestureEvent={onPanEvent}
                        ref={panRef}
                        simultaneousHandlers={[pinchRef]}
                        enabled={panEnabled}
                        failOffsetX={[-1000, 1000]}
                        shouldCancelWhenOutside
                    >
                        <Animated.View style={{flex: 1}}>
                            <PinchGestureHandler
                                ref={pinchRef}
                                onGestureEvent={onPinchEvent}
                                simultaneousHandlers={[panRef]}
                                onHandlerStateChange={handlePinchStateChange}
                            >
                                <Animated.Image
                                    source={{ uri: "https://lamaisontest.blob.core.windows.net/arquivos/" + route.params.produto.imagem }}
                                    style={{
                                        flex: 1,
                                        width: 350,
                                        height: null,
                                        resizeMode: 'contain',
                                        transform: [{ scale }, { translateX }, { translateY }]
                                    }}
                                    resizeMode="contain"
                                />

                            </PinchGestureHandler>
                        </Animated.View>

                    </PanGestureHandler>
                    <AntDesign name="close" size={24} color="white" style={{position: 'absolute', top: 5, right: 5}} onPress={() => setVisible(false)}/>
                </View>
                <ScrollView style={{width: '100%'}}>
                    <TouchableHighlight style={{width: '100%', alignItems: 'center'}} onPress={() => setVisible(true)}>
                        <Image source={{ uri: "https://lamaisontest.blob.core.windows.net/arquivos/" + route.params.produto.imagem, height: 400, width: 500 }} style={{ resizeMode: 'cover' }} />
                    </TouchableHighlight>
                    <View style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 15 }}>
                        
                            <Text style={{ fontSize: 38, fontFamily: 'kaneda_gothic', width: '100%', textAlign: 'center' }}>{route.params.produto.nome}</Text>
                            <Text style={{ fontFamily: 'kaneda_gothic', fontSize: 24 }}>{route.params.produto.descricao}</Text>
                            {route.params.produto.desconto > 0 && <Text style={{ fontFamily: 'kaneda_gothic', opacity: .5, textDecorationLine: 'line-through', fontSize: 28 }}>R$ {(route.params.produto.valor).toFixed(2).replace('.', ',')}</Text>}
                            <Text style={{ fontFamily: 'kaneda_gothic', fontSize: 50 }}>R$ {(route.params.produto.valor - route.params.produto.valor * route.params.produto.desconto / 100).toFixed(2).replace('.', ',')}</Text>
                            <View style={{ flex: 1, justifyContent: 'flex-end', paddingVertical: 10 }}>
                                <TouchableOpacity onPress={openLink} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
                                    <Text style={{ color: 'white', fontFamily: 'kaneda_gothic', fontSize: 38, padding: 10 }}>Projetar Realidade Aumentada</Text>
                                </TouchableOpacity>
                            </View>
                        
                    </View>
                </ScrollView>


            </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    v: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        width: "100%",
        flex: 1,
        paddingTop: 0,
        position: 'relative'
    }

});