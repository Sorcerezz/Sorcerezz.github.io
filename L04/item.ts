namespace L04 {

export interface Item {
    _name: string;
    _value: number;
    _unit: string;
 }

export interface Tasks {
    _grocery: Item[];
    _housekeeping: Item[];
    _money: Item[];
 }

export interface Discounter {
    _name: string;
}

export interface Store {
    _shop: Discounter[];
}

export let stores: Store = {
    _shop: [{_name: "Aldi"},
            {_name: "Edeka"},
            {_name: "Lidl"},
            {_name: "Rewe"},
            {_name: "Kaufland"},
            {_name: "Penny"}]
};

export let tasks: Tasks = {
    _grocery: [{_name: "Brot", _unit: "kg", _value: 1.29},
                {_name: "Backmischung", _unit: "Packungen", _value: 2.32},
                {_name: "Wischmop", _unit: "Stück", _value: 17.00},
                {_name: "Wasser", _unit: "Sixpack", _value: 3.00},
                {_name: "Hackfleisch", _unit: "Kilo", _value: 12.00},
                {_name: "Klopapier", _unit: "Packungen", _value: 2.50},
                {_name: "Katzenfutter", _unit: "", _value: 3.60}],

    _housekeeping: [{_name: "Wischen", _unit: "Zimmer", _value: 7},
                    {_name: "Saugen", _unit: "Zimmer", _value: 5},
                    {_name: "Rasenmähen", _unit: "Quadratmeter", _value: 1},
                    {_name: "Postgang", _unit: "Brief", _value: 1},
                    {_name: "Hund ausführen", _unit: "Kilometer", _value: 8},
                    {_name: "Blumen gießen", _unit: "Pflanzen", _value: 0.5}],

    _money: [{_name: "Abheben", _unit: "Euro", _value: 5},
            {_name: "Einzahlen", _unit: "Euro", _value: 5}]
};
    

}