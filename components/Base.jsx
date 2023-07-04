import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import useStore from '../store';
import { IconButton, Tooltip } from 'react-native-paper';
import api from '../utils/api';
import { View } from 'react-native';
import {
    useQuery,
} from 'react-query'
import NativeCard from './NativeCard';
import {
    SafeAreaView,
    FlatList,
    StyleSheet
  } from 'react-native';

const PERRITOS_URL = 'https://canipetpg.pythonanywhere.com/static/mobile/img/demo-img/caninos.png'

const MusicRoute = () => {
    const { code } = useStore();
    const query = useQuery({
        queryFn: () => api.loginServer({ code }), // Envuelve la función en otra función
        queryKey: ["getProductos"],
        refetchInterval: 2000,
    });

    if(query.isLoading) return <>Cargando</>

    const { pacientes, productos } = query.data;
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
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
            </SafeAreaView>
        </View>
    );
}

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

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