import { Navigate } from "react-router-dom";
export default function HOC(WrapperComponent) {
  return function OriginalComponent(props) {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/" />;
    }
    return <WrapperComponent {...props} />;
  };
}
