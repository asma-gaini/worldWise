import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  //gharare kole barname ru dakhel in gharar bedim va kole barname childe in bashe

  const { isAthenticated } = useAuth();
  const navigate = useNavigate();

  //   chon k navigate ru nabayad az sath bala tar farakhoni konim az useeffect estefade mikonim
  useEffect(
    function () {
      if (!isAthenticated) navigate("/");
    },
    [isAthenticated, navigate]
  );

  return isAthenticated ? children : null;
}

export default ProtectedRoute;
