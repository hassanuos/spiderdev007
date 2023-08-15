document.addEventListener('DOMContentLoaded', () => {
    document.onpaste = function (e) {

        if($(".type_msg").is(':focus')){

            const items = e.clipboardData.items;
            const files = [];
            $("#slider").empty();
            $("#slider_nav").empty();
            localStorage.setItem('files_length', items.length);
            for( var i = 0, len = items.length; i < len; ++i ) {
                var item = items[i];
                if( item.kind === "file" && (item.type.indexOf('image/') !== -1)) {
                    if(i === 0){
                        _modal = $("#display-images-preview");
                        _modal.modal('show');
                    }

                    encodeImageFileAsURL(item.getAsFile(), i, item.getAsFile().name);
                    // console.log("item => ", item)
                    // console.log("item filename => ", item.getAsFile().name);
                    // console.log("item.getAsFile => ", item.getAsFile());
                }
            }

        }else{
            alert('Please! click into an textarea');
            return false;
        }
    }
});

function encodeImageFileAsURL(element, i, filename) {
    const reader = new FileReader();

    reader.onload = function() {
        $("#slider").append('<div class="slide" data-slider="'+i+'"><button type="button" class="btn-close remove-pasted-image" data-bs-toggle="tooltip" data-bs-placement="top" title="Remove" data-img-index="'+i+'">x</button><img src="'+reader.result+'" style="width: 100%;border: 1px solid;"/></div>');
        $("#slider_nav").append('<li data-nav="'+i+'" class="btn_slide '+(i===0 ? 'current' : '')+'"><img src="'+reader.result+'" style="width:80px;height:70px;border: 1px solid;" alt=""/></li>');

        var fileData = {
            file_index: i,
            file_name: filename,
            file_data: reader.result
        };

        localStorage.setItem("image_"+i, JSON.stringify(fileData));
        playSlider();
    };

    reader.readAsDataURL(element);
}

function playSlider(){
    var setting = {
            current_slide: 0,
            interval_all: 0,
            change_slide_interval: 5000
        },

        jQ_obj = {
            slider: $('.slide'),
            pager: $('.btn_slide')
        },

        func_obj = {
            change_slide: function (target) {
                jQ_obj.slider.hide();
                jQ_obj.pager.removeClass('current');
                $('[data-slider="' + target + '"]').fadeIn('slow');
                $('[data-nav="' + target + '"]').addClass('current');
            },

            next_slide: function () {
                this.change_slide(setting.current_slide = (setting.current_slide === (jQ_obj.slider.length - 1)) ? 0 : setting.current_slide + 1);
            }
        };

    jQ_obj.slider.hide();
    $('[data-slider="' + setting.current_slide + '"]').fadeIn('slow');

    jQ_obj.pager.on('click', function () {
        const _this = $(this).attr('data-nav');

        func_obj.change_slide(_this);
        clearInterval(setting.interval_all);
    });
}