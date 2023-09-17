import MainNavigation from "./navigation/navigation"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from "./stores"
import { PaperProvider } from 'react-native-paper'
import { ToastProvider } from 'react-native-toast-notifications'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLOR } from "./Theme/Color"


function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider
            placement='bottom'
            normalColor={COLOR.primary}
            successColor={COLOR.primary}
            warningColor={COLOR.yellow}
            dangerColor={COLOR.black}
            textStyle={{ textAlign: 'left', fontSize: 12, fontWeight: 'bold' }}
            successIcon={<Icon name='check' size={23} color={COLOR.white} />}
            dangerIcon={<Icon name='closecircle' size={23} color={COLOR.white} />}
            warningIcon={<Icon name='exclamationcircleo' size={23} color={COLOR.white} />}
          >
            <MainNavigation />
          </ToastProvider>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}


export default App;
