import * as React from "react";
import * as ReactDOM from "react-dom";

export interface TitleProps {
    
}

export interface TitleState {

}

export class Title extends React.Component<TitleProps, TitleState> {
    constructor(props: TitleProps) {
        super(props);

        this.state = {

        };
    }

    render() {
        let element =
            <div>
                <h1>Monopoly Calculator</h1>
            </div>;
        return element;
    }
}
