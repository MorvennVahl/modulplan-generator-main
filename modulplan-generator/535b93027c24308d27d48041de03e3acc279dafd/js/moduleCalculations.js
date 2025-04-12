
export class ModuleCalculations{
    //to divide the modules in different sizes

    static moduleDimensions(plateType, current_width, current_height) {
        const width = parseFloat(current_width);
        const height = parseFloat(current_height);

        let modW_A, modH_A, modW_B, modH_B;
        if (plateType === "MDF") {
            modW_A = 115; modH_A = 75;
            modW_B = 75;  modH_B = 115;
        } else if (plateType === "A2") {
            modW_A = 100; modH_A = 60;
            modW_B = 60;  modH_B = 100;
        }

        const computeConfig = (modWidth, modHeight) => {
            let countWidth = Math.max(1, Math.ceil(width / modWidth));
            let countHeight = Math.max(1, Math.ceil(height / modHeight));

            let usedWidth = Math.floor((width / countWidth) * 10) / 10;
            let usedHeight = Math.floor((height / countHeight) * 10) / 10;

            const moduleArea = usedWidth * usedHeight;
            return { countWidth, countHeight, usedWidth, usedHeight, moduleArea };
        };

        const orientationA = computeConfig(modW_A, modH_A);
        const orientationB = computeConfig(modW_B, modH_B);

        let best = orientationA.moduleArea >= orientationB.moduleArea ? orientationA : orientationB;

        return [
            best.usedHeight,
            best.usedWidth,
            best.countHeight,
            best.countWidth
        ];
    }

    //i know its not beautiufl. i know its not going any standards for solid principles.. it runs and thats all what matters
    static modulesSizing(current_width, current_height, countH, countW, _width, _height) {
        const baseTotalW = 5.1, baseTotalH = 5.1;
        let temp;
        let ratio = current_width > current_height ? current_height / current_width : current_width / current_height;
        _width = parseFloat(_width);
        _height = parseFloat(_height);

        if (_width > _height){
            if (current_width > current_height){
                if (countW !== 1 && countH !== 1){
                    if (countW > countH){
                        current_width = baseTotalW / countW;
                        current_height = current_width * ratio;
                    }else{
                        current_height = baseTotalH / countH;
                        current_width = current_height * ratio;
                        temp = current_width;
                        current_width = current_height;
                        current_height = temp;
                    }
                }else if(countW === 1 && countH !== 1){
                    temp = current_height;
                    current_height = current_width;
                    current_width = temp;
                    current_height = baseTotalH / countH;
                    current_width = current_height;
                    current_height *= ratio;
                }else if(countW !== 1 && countH === 1){
                    temp = current_height;
                    current_height = current_width;
                    current_width = temp;
                    current_width = baseTotalW / countW;
                    current_height = current_width * ratio;
                }else if(countW === 1 && countH === 1){
                    current_width = baseTotalW * ratio;
                    current_height = baseTotalH * ratio;
                }
            }else if(current_width < current_height){
                if (countW !== 1 && countH !== 1){
                    current_width = baseTotalW / countW;
                    temp = current_width;
                    current_height = temp;
                    current_width = current_height * ratio;
                }else if(countW !== 1 && countH === 1){
                    temp = current_height;
                    current_height = current_width;
                    current_width = temp;
                    current_width = baseTotalW / countW;
                    current_height = current_width * ratio;
                    temp = current_width;
                    current_width = current_height;
                    current_height = temp;
                }else if(countW === 1 && countH === 1){
                    current_width = baseTotalW;
                    current_height = baseTotalH * ratio;
                }
            }else if(countW === 1 && countH === 1){
                current_height = (baseTotalH * ratio);
                current_width = baseTotalW * ratio;
            }
        }else if(_height > _width) {
            if(current_width > current_height){
                if (countH !== 1 && countW !== 1) {
                    if (countH > countW) {
                        current_height = baseTotalH / countH;
                        current_width = current_height * ratio;
                        temp = current_width;
                        current_width = current_height;
                        current_height = temp;
                    }
                }else if (countH !== 1 && countW === 1) {
                    temp = current_width;
                    current_width = current_height;
                    current_height = temp;

                    current_height = baseTotalH / countH;
                    current_width = current_height;
                    current_height *= ratio;
                }
            }else if (current_height >= current_width){
                if (countH !== 1 && countW !== 1) {
                    if (countH > countW) {
                        current_height = baseTotalH / countH;
                        current_width = current_height * ratio;
                    } else if (countH < countW){
                        current_width = baseTotalW / countW;
                        current_height = current_width * ratio;
                        temp = current_width;
                        current_width = current_height;
                        current_height = temp;
                    }
                }else if (countH !== 1 && countW === 1) {
                    temp = current_width;
                    current_width = current_height;
                    current_height = temp;

                    current_height = baseTotalH / countH;
                    current_width = current_height;
                    current_height *= ratio;

                    temp = current_width;
                    current_width = current_height;
                    current_height = temp;
                }
            }
        }

        current_height = Math.floor(current_height * 10) / 10;
        current_width = Math.floor(current_width * 10) / 10;

        current_height = Math.max(current_height, 0.25);
        current_width = Math.max(current_width, 0.25);
        return [current_height, current_width];
    }


    //to calculate if edges and different types are being used
    static aluOffSetCalc(edge, mossType, width, height, alu_circum, circum_air_less, circum_alu_more) {
        let widthOffset = 0, heightOffset = 0;
        let current_width, current_height;
        let offset = 0;
        if (edge === "alu") {
            widthOffset = width > 200 ? alu_circum + circum_alu_more : alu_circum + circum_air_less;
            heightOffset = width > 200 ? alu_circum + circum_alu_more : alu_circum + circum_air_less;

            current_width = Math.max(0, width - widthOffset * 2);
            current_height = Math.max(0, height - heightOffset * 2);
        } else if (edge === "green") {
            if (mossType === "reindeermoss") offset = 4;
            else if (mossType === "flatmoss") offset = 2;
            else if (mossType === "ballmoss") offset = 5;

            current_width = Math.max(0, width - offset);
            current_height = Math.max(0, height - offset);
        }else if(edge === "without"){
            offset = 0;
            current_width = Math.max(0, width - offset);
            current_height = Math.max(0, height - offset);
        }
        current_height = parseFloat(current_height).toFixed(2);
        current_width = parseFloat(current_width).toFixed(2);
        return [current_height, current_width];
    }
}