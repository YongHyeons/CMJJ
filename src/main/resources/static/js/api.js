$(document).ready(function() {
    $('#summernote').summernote({
        lang:'ko-KR',
        height: 300,
        placeholder : '- 강사님의 클래스를 최소 5줄 이상 자세하게 설명해 주세요'+'<br>'+
                    '- 복사하기 + 붙여넣기의 경우 내용이 올바르게 보이지 않을 수 있어요' +'<br>'+
                    '- 원하시면 이미지나 영상 링크를 추가하실 수 있어요'+'<br>'+
                    '<br>'+
                    '- 이미지는 드래그 해서 넣으시면 됩니다',
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
           
        ],
    });
});


