let draggedElement = null;

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('block')) {
            draggedElement = e.target;
            e.target.style.opacity = '0.5';
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('block')) {
            e.target.style.opacity = '1';
        }
    });

    document.addEventListener('dragover', (e) => {
        e.preventDefault(); 
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        const dropZone = e.target.closest('[data-container="true"]');
        
        if (dropZone && draggedElement) {
            if (draggedElement.parentElement.id === 'toolbox') {
                const clone = draggedElement.cloneNode(true);
                clone.style.opacity = '1';
                dropZone.appendChild(clone);
            } else {
                dropZone.appendChild(draggedElement);
            }
        }
    });
