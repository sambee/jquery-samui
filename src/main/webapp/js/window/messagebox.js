jQuery.noConflict ();
(function($) {
    jQuery.noConflict ();
    (function($) {
      $(document).ready(function() {
        
        $('#show-hide-code').on('click', function() {
          $('.code').toggle();
        });
        
        // Examples:
        
        $('#simple').on('click', function() {
          new Samui.Panel('这是个简单的提示.');
        });
        
        $('#title').on('click', function() {
          new Samui.Panel('这是一个含标题栏的对话框.', {title: 'Title'});
        });
        
        $('#modal').on('click', function() {
          new Samui.Panel('这是一个模态对话框', {title: 'Modal Window', modal: true});
        });
        
        $('#absolute').on('click', function() {
          new Samui.Panel('这是使用了绝对位置的对话框.', {center: false, viewport: {top: '40px', left: '300px'}});
        });
        
        $('#close-button').on('click', function() {
          new Samui.Panel('这个一个可关闭的对话框.', {title: 'Buttons', buttons: [{id: 0, label: 'Close', val: 'X'}]});
        });
        
        $('#yes-no-buttons').on('click', function() {
          new Samui.Panel('问答试对话框.', {title: 'Buttons', buttons: [{id: 0, label: 'Yes', val: 'Y'}, {id: 1, label: 'No', val: 'N'}], callback: function(val) { alert('Your selection: ' + val); }});
        });
        
        $('#yes-no-cancel-buttons').on('click', function() {
          new Samui.Panel('这个是带回调的提示.', {title: 'Buttons', buttons: [{id: 0, label: 'Yes', val: 'Y', "class": 'btn-success'}, {id: 1, label: 'No', val: 'N', "class": 'btn-danger'}, {id: 2, label: 'Cancel', val: 'C'}]});
        });
        
        $('#success-title').on('click', function() {
          new Samui.Panel('成功的提示.', {title: 'Title', titleClass: 'success', buttons: [{id: 0, label: 'Close', val: 'X'}]});
        });
        
        $('#info-title').on('click', function() {
          new Samui.Panel('信息提示.', {title: 'Title', titleClass: 'info', buttons: [{id: 0, label: 'Close', val: 'X'}]});
        });
        
        $('#error-title').on('click', function() {
          new Samui.Panel('出错的提示ʾ.', {title: 'Title', titleClass: 'anim error', buttons: [{id: 0, label: 'Close', val: 'X'}]});
        });
        
        $('#warning-title').on('click', function() {
          new Samui.Panel('警告的提示.', {title: 'Title', titleClass: 'anim warning', buttons: [{id: 0, label: 'Close', val: 'X'}]});
        });
        
        $('#alert').on('click', function() {
          Samui.Panel.alert('提示框.');
        });
        
        $('#ask').on('click', function() {
            Samui.Panel.ask('询话的提示', function(val) { alert('Your selection: ' + val); });
          });
        
        $('#load').on('click', function() {
          Samui.Panel.load('../../data.html');
        });
        
        $('#img').on('click', function() {
          Samui.Panel.img('../../01.jpg');
        });
        
        $('#monvable').on('click', function() {
            new Samui.Panel('不可移动的提示.', {title: 'Title', moveable:false});
            
        });
        $('#autoclose').on('click', function() {
            new Samui.Panel('1秒后自动关闭.', {title: 'Title', autoclose:2000});
            
        });
      });
    })(jQuery)
})(jQuery)
