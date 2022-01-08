(function($){
    $.fn.Fdj=function(){
        $('#smallImg').on('mouseover', function() {
            $('#slider').show();
        })       
        $('#smallImg').on('mouseout', function() {   
            $('#slider').hide();
        })
        
        $('#smallImg').on('mousemove', function(e) {       
            var x = e.clientX - $('#slider').width() / 2;       
            var y = e.clientY - $('#slider').height() / 2;
            if(x <= 0) {            
                x = 0           
            }
        
            if(x > $('#smallImg').width() - $('#slider').width()) {
                x = $('#smallImg').width() - $('#slider').width();
            }
        
            if(y <= 0) {
                y = 0
            }
        
            if(y > $('#smallImg').height() - $('#slider').height()) {
                y = $('#smallImg').height() - $('#slider').height();
            }
        
            $('#slider').css({
                'left': x,
                'top': y
            })
        
            var X=x/$('#smallImg').width()*800 
            var Y=y/$('#smallImg').height()*800
            $('#img').css({
                left:-X,
                top:-Y
            })
        }) 
    }
})(jQuery)