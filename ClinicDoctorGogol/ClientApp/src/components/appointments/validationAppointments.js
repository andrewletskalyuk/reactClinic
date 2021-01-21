function validateFieldsAppointments(items) {

    const { fullname, email, phone } = items;
    let errors = {};
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const regex_phone = /^(?=\+?([0-9]{2})\s\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{19}$/;

    if (fullname.trim() === "") errors.fullname = "Введіть ПІБ";
    
    if (!regex_email.test(email.trim())) errors.email = "Не вірна електронна пошта!";

    if (!regex_phone.test(phone.trim())) errors.phone = "Не правильний формат телефону +xx (xxx) xxx xx xx";

    return errors;
}

export { validateFieldsAppointments };