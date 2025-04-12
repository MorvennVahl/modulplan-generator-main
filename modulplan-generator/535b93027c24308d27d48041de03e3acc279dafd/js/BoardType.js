import {boardTextMapping} from "./boardTexts.js";

export const BoardType = Object.freeze({
  MDF: "MDF",
  A2: "A2"
})

export class PlateTypeText{
  static getPlateTypeText(language, plani){
    return boardTextMapping[plani.fireProtec]?.[language] || "";
  }
}