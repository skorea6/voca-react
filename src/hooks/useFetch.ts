import { useEffect, useState } from "react";
import { useLoadingContext } from "../component/LoadingContext";

export default function useFetch(url: string) {
  const [data, setData] = useState([]);
  const { setLoading } = useLoadingContext();

  useEffect(() => {
    let isMounted = true; // 변수를 이용하여 컴포넌트가 마운트된 상태를 추적

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const newData = await res.json();
        // 컴포넌트가 마운트된 상태인 경우에만 데이터 업데이트
        // if (isMounted) {
        setData(newData);
        // }
      } finally {
        // 마운트된 상태인 경우에만 setLoading(false) 호출
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // cleanup 함수에서 isMounted를 false로 설정하여 컴포넌트가 언마운트되면 이후의 상태 업데이트를 방지
    return () => {
      isMounted = false;
    };
  }, [url, setLoading]);

  return data;
}
