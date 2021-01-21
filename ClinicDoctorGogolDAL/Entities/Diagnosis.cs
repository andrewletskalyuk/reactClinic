using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ClinicDoctorGogolDAL.Entities
{
    [Table("Diagnosis")] //діагнози
    public class Diagnosis
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } //назва діагнозу
        //[Required]
        public string Description { get; set; } //опис для діагнозу
        public List<PacientDiagnosis> PacientDiagnoses { get; set; }// = new List<PacientDiagnosis>();
    }
}
