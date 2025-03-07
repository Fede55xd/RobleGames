document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFile = document.getElementById('selectFile');
    const preview = document.getElementById('preview');
    const originalImage = document.getElementById('originalImage');
    const processedImage = document.getElementById('processedImage');
    const downloadBtn = document.getElementById('downloadBtn');
    const loader = document.getElementById('loader');

    // API Key para Remove.bg
    const API_KEY = 'G1a4kfCTNn4viJUsmfcdp1jH';

    // Prevenir comportamiento por defecto del drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Resaltar zona de drop
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Manejar el drop
    dropZone.addEventListener('drop', handleDrop, false);

    // Manejar selección de archivo
    selectFile.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', handleFileSelect);

    // Manejar descarga
    downloadBtn.addEventListener('click', handleDownload);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropZone.classList.add('drag-over');
    }

    function unhighlight() {
        dropZone.classList.remove('drag-over');
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length === 0) return;

        const file = files[0];
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecciona un archivo de imagen.');
            return;
        }

        // Mostrar imagen original
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
            preview.classList.remove('hidden');
            processImage(file);
        };
        reader.readAsDataURL(file);
    }

    async function processImage(file) {
        loader.classList.remove('hidden');

        const formData = new FormData();
        formData.append('image_file', file);

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': API_KEY
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al procesar la imagen');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            processedImage.src = url;
            downloadBtn.classList.remove('hidden');

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar la imagen. Por favor, intenta de nuevo.');
        } finally {
            loader.classList.add('hidden');
        }
    }

    function handleDownload() {
        const link = document.createElement('a');
        link.href = processedImage.src;
        link.download = 'imagen-sin-fondo.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});