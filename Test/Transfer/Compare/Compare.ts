namespace Compare {
    import ƒ = Fudge;

    export function compare(_object1: ƒ.Serializable, _object2: ƒ.Serializable, _level: number = 0, _checked: ƒ.Serializable[] = []): boolean {
        if (_checked.indexOf(_object1) >= 0 || _checked.indexOf(_object2) >= 0)
            return true;
        _checked.push(_object1);
        _checked.push(_object2);

        for (var prefix: string = "", i: number = 0; i <= _level; prefix += "-", i++);

        for (let prop in _object1) {
            if (prop == "ComponentMaterial")
                continue;
            if (Number(prop).toString() != prop)
                console.log(`${prefix} Comparing ${prop}`);
            //Check property exists on both objects
            if (_object1.hasOwnProperty(prop) !== _object2.hasOwnProperty(prop)) {
                console.error(`Property mismatch ${prop} | ${_object1} : ${_object2}`);
                return false;
            }

            if ((typeof _object1[prop]) != (typeof _object2[prop])) {
                console.error(`Type mismatch ${_object1} : ${_object2}`);
                return false;
            }

            switch (typeof (_object1[prop])) {
                //Deep compare objects
                case "object":
                    if (!compare(_object1[prop], _object2[prop], _level + 1, _checked)) {
                        console.log(`Found in ${prop}`);
                        return false;
                    }
                    break;
                //Compare values
                default:
                    if (_object1[prop] != _object2[prop]) {
                        console.error(`Value mismatch ${prop}`);
                        return false;
                    }
            }
        }

        //Check object 2 for any extra properties
        for (let prop in _object2) {
            if (typeof (_object1[prop]) == "undefined") {
                console.error(`Property mismatch ${prop} | ${_object1} : ${_object2}`);
                return false;
            }
        }

        return true;
    }
}