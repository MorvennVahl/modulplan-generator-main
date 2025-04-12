export class Converter {
    formatToGerman(number) {
        if (number == null) return "0";
        return number.toString().replace('.', ',');
    }
    replaceSpacesWithUnderscore(str) {
        return str.replace(/ /g, "_");
    }

}
