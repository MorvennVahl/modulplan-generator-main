import {InfoBoxText} from "./InfoBoxText.js";
import {BoardType, PlateTypeText} from "./BoardType.js";
import {logo2, logo, stylegreen_logo_newCI, stylegreen_image, stylegreen_image_end, stylegreen_logo_grey, stylegreen_logo} from "./image_encoding.js";
import {Converter} from "./Converter.js";
import {EdgeText, ReturnEdgeText, timeStamp} from "./EdgeText.js";
import {ColorCode} from "./ColorCode.js";
import {ModuleCalculations} from "./moduleCalculations.js";


let used_font = 'Khmer UI';

//pictures encdoded in base64 -> necessary for usage in pptxgenjs (otherwise it doesnt function)

window.etas = function (data, pptx, language) {
	pptx = new PptxGenJS();
	pptx.layout = 'LAYOUT_4x3'

	//-------------------Color Codes for overall easier access------------------------
	//for formatting text in the lower right boxf
	let orNumber = data.or_number;

	//inch size of lower right box
	let height_text = 1.417;
	let customerName = data.customer.toUpperCase();
	const formatter = new Converter();

	//declaration of color to make code simpler
	const black = 			ColorCode.black;
	const beige_40 = 		ColorCode.beige_40;
	const olive = 			ColorCode.olive;
	const mustard = 			ColorCode.mustard;
	const off_black = 		ColorCode.off_black;
	const white = 			ColorCode.white;
	const beige_70 = 		ColorCode.beige_70;
	const edge_color_green =	ColorCode.edge_color_green;
	const edge_color_alu = 	ColorCode.edge_color_alu;
	const gray = 			ColorCode.gray;
	const ball_green = 		ColorCode.ball_green;

	//extending if companyname exceeds 40 signs
	if ((customerName.length % 40) > 0){
		let modulo = customerName.length / 40;
		height_text += (0.15 * modulo);
	}

	//---------------------PowerPoint Generation--------------------
for (let i = 0; i < data.plans.length; i++) {
	let plani = data.plans[i];
	let edge = plani.edge;
	let height = plani.height;
	let width = plani.width;
	let plateType = plani.fireProtec;
	let mossType = plani.moss;

	//under 200 cm width == less | over 200 width subtraction airprofile
	let alu_circum = 1.4;
	let circum_air_less = 0.3;
	let circum_alu_more = 0.4;
	let _height = 0;
	let _width = 0;
	let y_header = 4.957;
	let h_header = 0.42;

	//every type of edge has different specification to subtract from
	[_height, _width] = ModuleCalculations.aluOffSetCalc(edge, mossType, width, height, alu_circum, circum_air_less, circum_alu_more);
	//specifications of carrierPlates and mdf plates
	let [used_height, used_width, count_height_modules, count_width_modules] = ModuleCalculations.moduleDimensions(plateType, _width, _height);
	//sizing of PowerPoint slide to accustom the whole module
	let [size_height_modules, size_width_modules] = ModuleCalculations.modulesSizing(used_width, used_height, count_height_modules, count_width_modules, _width, _height);
	//sizing of modules relative to other modules
	let slide = pptx.addNewSlide({sectionTitle: data.customer + " " + data.language});

	slide.addShape(pptx.shapes.RECTANGLE, {
		x: 7.232,
		y: 0.350,
		w: 2.717,
		h: 6.732,
		fill: {
			color: beige_40,
			alpha: 1
		}
	});
	slide.addImage({
		data: logo2,
		x: 7.638,
		y: 0.531,
		w: 2.287,
		h: 0.638,
		fill: {
			color: beige_40
		},
		sizing: {type: 'contain', w: 1.90, h: 0.53}
	});

	//------------------------------------------------------------------------------------------------------------------
	//specififcation to display numbers with comma
	let width_local = formatter.formatToGerman(used_width);
	let height_local = formatter.formatToGerman(used_height);

	let numberOfPages = InfoBoxText.numberOfPages(i, data);
	let plateTypeText;
	let informationBoxText;
	let areaColor_plates;
	let edgeTextValue;
	let header_info = orNumber + "\n" + customerName;

	//to accustom to longer names if needed
	if (customerName.length > 20) {
		y_header -= 0.21;
		h_header += 0.21;
	}

	edgeTextValue = ReturnEdgeText.getEdgeText(language, edge, plani);
	plateTypeText = PlateTypeText.getPlateTypeText(language, plani);
	informationBoxText = InfoBoxText.getText(language,
		formatter.formatToGerman(height),
		formatter.formatToGerman(width),
		formatter.formatToGerman(height_local),
		formatter.formatToGerman(width_local), edgeTextValue);

	areaColor_plates = mustard;
//information display | infbox
	//display of Customer name and OR-Number
	slide.addText(header_info, {
		x: 7.366,
		y: y_header,
		w: 2.457,
		h: h_header,
		fontSize: 9,
		color: black,
		fontFace: used_font,
		align: 'left',
		fill: {
			color: beige_40
		}
	});
	slide.addShape(pptx.shapes.LINE, {
		x: 7.3661,
		y: 5.378,
		w: 2.457,
		h: 0,
		line: {
			color: black,
			width: 1.15
		}
	});
	slide.addText(informationBoxText, {
		x: 7.366,
		y: 5.472,
		w: 2.457,
		h: height_text,
		fontSize: 9,
		color: black,
		fontFace: used_font,
		align: 'left',
		fill: {
			color: beige_40
		}
	});
	//underlaying area regarding boardtypes
	slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
		x: 7.638,
		y: 1.441,
		w: 1.902,
		h: 0.25,
		fill: {
			color: areaColor_plates,
			alpha: 1
		}
	});
	slide.addText(plateTypeText, {
		x: 7.637795,
		y: 1.440945,
		w: 1.85,
		h: 0.25,
		fontSize: 10.5,
		color: off_black,
		fontFace: used_font,
		align: 'center'
	});

	//number pages display in the lower right corner x/n
	slide.addText(numberOfPages, {
		x: 9.281,
		y: 6.760,
		w: 0.50,
		h: 0.23,
		fontSize: 10,
		color: black,
		fontFace: used_font,
		align: 'center',
	})
	//----------------------------------------------------------------------------------------------------------
	// Add outer rectangle with border for alu and green
	let edge_color = white;
	if (edge === "alu") {
		edge_color = edge_color_alu;
	} else if (edge === "green") {
		edge_color = edge_color_green;
	}

	if (edge === "alu" || edge === "green"){}
		slide.addShape(pptx.shapes.RECTANGLE, {
			x: 1.11,
			y: 0.615,
			w: 0.085 + size_width_modules * count_width_modules,
			h: 0.082 + size_height_modules * count_height_modules,
			fill: {
				color: white,
				alpha: 1
			},
			line: edge_color,
			lineSize: 3,
			rectRadius: 1000
		});

	//for different types of edges | making it a bit more obvious what is needed
	let additional_length = 0.125;
	if (edge === "alu") {
		additional_length = 0;
	}
	let custom_length = 0;
	if (edge === 'alu') {
		custom_length = 0.10;
	} else if (edge === 'green') {
		custom_length = 0.07;
	} else if (edge === 'without'){
		custom_length = 0;
	}

	//why no modularity with the following code u may ask?
	//easier access and too much varying stuff going on for making the following lines modular
	if (edge === "alu" || edge === "green" || edge === "without") {
		// Add chosen height as arrows
		slide.addShape(pptx.shapes.LINE, {
			x: 0.768,
			y: 0.675 - custom_length,
			w: 0.0000001,
			h: size_height_modules * count_height_modules + (1.525 * custom_length),
			line: gray,
			lineSize: 1,
			lineHead: 'arrow',
			lineTail: 'arrow'
		});
		slide.addText(formatter.formatToGerman(height) + ' cm', {
			x: 0.46,
			y: 0.45 + (size_height_modules * count_height_modules) / 2,
			w: 0.6,
			h: 0.40,
			fontSize: 10,
			color: gray,
			fontFace: used_font,
			align: 'center',
			shape: pptx.shapes.ROUNDED_RECTANGLE,
			fill: {
				color: white,
			}
		});
		// Add chosen width with arrows
		slide.addShape(pptx.shapes.LINE, {
			x: 1.18 - custom_length,
			y: 1.09 + size_height_modules * count_height_modules,
			w: size_width_modules * count_width_modules + 1.59 * custom_length,
			h: 0,
			line: gray,
			lineSize: 1,
			lineHead: 'arrow',
			lineTail: 'arrow',
		});
		slide.addText(formatter.formatToGerman(width) + ' cm', {
			x: (1.45 + size_width_modules * count_width_modules) / 2,
			y: 0.95 + size_height_modules * count_height_modules,
			w: 0.85,
			h: 0.28,
			fontSize: 10,
			color: gray,
			fontFace: used_font,
			align: 'center',
			shape: pptx.shapes.ROUNDED_RECTANGLE,
			fill: {
				color: white,
				h: 0.7,
				w: 0.70
			}
		});
	}

	// Add calculated height with arrows	|	right side line
	slide.addText(formatter.formatToGerman(height_local) + ' cm', {
		x: 1.525 + size_width_modules * count_width_modules,
		y: 0.525 + size_height_modules / 2,
		w: 0.5,
		h: 0.20,
		wrap: false,
		fontSize: 9.5,
		color: off_black,
		fontFace: used_font,
		align: 'center',
		fill: {
			color: white
		}
	});
	slide.addShape(pptx.shapes.LINE, {
		x: 1.39 + size_width_modules * count_width_modules,
		y: 0.6614,
		w: 0.0000001,
		h: size_height_modules - 0.03,
		line: off_black,
		lineSize: 1,
		lineHead: 'arrow',
		lineTail: 'arrow'
	});
	// Add calculated width with arrows	|	left side line
	slide.addText(formatter.formatToGerman(width_local) + ' cm', {
		x: 0.83 + size_width_modules * (count_width_modules - 0.5),
		y: 0.15,
		w: 0.8,
		h: 0.20,
		fontSize: 9.5,
		color: off_black,
		fontFace: used_font,
		align: 'center',
		fill: {
			color: white
		}
	});
	slide.addShape(pptx.shapes.LINE, {
		x: 1.16 + size_width_modules * (count_width_modules - 1),
		y: 0.35,
		w: size_width_modules - 0.03,
		h: 0,
		line: off_black,
		lineSize: 1,
		lineHead: 'arrow',
		lineTail: 'arrow'
	});


	let without_edge = 0;
	if (edge === "without") {
		without_edge = 0.0157
	}
	//schneller Fix hier; der code ist schrecklich dafür aber mei time == money
	let green = 0;
	if (edge === "green"){
		green -= 0.11417;
	}
	// Add inner lines with dashed line: top >> right >> bottom >> left
	slide.addShape(pptx.shapes.LINE, {
		x: 0.765 + additional_length + green,
		y: 0.63 + without_edge,
		w: 1.245 * additional_length + 0.65 + size_width_modules * count_width_modules,
		h: 0,
		line: black,
		lineSize: 0.25,
		lineDash: 'dash'
	});
	slide.addShape(pptx.shapes.LINE, {
		x: 1.1695 + size_width_modules * count_width_modules - without_edge,
		y: 0.30,
		w: 0.00001,
		h: 1.25 * additional_length + 0.65 + size_height_modules * count_height_modules,
		line: black,
		lineSize: 0.25,
		lineDash: 'dash'
	});
	slide.addShape(pptx.shapes.LINE, {
		x: 0.765 + additional_length + green,
		y: 0.675 + size_height_modules * count_height_modules - without_edge,
		w: 1.245 * additional_length + 0.65 + size_width_modules * count_width_modules,
		h: 0,
		line: black,
		lineSize: 0.25,
		lineDash: 'dash'
	});
	slide.addShape(pptx.shapes.LINE, {
		x: 1.1315 + without_edge,
		y: 0.30,
		w: 0.00001,
		h: 1.25 * additional_length + 0.65 + size_height_modules * count_height_modules,
		line: black,
		lineSize: 0.25,
		lineDash: 'dash'
	});

	// Add outer lines with dashed line for alu: top >> right >> bottom >> left
	if (edge === "alu") {
		slide.addShape(pptx.shapes.LINE, {
			x: 0.44,
			y: 0.595,
			w: 1.25 + size_width_modules * count_width_modules,
			h: 0,
			line: black,
			lineSize: 0.25,
			lineDash: 'dash'
		});
		slide.addShape(pptx.shapes.LINE, {
			x: 1.216 + size_width_modules * count_width_modules,
			y: 0.30,
			w: 0.00001,
			h: 0.8 + size_height_modules * count_height_modules,
			line: black,
			lineSize: 0.25,
			lineDash: 'dash'
		});
		slide.addShape(pptx.shapes.LINE, {
			x: 0.44,
			y: 0.716 + size_height_modules * count_height_modules,
			w: 1.25 + size_width_modules * count_width_modules,
			h: 0,
			line: black,
			lineSize: 0.25,
			lineDash: 'dash'
		});
		slide.addShape(pptx.shapes.LINE, {
			x: 1.088,
			y: 0.30,
			w: 0.00001,
			h: 0.8 + size_height_modules * count_height_modules,
			line: black,
			lineSize: 0.25,
			lineDash: 'dash'
		});
	}


	//Add text and rectangles for each module
	let count_modules = 1;
	let scale = 1;
	if (width > (height * 2.5)){
		scale = 0.75;
	}
	for (let n = 1; n <= count_height_modules; n++) {
		for (let m = 1; m <= count_width_modules; m++) {
			slide.addText((i + 1) + '.' + count_modules, {
				shape: pptx.shapes.RECTANGLE,
				align: 'center',
				x: 1.15 + size_width_modules * (m - 1),
				y: 0.65 + size_height_modules * (n - 1),
				w: size_width_modules,
				h: size_height_modules,
				fill: {
					color: '006053',
					alpha: 59
				},
				line: {
					color: white,
					width: 0.33
				},
				lineDash: 'dash',
				lineSize: 0.5,
				color: white,
				fontFace: used_font,
				fontSize: 9.5 * scale
			});
			count_modules += 1;
		}
	}
}
let lang = "";
if (language === "deutsch"){
	lang = "DE";
}else{
	lang = "ENG";
}
let customer = formatter.replaceSpacesWithUnderscore(data.customer);
let or_number = formatter.replaceSpacesWithUnderscore(data.or_number);

setTimeout(() => {}, 300);
let name = customer+ "_" +or_number + "_"+lang + "_" + timeStamp.getTimeStampText();
pptx.writeFile(name).then(r => console.log("saved!"));
//jszip 3.1.5 mit IE11
//npm install jszip@3.1.5 --save
};