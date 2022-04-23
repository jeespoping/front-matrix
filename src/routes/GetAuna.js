import { useParams } from "react-router-dom";
import { setToken } from "../utils/token";

export default function GetAuna({ history }) {
  const { acces_token, ruta } = useParams();

  setToken(acces_token);

  window.location.replace(`/${ruta}`);
}
