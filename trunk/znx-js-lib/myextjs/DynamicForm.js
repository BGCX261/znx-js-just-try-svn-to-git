/*
 * Extjs控件动态生成
 * 制作人：曾能贤
 * 创建事件：2012-07-10
 * 参数说明：
 * 1.config可以附加Ext对应控件的相关属性，默认可以不用配置
 * 2.uxConfig:可以附加Ext的拓展属性配置
 */

function DynamicForm() {
	this.formConfig = {
		renderTo : 'DynamicFormWrap',
		id : "DynamicForm_id",
		border : 0,
		width : 750,
		height : 600
	};
	this.columnConfig = {
		columnLength : 2,
		leftColumnMargin : "0 0 5 0",// 分成两列时 左列间隔
		rightColumnMargin : "0 0 5 20",// 分成两列时 右边列间隔
		columnBorder : 0
	};

	this.gridCongfig = {
		gridHeight : 450
	};

	this.basicCongfig = {
		labelAlign : "right",
		basicWidth : 275,
		areaHeight : 75,
		areaWidth : 570,
		margin : "0 0 0 0",
		labelAline : true,// 是否对齐标签
		dataFormat : "Y-m-d",
		allowBlank : false,
		isComboEditable : false,
		isComboForceSelection : true,
		isComboSelectOnFocus : true
	};
}

