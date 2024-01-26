import { AuthProvider } from "./auth/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ChatProvider } from "./context/chat/ChatContext";
import { AppRouter } from "./router/AppRouter";


function ChatApp() {
  return (
    <ChatProvider>
      <AuthProvider>
        <SocketProvider> {/* El contxto del socket necesita información de autenticación */}
          <AppRouter />
        </SocketProvider>
      </AuthProvider>
    </ChatProvider>
  );
}

export default ChatApp;
