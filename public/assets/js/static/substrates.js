var substrates = [

//zones: 1 rocky, 2 soil, 3 trees, 4 farm, 5 path, 6 spring

	{
		'name': 'limestone',
		'1': 'high',
		'2': 'low',
		'3': 'low',
		'4': 'none',
		'5': 'med',
		'6': 'none',
		'type': 'rock',
		'personality': 'fickle',
		'fertility': 0.1,
		'symbol': 'ᗝ',
		'color': '#ebebe0',
	},

	{
		'name': 'dolomite',
		'1': 'high',
		'2': 'none',
		'3': 'low',
		'4': 'none',
		'5': 'low',
		'6': 'none',		
		'type': 'rock',
		'personality': 'wise',
		'fertility': 0.05,
		'symbol': '⋂',
		'color': '#b3b3cc',
	},

	{
		'name':'terra rossa',
		'1': 'low',
		'2': 'high',
		'3': 'high',
		'4': 'low',
		'5': 'high',
		'6': 'none',		
		'type': 'soil',
		'personality': 'flighty',
		'fertility': 0.8,
		'symbol': '."',
		'color':'#66001a',
	},

	{
		'name': 'compost',
		'1': 'none',
		'2': 'none',
		'3': 'low',
		'4': 'high',
		'5': 'none',
		'6': 'none',
		'type': 'soil',
		'personality': 'moody',
		'fertility': 0.95,
		'symbol': '."',
		'color': '#3b2b2f',
	},

	{
		'name': 'clay',
		'1': 'low',
		'2': 'med',
		'3': 'low',
		'4': 'none',
		'5': 'med',
		'6': 'none',
		'type': 'soil',
		'personality': 'clingy',
		'fertility': 0.3,
		'symbol': '."',
		'color': '#e6e600',
	},

	{
		'name': 'water',
		'1': 'none',
		'2': 'none',
		'3': 'none',
		'4': 'none',
		'5': 'none',
		'6': 'high',
		'type': 'water',
		'personality': 'clingy',
		'fertility': 0,
		'symbol': '≈',
		'color': '#99e6ff',
	},

]

export default  substrates ;