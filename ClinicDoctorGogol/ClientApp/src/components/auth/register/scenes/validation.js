function validateFields(items) {

    const { firstName, lastName, email, phone, password, confirmPassword } = items;
    let errors = {};
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const regex_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$/;
    const regex_phone = /^(?=\+?([0-9]{2})\s\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{19}$/;


    if (firstName.trim() === "") errors.firstName = "Введіть ім'я";
    
    if (lastName.trim() === "") errors.lastName = "Введіть прізвище";
    
    if (!regex_email.test(email.trim())) errors.email = "Не вірна електронна пошта!";

    if (!regex_phone.test(phone.trim())) errors.phone = "Не правильний формат телефону +xx (xxx) xxx xx xx";

    if (!regex_password.test(password.trim())) errors.password = "Пароль повинен мати мінімум 6 символів, нижній і верхній регістр, та цифри!";
        
    if (confirmPassword !== password) errors.confirmPassword = "Повтор паролю не співпадає!";
    return errors;
}

export { validateFields };