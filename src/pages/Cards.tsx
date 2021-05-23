import React, {Suspense} from 'react';
import TheCanvas from "../components/WebGl/TheCanvas";
import TheDeck from "../components/WebGl/TheDeck";

const Cards = () => {
    return (
        <TheCanvas>
            <Suspense fallback={null}>
                <TheDeck/>
            </Suspense>
        </TheCanvas>
    );
}

export default Cards;
