import { IMonopolyPlace } from "./@types/MonopolyPlace";

export function Equal(a: IMonopolyPlace, b: IMonopolyPlace): boolean {
    return a.name == b.name && a.color == b.color;
}

export function Equals(a: IMonopolyPlace[], b: IMonopolyPlace[]): boolean {
    if(a.length != b.length) {
        return false;
    }
    for(let index = 0; index < a.length; index++) {
        if(a[index].name != b[index].name || a[index].color != b[index].color) {
            return false;
        }
    }
    return true;
}
