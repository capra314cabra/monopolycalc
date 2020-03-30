import * as React from "react";
import { PlaceSelector } from "./PlaceSelector";
import { MonopolySimulator } from "../api/MonopolySimulator";
import { IMonopolyProbability } from "../api/@types/MonopolyProbability";
import { MonopolyPlaces } from "../api/data/MonopolyPlaces";
import { IMonopolyPlace } from "../api/@types/MonopolyPlace";
import { ProbabilityView } from "./ProbabilityView";

export interface ParcentageViewProps {

}

export interface ParcentageViewState {
    selectedPlace: string;
    result: IMonopolyProbability[];
}

export class ParcentageView extends React.Component<ParcentageViewProps, ParcentageViewState> {
    constructor(props: ParcentageViewProps) {
        super(props);

        this.state = {
            selectedPlace: "",
            result: []
        };
    }

    onSelected = (place: string) => {
        this.setState({
            selectedPlace: place,
            result: []
        });
    }

    onSimulateClicked = () => {
        if (this.state.selectedPlace) {
            let probabilities = new MonopolySimulator().simulate(this.state.selectedPlace);
            this.setState({
                selectedPlace: this.state.selectedPlace,
                result: probabilities
            });
        }
        else {
            window.alert("You have to provide a place name.");
        }
    }

    render() {
        let placeInfos = new MonopolyPlaces().get();

        let places = new Map<string, IMonopolyProbability[]>();
        for (let prob of this.state.result) {
            for (let place of prob.places) {
                if (places.has(place.name)) {
                    let probs = places.get(place.name);
                    probs.push(prob);
                    places.set(place.name, probs);
                }
                else {
                    places.set(place.name, [prob]);
                }
            }
        }

        let placesArray: { prob: number, place: IMonopolyPlace, simulateResult: IMonopolyProbability[] }[] = [];
        for (let place of places) {
            let place_name = place[0];
            let place_prob = place[1];

            let placeItem = placeInfos
                .find(x => x.name == place_name);
            let probabilitiesSum = place_prob
                .map(value => value.probability)
                .reduce((sum, value) => sum + value, 0);
            placesArray.push({ prob: probabilitiesSum, place: placeItem, simulateResult: place_prob });
        }
        placesArray.sort((a, b) => b.prob - a.prob);

        let element =
            <div>
                <h2>Player is now at...</h2>
                <PlaceSelector onSelected={this.onSelected} />
                <button onClick={this.onSimulateClicked}>SIMULATE</button>
                {
                    placesArray.map((index) => {
                        return <ProbabilityView place={index.place} simulateResult={index.simulateResult} />;
                    })
                }
            </div>;
        return element;
    }
}
