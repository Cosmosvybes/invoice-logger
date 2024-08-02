import { useState } from "react";

export default function useMainController() {
  const [modalSwitch, setModalSwitch] = useState(false);
  return {
    modalSwitch,
    setModalSwitch,
  };
}
