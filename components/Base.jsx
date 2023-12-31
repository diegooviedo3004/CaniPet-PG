import * as React from 'react';
import { BottomNavigation, Button, Text } from 'react-native-paper';
import useStore from '../store';
import { IconButton, Tooltip } from 'react-native-paper';
import api from '../utils/api';
import { View } from 'react-native';
import {
    useQuery,
    useQueryClient
} from 'react-query'
import NativeCard from './NativeCard';
import {
    SafeAreaView,
    FlatList,
    StyleSheet
} from 'react-native';
import CardProductos from './CardProductos';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native';
import GoogleMap, { Marker } from 'react-maps-google';
import { DiscussionEmbed } from 'disqus-react';

const PERRITOS_URL = 'https://canipetpg.pythonanywhere.com/static/mobile/img/demo-img/caninos.png'
const baseUrl = 'http://localhost:8000/api'

const MusicRoute = () => {
    const { code, logout } = useStore();
    const query = useQuery({
        queryFn: () => api.loginServer({ code }), // Envuelve la función en otra función
        queryKey: ["getProductos"],
        refetchInterval: 2000,
    });

    if (query.isError) {
        logout()
    }

    if (query.isLoading) return <>Cargando</>

    const { pacientes, productos } = query.data;

    return (
        <View style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    <FlatList
                        data={pacientes}
                        renderItem={({ item }) => (
                            <NativeCard
                                imageUrl={PERRITOS_URL}
                                title={item.nombre}
                                key={item.id}
                            />
                        )}
                        keyExtractor={item => item.id}
                        numColumns={1}
                    />
                    <CardProductos title={"Productos"} where={"Home"} mode={"contained"} subtitle={"Mira lo que tu veterinario te recomienda."}></CardProductos>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const AlbumsRoute = () => {
    const { code } = useStore();

    const query = useQuery({
        queryFn: () => api.loginServer({ code }), // Envuelve la función en otra función
        queryKey: ["getProductos2"],
        refetchInterval: 2000,
    });

    if (query.isLoading) return <>Cargando</>

    const { pacientes, productos } = query.data;


    console.log(pacientes)
    const handleDescargarAll = () => {
        Linking.openURL(`${baseUrl}/descargar/?code=${code}`);
    }

    const handleDescargarId = (id) => {
        Linking.openURL(`${baseUrl}/descargar/?code=${code}&paciente=${id}`);
    }


    return (
        <>
            <ScrollView >
                {pacientes.map((p) => (
                    <CardProductos handlerPress={() => handleDescargarId(p.id)} imgUrl={p.foto} key={p.id} title={p.nombre} mode="contained"></CardProductos>
                ))}
                <Button style={{ marginVertical: 5 }} onPress={() => handleDescargarAll()} buttonColor='secondary' mode="elevated">Descargar todo</Button>
            </ScrollView>

        </>
    )
}

const RecentsRoute = () => {
    const { code } = useStore();
    
    const query = useQuery({
        queryFn: () => api.loginServer({ code }), // Envuelve la función en otra función
        queryKey: ["getProductos2"],
        refetchInterval: 20000,
    });

    if (query.isLoading) return <>Cargando</>

    const { id_vet, lat, lon } = query.data;

    const disqusShortname = "canipet"
    const disqusConfig = {
      url: "https://canipetpg2.pythonanywhere.com/",
      identifier: `${id_vet}`,
      title: "Canipet"
    }

    
    return (
        <>
            <Text>Tu veterinario: </Text>
            <ScrollView>
                <View style={{ height: 500 }}>
                    <GoogleMap options={{center: { lat: parseFloat(lat), lng: parseFloat(lon) }, zoom: 15}} apiKey="AIzaSyAKFipNOUTn8LjisXG6Ei2IQiB1T2fb4xA">
                        <Marker position={{ lat: parseFloat(lat), lng: parseFloat(lon) }} />
                    </GoogleMap>
                </View>

                <View style={{ padding: 10 }}>
                    <DiscussionEmbed
                          shortname={disqusShortname}
                          config={disqusConfig}
                    />
                </View>

            </ScrollView>

        </>
    )
}

const NotificationsRoute = () => <Text>Notifications</Text>;

const Base = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'music', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'albums', title: 'Descargar', focusedIcon: 'album' },
        { key: 'recents', title: 'Mapa', focusedIcon: 'history' },
        { key: 'notifications', title: 'Clínicas', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        music: MusicRoute,
        albums: AlbumsRoute,
        recents: RecentsRoute,
        notifications: NotificationsRoute,
    });

    const { logout } = useStore();


    return (
        <>
            <Tooltip title="Logout">
                <IconButton icon="logout" selected size={24} onPress={logout} />
            </Tooltip>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </>

    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Base;