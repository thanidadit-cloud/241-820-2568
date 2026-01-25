function submitData() {
    
    let firstName = document.querySelector('input[name="firstname"]').value;
    let lastName = document.querySelector('input[name="lastname"]').value;
    let age = document.querySelector('input[name="age"]').value;

  
    let genderDom = document.querySelector('input[name="gender"]:checked');
    
    
    let interestDom = document.querySelectorAll('input[name="interest"]:checked');
    let interests = [];
    interestDom.forEach(item => interests.push(item.value));

    let description = document.querySelector('textarea[name="description"]').value;

    let uerData = {
        firstName: firstName,
        lastName: lastName,
        age: age, 
        gender: genderDom ? genderDom.value : "ไม่ระบุ",
        interests: interests,
        description: description
    };

    console.log('submitted Data:', uerData);
}