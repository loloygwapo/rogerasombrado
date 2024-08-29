// Function to validate and restrict the input to numbers only
function validateNumberInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

let students = [];

document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let age = Number(document.getElementById('age').value);
    let hobbies = document.getElementById('hobbies').value;
    let isStudent = document.getElementById('student').checked;

    // Create a student object and add it to the students array
    let student = {
        name: name,
        age: age,
        hobbies: hobbies,
        isStudent: isStudent
    };
    students.push(student);

    // Update the summary section
    updateSummary();
    
    // Clear the form
    document.getElementById('infoForm').reset();
});

function updateSummary() {
    let summary = '';

    students.forEach((student, index) => {
        summary += `
            <div class="student-summary" data-index="${index}">
                <p>Name: ${student.name}</p>
                <p>Age: ${student.age}</p>
                <p>Hobbies: ${student.hobbies}</p>
                <p>Student: ${student.isStudent ? 'Yes' : 'No'}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    });

    document.getElementById('summary').innerHTML = summary;

    // Add event listeners for Edit and Delete buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            let index = this.parentElement.getAttribute('data-index');
            editStudent(index);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            let index = this.parentElement.getAttribute('data-index');
            deleteStudent(index);
        });
    });
}

function editStudent(index) {
    let student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('hobbies').value = student.hobbies;
    document.getElementById('student').checked = student.isStudent;

    // Remove the student from the list so it can be updated
    students.splice(index, 1);
    updateSummary();
}

function deleteStudent(index) {
    students.splice(index, 1);
    updateSummary();
}
