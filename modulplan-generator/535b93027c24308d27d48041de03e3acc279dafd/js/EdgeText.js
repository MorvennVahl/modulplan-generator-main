import {translations} from "./Translations.js";

export let EdgeText = {
    ALU: {
        deutsch: "Aluminiumrahmen mit",
        english: "Alu edge in",
    },
    GREEN: {
        deutsch: "Begrünte Kante mit",
        english: "Green edge with",
    },
    WITHOUT: {
        deutsch: "Kein Kantenabschluss",
        english: "No edge finish",
    }
}
export const edgeTextMapping = {
    ALU: { deutsch: EdgeText.ALU.deutsch, english: EdgeText.ALU.english },
    GREEN: { deutsch: EdgeText.GREEN.deutsch, english: EdgeText.GREEN.english },
    WITHOUT: { deutsch: EdgeText.WITHOUT.deutsch, english: EdgeText.WITHOUT.english }
}

export class ReturnEdgeText{
    static getEdgeText(language, edge, plani){
        if (edge === "alu"){
            return `${edgeTextMapping.ALU[language]} ${translations.alucolor[plani.alucolor]?.[language] || plani.alucolor}`;
        }
        if (edge === "green"){
            return `${edgeTextMapping.GREEN[language]} ${translations.moss[plani.moss]?.[language] || plani.moss}`;
        }
        return edgeTextMapping.WITHOUT[language];
    }
}
export class timeStamp{
    static getTimeStampText() {
        Date.prototype.yymmdd = function() {
            let yy = this.getFullYear().toString().substr(2, 2); // Letzte zwei Ziffern des Jahres
            let mm = this.getMonth() + 1; // getMonth() ist nullbasiert
            let dd = this.getDate();

            return [yy,
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('');
        };

        let date = new Date();
        return date.yymmdd();
    }
}


