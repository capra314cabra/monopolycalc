import * as React from "react";

import { IMonopolyProbability } from "../api/@types/MonopolyProbability";
import { IMonopolyPlace, MonopolyColor } from "../api/@types/MonopolyPlace";

export interface ProbabilityViewProps {
    place: IMonopolyPlace;
    simulateResult: IMonopolyProbability[];
}

export interface ProbabilityViewState {
    showDetail: boolean;
}

export class ProbabilityView extends React.Component<ProbabilityViewProps, ProbabilityViewState> {
    constructor(props: ProbabilityViewProps) {
        super(props);

        this.state = {
            showDetail: false
        };
    }

    onClicked = () => {
        this.setState({
            showDetail: !this.state.showDetail
        });
    };

    render() {
        let color = this.getColor(this.props.place.color);
        let contentDesign: React.CSSProperties = {
            borderStyle: "solid",
            borderWidth: "15px",
            borderRadius: "10px",
            borderColor: color,
            margin: "20px",
            padding: "10px"
        };
        let prob = this.props.simulateResult.map(value => value.probability).reduce((sum, value) => sum + value, 0);
        if (this.state.showDetail) {
            return (
                <div style={contentDesign}>
                    <h3 onClick={this.onClicked}>{this.props.place.name}</h3>
                    <p>{(100. * prob).toFixed(3)}%</p>
                    <h4>Detail</h4>
                    {
                        this.props.simulateResult.map((index) => {
                            return <p>{index.places.map(index => index.name).join("\u2192")} {(100. * index.probability).toFixed(3)}%</p>;
                        })
                    }
                </div>
            );
        }
        else {
            return (
                <div style={contentDesign}>
                    <h3 onClick={this.onClicked}>{this.props.place.name}</h3>
                    <p>{(100. * prob).toFixed(3)}%</p>
                </div>
            );
        }
    }

    private getColor(color: MonopolyColor): string {
        switch(color) {
            case "Brown":
                return "#674500";
            case "Light Blue":
                return "#5D84EE";
            case "Light Purple":
                return "#F008E6";
            case "Orange":
                return "#F38D0C";
            case "Red":
                return "#ED000B";
            case "Yellow":
                return "#EBE40E";
            case "Green":
                return "#0C8500";
            case "Dark Blue":
                return "#03336E";
            default:
                return "#000000";
        }
    }
}
