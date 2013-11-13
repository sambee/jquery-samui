(function ($) {
    $.fn.extend({
        //������� - paddingList
        paddingList: function (options) {

            //������Ĭ��ֵ
            var defaults = {
                animatePadding: 10,
                hoverColor: "Black"
            };

            var options = $.extend(defaults, options);

            return this.each(function () {
            	alert(options);
                var o = options;

                //��Ԫ�ؼ��ϸ������� �������� ul���� 
                var obj = $(this);

                //�õ�ul�е�a����
                var items = $("li a", obj);

                //���hover()�¼���a
                items.hover(function () {
                    $(this).css("color", o.hoverColor);
                    //queue false��ʾ����ӵ�����������
                    $(this).animate({ paddingLeft: o.animatePadding }, { queue: false, duration: 300 });

                }, function () {
                    $(this).css("color", "");
                    $(this).animate({ paddingLeft: "0" }, { queue: true, duration: 300 });
                });

            });
        }
    });
})(jQuery);