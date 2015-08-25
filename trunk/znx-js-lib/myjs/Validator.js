function Validator(){
	this.Require = /.+/;
	this.Email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	this.Phone = /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/;
	this.Mobile = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/;
	this.Url = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
	this.IdCard = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
	this.Currency = /^\d+(\.\d+)?$/;
	this.Number = /^\d+$/;
	this.Zip = /^[1-9]\d{5}$/;
	this.QQ = /^[1-9]\d{4,12}$/;
	this.Integer = /^[-\+]?\d+$/;
	this.Double = /^[-\+]?\d+(\.\d+)?$/;
	this.English = /^[A-Za-z]+$/;
	this.Chinese =  /^[\u0391-\uFFE5]+$/;
	this.message=[];
}

Validator.prototype.toString=function(){
	var buffer="<ul>";
	$(this.message).each(function(index,msg){
		buffer+="<li>"+msg+"</li>";
	});
	buffer+="</ul>";
	return buffer;
};

Validator.prototype.isPass=function(){
	return this.message.length==0;
};

Validator.prototype.addMessage=function(msg){
	this.message.push(msg);
};

Validator.prototype.isCustom=function(value,regex){
	return new Regex(regex).test(value);
};

Validator.prototype.isRangeSize=function(value,max,min){
	return (value.length>=min)&&(value.length<=max);
};

Validator.prototype.isEquals=function(value1,value2){
	return value1==value2;
};

Validator.prototype.isChinese=function(value){
	return this.Chinese.test(value);
};

Validator.prototype.isEnglish=function(value){
	return this.English.test(value);
};

Validator.prototype.isDouble=function(value){
	return this.Double.test(value);
};

Validator.prototype.isInteger=function(value){
	return this.Integer.test(value);
};

Validator.prototype.isQQ=function(value){
	return this.QQ.test(value);
};

Validator.prototype.isZip=function(value){
	return this.Zip.test(value);
};

Validator.prototype.isNumber=function(value){
	return this.Number.test(value);
};

Validator.prototype.isCurrency=function(value){
	return this.Currency.test(value);
};

Validator.prototype.isRequired=function(value){
	return this.Require.test(value);
};

Validator.prototype.isEmail=function(value){
	return this.Email.test(value);
};

Validator.prototype.isPhone=function(value){
	return this.Phone.test(value);
};

Validator.prototype.isMobile=function(value){
	return this.Mobile.test(value);
};

Validator.prototype.isUrl=function(value){
	return this.Url.test(value);
};

Validator.prototype.isIdCard=function(value){
	return this.IdCard.test(value);
};