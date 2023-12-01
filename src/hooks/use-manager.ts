import { useEffect, useState } from "react";
import { loadManagerInfo } from "../services/auth";

function useManager() {
  const [info, setInfo] = useState<App.Manager>({});
  useEffect(() => {
    loadManagerInfo().then((res) => {
      // console.log(res);
      setInfo(res);
    });
  }, []);
  return { info };
}
export default useManager;
