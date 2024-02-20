function handleFormSubmit(event) {
    event.preventDefault(); 

    // Get values from the form
    const expenseAmount = event.target.expenseAmount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    // Create an expense object
    const expenseDetails = {
        expenseAmount: expenseAmount,
        description: description,
        category: category,
    };

    // Store the expense object in local storage
    localStorage.setItem(expenseDetails.description, JSON.stringify(expenseDetails));
  
    showExpenseOnScreen(expenseDetails);
}

function showExpenseOnScreen(expenseDetails) {
    const parentElem = document.getElementById('userDetails');
    const childElem = document.createElement('li');
    
    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Expense';
    deleteButton.addEventListener('click', function () {
        // Remove expense details from the screen
        parentElem.removeChild(childElem);
        // Remove expense details from local storage
        localStorage.removeItem(expenseDetails.description);
    });

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Expense';
    editButton.addEventListener('click', function () {
        // Populate form fields with existing values for editing
        document.getElementById('expenseAmount').value = expenseDetails.expenseAmount;
        document.getElementById('description').value = expenseDetails.description;
        document.getElementById('category').value = expenseDetails.category;
        // Remove expense details from the screen
        parentElem.removeChild(childElem);
        // Remove expense details from local storage
        localStorage.removeItem(expenseDetails.description);
    });

    // Display expense details, delete button, and edit button
    childElem.textContent = expenseDetails.expenseAmount + ' - ' + expenseDetails.description + ' - ' + expenseDetails.category;
    childElem.appendChild(deleteButton);
    childElem.appendChild(editButton);
    parentElem.appendChild(childElem);
}

module.exports = handleFormSubmit;