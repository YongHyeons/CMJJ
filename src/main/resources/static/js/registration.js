Dropzone.autoDiscover = false;

let globalRandomKey = '';

function getCsrfToken() {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (!token) {
        console.error('CSRF token not found');
    }
    return token;
}

function initializeDropzone(randomKey) {
    var dzMessage = document.querySelector('.dropzone .dz-message');
    const myDropzone = new Dropzone("#dropzone", {
        url: `/api/testupload/${randomKey}`,
        method: "POST",
        maxFilesize: 10,
        maxFiles: 6, 
        acceptedFiles: "image/*",
        addRemoveLinks: true,
        dictRemoveFile: '<img src="/image/icon/xbutton.png" alt="Delete" style="width: 20px; height: 20px;">',
        dictDefaultMessage: "파일을 여기에 드래그하거나 클릭하여 업로드하세요.",
        headers: {
            'X-CSRF-TOKEN': getCsrfToken() 
        },
        init: function() {
            this.on("addedfile", function(file) {
                if (dzMessage) {
                    dzMessage.style.setProperty('display', 'none', 'important');
                } else {
                    console.error('dzMessage element not found!');
                }
                
                if (this.getAcceptedFiles().length + this.getRejectedFiles().length > this.options.maxFiles) {
                    this.removeFile(file);
                    alert("최대 파일 갯수를 초과했습니다. 더 이상 파일을 업로드할 수 없습니다.");
                }
            });

            this.on("error", function(file, response) {
                try {
                    if (typeof response === 'string') {
                        response = JSON.parse(response);
                    }
                    console.error(`Error uploading file: ${response.message}`);
                } catch (e) {
                    console.error('Invalid JSON response from server:', response);
                }
            });

            this.on("success", function(file, response) {
                try {
                    if (typeof response === 'string') {
                        response = JSON.parse(response);
                    }
                    console.log(response.message);
                    file.serverName = response.serverName;
                } catch (e) {
                    console.error('Invalid JSON response from server:', response);
                }
            });

            this.on("removedfile", function(file) {
                if (this.files.length === 0 && dzMessage) {
                    dzMessage.style.setProperty('display', 'flex', 'important');
                }
                const filename = file.serverName || file.name;
                fetch(`/api/delete/${globalRandomKey}/${encodeURIComponent(filename)}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': getCsrfToken(),
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.message);
                    file.previewElement.remove();
                })
                .catch(error => {
                    console.error('Error deleting file:', error);
                });
            });

        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/generate-key', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            globalRandomKey = data.key;
            initializeDropzone(globalRandomKey);
        })
        .catch(error => console.error('Error generating random key:', error));
});

$(document).ready(function() {
    var maxChars = 1000;
    var minChars = 40;
    
    $('#summernote').summernote({
        lang: 'ko-KR',
        height: 300,
        placeholder: '- 강사님의 클래스를 최소 5줄 이상 자세하게 설명해 주세요' + '<br>' +
                     '- 복사하기 + 붙여넣기의 경우 내용이 올바르게 보이지 않을 수 있어요' + '<br>' +
                     '- 원하시면 이미지나 영상 링크를 추가하실 수 있어요' + '<br>' +
                     '<br>' +
                     '- 이미지는 드래그 해서 넣으시면 됩니다',
		
        callbacks: {
            onKeydown: function(e) {
                var charCount = getPlainText().length;
                if (charCount >= maxChars && e.keyCode !== 8 && e.keyCode !== 46) {
                    e.preventDefault();
                } else {
                    updateCharCount();
                }
            },
            onKeyup: function(e) {
                updateCharCount();
            },
            onPaste: function(e) {
                var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
                var pastedData = clipboardData.getData('Text');

                setTimeout(function() {
                    var content = getPlainText() + pastedData;
                    if (content.length > maxChars) {
                        $('#summernote').summernote('code', content.substring(0, maxChars));
                    }
                    updateCharCount();
                }, 10);
            },
            onImageUpload: function(files) {
                for (let i = 0; i < files.length; i++) {
                    uploadImage(files[i]);
                }
            }
        }
    });

    function getPlainText() {
        var content = $('#summernote').summernote('code');
        var tempElement = document.createElement('div');
        tempElement.innerHTML = content;
        return tempElement.innerText || tempElement.textContent || '';
    }

    function updateCharCount() {
        var charCount = getPlainText().length;
        $('#charCount2').text(charCount + "/" + maxChars);
        
        if (charCount >= minChars) {
            activateButtons();
        } else {
            deactivateButtons();
        }
    }

    function activateButtons() {
        $('#next_button4').css('pointer-events', 'auto');
        $('#next_button4').css('background-color', 'rgb(18,51,100)');
        $('#next-button-color4').css('color', 'white');
        $('#next-button-color4').css('font-weight', 'bold');
    }

    function deactivateButtons() {
        $('#next_button4').css('pointer-events', 'none');
        $('#next_button4').css('background-color', 'rgba(18, 51, 100, 0.05');
        $('#next-button-color4').css('color', 'darkgray');
        $('#next-button-color4').css('font-weight', '100');
    }

    updateCharCount();
    function uploadImage(file) {
        let data = new FormData();
        data.append('file', file);
        data.append('_csrf', getCsrfToken());

        $.ajax({
            url: `/api/uploadImage/${globalRandomKey}`,
            type: 'POST',
            data: data,
            contentType: false,
            processData: false,
            success: function(response) {
                var imageUrl = response.fileUrl;
                $('#summernote').summernote('insertImage', imageUrl);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Image upload error:', textStatus, errorThrown);
                alert('Failed to upload image.');
            }
        });
    }

    $('#saveButton').on('click', function() {
        let form = new FormData();

        form.append('title', $('#class_name_input_box').val());
        form.append('mainCName', $('#menuFirst').val());
        let selectedValue = '';

        $('.select-container2 .menu_choice').each(function() {
            let currentValue = $(this).val();
            if (currentValue && currentValue !== '2차 카테고리') {
                selectedValue = currentValue;
            }
        });

        selectedValue = selectedValue || '';

        console.log(window.curriculumData);
        form.append('subCName', selectedValue);
        form.append('addrDetail', $('#selectedAddressContainer2').val());
        form.append('difficulty', window.difficultyValue);
        console.log('Difficulty value in FormData:', window.difficultyValue);
        form.append('price', $('#final_price').val());
        form.append('timeTaken', window.hourValue);
        const maxSteps = 5;

        for (let i = 0; i < maxSteps; i++) {
            const data = window.curriculumData[i] || { description: "" }; 
            form.append(`step${i + 1}`, data.description);
        }
        form.append('selectedAddress', $('#selectedAddressContainer').val());
        form.append('hostIntro', $('#user_description').val());
        form.append('hostNick', $('#user_nickname').val());
        form.append('phonenumber', $('#phone_number').val());

        let obj = {};
        form.forEach((value, key) => {
            obj[key] = value;
        });

        for (let pair of form.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        let content = $('#summernote').summernote('code');
		content = content.replace(/http:\/\/localhost:9999\/api\/images\//g, '/api/images/');
        $.ajax({
            url: `/api/saveContent/${globalRandomKey}`, 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ content: content, form: obj }),
            headers: {
                'X-CSRF-TOKEN': getCsrfToken() 
            },
            success: function(response) {
                alert('클래스 등록에 성공했습니다!');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Content save error:', textStatus, errorThrown);
                alert('Failed to save content.');
            }
        });
    });
});
