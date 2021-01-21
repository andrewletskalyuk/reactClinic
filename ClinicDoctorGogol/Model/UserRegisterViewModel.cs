using System.ComponentModel.DataAnnotations;

namespace ClinicDoctorGogol.Model
{
    public class UserModel
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }

    public class UserLoginViewModel
    {
        [Required(ErrorMessage = "Заповніть будь ласка дані!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Password { get; set; }
    }

    public class UserRegisterViewModel
    {
        [Required(ErrorMessage = "Введіть ім'я!")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Введіть прізвище!")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Обов'язкове поле для заповнення!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Введіть будь ласка номер телефону!")]
        [RegularExpression(@"^(?=\+?([0-9]{2})\s\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{19}$", ErrorMessage = "Не правильний формат номера телефону!")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Заповніть поле з паролем!")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,24}$", ErrorMessage = "Пароль повинен мати мінімум 6 символів, нижній і верхній регістр, та цифри!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Поле не може бути пустим!")]
        [Compare("Password", ErrorMessage = "Паролі не співпадають!")]
        public string ConfirmPassword { get; set; }
    }
    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
    /// <summary>
    /// Інформація про одного користувача
    /// </summary>
    public class UserItemViewModel
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public bool EmailConfirmed { get; set; }
        public int Age { get; set; }
    }

    /// <summary>
    /// Детальна інформація про користувача
    /// </summary>
    public class UserDetailViewModel
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool EmailConfirmed { get; set; }
        public int Age { get; set; }
    }

    /// <summary>
    /// Редагувати користувача
    /// </summary>
    public class UserEditViewModel
    {
        public long Id { get; set; }
        public string Phone { get; set; }
        /// <summary>
        /// Якщо користувач змінює фото
        /// </summary>
        public string ImageBase64 { get; set; }
        public int Age { get; set; }
    }


}
