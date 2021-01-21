using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClinicDoctorGogolDAL.Entities
{
    public class Complaint
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } //назва скарги

        public int PacientId { get; set; }
    }
}
