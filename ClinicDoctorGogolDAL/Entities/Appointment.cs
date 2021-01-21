using ClinicDoctorGogolDAL.Validations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClinicDoctorGogolDAL.Entities
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Введіть ваше ім'я")]
        [StringLength(100, ErrorMessage = "Введіть корректні дані", MinimumLength = 3)]
        [Display(Name = "Ваше ім'я")]
        public string Name { get; set; } //ім"я

        [Required(ErrorMessage = "Введіть корректні дані")]
        [Display(Name = "Формат даних 0771112233 без пробілів")]
        //[DataType(DataType.PhoneNumber)]
        //[RegularExpression(@"^\+?3?8?(0[5-9][0-9]\d{7})$", ErrorMessage = "Не корректно введені дані")]
        [RegularExpression(@"^(0[5-9][0-9]\d{7})$")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Обов'язкове поле для заповнення")]
        [EmailAddress(ErrorMessage = "Некоректні дані введено!")]
        [Display(Name = "Електронна адреса")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Обов'язкове поле для заповнення")]
        [StringLength(100, ErrorMessage = "Введіть корректні дані", MinimumLength = 3)]
        [Display(Name = "На що скаржитесь?")]
        public string Message { get; set; } //повідомлення

        //[Required]
        //[DataType(DataType.Date, ErrorMessage = "Виберіть дату")]
        [Display(Name = "На яку дату хотіли б записатись?")]
        [DateLessThanOrEqualToToday]
        public DateTime DateWhenAdded { get; set; }

    }
}
