import { useState } from "react";

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle(show:boolean = !isShowing) {
        setIsShowing(show);
    }

    return {
        isShowing,
        toggle
    };
};

export default useModal;
