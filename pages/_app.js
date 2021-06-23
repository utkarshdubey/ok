import "../styles/globals.css";
import { RecoilRoot } from "recoil";

// function SafeHydrate({ children }) {
//   return (
//     <div suppressHydrationWarning>
//       {typeof window === "undefined" ? null : children}
//     </div>
//   );
// }

function MyApp({ Component, pageProps }) {
  return (
    // <SafeHydrate>
      <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
    // </SafeHydrate>
  );
}

export default MyApp;
