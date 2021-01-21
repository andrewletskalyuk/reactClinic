using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ClinicDoctorGogolDAL.Entities
{
    public class DbUser : IdentityUser<long>
    {

        [Range(0, 130, ErrorMessage = "Невірні дані")]
        public int Age { get; set; }

        [StringLength(255)]
        public string Phone { get; set; }

        [StringLength(255)]
        public string Description { get; set; }

        public virtual ICollection<DbUserRole> UserRoles { get; set; }
    }
}