DynamicForm.prototype = {

	// 生成表单
	createFormPanel : function(config) {
		if (!config) {
			config = {};
		}
		if (!config.id) {
			config.id = "";
		}
		if (!config.width) {
			config.width = this.formConfig.width;
		}
		if (!config.height) {
			config.height = this.formConfig.height;
		}
		if (!config.renderTo) {
			config.renderTo = this.formConfig.renderTo;
		}
		if (!config.id) {
			config.id = this.formConfig.id;
		}
		if (!config.border) {
			config.border = this.formConfig.border;
		}
		var c = Ext.create('Ext.form.Panel', {
			id : config.id,
			renderTo : config.renderTo,
			width : config.width,
			height : config.height,
			border : 0,
			items : []
		});
		Ext.apply(c, config);
		return c;
	},

	// 创建Fieldset
	createFieldSet : function(columnWidth,items,config) {
		if (!config) {
			config = {};
		}
		var c = Ext.create('Ext.form.FieldSet', {
			layout : 'anchor',
			columnWidth: 0.5,
			collapsible : true,
			defaultType : 'textfield',
			defaults : {
				anchor : '100%'
			},
			border : config.border,
			items : items
		});
		Ext.apply(c, config);
		return c;
	},

	// 生成列
	createColumn : function(config) {
		if (!config) {
			config = {};
		}
		if (!config.border) {
			config.border = this.columnConfig.border;
		}
		var c = Ext.create('Ext.Panel', {
			layout : 'column',
			border : config.border,
			items : []
		});
		Ext.apply(c, config);
		return c;
	},

	// 生成textField
	createTextField : function(name, fieldLabel, config, uxConfig) {
		if (!config) {
			config = {};
		}
		if (!uxConfig) {
			uxConfig = {};
		}
		if (!config.allowBlank) {
			allowBlank = this.basicCongfig.allowBlank;
		}
		if (!config.value) {
			config.value = "";
		}
		if (!config.margin) {
			config.margin = this.basicCongfig.margin;
		}
		if (!config.width) {
			config.width = this.basicCongfig.basicWidth;
		}
		if (!config.labelWidth) {
			config.labelWidth = fieldLabel.length * 15
		}
		var c = Ext.create('Ext.form.field.Text', {
			name : name,
			id : name,
			fieldLabel : fieldLabel,
			labelWidth : config.labelWidth,
			margin : config.margin,
			value : config.value,
			width : config.width,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : config.allowBlank
		});
		Ext.apply(c, config);
		Ext.apply(c, uxConfig);
		return c;
	},

	// 生成NumberField
	createNumberField : function(name, fieldLabel, config, uxConfig) {
		if (!config) {
			config = {};
		}
		if (!uxConfig) {
			uxConfig = {};
		}
		if (!config.allowBlank) {
			config.allowBlank = this.basicCongfig.allowBlank;
		}
		if (!config.value) {
			config.value = "";
		}
		if (!config.margin) {
			config.margin = this.basicCongfig.margin;
		}
		if (!config.width) {
			config.width = this.basicCongfig.basicWidth;
		}
		if (!config.labelWidth) {
			config.labelWidth = fieldLabel.length * 15;
		}
		var c = Ext.create('Ext.form.field.Number', {
			name : name,
			id : name,
			fieldLabel : fieldLabel,
			labelWidth : config.labelWidth,
			margin : config.margin,
			value : config.value,
			width : config.width,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : config.allowBlank
		});

		Ext.apply(c, config);
		Ext.apply(c, uxConfig);
		return c;
	},

	// 生成textDate
	createTextDate : function(name, fieldLabel, config, uxConfig) {
		if (!config) {
			config = {};
		}
		if (!uxConfig) {
			uxConfig = {};
		}
		if (!config.allowBlank) {
			config.allowBlank = this.basicCongfig.allowBlank;
		}
		if (!config.value) {
			config.value = "";
		}
		if (!config.margin) {
			config.margin = this.basicCongfig.margin;
		}
		if (!config.dataFormat) {
			config.dataFormat = this.basicCongfig.dataFormat;
		}
		if (!config.width) {
			config.width = this.basicCongfig.basicWidth;
		}
		if (!config.labelWidth) {
			config.labelWidth = fieldLabel.length * 15
		}
		var c = Ext.create('Ext.form.field.Date', {
			name : name,
			id : name,
			fieldLabel : fieldLabel,
			labelWidth : config.labelWidth,
			margin : config.margin,
			width : config.width,
			format : config.dataFormat,
			value : config.value,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : config.allowBlank
		});
		Ext.apply(c, config);
		Ext.apply(c, uxConfig);
		return c;
	},

	// 生成textArea
	createTextArea : function(name, fieldLabel, config, uxConfig) {
		if (!config) {
			config = {};
		}
		if (!uxConfig) {
			uxConfig = {};
		}
		if (!config.allowBlank) {
			config.allowBlank = this.basicCongfig.allowBlank;
		}
		if (!config.value) {
			config.value = "";
		}
		if (!config.margin) {
			config.margin = this.basicCongfig.margin;
		}

		if (!config.height) {
			config.height = this.basicCongfig.areaHeight;
		}
		if (!config.width) {
			config.width = this.basicCongfig.areaWidth;
		}
		if (!config.labelWidth) {
			config.labelWidth = fieldLabel.length * 15;
		}

		var c = Ext.create('Ext.form.field.TextArea', {
			name : name,
			id : name,
			fieldLabel : fieldLabel,
			height : config.height,
			labelWidth : config.labelWidth,
			margin : config.margin,
			width : config.width,
			value : config.value,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : config.allowBlank
		});
		Ext.apply(c, config);
		Ext.apply(c, uxConfig);
		return c;
	},

	// 生成静态下拉框
	createComboBox : function(name, fieldLabel, displayField, valueField, data,
			fields, config, uxConfig) {
		if (!config) {
			config = {};
		}
		if (!uxConfig) {
			uxConfig = {};
		}
		if (!config.allowBlank) {
			config.allowBlank = this.basicCongfig.allowBlank;
		}
		if (!config.value) {
			config.value = "";
		}
		if (!config.margin) {
			config.margin = this.basicCongfig.margin;
		}
		if (!config.editable) {
			config.editable = this.basicCongfig.isComboEditable;
		}
		if (!config.forceSelection) {
			config.forceSelection = this.basicCongfig.isComboForceSelection;
		}
		if (!config.selectOnFocus) {
			config.selectOnFocus = this.basicCongfig.isComboSelectOnFocus;
		}
		if (!config.width) {
			config.width = this.basicCongfig.basicWidth;
		}
		if (!config.labelWidth) {
			config.labelWidth = fieldLabel.length * 15;
		}

		var store = this.createSimpleStore('Model_' + name, data, fields);

		var c = Ext.create('Ext.form.ComboBox', {
			id : name,
			name : name,
			fieldLabel : fieldLabel,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : config.allowBlank,
			editable : config.editable,
			labelWidth : config.labelWidth,
			forceSelection : config.forceSelection,
			selectOnFocus : config.selectOnFocus,
			margin : config.margin,
			triggerAction : 'all',
			width : config.width,
			queryMode : 'local',
			value : config.value,
			displayField : displayField,
			valueField : valueField,
			store : store
		});
		Ext.apply(c, config);
		Ext.apply(c, uxConfig);
		return c;
	},

	// 生成静态下拉框
	createComboBoxWithStore : function(name, fieldLabel, displayField,
			valueField, store, config, uxConfig) {
		if (!config) {
			config = {};
		}
		if (!uxConfig) {
			uxConfig = {};
		}
		if (!config.allowBlank) {
			config.allowBlank = this.basicCongfig.allowBlank;
		}
		if (!config.value) {
			config.value = "";
		}
		if (!config.margin) {
			config.margin = this.basicCongfig.margin;
		}
		if (!config.editable) {
			config.editable = this.basicCongfig.isComboEditable;
		}
		if (!config.forceSelection) {
			config.forceSelection = this.basicCongfig.isComboForceSelection;
		}
		if (!config.selectOnFocus) {
			config.selectOnFocus = this.basicCongfig.isComboSelectOnFocus;
		}
		if (!config.width) {
			config.width = this.basicCongfig.basicWidth;
		}

		if (!config.labelWidth) {
			config.labelWidth = fieldLabel.length * 15;
		}
		var c = Ext.create('Ext.form.ComboBox', {
			id : name,
			name : name,
			fieldLabel : fieldLabel,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : config.allowBlank,
			editable : config.editable,
			labelWidth : config.labelWidth,
			forceSelection : config.forceSelection,
			selectOnFocus : config.selectOnFocus,
			margin : config.margin,
			triggerAction : 'all',
			width : config.width,
			queryMode : 'local',
			value : config.value,
			displayField : displayField,
			valueField : valueField,
			store : store
		});
		Ext.apply(c, config);
		Ext.apply(c, uxConfig);
		return c;
	},

	// 创建createRadio 需配置拓展属性 --数据源
	createRadio : function(name,id,boxLabel, inputValue, config) {
		if (!config) {
			config = {};
		}
		if (!config.boxLabelAlign) {
			config.boxLabelAlign = "before";
		}
		var c = Ext.create('Ext.form.field.Radio', {
			name : name,
			id : name,
			boxLabelAlign : config.boxLabelAlign,
			inputValue : inputValue,
			boxLabel : boxLabel
		});

		Ext.apply(c, config);
		return c;
	},

	// 创建Checkbox 需配置拓展属性 --数据源
	createCheckbox : function(name, boxLabel, inputValue, id, config) {
		if (!config) {
			config = {};
		}
		if (!config.boxLabelAlign) {
			config.boxLabelAlign = "before";
		}
		var c = Ext.create('Ext.form.field.Checkbox', {
			name : name,
			id : id,
			boxLabelAlign : config.boxLabelAlign,
			inputValue : inputValue,
			boxLabel : boxLabel
		});
		Ext.apply(c, config);
		return c;
	},

	// 创建FieldContainer
	createFieldContainer : function(fieldLabel, items, layout, config) {
		if (!config) {
			config = {};
		}

		var c = Ext.create('Ext.form.FieldContainer', {
			fieldLabel : fieldLabel,
			layout : layout,
			items : items
		});
		Ext.apply(c, config);
		return c;
	},

	// 生成Button
	createButton : function(text, handler, config) {
		if (!config) {
			config = {};
		}
		var c = Ext.create('Ext.button.Button', {
			text : text,
			handler : handler
		});
		Ext.apply(c, config);
		return c;
	},

	// 生成Button面板
	createButtonPanel : function(btnAlign, buttons, config) {
		if (!config) {
			config = {};
		}
		var c = new Ext.panel.Panel({
			buttonAlign : btnAlign,
			border : '1',
			buttons : buttons
		});
		Ext.apply(c, config);
		return c;
	},

	// 创建GridPanel
	createGridPanel : function(columns, objStore, isPaging, selectMode, config) {
		if (!config) {
			config = {};
		}
		var sm = Ext.create('Ext.selection.CheckboxModel', {
			mode : selectMode
		});
		var Grid_paging = Ext.create('Ext.PagingToolbar', {
			store : objStore,
			displayInfo : true,
			displayMsg : '当前 {0} - {1} 共 {2}'
		});
		if (!config.renderTo) {
			config.renderTo = "";
		}
		if (!config.height) {
			config.height = this.gridCongfig.gridHeight;
		}
		if (!config.title) {
			config.title = "";
		}
		var c = Ext.create('Ext.grid.Panel', {
			store : objStore,
			title : config.title,
			selModel : sm,
			region : 'center',
			renderTo : config.renderTo,
			height : config.height,
			bbar : isPaging ? Grid_paging : [],
			autoScroll : true,
			columns : columns
		});
		Ext.apply(c, config);

		objStore.loadData([], true);
		return c;
	},

	// 创建model
	createModel : function(modelName, fields, config) {
		if (!config) {
			config = {};
		}
		var c = Ext.define(modelName, {
			extend : 'Ext.data.Model',
			fields : fields
		});
		Ext.apply(c, config);
		return c;
	},

	// 创建SimpleStore
	createSimpleStore : function(modelName, data, fields, config) {
		if (arguments.length == 0) {
			return Ext.create('Ext.data.ArrayStore', {});
		}
		;
		if (!config) {
			config = {};
		}
		if (!config.id) {
			config.id = "";
		}
		this.createModel(modelName, fields);

		var c = Ext.create('Ext.data.Store', {
			id : config.id,
			model : modelName,
			data : data
		});
		Ext.apply(c, config);
		return c;
	},
	// 创建正则表达式
	createRegexText : function(regex, regexText, emptyText, maskRe) {
		var c = {};
		if (regex) {
			c.regex = regex;
		}
		if (regexText) {
			c.regexText = regexText;
		}
		if (emptyText) {
			c.emptyText = emptyText;
		}
		if (maskRe) {
			c.maskRe = maskRe;
		}
		return c;
	}
};
