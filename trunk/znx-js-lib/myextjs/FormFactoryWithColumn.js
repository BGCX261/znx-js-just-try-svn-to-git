/*
 * Extjs 表单生成工厂 
 * 用途：用于生成表单，并对表单进行排版和布局
 * 制作人：曾能贤
 * 创建事件：2012-06-12
 * 参数说明：
 * data:需要传入的json数据
 * renderTo：需要渲染的DIV id
 * columnNum：表单需要分成几列
 * labelMaxWidth：指定表单的最大宽度
 */
function FormFactory() {
	this.dynamicForm = new DynamicForm();
}

FormFactory.prototype = {
	buildForm : function(data,renderTo,columnNum,labelMaxWidth) {
		this.formPanel = this.dynamicForm.createFormPanel(renderTo);
		var tepNum = 0;
		var column = this.dynamicForm.createColumn();
		for ( var i = 0; i < data.record.length; i++) {
			var r = data.record[i];
			tepNum++;
			var defaultValue = "";
			if (r.field_default_value) {
				defaultValue = r.field_default_value;
			}
			var allowBlank = false;
			if (r.field_allow_null) {
				allowBlank = r.field_allow_null == "1" ? true : false;
			}
			var labelWidth = r.field_cn_name.length * 15;
			if (labelMaxWidth) {
				labelWidth = labelMaxWidth;// 6 char
			}
			var margin = '0 0 5 0';
			if (tepNum >= 2) {
				margin = "0 0 5 20";
			}

			switch (r.field_type) {
			case "textField": {
				var text = this.dynamicForm.createTextField(r.field_en_name,
						r.field_cn_name,{labelWidth:labelWidth,allowBlank:allowBlank, value:defaultValue, 
						margin:margin});
				column.add(text);
				break;
			}
			case "comboBox": {
				var combo = this.dynamicForm.createComboBox(r.field_en_name,
						r.field_cn_name, r.field_code_type, defaultValue,
						allowBlank, labelWidth, margin);
				column.add(combo);
				break;
			}
			case "textArea": {
				this.formPanel.add(column);
				column = this.dynamicForm.createColumn();
				margin = '0 0 5 0';
				var area = this.dynamicForm.createTextArea(r.field_en_name, r.field_cn_name, {labelWidth:labelWidth, value:defaultValue, allowBlank:allowBlank, margin:margin});
				column.add(area);
				this.formPanel.add(column);
				column = this.dynamicForm.createColumn();
				tepNum = 0;
				break;
			}
			case "dateField": {
				var date = this.dynamicForm.createTextDate(r.field_en_name, r.field_cn_name, {labelWidth:labelWidth, allowBlank:allowBlank, value:defaultValue, margin:margin, format:r.format});
				column.add(date);
				break;
			}
			case "numberField": {
				var number = this.dynamicForm.createNumberField(r.field_en_name, r.field_cn_name, {labelWidth:labelWidth, allowBlank:allowBlank, value:defaultValue, margin:margin});
				column.add(number);
				break;
			}
			}

			if (tepNum == columnNum) {
				// add new row
				this.formPanel.add(column);
				column = this.dynamicForm.createColumn();
				tepNum = 0;
			}
			if (i == data.record.length - 1) {
				this.formPanel.add(column);
			}
		}
		
		return this.formPanel;
	}
};