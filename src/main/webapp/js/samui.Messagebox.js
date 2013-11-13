/*
 * sam ui
 * https://github.com/sambee/samui
 *
 * Copyright 2013, Sam Wong
 * 
 *
 * Licensed under the Apache license:
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function(){
	Samui.Panel = function (data, options) {
		  
		  var me = this;
		  var $ = jQuery;
		  
		  //merge your base and sub class. 
		  me.options = jQuery.extend({}, Samui.Panel.prototype.options, options || {});
		  if(!me.options.id){
			  me.id =me.options.id =Samui.genId();	  
		  }
		  var op =me.options;
		  
		  // preparamos el elemento
		  me.samui = jQuery(me.template.replace(/{id}/, op.id));
		  
		  //set your panel content
		  me.setContent(data);


		  //
		  if(me.options.title == null) {  
		    jQuery('.samui-titlebox', me.samui).remove();
		  
		  } else {
		    
		    $('.samui-title', me.samui).append(me.options.title);   
		  
		    //add movable function.
		    if(op.moveable === true){  	  
		  	  var moving = false;
		  	  var dx,dy;
		  	  $('.samui-titlebox', me.samui)
		  	  .css({cursor: "move" })
		  	  .mousedown(function(e){	
		  		  var o = $('#' + me.id);
		  		  moving=true;	 
		  		  dx=e.pageX-parseInt(o.css("left"));
		  		  dy=e.pageY-parseInt(o.css("top"));

		  	  }).mousemove(function(e){
		  		  if(moving == true){
		  			  var o = $('#' + me.id);
		  			  var eX=e.pageX,eY=e.pageY;
		  			  console.info(eX);
		  			  o.css({"left":eX-dx,"top":eY-dy});
		  		  }			 
		  	  }).mouseup(function(){
		  		  moving=false;	
		  	  }).click(function(){
			  
		  		var o = $('.samui');
		  		$.each(o,function(){
		  			$(this).css({'z-index': me.options.zIndex});
		  		});
		  		me.samui.css({'z-index': me.options.zIndex + $('.samui').length});
		  	  
			  }); 
		    }
		    
		    if(me.options.buttons.length === 0 && !me.options.autoclose) {
		    
		      if(me.options.closeButton) {
		        var close = jQuery('<span class="samui-closebtn"></span>');
		        close.bind('click', function() {
		          me.hide();
		        });
		        
		        jQuery('.samui-titlebox', this.samui).prepend(close);
		        
		      };
		    
		    };
		    
		    if(me.options.titleClass != null) jQuery('.samui-titlebox', this.samui).addClass(me.options.titleClass);
		    
		  };
		  
		  // ajustamos el ancho
		  if(me.options.width != null) jQuery('.samui-box', me.samui).css('width', me.options.width);
		  
		  // preparamos los botones
		  if(me.options.buttons.length > 0) {
		  
		    for (var i = 0; i < me.options.buttons.length; i++) {
		      
		      var cls = (me.options.buttons[i]["class"]) ? me.options.buttons[i]["class"] : '';
		      var btn = jQuery('<div class="btnbox"><button class="btn ' + cls + '" href="#">' + me.options.buttons[i].label + '</button></div>').data('value', me.options.buttons[i].val);
		      btn.on('click', function() {
		        var value = jQuery.data(this, 'value');
		        var after = (me.options.callback != null) ? function() { me.options.callback(value); } : null;
		        me.hide(after);
		      });
		    
		      jQuery('.samui-actions', this.samui).append(btn);
		    
		    };
		  
		  } else {
		  
		    jQuery('.samui-footbox', this.samui).remove();
		  
		  };
		  
		  // 
		  if(me.options.buttons.length === 0 && me.options.title == null && !me.options.autoclose) {
		    
		    if(me.options.closeButton) {
		      var close = jQuery('<span class="samui-closebtn"></span>');
		      close.bind('click', function() {
		        me.hide();
		      });
		      
		      jQuery('.samui-content', this.samui).prepend(close);
		      
		    };
		    
		  };
		  
		  //
		  me.modal = (me.options.modal) ? jQuery('<div class="samui-modal"></div>').css({opacity: me.options.modalOpacity, width: jQuery(document).width(), height: jQuery(document).height(), 'z-index': me.options.zIndex + jQuery('.samui').length}).appendTo(document.body) : null;
		  
		  //
		  if(me.options.show) me.show();
		  
		  //
		  jQuery(window).bind('resize', function(){ me.resize(); });
		  
		  //
		  if(me.options.autoclose != null) {
		    setTimeout(function(me) {
		      me.hide();
		    }, me.options.autoclose, this);
		  };
		  
		  return me;
		  
		};

		//base class.
		Samui.Panel.prototype = {

		  options: {
		    autoclose: null,                         // autoclose message after 'x' miliseconds, i.e: 5000
		    buttons: [],                             // array of buttons, i.e: [{id: 'ok', label: 'OK', val: 'OK'}]
		    callback: null,                          // callback function after close message
		    center: true,                            // center message on screen
		    closeButton: true,                       // show close button in header title (or content if buttons array is empty).
		    height: 'auto',                          // content height
		    title: null,                             // message title
		    titleClass: null,                        // title style: info, warning, success, error
		    modal: false,                            // shows message in modal (loads background)
		    modalOpacity: .2,                        // modal background opacity
		    padding: '10px',                         // content padding
		    show: true,                              // show message after load
		    unload: true,                            // unload message after hide
		    viewport: {top: '0px', left: '0px'},     // if not center message, sets X and Y position
		    width: '500px',                          // message width
		    zIndex: 99999,                            // message z-index
		    moveable:true
		  },
		  template: '<div class="samui" id="{id}"><div class="samui-box"><div class="samui-wrapper"><div class="samui-titlebox"><span class="samui-title"></span></div><div class="samui-content"></div><div class="samui-footbox"><div class="samui-actions"></div></div></div></div></div>',
		  content: '<div></div>',
		  visible: false,
		    
		  setContent: function(data) {
		    jQuery('.samui-content', this.samui).css({padding: this.options.padding, height: this.options.height}).empty().append(data);
		  },
		  
		  viewport: function() {
		  
		    return {
		      top: ((jQuery(window).height() - this.samui.height()) / 2) +  jQuery(window).scrollTop() + "px",
		      left: ((jQuery(window).width() - this.samui.width()) / 2) + jQuery(window).scrollLeft() + "px"
		    };
		    
		  },
		    
		  show: function() {

		    if(this.visible) return;
		    
		    if(this.options.modal && this.modal != null) this.modal.show();
		    this.samui.appendTo(document.body);
		    
		    // obtenemos el centro de la pantalla si la opción de centrar está activada
		    if(this.options.center) this.options.viewport = this.viewport(jQuery('.samui-box', this.samui));
		    
		    this.samui.css({top: this.options.viewport.top, left: this.options.viewport.left, 'z-index': this.options.zIndex + jQuery('.samui').length}).show().animate({opacity: 1}, 300);
		    
		    // cancelamos el scroll
		    //document.documentElement.style.overflow = "hidden";
		    
		    this.visible = true;
		  
		  },
		  
		  hide: function(after) {
		    
		    if (!this.visible) return;
		    var me = this;
		    
		    this.samui.animate({opacity: 0}, 300, function() {
		      if(me.options.modal && me.modal != null) me.modal.remove();
		      me.samui.css({display: 'none'}).remove();
		      // reactivamos el scroll
		      //document.documentElement.style.overflow = "visible";
		      me.visible = false;
		      if (after) after.call();
		      if(me.options.unload) me.unload();
		    });
		    
		    return this;
		    
		  },
		  
		  resize: function() {
		    if(this.options.modal) {
		      jQuery('.samui-modal').css({width: jQuery(document).width(), height: jQuery(document).height()});
		    };
		    if(this.options.center) {
		      this.options.viewport = this.viewport(jQuery('.samui-box', this.samui));
		      this.samui.css({top: this.options.viewport.top, left: this.options.viewport.left});
		    };
		  },
		  
		  toggle: function() {
		    this[this.visible ? 'hide' : 'show']();
		    return this;
		  },
		  
		  unload: function() {
		    if (this.visible) this.hide();
		    jQuery(window).unbind('resize', function () { this.resize(); });
		    this.samui.remove();
		  },

		};

		// extend your base class.
		jQuery.extend(Samui.Panel, {

		  alert: function(data, callback, options) {        
		      
		      var buttons = [{id: 'ok', label: 'OK', val: 'OK'}];
		      
		      options = jQuery.extend({closeButton: false, buttons: buttons, callback:function() {}}, options || {}, {show: true, unload: true, callback: callback});
		      
		      return new Samui.Panel(data, options);
		      
		  },
		  
		  ask: function(data, callback, options) {
		    
		    var buttons = [
		      {id: 'yes', label: 'Yes', val: 'Y', "class": 'btn-success'},
		      {id: 'no', label: 'No', val: 'N', "class": 'btn-danger'},
		    ];
		    
		    options = jQuery.extend({closeButton: false, modal: true, buttons: buttons, callback:function() {}}, options || {}, {show: true, unload: true, callback: callback});
		    
		    return new Samui.Panel(data, options);
		      
		  },
		  
		  img: function(src, options) {
		    
		    var img = new Image();
		    
		    jQuery(img).load(function() {
		    
		      var vp = {width: jQuery(window).width() - 50, height: jQuery(window).height() - 50};
		      var ratio = (this.width > vp.width || this.height > vp.height) ? Math.min(vp.width / this.width, vp.height / this.height) : 1;
		    
		      jQuery(img).css({width: this.width * ratio, height: this.height * ratio});
		      
		      options = jQuery.extend(options || {}, {show: true, unload: true, closeButton: true, width: this.width * ratio, height: this.height * ratio, padding: 0});
		      new Samui.Panel(img, options);
		    
		    }).error(function() {
		    
		      console.log('Error loading ' + src);
		    
		    }).attr('src', src);
		      
		  },
		  
		  load: function(url, options) {
		      
		    options = jQuery.extend(options || {}, {show: true, unload: true, params: {}});
		    
		    var request = {
		      url: url,
		      data: options.params,
		      dataType: 'html',
		      cache: false,
		      error: function (request, status, error) {
		        console.log(request.responseText);
		      },
		      success: function(html) {
		        //html = jQuery(html);
		        new Samui.Panel(html, options);
		      }
		    };
		    
		    jQuery.ajax(request);
		      
		  }
		  
		}); 
})();
