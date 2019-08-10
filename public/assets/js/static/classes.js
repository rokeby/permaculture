class Plant {
  constructor(id, name, arabic, type, soil, water, temp, personality, speech, symbol, color, flowering, flowercolor) {
  	this.id = id;
  	this.name = name;
  	this.arabic = arabic;
  	this.type = type;
  	this.soil = soil;
  	this.water = water;
  	this.temp = temp;
  	this.personality = personality;
  	this.speech = speech;
  	this.symbol = symbol;
  	this.color = color;
  	this.flowering = flowering;
  	this.flowercolor = flowercolor;
  	this.notes = '';
  	this.latin = '';
  }
}

class Substrate {
  constructor(id, name, type, personality, fertility, depth, symbol, color, speech) {
  	this.id = id;
  	this.name = name;
  	this.type = type;
  	this.personality = personality;
  	this.fertility = fertility;
  	this.depth = depth;
  	this.symbol = symbol;
  	this.color = color;
  	this.speech = speech;
  }

}

export { Plant, Substrate };
