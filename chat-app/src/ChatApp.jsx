import { AuthProvider } from "./auth/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { AppRouter } from "./router/AppRouter";


function ChatApp() {
  return (
    <AuthProvider>
      <SocketProvider> // El contxto del socket necesita información de autenticación
        <AppRouter />
      </SocketProvider>
    </AuthProvider>
  );
}

export default ChatApp;
