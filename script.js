document.addEventListener('DOMContentLoaded', function() {
    const tagsInput = document.getElementById('tags-input');
    const tagsContainer = document.getElementById('tags-container');

    if (tagsInput && tagsContainer) {
        tagsInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && this.value.trim() !== '') {
                event.preventDefault();

                const tagText = this.value.trim();
                this.value = '';

                const existingTag = Array.from(tagsContainer.querySelectorAll('.tag-chip'))
                    .find(chip => chip.textContent.startsWith(tagText));

                if (!existingTag) {
                    const tagChip = document.createElement('span');
                    tagChip.classList.add('tag-chip');
                    tagChip.textContent = tagText;

                    const hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.name = 'new_tags';
                    hiddenInput.value = tagText;

                    const deleteButton = document.createElement('span');
                    deleteButton.classList.add('delete-tag');
                    deleteButton.textContent = '✕';

                    tagChip.appendChild(hiddenInput);
                    tagChip.appendChild(deleteButton);
                    tagsContainer.appendChild(tagChip);
                }
            }
        });

        tagsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-tag')) {
                const tagChip = event.target.parentNode;
                const hiddenTagIdInput = tagChip.querySelector('input[name="tags"]'); // Find the hidden tag ID input
                const tagIdToRemove = hiddenTagIdInput ? hiddenTagIdInput.value : null;

                // If it's an existing tag (has a hidden input with name="tags"), mark it for removal
                if (tagIdToRemove) {
                    const removeInput = document.createElement('input');
                    removeInput.type = 'hidden';
                    removeInput.name = 'removed_tags';
                    removeInput.value = tagIdToRemove;
                    tagsContainer.appendChild(removeInput); // Append to container, not the chip itself
                }

                tagChip.remove(); // Remove the chip from the display
            }
        });
    }
});