/*
 * Extjs 表单生成工厂 
 *
 * 制作人：曾能贤
 * 创建事件：2012-06-12
 * 
 * 用途：用于生成表单，并对表单进行排版和布局
 * 具体可以生成控件类型如下：
 * 
 * textField
 * serverComboBox：需调用数据字典
 * staticComboBox：需配置扩展属性：displayField，valueField，data，fields 相见Ext API
 * textArea
 * dateField
 * numberField
 * radio:需配置扩展属性：localData且格式为对象数组如[{boxLabel:'abc'},{inputValue:'1'}]的属性"
 * checkbox:需配置扩展属性：localData且格式为对象数组如[{boxLabel:'abc'},{inputValue:'1'}]的属性"
 *
 * 参数说明：
 * r:需要传入的控件属性记录
 * margin：控件之间的间隔（本工厂不设计控件的布局，只对应于相应控件的生成）
 */
var dynamicForm = new DynamicForm();
var dynamicFormUx = new DynamicFormUx();
function FormFactory(r, margin) {
	var defaultValue = "";
	var labelWidth = (r.field_code.length + r.c_place) * 15;
	var margin = '0 0 5 0';
	var allowBlank = true;

	if (r.field_defaultValue) {
		defaultValue = r.field_defaultValue;
	}

	if (margin) {
		margin = margin;
	}
	if (allowBlank) {
		allowBlank = allowBlank;
	}

	switch (r.cmp_code) {
	case "textField": {
		return dynamicForm.createTextField(r.field_code, r.field_name, {
			labelWidth : labelWidth,
			allowBlank : allowBlank,
			value : defaultValue,
			margin : margin
		}, r.uxConfig);
	}
	case "serverComboBox": {
		return dynamicFormUx.createServerComboBox(r.field_code, r.field_name,
				r.data_source, defaultValue, allowBlank, labelWidth, margin,
				r.uxConfig);
	}
	case "staticComboBox": {
		return dynamicForm.createComboBox(r.field_code, r.field_name,
				r.uxConfig.displayField, r.uxConfig.valueField,
				r.uxConfig.data, r.uxConfig.fields, r.uxConfig);
	}
	case "textArea": {
		return dynamicForm.createTextArea(r.field_code, r.field_name, {
			labelWidth : labelWidth,
			value : defaultValue,
			allowBlank : allowBlank,
			margin : margin
		}, r.uxConfig);
	}
	case "dateField": {
		return dynamicForm.createTextDate(r.field_code, r.field_name, {
			labelWidth : labelWidth,
			allowBlank : allowBlank,
			value : defaultValue,
			margin : margin,
			format : r.data_format
		}, r.uxConfig);
	}
	case "numberField": {
		return dynamicForm.createNumberField(r.field_code, r.field_name, {
			labelWidth : labelWidth,
			allowBlank : allowBlank,
			value : defaultValue,
			margin : margin
		}, r.uxConfig);
	}
	case "radio": {
		var radioGroup = [];
		if (!r.uxConfig.data) {
			Ext.Msg
					.alert("提示",
							"选择radio组件，需要至少配置拓展属性：localData且格式为对象数组如[{boxLabel:'abc'},{inputValue:'1'}]的属性");
			return;
		}
		for ( var i = 0; i < r.uxConfig.localData.length; i++) {
			var radio = dynamicForm.createRadio(r.field_code,
					r.uxConfig.localData[i].boxLabel,
					r.uxConfig.localData[i].inputValue, r.field_code + "_" + i,
					r.uxConfig);
			radioGroup.push(radio);
		}
		return dynamicForm.createFieldContainer(r.field_name, radioGroup,
				"hbox");
	}
	case "checkbox": {
		var radioGroup = [];
		if (!r.uxConfig.data) {
			Ext.Msg
					.alert(
							"提示",
							"选择checkbox组件，需要至少配置拓展属性：localData且格式为对象数组如[{boxLabel:'abc'},{inputValue:'1'}]的属性");
			return;
		}
		for ( var i = 0; i < r.uxConfig.localData.length; i++) {
			var radio = dynamicForm.createCheckbox(r.field_code,
					r.uxConfig.localData[i].boxLabel,
					r.uxConfig.localData[i].inputValue, r.field_code + "_" + i,
					r.uxConfig);
			radioGroup.push(radio);
		}
		return dynamicForm.createFieldContainer(r.field_name, radioGroup,
				"hbox");
	}
	}
}
