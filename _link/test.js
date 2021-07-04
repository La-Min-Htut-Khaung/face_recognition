let { PythonShell } = require('python-shell');
const Swal = require('sweetalert2');

document.getElementById('photo').addEventListener('click', photo);
document.getElementById('video').addEventListener('click', video);
document.getElementById('train').addEventListener('click', train);
document.getElementById('embedded').addEventListener('click', embedded);
document.getElementById('add').addEventListener('click', add_people);

var options = {
    mode: "text",
    scriptPath: './_engine/'
    // pythonPath: ''
};

function photo() {
    var test = new PythonShell('recognize.py', options);
    test.on('message', function(message) {
        console.log(message);
    });
}

function video() {
    Swal.fire({
        title: '<strong>Start Video</strong>',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
    })
    var test = new PythonShell('recognize_video.py', options);
    test.on('message', function(message) {
        console.log(message);
    });
}

function train() {
    Swal.fire({
        title: '<strong>Processings . . . </strong>',
        icon: 'success',
        showConfirmButton: false,
    })
    var test = new PythonShell('train_model.py', options);
    test.on('message', function(message) {
        console.log(message);
        Swal.fire({
            title: '<strong>Successfully Done Train Model Process</strong>',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        })
    });

}

function embedded() {
    Swal.fire({
        title: '<strong>Processings . . . </strong>',
        icon: 'success',
        showConfirmButton: false,
    })
    var test = new PythonShell('extract_embeddings.py', options);
    test.on('message', function(message) {
        console.log(message);
        Swal.fire({
            title: '<strong>Successfully Done Extract Embeddings Process</strong>',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        })
    });
}

function add_people() {
    Swal.mixin({
        input: 'text',
        confirmButtonColor: 'rgb(4, 51, 70)',
        confirmButtonText: 'Go',
        showCancelButton: true,
        cancelButtonColor: '#d33'
    }).queue([{
        title: 'Enter your name:'
    }]).then((result) => {
        if (result.value) {
            var fs = require('fs');
            try {
                fs.mkdirSync('./_engine/dataset/' + result.value);
                console.log('Directory created');
                Swal.fire({
                    title: 'Successfully added name: ' + result.value,
                    icon: 'success',
                    text: 'Processing . . .',
                    showConfirmButton: false,
                })
                var options = {
                    scriptPath: '_engine/',
                    pythonPath: 'D:/Python/Python36/python.exe',
                    args: [result.value]
                }

                var test = new PythonShell('upload_images.py', options);
                test.on('message', function(message) {
                    console.log(message);
                    Swal.fire({
                        title: '<strong>Successfully Done Load Image Process</strong>',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                });

            } catch (err) {
                if (err.code == 'EEXIST') {
                    console.log('the directory exists');
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        confirmButtonColor: 'rgb(4, 51, 70)',
                    })
                } else {
                    console.log(err);
                }
            }

        }
    })
}