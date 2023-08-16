import { useSelector } from "react-redux";

export const useValue = () => {
  const value = useSelector((state) => state.data.value);
  return value;
};
