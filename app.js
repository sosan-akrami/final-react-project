const universitySelect = document.getElementById("university");
const departmentSelect = document.getElementById("department");
const specializationSelect = document.getElementById("specialization");
const studentsTable = document.getElementById("studentsTable");
const studentsBody = document.getElementById("studentsBody");

const baseUrl = "http://localhost:3000/api";

// Fetch all universities
async function fetchUniversities() {
    try {
        const response = await fetch(baseUrl + '/universities');
        const universities = await response.json();
        populateUniversities(universities);
    } catch (error) {
        console.error('Error fetching universities:', error);
    }
}

// Populate the university dropdown
function populateUniversities(universities) {
    universitySelect.innerHTML = '<option value="">Select University</option>';
    universities.forEach(uni => {
        const option = document.createElement("option");
        option.value = uni.id;
        option.textContent = uni.name;
        universitySelect.appendChild(option);
    });
}

// Fetch departments for the selected university
async function fetchDepartments(universityId) {
    try {
        const response = await fetch(`${baseUrl}/universities/${universityId}/departments`);
        const departments = await response.json();
        populateDepartments(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
}

// Populate the department dropdown
function populateDepartments(departments) {
    departmentSelect.innerHTML = '<option value="">Select Department</option>';
    departments.forEach(dept => {
        const option = document.createElement("option");
        option.value = dept.id;
        option.textContent = dept.name;
        departmentSelect.appendChild(option);
    });
    departmentSelect.disabled = false;
}

// Fetch specializations for the selected department
async function fetchSpecializations(departmentId) {
    try {
        const response = await fetch(`${baseUrl}/departments/${departmentId}/specializations`);
        const specializations = await response.json();
        populateSpecializations(specializations);
    } catch (error) {
        console.error('Error fetching specializations:', error);
    }
}

// Populate the specialization dropdown
function populateSpecializations(specializations) {
    specializationSelect.innerHTML = '<option value="">Select Specialization</option>';
    specializations.forEach(spec => {
        const option = document.createElement("option");
        option.value = spec.id;
        option.textContent = spec.name;
        specializationSelect.appendChild(option);
    });
    specializationSelect.disabled = false;
}

// Fetch students for the selected specialization
async function fetchStudents(specializationId) {
    try {
        const response = await fetch(`${baseUrl}/specializations/${specializationId}/students`);
        const students = await response.json();
        populateStudents(students);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// Populate the students table
function populateStudents(students) {
    studentsBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            
            <td>${student.name}</td>
            <td>${student.lastName}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
        `;
        studentsBody.appendChild(row);
    });
    studentsTable.style.display = students.length ? 'table' : 'none';
}

// Event Listeners
universitySelect.addEventListener("change", function () {
    const universityId = universitySelect.value;
    if (universityId) {
        fetchDepartments(universityId);
    }
    departmentSelect.innerHTML = '';
    specializationSelect.innerHTML = '';
    studentsBody.innerHTML = '';
    departmentSelect.disabled = true;
    specializationSelect.disabled = true;
});

departmentSelect.addEventListener("change", function () {
    const departmentId = departmentSelect.value;
    if (departmentId) {
        fetchSpecializations(departmentId);
    }
    specializationSelect.innerHTML = '';
    studentsBody.innerHTML = '';
    specializationSelect.disabled = true;
});

specializationSelect.addEventListener("change", function () {
    const specializationId = specializationSelect.value;
    if (specializationId) {
        fetchStudents(specializationId);
    }
    studentsBody.innerHTML = '';
});

// Initialize data on page load
fetchUniversities();
