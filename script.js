document.addEventListener('DOMContentLoaded', function() {
    // Fetch JSON data
    fetch('dragqueens.json')
        .then(response => response.json())
        .then(data => {
            // Initialize Sets and Map
            const dragQueenNames = new Set();
            const dragQueenAges = new Map();

            const allDragQueensData = data.dragQueens;
            const allDragQueens = allDragQueensData.map(dragQueenData => new DragQueen(
                dragQueenData.name,
                dragQueenData.realName,
                dragQueenData.age,
                dragQueenData.city,
                dragQueenData.state,
                dragQueenData.country,
                dragQueenData.famousFor,
                dragQueenData.image,
                dragQueenData.bio,
                dragQueenData.quote,
                dragQueenData.seasons,
                dragQueenData.trivia
            ));

            // Populate Sets and Map
            allDragQueens.forEach(dragQueen => {
                dragQueenNames.add(dragQueen.name);
                dragQueenAges.set(dragQueen.name, dragQueen.age);
            });

            // Populate the dropdown menu with drag queen names
            const searchByNameDropdown = document.getElementById('searchByNameDropdown');
            dragQueenNames.forEach(name => {
                const option = new Option(name, name);
                searchByNameDropdown.appendChild(option);
            });

            // Function to filter drag queens based on search criteria
            function filterDragQueens() {
                const selectedNameDropdown = document.getElementById('searchByNameDropdown').value;
                const selectedSeason = document.getElementById('searchBySeason').value;
                const selectedState = document.getElementById('searchByState').value;
                const searchByNameInput = document.getElementById('searchByName').value.toLowerCase();

                const filteredDragQueens = allDragQueens.filter(dragQueen => {
                    const dragQueenName = dragQueen.name.toLowerCase();
                    if (selectedNameDropdown && dragQueenName !== selectedNameDropdown.toLowerCase()) {
                        return false;
                    }
                    if (selectedSeason && !dragQueen.seasons.includes(selectedSeason)) {
                        return false;
                    }
                    if (selectedState && dragQueen.state !== selectedState) {
                        return false;
                    }
                    if (searchByNameInput && !dragQueenName.includes(searchByNameInput)) {
                        return false;
                    }
                    return true;
                });

                // Sort filtered drag queens by name
                filteredDragQueens.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });

                // Clear the container
                const container = document.getElementById('dragQueensContainer');
                container.innerHTML = '';

                // Populate container with filtered and sorted drag queens
                if (filteredDragQueens.length === 0) {
                    const noResultsMessage = document.createElement('p');
                    noResultsMessage.textContent = 'No queens in sight, darling! Time to serve up a fresh search.';
                    container.appendChild(noResultsMessage);
                } else {
                    filteredDragQueens.forEach(dragQueen => {
                        const dragQueenElement = dragQueen.createDragQueenElement();
                        container.appendChild(dragQueenElement);

                        // Add event listener to each drag queen element
                        dragQueenElement.addEventListener('click', () => {
                            // Simulate selection of drag queen in dropdown
                            document.getElementById('searchByNameDropdown').value = dragQueen.name;
                            // Trigger filter
                            filterDragQueens();
                        });
                    });

                    // If there's only one drag queen displayed, add the bio element to the right
                    if (filteredDragQueens.length === 1) {
                        const dragQueenInfoElement = container.querySelector('.drag-queen-info');
                    
                        const bioContainer = document.createElement('div');
                        bioContainer.classList.add('bio-container');
                    
                        const bioElement = document.createElement('p');
                        bioElement.innerHTML = '<strong>Bio:</strong> ' + filteredDragQueens[0].bio;
                    
                        bioContainer.appendChild(bioElement);
                    
                        // Trivia element
                        const triviaElement = document.createElement('p');
                        triviaElement.innerHTML = '<strong>Trivia:</strong> ' + filteredDragQueens[0].trivia;
                        bioContainer.appendChild(triviaElement);
                    
                        container.appendChild(bioContainer);
                    
                        // Apply styles to position the bio container to the right
                        bioContainer.style.float = 'right';
                    }
                }

                // Count occurrences of drag queen names from the filtered drag queens
                const dragQueenOccurrences = countDragQueenOccurrences(filteredDragQueens);

                // Calculate the total count of all drag queens
                const totalCount = Array.from(dragQueenOccurrences.values()).reduce((acc, count) => acc + count, 0);

                // Example usage: display the total count of all drag queens on the page
                const totalDragQueenCountElement = document.getElementById('totalDragQueenCount');
                totalDragQueenCountElement.innerHTML = `<strong>Total queens found:</strong> ${totalCount}`;
            }

            // Event listener for clicking on the logo to show all queens
            document.getElementById('logo').addEventListener('click', function() {
                // Reset dropdowns and input fields
                document.getElementById('searchByNameDropdown').value = '';
                document.getElementById('searchBySeason').value = '';
                document.getElementById('searchByState').value = '';
                document.getElementById('searchByName').value = '';

                // Trigger filter to show all queens
                filterDragQueens();
            });

            // Event listeners for dropdown menus and input field
            document.getElementById('searchByNameDropdown').addEventListener('change', filterDragQueens);
            document.getElementById('searchBySeason').addEventListener('change', filterDragQueens);
            document.getElementById('searchByState').addEventListener('change', filterDragQueens);
            document.getElementById('searchByName').addEventListener('input', filterDragQueens);

            // Populate the dropdowns for search options
            const seasonsList = document.getElementById('searchBySeason');
            const statesList = document.getElementById('searchByState');

            const seasons = new Set();
            const states = new Set();

            allDragQueens.forEach(dragQueen => {
                dragQueen.seasons.forEach(season => seasons.add(season));
                states.add(dragQueen.state);
            });

            seasons.forEach(season => {
                const option = new Option(season, season);
                seasonsList.appendChild(option);
            });

            states.forEach(state => {
                const option = new Option(state, state);
                statesList.appendChild(option);
            });

            // Trigger change event to show all drag queens initially
            filterDragQueens();
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Function to count occurrences of each drag queen's name from the filtered drag queens
function countDragQueenOccurrences(filteredDragQueens) {
    const dragQueenNameCount = new Map();

    // Count occurrences of each drag queen's name
    filteredDragQueens.forEach(dragQueen => {
        const name = dragQueen.name;
        dragQueenNameCount.set(name, (dragQueenNameCount.get(name) || 0) + 1);
    });

    return dragQueenNameCount;
}
