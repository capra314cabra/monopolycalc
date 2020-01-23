import * as React from "react";
import * as ReactDOM from "react-dom";
import { PlaceSelector } from "./PlaceSelector";
import { MonopolySimulator } from "../api/MonopolySimulator";
import { IMonopolyProbability } from "../api/@types/MonopolyProbability";

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
        probabilities.sort((a, b) => b.probability - a.probability);
        this.setState({
            selectedPlace: this.state.selectedPlace,
            result: probabilities
        });
    }

    render() {
        let element =
            <div>
                <h2>Player is now at...</h2>
                <PlaceSelector onSelected={this.onSelected} />
                <button onClick={this.onSimulateClicked}>SIMULATE</button>
                {
                    this.state.result.map((place) => {
                        let places = place.places.map(place => place.name).join(" ");
                        return <p>{places} {(100. * place.probability).toFixed(3)}%</p>;
                    })
                }
            </div>;
        return element;
    }
}
