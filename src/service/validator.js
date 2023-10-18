export class ValidatorService{
    static min( inputValue, min) {
        if(inputValue.length < min) {
            return ` Can't be less than ${min} charaters`;
        }
    }
    static max( inputValue, max) {
        if(inputValue.length > max) {
            return ` Can't be more than ${max} charaters`;
        }
    }

    static minNum( inputValue, min) {
        if(inputValue < min) {
            return ` Can't be less than ${min} `;
        }
    }
    static maxNum( inputValue, max) {
        if(inputValue > max) {
            return ` Can't be more than ${max} `;
        }
    }
}