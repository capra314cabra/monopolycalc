import * as React from "react";
import Select from "react-select";
import { ValueType } from "react-select/src/types";

import { MonopolyPlaces } from "../api/data/MonopolyPlaces";

export interface PlaceSelectorProps {
    onSelected: (place: string) => void;
}

export interface PlaceSelectorState {
    selectedPlace: { value: string; label: string; };
}

export class PlaceSelector extends React.Component<PlaceSelectorProps, PlaceSelectorState> {
    constructor(props: PlaceSelectorProps) {
        super(props);

        this.state = {
            selectedPlace: null
        };
    }

    onSelectChanged = (placeItem: ValueType<{ value: string; label: string; }>) => {
        let place = placeItem as { value: string; label: string; };
        this.props.onSelected(place.value);
        this.setState({
            selectedPlace: place
        });
    }

    render() {
        let placeInfos = new MonopolyPlaces().get();

        let options = placeInfos
            .map((index) => {
                return { value: index.name, label: index.name }
            });
        let selected = this.state.selectedPlace;
        let onSelectChanged = this.onSelectChanged;
        let element =
            <Select value={selected} onChange={onSelectChanged} options={options} />
        ;
        return element;
    }
}
