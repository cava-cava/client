import React, {FunctionComponent, useState} from 'react';

type InteractionOmgProps = {
    type: string,
    active: boolean,
    setActive: (value: boolean) => void
}

const SwipeInteractionOmg: FunctionComponent<InteractionOmgProps> = ({type, active, setActive, ...props}) => {
    const [clientYStart, setClientYStart] = useState<number>(0)

    const handleStart = (startEvent:any) => {
        startEvent.preventDefault();
        if (type !== "swipe" || active) return;
        setClientYStart(startEvent.clientY)
    }

    const handleEnd = (endEvent:any) => {
        endEvent.preventDefault();
        if (type !== "swipe" || active) return;
        if((clientYStart - endEvent.clientY) > 100) {
            setActive(true)
        }
    }

    return (
        <div
            onTouchStart={(touchStartEvent) => handleStart(touchStartEvent)}
            onTouchEnd={(touchEndEvent) => handleEnd(touchEndEvent)}
            // The following event handlers are for mouse compatibility:
            onMouseDown={mouseDownEvent => handleStart(mouseDownEvent)}
            onMouseUp={(mouseUpEvent) => handleEnd(mouseUpEvent)}
            onMouseLeave={(mouseLeaveEvent) => handleEnd(mouseLeaveEvent)}
        >
            {props.children}
        </div>
    );
}

export default SwipeInteractionOmg;
