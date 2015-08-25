/***
 * 通过和服务器的交互，自动获取下拉框的数据
 */
Ext.define('ZExt.ux.ServerCombox', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.sysdiccombox',
    menuCode:null,
    constructor: function(config) {
		if( Ext.isEmpty(config.codeType) ){
			throw new Error("没有设置字典类型");
		}
    	this.callParent([config]);
    	this._loadData();
    },
    _loadData:function(){
		 var query = new Query("CodeQueryHandler","_load_dataset");
		 query.setHandlerMethod("getComboxCode");		 
		 query.setURL('/query.asp');
		 query.addCondition("codeType", this.codeType);
		 query.setCompletedFun(this.afterloadData);
		 query.setCompletedFunScope(this);
		 query.load();
    },

    afterloadData:function(success,dataset,response, opts){
		if(success){
			this.getStore().loadData(dataset.record);
		}else{
			throw new Error("获取数据字段出现异常");
		}
    }
});