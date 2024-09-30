import "@/styles/globals.css";
import { ReactProvider } from "./context/reactContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <ReactProvider>
        <Component {...pageProps} />
        </ReactProvider>
    </div>
  
  );
}
