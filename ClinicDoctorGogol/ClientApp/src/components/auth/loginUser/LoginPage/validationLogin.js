function validateFieldsLogin(items) {
    const { email} = items;
    let errors = {};
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regex_email.test(email.trim())) errors.email = "Не вірна електронна пошта!";
    return errors;
}

export { validateFieldsLogin };