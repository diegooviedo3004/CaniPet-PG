import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set) => ({
  code: "",
  logout: () => set((state) => ({ code: "" })),
  login: (code) => set((state) => ({ code: code })),
}));

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('code', value);
  } catch (e) {
  }
};

// Agregar un listener a los cambios del useStore
useStore.subscribe(
  (state) => {
    storeData(state.code)
  }
);


export default useStore;


