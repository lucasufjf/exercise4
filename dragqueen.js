class DragQueen {
    constructor(name, realName, age, city, state, country, famousFor, image, bio, quote, seasons, trivia) {
        this.name = name;
        this.realName = realName;
        this.age = age;
        this.city = city;
        this.state = state;
        this.country = country;
        this.famousFor = famousFor;
        this.image = image;
        this.bio = bio;
        this.quote = quote;
        this.seasons = seasons;
        this.trivia = trivia;
    }

    // Method to create HTML element for a drag queen
    createDragQueenElement(filterDragQueens) { // Pass filterDragQueens as a parameter
        const dragQueenElement = document.createElement('div');
        dragQueenElement.classList.add('drag-queen');

        const imageElement = document.createElement('img');
        imageElement.src = this.image;
        imageElement.alt = this.name;

        const dragQueenInfoElement = document.createElement('div');
        dragQueenInfoElement.classList.add('drag-queen-info');

        const nameElement = document.createElement('h2');
        nameElement.textContent = this.name;
        const realNameElement = document.createElement('p');
        realNameElement.innerHTML = '<strong>Real Name:</strong> ' + this.realName;
        const ageElement = document.createElement('p');
        ageElement.innerHTML = '<strong>Age:</strong> ' + this.age;
        const birthplaceElement = document.createElement('p');
        birthplaceElement.innerHTML = '<strong>Birthplace:</strong> ' + this.city + ', ' + this.state + ', ' + this.country;
        const famousForElement = document.createElement('p');
        famousForElement.innerHTML = '<strong>Famous For:</strong> ' + this.famousFor;
        const quoteElement = document.createElement('p');
        quoteElement.innerHTML = '<strong>Quote:</strong> <em>"' + this.quote + '"</em>';

        dragQueenInfoElement.appendChild(nameElement);
        dragQueenInfoElement.appendChild(realNameElement);
        dragQueenInfoElement.appendChild(ageElement);
        dragQueenInfoElement.appendChild(birthplaceElement);
        dragQueenInfoElement.appendChild(famousForElement);
        dragQueenInfoElement.appendChild(quoteElement);

        dragQueenElement.appendChild(imageElement);
        dragQueenElement.appendChild(dragQueenInfoElement);

        // Event listener for clicking on drag queen element
        dragQueenElement.addEventListener('click', () => {
            // Simulate selection of drag queen in dropdown
            document.getElementById('searchByNameDropdown').value = this.name;
            // Trigger filter
            filterDragQueens(); // Call the filterDragQueens function passed as parameter
        });

        return dragQueenElement;
    }
}