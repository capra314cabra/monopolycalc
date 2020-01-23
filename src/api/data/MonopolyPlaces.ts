import { IMonopolyPlace, MonopolyColor } from "../@types/MonopolyPlace";

export class MonopolyPlaces {
    get(): Array<IMonopolyPlace> {
        let places: { name: string, color: MonopolyColor }[] = [
            { name: "Go", color: undefined },
            { name: "Mediterranean Avenue", color: "Brown" },
            { name: "Community Chest 1", color: undefined },
            { name: "Baltic Avenue", color: "Brown" },
            { name: "Income Tax", color: undefined },
            { name: "Reading Railroad", color: "Railroad" },
            { name: "Oriental Avenue", color: "Light Blue" },
            { name: "Chance 1", color: undefined },
            { name: "Vermont Avenue", color: "Light Blue" },
            { name: "Connecticut Avenue", color: "Light Blue" },
            { name: "Just Visiting", color: undefined },
            { name: "St. Charles Place", color: "Light Purple" },
            { name: "Electric Company", color: "Utilities" },
            { name: "States Avenue", color: "Light Purple" },
            { name: "Virginia Avenue", color: "Light Purple" },
            { name: "Pennsylvania Railroad", color: "Railroad" },
            { name: "St. James Place", color: "Orange" },
            { name: "Community Chest 2", color: undefined },
            { name: "Tennessee Avenue", color: "Orange" },
            { name: "New York Avenue", color: "Orange" },
            { name: "Free Parking", color: undefined },
            { name: "Kentucky Avenue", color: "Red" },
            { name: "Chance 2", color: undefined },
            { name: "Indiana Avenue", color: "Red" },
            { name: "Illinois Avenue", color: "Red" },
            { name: "B & O Railroad", color: "Railroad" },
            { name: "Atlantic Avenue", color: "Yellow" },
            { name: "Ventnor Avenue", color: "Yellow" },
            { name: "Water Works", color: "Utilities" },
            { name: "Marvin Gardens", color: "Yellow" },
            { name: "Go To Jail", color: undefined },
            { name: "Pacific Avenue", color: "Green" },
            { name: "North Carolina Avenue", color: "Green" },
            { name: "Community Chest 3", color: undefined },
            { name: "Pennsylvania Avenue", color: "Green" },
            { name: "Short Line", color: "Railroad" },
            { name: "Chance", color: undefined },
            { name: "Park Place", color: "Dark Blue" },
            { name: "Luxury Tax", color: undefined },
            { name: "Boardwalk", color: "Dark Blue" },
            { name: "Jail", color: undefined }
        ];
        return places as Array<IMonopolyPlace>;
    }
}
