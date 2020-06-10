import React, {useContext, useEffect, useState} from 'react';
import cards from '../../cards.json'
import './card.scss'
import GaugeContext from "../Gauge/GaugeContext";



export default function () {
    const {gauge, setGauge} = useContext(GaugeContext);
    /*const [cardPercentEffect, setCardPercentEffect] = useState({argent: 0, opinion: 0, recherche: 0});*/

    function submitAnswer() {
        setGauge({argent: gauge.argent + 30, opinion: 10, recherche: 10});
    }
    useEffect(() => {
        console.log('argent');
        /*setGauge({argent: gauge.argent + 30});*/
        console.log(gauge.argent);
    }, [gauge]);

    return (
        <div className="">
            <ul>
                {cards.map((card, index) =>
                    <div className="card-container" key={index} >
                        {card.text.intitule}
                        <div>
                            <button onClick={() => setGauge({argent: gauge.argent + card.value.reponse_un.argent, opinion: gauge.opinion + card.value.reponse_un.opinion, recherche: gauge.recherche + card.value.reponse_un.recherche})}>{card.text.reponse_un}</button>
                            <button>{card.text.reponse_deux}</button>
                        </div>
                    </div>
                )
                }
            </ul>
        </div>
    );
}
