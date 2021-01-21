using System;
using System.Collections.Generic;
using System.Text;
using ClinicDoctorGogolDAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ClinicDoctorGogolDAL
{
    public class EFContext : IdentityDbContext<DbUser, DbRole, long, IdentityUserClaim<long>,
       DbUserRole, IdentityUserLogin<long>,
       IdentityRoleClaim<long>, IdentityUserToken<long>> 
    {
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Diagnosis> Diagnoses { get; set; }
        public DbSet<Pacient> Pacients { get; set; }
        public DbSet<PacientDiagnosis> PacientDiagnoses { get; set; }

        public EFContext(DbContextOptions<EFContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<DbUserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            //вяжемо багато до багатьох
            builder.Entity<PacientDiagnosis>()
            .HasKey(pd => new { pd.DiagnosisId, pd.PacientId });

            builder.Entity<PacientDiagnosis>()
                .HasOne(pd => pd.Pacient)
                .WithMany(p => p.PacientDiagnoses)
                .HasForeignKey(pd => pd.PacientId);

            builder.Entity<PacientDiagnosis>()
                .HasOne(pd => pd.Diagnosis)
                .WithMany(p => p.PacientDiagnoses)
                .HasForeignKey(pd => pd.DiagnosisId);
        }
    }
}
