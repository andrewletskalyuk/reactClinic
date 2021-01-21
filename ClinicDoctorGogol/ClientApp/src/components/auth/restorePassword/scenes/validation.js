function validateFields(items) {

    const { email } = items;
    const errors = {};
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!regex_email.test(email.trim())) errors.email = "Не вырний формат електронної пошти!!!";
    return errors;
}

export { validateFields };