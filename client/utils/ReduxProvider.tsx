import { Provider } from "react-redux";
import { store } from "../app/_redux/store";

interface IProvider {
  children: React.ReactNode;
}

export function ReduxProvider({ children }: IProvider) {
  return <Provider store={store}>{children}</Provider>;
}
