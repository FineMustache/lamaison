import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import Prod from '../components/Prod';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'


SplashScreen.preventAutoHideAsync();
export default function Produto({ navigation }) {
    const [produto, setProduto] = useState([0]);
    const [pages, setPages] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [search, setSearch] = useState('')
    const [processing, setProcessing] = useState(true)

    useEffect(() => {
        function carregarProduto() {
            const options = { method: 'GET' };

            fetch('https://lamaison.glitch.me/produto/page/' + curPage + '?np=12&' + search, options)
                .then(response => response.json())
                .then(resp => {
                    setProduto(resp.produtos)
                    let aux = []
                    for (let i = 1; i <= Math.ceil(resp.count / 12); i++) {
                        aux.push(i)
                    }
                    setPages(aux)
                })
        }
        setProcessing(true)
        carregarProduto()
        // setTimeout(() => {
        //     carregarProduto()
        // }, 500)
    }, [curPage, search])

    useEffect(() => {
        if (produto[0] !== 0) {
            setProcessing(false)
        }
    }, [produto])

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

      let timeoutId = null;

    return (
        <View style={styles.v} onLayout={onLayoutRootView}>
            <View style={{width: '100%', position: 'relative', justifyContent: 'center', marginBottom: 10}}>
                <TextInput onChangeText={(v) => {
                    clearTimeout(timeoutId)
                    timeoutId = setTimeout(() => {
                        setSearch('nome=' + v)
                        setCurPage(1)
                    }, 500)
                    
                }} placeholder={'Pesquisar produto...'} style={{width: '100%', padding: 10, backgroundColor: 'white', fontFamily: 'kaneda_gothic', letterSpacing: 1.8, fontSize: 18}} placeholderTextColor={'#777'} />
                <FontAwesome5 name="search" size={20} color="black" style={{position: 'absolute', right: 10}} />
            </View>
            {processing &&
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={'black'} />
                </View>
            }
            {!processing &&
            <ScrollView style={styles.sv}>
            <View style={{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {
                produto.map((produto, index) => {
                    return (
                        <Prod i={index} onPress={() => navigation.navigate('Produto', {produto})} key={index} imagem={"https://lamaisontest.blob.core.windows.net/arquivos/" + produto.imagem} nome={produto.nome} valor={produto.valor} descricao={produto.descricao} desconto={produto.desconto} />
                    )
                })
            }
            {produto.length < 1 && 
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Text style={{fontFamily: 'kaneda_gothic', color: '#777', fontSize: 30}}>Nenhum Produto Encontrado :(</Text>
                </View>
            }
            </View>
            <View style={{width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                {
                    pages.map((page, index) => {
                        return(
                            <TouchableOpacity onPress={() => setCurPage(Number(page))} key={index} style={{marginLeft: index === 0 ? 0 : 10, padding: 10}}>
                                <Text style={{fontSize: 20, textDecorationLine: curPage === page ? 'underline' : 'none'}}>{page}</Text>
                            </TouchableOpacity>
                        )
                    })
                    
                }
            </View>
        </ScrollView>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    v: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: "#f0f0f0",
        width: "100%",
        flex: 1,
        padding: 15
    },
    sv: {
        height: "100%",
        width: "100%",
    }

});