(function ($){
	var me = {};
	var per = 'samui-gen-';
	var defClass = {};
	var basePath = '.';
	
	window['Samui'] = me;
	
	me.srv = function(cfg){
		debugger
	};
	
	me.define = function(cls){
		
	};
	
	me.reg = function(key, cls){
		defClass[key] = cls;
	}
		
	me.Panel = function(cfg){
		var o = me.define('panel');
		if(!o){
			
			//me.srv("")
		}
		return arguments.callee.prototype.constructor;
	};
	
	me.Window = function(cfg){
		var o = me.define('window');
		if(!o){
			me.srv("")
		}
	};
	
	me.MessageBox = function(cfg){
		
	};
	
	
	var createdId =0;
	me.genId = function() {
	  return per + (createdId++);
	};
	
})(jQuery);