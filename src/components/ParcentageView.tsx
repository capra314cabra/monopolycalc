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
        let probabilities = new MonopolySimulator().simulate(this.state.selectedPlace);
        this.setState({
            selectedPlace: this.state.selectedPlace,
            result: probabilities
        });
    }

    render() {
        let placesManager = new MonopolyPlaces();
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
            let placeItem = placesManager.get().find(x => x.name == place[0]);
            let probabilitiesSum = place[1].map(value => value.probability).reduce((sum, value) => sum + value, 0);
            placesArray.push({ prob: probabilitiesSum, place: placeItem, simulateResult: place[1] });
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
