import { Provider } from "react-redux";
import { store } from "./redux/store";

interface IProvider {
  children: React.ReactNode;
}

export function Providers({ children }: IProvider) {
  return <Provider store={store}>{children}</Provider>;
}
