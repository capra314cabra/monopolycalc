import { MonopolyPlaces } from "./data/MonopolyPlaces";
import { IMonopolyPlace } from "./@types/MonopolyPlace";
import { IMonopolyProbability } from "./@types/MonopolyProbability";
import Stack from "ts-data.stack";

export class MonopolySimulator {
    diceProb: { number: number; prob: number; oneMoreTurn: boolean; }[] = [
        { number: 3, prob: 2. / 36., oneMoreTurn: false },
        { number: 4, prob: 2. / 36., oneMoreTurn: false },
        { number: 5, prob: 4. / 36., oneMoreTurn: false },
        { number: 6, prob: 4. / 36., oneMoreTurn: false },
        { number: 7, prob: 6. / 36., oneMoreTurn: false },
        { number: 8, prob: 4. / 36., oneMoreTurn: false },
        { number: 9, prob: 4. / 36., oneMoreTurn: false },
        { number: 10, prob: 2. / 36., oneMoreTurn: false },
        { number: 11, prob: 2. / 36., oneMoreTurn: false },
        { number: 2, prob: 1. / 36., oneMoreTurn: true },
        { number: 4, prob: 1. / 36., oneMoreTurn: true },
        { number: 6, prob: 1. / 36., oneMoreTurn: true },
        { number: 8, prob: 1. / 36., oneMoreTurn: true },
        { number: 10, prob: 1. / 36., oneMoreTurn: true },
        { number: 12, prob: 1. / 36., oneMoreTurn: true }
    ];

    private clone<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj)) as T;
    }

    simulate(place: string): IMonopolyProbability[] {
        let probabilities = new Stack<{ places: IMonopolyPlace[], probability: number, turn: number }>();
        let result: IMonopolyProbability[] = [];

        probabilities.push({ places: [], probability: 1, turn: 0 });

        while (!probabilities.isEmpty()) {
            let prob = probabilities.pop();
            let lastLand = prob.places.length == 0 ? this.getPlace(place, 0) : prob.places[prob.places.length - 1];
            if (prob.turn == 2) {
                let newProb = this.clone(prob);
                newProb.places.push({ name: "Jail", color: undefined });
                newProb.probability *= 1. / 6.;
                result.push(newProb);
            }
            for (let dice of this.diceProb) {
                if (dice.oneMoreTurn) {
                    if(prob.turn == 2) {
                        continue;
                    }
                    let newProb = this.clone(prob);
                    let goTo = this.getPlace(lastLand.name, dice.number);
                    newProb.places.push(goTo);
                    newProb.turn++;
                    newProb.probability *= dice.prob;
                    if (goTo.name == "Go To Jail") {
                        newProb.places.push({ name: "Jail", color: undefined });
                        result.push(newProb);
                        continue;
                    }
                    else {
                        probabilities.push(newProb);
                        continue;
                    }
                }
                else {
                    let newProb = this.clone(prob);
                    let goTo = this.getPlace(lastLand.name, dice.number);
                    newProb.places.push(goTo);
                    newProb.turn = -1;
                    newProb.probability *= dice.prob;
                    if (goTo.name == "Go To Jail") {
                        newProb.places.push({ name: "Jail", color: undefined });
                        result.push(newProb);
                        continue;
                    }
                    else {
                        result.push(newProb);
                        continue;
                    }
                }
            }
        }

        return this.merge(result);
    }

    private merge(probs: IMonopolyProbability[]): IMonopolyProbability[] {
        let places = new Map<string, number>();
        for (let prob of probs) {
            if (places.has(JSON.stringify(prob.places))) {
                places.set(JSON.stringify(prob.places), places.get(JSON.stringify(prob.places)) + prob.probability);
            }
            else {
                places.set(JSON.stringify(prob.places), prob.probability);
            }
        }
        let result: IMonopolyProbability[] = [];
        places.forEach((value, key) => {
            result.push({ places: JSON.parse(key), probability: value });
        });
        return result;
    }

    getPlace(place: string, forward: number): IMonopolyPlace {
        let places = new MonopolyPlaces().get();

        let currentPos = -1;
        let counter = 0;
        while (counter < 40) {
            if (place == places[counter].name) {
                currentPos = counter;
                break;
            }
            counter++;
        }

        return places[(currentPos + forward) % 40];
    }
}