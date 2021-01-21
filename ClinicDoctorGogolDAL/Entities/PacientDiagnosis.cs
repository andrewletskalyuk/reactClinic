using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace ClinicDoctorGogolDAL.Entities
{
    public class PacientDiagnosis
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Diagnosis")]
        public int DiagnosisId { get; set; }

        [JsonIgnore]
        public virtual Diagnosis Diagnosis { get; set; }

        [ForeignKey("Pacient")]
        public int PacientId { get; set; }

        [JsonIgnore]
        public virtual Pacient Pacient { get; set; }
    }
}
