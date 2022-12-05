// SKU 数据
export const SKU_DATA = [
	{
		species_name: '颜色',
		species_value: 'color',
		children: [
			{ sku_name: '白色', sku_value: 'white' }, 
			{ sku_name: '黑色', sku_value: 'black' }
		]
	},
	{
		species_name: '尺寸',
		species_value: 'size',
		children: [
			{ sku_name: 'L', sku_value: 'l' }, 
			{ sku_name: 'XL', sku_value: 'xl' },
			{ sku_name: 'XXL', sku_value: 'xxl' },
		]
	},
	{
		species_name: '功效',
		species_value: 'effect',
		children: [
			{ sku_name: '抑菌', sku_value: 'bacteriostat' }, 
			{ sku_name: '防臭', sku_value: 'deodorize' },
			{ sku_name: '速干', sku_value: 'quick-dry' },
		]
	},
];

// 产品信息数据
export const PRODUCT_DATA = [
	{ id: 1, attribute: ['white','l', 'bacteriostat'], inventory: 0 },
	{ id: 2, attribute: ['white','l', 'deodorize'], inventory: 0 },
	{ id: 3, attribute: ['white','l', 'quick-dry'], inventory: 0 },
	{ id: 4, attribute: ['white','xl', 'bacteriostat'], inventory: 0 },
	{ id: 5, attribute: ['white','xl', 'deodorize'], inventory: 2 },
	{ id: 6, attribute: ['white','xl', 'quick-dry'], inventory: 1 },
	{ id: 7, attribute: ['white','xxl', 'bacteriostat'], inventory: 5 },
	{ id: 8, attribute: ['white','xxl', 'deodorize'], inventory: 0 },
	{ id: 9, attribute: ['white','xxl', 'quick-dry'], inventory: 3 },
	{ id: 10, attribute: ['black','l', 'bacteriostat'], inventory: 2 },
	{ id: 11, attribute: ['black','l', 'deodorize'], inventory: 2 },
	{ id: 12, attribute: ['black','l', 'quick-dry'], inventory: 1 },
	{ id: 13, attribute: ['black','xl', 'bacteriostat'], inventory: 7 },
	{ id: 14, attribute: ['black','xl', 'deodorize'], inventory: 1 },
	{ id: 15, attribute: ['black','xl', 'quick-dry'], inventory: 2 },
	{ id: 16, attribute: ['black','xxl', 'bacteriostat'], inventory: 7 },
	{ id: 17, attribute: ['black','xxl', 'deodorize'], inventory: 3 },
	{ id: 18, attribute: ['black','xxl', 'quick-dry'], inventory: 5 },
]