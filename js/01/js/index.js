document.addEventListener('DOMContentLoaded', () => {
    document.onpaste = function (e) {

        if($(".type_msg").is(':focus')){

            const items = e.clipboardData.items;
            const files = [];
            $("#slider").empty();
            $("#slider_nav").empty();
            localStorage.setItem('files_length', items.length);
            for( let i = 0, len = items.length; i < len; ++i ) {
                const item = items[i];
                // console.log("item => ", item);
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
            // console.log(localStorage.getItem('files_length'));
        }else{
            alert('Please! click into an textarea');
            return false;
        }
    }
});

function encodeImageFileAsURL(element, i, filename) {
    const reader = new FileReader();

    reader.onload = function() {
        $("#slider").append('<div class="slide" data-slider="'+i+'"><button type="button" class="btn-close remove-pasted-image" data-img-index="'+i+'">x</button><img src="'+reader.result+'" style="width: 100%;border: 1px solid;"/></div>');
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

function sendFilesToServer() {
    let files = parseInt(localStorage.getItem("files_length"));
    // console.log(files);
    // return ;
    let $imagePreview = $("#display-images-preview");

    if(files === 0){
        $imagePreview.modal('hide');
        alert("File(s) missing");
        return false;
    }

    const filesStream = [];
    let imgData;
    for (var i = 0, len = localStorage.getItem("files_length"); i < len; ++i) {
        imgData = JSON.parse(localStorage.getItem("image_" + i));

        if (imgData !== null) {
            filesStream.push(imgData);
            localStorage.removeItem("image_" + i)
        }
    }

    const data = new FormData();

    $.each(filesStream, function(i, file) {
        console.log(file);
        let item = dataURLtoFile(file.file_data, file.file_name);
        console.log(item);
        data.append('file'+i, item);
    });

    $.ajax({
        type: 'POST',
        url: '<server_url_here>',
        cache: false,
        contentType: false,
        processData: false,
        data : data,
        success: function(result){
            if(result.status){

                $.each(result.data, function(i, imagesData) {
                    console.log(imagesData)
                });

                $imagePreview.modal('hide');
            }else{
                alert("Something went wrong");
            }
        },
        error: function(err){
            console.log(err);
        }
    })
}

function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type:mime});
}
