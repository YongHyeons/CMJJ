Dropzone.autoDiscover = false;


const globalRandomKey = document.getElementById('imagekey-temp').getAttribute('data-value');
const datePath = document.getElementById('regdate-temp').getAttribute('data-value');
let isImageChanged = false; 
let initialImages = []; 

const [year, month, day] = datePath.split('-');


const preview = document.getElementById('preview');
const filePreview = document.getElementById('filePreview');
const needToHide = document.getElementById('needToHide');

function getCsrfToken() {
    const token = document.querySelector('meta[name="csrf-tokentest"]').getAttribute('content');
    if (!token) {
        console.error('CSRF token not found');
    }
    return token;
}

function initializeDropzone(randomKey, datePath) {
    const dzMessage = document.querySelector('.dropzone .dz-message');
    const myDropzone = new Dropzone("#dropzone", {
        url: `/api/modzoneupload/${randomKey}?year=${year}&month=${month}&day=${day}`,
        method: 'POST',
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
            const _this = this;

            fetch(`/api/modfiles/${year}/${month}/${day}/${randomKey}`)
                .then(response => {
                    if (!response.ok) {
                        console.error('Network response was not ok:', response.status, response.statusText);
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(files => {
                    initialFiles = files.map(file => file.name);
                    files.forEach(file => {
                        const mockFile = { name: file.name, size: 12345 };
                        _this.emit("addedfile", mockFile);
                        _this.emit("thumbnail", mockFile, `/api/modfiles/${year}/${month}/${day}/${randomKey}/${encodeURIComponent(file.name)}`);
                        _this.emit("complete", mockFile);
                        _this.files.push(mockFile);
                        mockFile.serverName = file.name;
                    });
                })
                .catch(error => {
                    console.error('Error fetching files:', error);
                });

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

            this.on("removedfile", function(file) {
                if (this.files.length === 0 && dzMessage) {
                    dzMessage.style.setProperty('display', 'flex', 'important');
                }
            });
        }
    });

    $('#modificationButton').on('click', function() {
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
		
        form.append('subCName', selectedValue);
        form.append('addrDetail', $('#selectedAddressContainer2').val());
        form.append('difficulty', window.difficultyValue_m);
        form.append('price', $('#final_price').val());
        form.append('timeTaken', window.hourValue_m);

        const maxSteps = 5;

        for (let i = 0; i < maxSteps; i++) {
            const data = window.curriculumData_m[i] || { description: "" }; 
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

		if (selectedFile) {
	        $.ajax({
	            url: `/api/moddeleteMainFiles/${globalRandomKey}`,
	            type: 'POST',
	            contentType: 'application/json',
	            data: JSON.stringify({ prefix: 'main', year, month, day }),
	            headers: {
	                'X-CSRF-TOKEN': getCsrfToken()
	            },
	            success: function(response) {
	                console.log('Main files deleted successfully:', response);
	
	                
	                if (selectedFile) {
	                    let formData = new FormData();
	                    formData.append('file', selectedFile);
	                    formData.append('year', year);
	                    formData.append('month', month);
	                    formData.append('day', day);
	
	                    $.ajax({
	                        url: `/api/modmainImageUpload/${globalRandomKey}`,
	                        type: 'POST',
	                        data: formData,
	                        processData: false,
	                        contentType: false,
	                        success: function(response) {
	                            console.log('Main image uploaded successfully:', response);
	                        },
	                        error: function(xhr, status, error) {
	                            console.error('Main image upload failed:', error);
	                        }
	                    });
	                }
	            },
	            error: function(xhr, status, error) {
	                console.error('Error deleting main files:', error);
	            }
	        });
		}
        const remainingFiles = myDropzone.files.map(file => file.serverName || file.name);

        const deletedFiles = initialFiles.filter(file => !remainingFiles.includes(file));

		const dataToSend = {
		    deletedFiles: deletedFiles,
		    year: year,
		    month: month,
		    day: day
		};

		$.ajax({
		    url: `/api/moddeleteFiles/${globalRandomKey}`,
		    type: 'POST',
		    contentType: 'application/json',
		    data: JSON.stringify(dataToSend),
		    headers: {
		        'X-CSRF-TOKEN': getCsrfToken()
		    },
		    success: function(response) {
		        console.log('Files deleted successfully:', response);
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.error('Error deleting files:', textStatus, errorThrown);
		    }
		});
		

		if (isImageChanged) {
		    $.ajax({
		        url: `/api/deleteOldImages/${globalRandomKey}`,
		        type: 'POST',
		        contentType: 'application/json',
		        data: JSON.stringify({ images: initialImages.map(image => image.split('/').pop()) }),
		        headers: {
		            'X-CSRF-TOKEN': getCsrfToken()
		        },
		        success: function(response) {
		            console.log('Old images deleted successfully:', response);
		        },
		        error: function(xhr, status, error) {
		            console.error('Error deleting old images:', error);
		        }
		    });
		}

		
        $.ajax({
            url: `/api/modsaveContent/${globalRandomKey}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ content: $('#summernote').summernote('code'), form: obj}),
            headers: {
                'X-CSRF-TOKEN': getCsrfToken()
            },
            success: function(response) {
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Content save error:', textStatus, errorThrown);
                alert('저장 실패');
            }
        });
    });

    fetch(`/api/modmainImage/${globalRandomKey}?year=${year}&month=${month}&day=${day}`)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            filePreview.src = url;
            preview.style.display = 'block';

            if (needToHide) {
                needToHide.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error loading main image:', error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDropzone(globalRandomKey, datePath);
});

$(document).ready(function() {
    var maxChars = 1000; 
    var minChars = 40;    

    $('#summernote').summernote({
        lang: 'ko-KR',
        height: 300,
        placeholder: '- 강사님의 클래스를 최소 5줄 이상 자세하게 설명해 주세요',
		toolbar: [
		            ['style', ['bold', 'italic', 'underline', 'clear']],
		            ['font', ['strikethrough', 'superscript', 'subscript']],
		            ['fontsize', ['fontsize']],
		            ['color', ['color']],
		            ['para', ['ul', 'ol', 'paragraph']],
		            ['height', ['height']],
		        ],
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
				isImageChanged = true;
                for (let i = 0; i < files.length; i++) {
                    uploadImage(files[i]);
                }
            }
        }
    });

	fetch(`/api/getInitialContent/${globalRandomKey}`)
	    .then(response => response.json())
	    .then(data => {
	        $('#summernote').summernote('code', data.content);
	        initialImages = data.images || [];
	    })
	    .catch(error => {
	        console.error('Error loading initial content:', error);
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
    }

    function uploadImage(file) {
        let data = new FormData(); 
        data.append('file', file);
        data.append('_csrf', getCsrfToken());

        $.ajax({
            url: `/api/moduploadImage/${globalRandomKey}`,
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
                alert('업로드 실패');
            }
        });
    }
});
