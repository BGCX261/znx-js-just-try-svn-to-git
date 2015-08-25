/*
 * Extjs控件动态生成-拓展包 
 * 用途：用于生成和服务器进行交互的控件
 * 制作人：曾能贤
 * 创建事件：2012-07-10
 * 参数说明：
 */

function DynamicFormUx() {
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

DynamicFormUx.prototype = {

	// 生成列createGridColumn
	cgc : function(text,dataIndex,config) {
		var c={
			text     : text,
			flex     : 1,
	        sortable : false,
			groupable:true,
	        dataIndex: dataIndex
		}       
        Ext.apply(c, config);
		return c;
	},
	
	// 生成列表头createGridHeader
	cgh : function(text,columns,config) {
		var c={
			text : text,
			columns:columns
		}       
        Ext.apply(c, config);
		return c;
	},
	
	// 创建model
	createModel : function(modelName, fields) {
		return Ext.define(modelName, {
			extend : 'Ext.data.Model',
			fields : fields
		});
	},

	// 创建Store
	createStore : function(autoLoad, modelName, handlerMethod, handlerName,
			datasetName, pageSize,config) {
		//config.groupField 初始化合并某一行
		var c =Ext.create('Pearlsen.PJsonStore', {
			autoLoad : autoLoad,
			model : modelName,
			handlerMethod : handlerMethod,
			handlerName : handlerName,
			datasetName : datasetName,
			pageSize : pageSize,
			listeners : {
				beforeload : function() {
					var args = Array.prototype.slice.call(arguments, 0);
					Pls.TAG.COMMON.storeBeforeload.apply(this, args);
				}
			}
		});
		Ext.apply(c, config);
		return c;
	},

	/** **********************以下为动态控件*********************** */
	// 动态生成下拉框（从数据库获取数据）
	createServerComboBox : function(name, fieldLabel, Code, value, allowBlank,
			labelWidth, margin,config) {

		var fields = [ {
			name : 'id',
			type : 'string'
		}, {
			name : 'code_type',
			type : 'string'
		}, {
			name : 'code',
			type : 'string'
		}, {
			name : 'code_text',
			type : 'string'
		}, {
			name : 'code_desc',
			type : 'string'
		}, {
			name : 'code_order',
			type : 'string'
		} ];

		this.createModel('SysDicModel', fields);

		var store = Ext.create('Ext.data.Store', {
			model : 'SysDicModel'
		});

		var c =Ext.create('Pearlsen.ux.SysDicCombox', {
			id : name,
			name : name,
			fieldLabel : fieldLabel,
			labelAlign : this.basicCongfig.labelAlign,
			allowBlank : allowBlank,
			editable : false,
			labelWidth : labelWidth,
			forceSelection : true,
			selectOnFocus : true,
			margin : margin,
			triggerAction : 'all',
			queryMode : 'local',
			displayField : 'code_text',
			valueField : 'code',
			codeType : Code,
			store : store
		});
		Ext.apply(c, config);
		return c;
	},

	// 创建GridPanel
	createGridPanel : function(columns, objStore, isPaging, selectMode,
			renderTo, height, title,config) {
		var sm = Ext.create('Ext.selection.CheckboxModel', {
			mode : selectMode
		});

		var Grid_paging = Ext.create('Ext.PagingToolbar', {
			store : objStore,
			displayInfo : true,
			displayMsg : '当前 {0} - {1} 共 {2}'
		});
		if (!height) {
			height = this.gridCongfig.gridHeight;
		}
		if (!title) {
			title = "";
		}
		
		var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
			groupHeaderTpl:'选项类型名称: {name} ({rows.length} {[values.rows.length > 1 ? "项" : ""]}) ',
			hideGroupedHeader: false
		});
		
		var c =Ext.create('Ext.grid.Panel', {
			store : objStore,
			title : title,
			selModel : sm,
			region : 'center',
			features: [groupingFeature],
			renderTo : renderTo,
			height : height,
			bbar : isPaging ? Grid_paging : [],
			autoScroll : true,
			columnLines: true,
			columns : columns
		});
		Ext.apply(c, config);
		return c;
	}

};
