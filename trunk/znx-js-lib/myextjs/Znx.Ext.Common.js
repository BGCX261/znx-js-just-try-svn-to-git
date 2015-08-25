Ext.namespace('Znx.Ext');
Znx.Ext.Common={
		
	//为组件添加Mask监视
	setMask:function(comp,store,config){
		if(!config){
			config ={};
		}
		var c = new Ext.LoadMask(comp,{
			msg:"正在加载...",
			store:store
		});
		Ext.apply(c,config);
		return c;
	}
};