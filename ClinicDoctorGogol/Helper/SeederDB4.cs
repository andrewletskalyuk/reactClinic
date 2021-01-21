using ClinicDoctorGogol.Constants;
using ClinicDoctorGogolDAL;
using ClinicDoctorGogolDAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicDoctorGogol.Helper
{
    public class SeederDB4
    {
        public static void SeedData(UserManager<DbUser> userManager,
                   RoleManager<DbRole> roleManager)
        {
            var adminRoleName = "Admin";
            var clientRoleName = "Client";

            var roleResult = roleManager.FindByNameAsync(adminRoleName).Result;
            if (roleResult == null)
            {
                var roleresult = roleManager.CreateAsync(new DbRole
                {
                    Name = adminRoleName
                }).Result;
            }
            roleResult = roleManager.FindByNameAsync(clientRoleName).Result;
            if (roleResult == null)
            {
                var roleresult = roleManager.CreateAsync(new DbRole
                {
                    Name = clientRoleName

                }).Result;
            }


            var email = "admin@gmail.com";

            var findUser = userManager.FindByEmailAsync(email).Result;
            if (findUser == null)
            {
                var user = new DbUser
                {
                    Email = email,
                    UserName = email,
                    Age = 30,
                    Phone = "+380957476156",
                    Description = "admin"
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;

                result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
            }

            email = "client@gmail.com";
            findUser = userManager.FindByEmailAsync(email).Result;
            if (findUser == null)
            {
                var user = new DbUser
                {
                    Email = email,
                    UserName = email,
                    Age = 30,
                    Phone = "+380988005535",
                    Description = "Client"
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;
                result = userManager.AddToRoleAsync(user, Roles.Client).Result;
            }
        }

        public static void SeedDataByAS(IServiceProvider services)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeederDB4.SeedData(manager, managerRole);
                SeederDB4.SeedTemplateData(context);
            }
        }

        public static void SeedTemplateData(EFContext efContext)
        {
            Pacient pacient2 = new Pacient
            {
                Name = "Lesia",
                Patronymic = "Viacheslavivna",
                Surname = "Gogol",
                Birthday = DateTime.Now,
                AddDay = DateTime.Now,
                Anamnesis = "tempdata",
                Cycle = "tempdata",
                StatusLocalic = "Status localis",
                Survey = "bla bla bla obstejenia",
                Height = 77,
                Weight = 31,
                IMT = "IMT",
                Complaints = new List<Complaint>
                {
                    new Complaint { Name = "QQQskarga1" },
                    new Complaint { Name = "ZEEskarga2" },
                    new Complaint { Name = "ZRRRskarga3" }
                }
            };
            efContext.Pacients.Add(pacient2);
            efContext.SaveChanges();

            Pacient pacient3 = new Pacient
            {
                Name = "Andrii",
                Patronymic = "Viacheslavovuch",
                Surname = "Letskalyuk",
                Birthday = DateTime.Today,
                AddDay = DateTime.Now,
                Anamnesis = "anamnes1",
                Cycle = "exist cycle",
                StatusLocalic = "Status localis 1",
                Survey = "obstejenia temp data",
                Height = 188,
                Weight = 85,
                IMT = "IMT temp data",
                Complaints = new List<Complaint>
                {
                    new Complaint { Name = "EEE skarga Q" },
                    new Complaint { Name = "WWW skarga 1" },
                    new Complaint { Name = "GGG skarga 3 pro te" }
                }
            };
            efContext.Pacients.Add(pacient3);
            efContext.SaveChanges();

            Pacient pacient4 = new Pacient
            {
                Name = "Marko",
                Patronymic = "HZ",
                Surname = "Polo",
                Birthday = DateTime.Today,
                AddDay = DateTime.Now,
                Anamnesis = "anamnes z version of this",
                Cycle = "don't have cycle",
                StatusLocalic = "Status localis Marko",
                Survey = "obstejenia temp data",
                Height = 190,
                Weight = 101,
                IMT = "IMT temp data Marko polo",
                Complaints = new List<Complaint>
                {
                    new Complaint { Name = "YYYY skarga W" },
                    new Complaint { Name = "Fred skarga 1" },
                    new Complaint { Name = "Non skarga 3 pro te" }
                }
            };
            efContext.Pacients.Add(pacient4);
            efContext.SaveChanges();

            Diagnosis diagnosis1 = new Diagnosis { Name = "diagnosis first", Description = "golova trudna" };
            Diagnosis diagnosis2 = new Diagnosis { Name = "second diagnosis eE", Description = "treba ne kyrutu" };
            Diagnosis diagnosis3 = new Diagnosis { Name = "alcogolic", Description = "buhae 100 percent" };
            efContext.Diagnoses.Add(diagnosis1);
            efContext.Diagnoses.Add(diagnosis2);
            efContext.Diagnoses.Add(diagnosis3);
            efContext.SaveChanges();

            PacientDiagnosis pacientDiagnosis1 = new PacientDiagnosis { DiagnosisId = diagnosis1.Id, PacientId = pacient4.Id };
            pacient4.PacientDiagnoses.Add(pacientDiagnosis1);
            PacientDiagnosis pacientDiagnosis2 = new PacientDiagnosis { DiagnosisId = diagnosis2.Id, PacientId = pacient2.Id };
            pacient2.PacientDiagnoses.Add(pacientDiagnosis2);
            PacientDiagnosis pacientDiagnosis3 = new PacientDiagnosis { DiagnosisId = diagnosis3.Id, PacientId = pacient3.Id };
            pacient3.PacientDiagnoses.Add(pacientDiagnosis3);
            efContext.Pacients.UpdateRange(pacient4, pacient2, pacient3);
            efContext.SaveChanges();

            Appointment appointment1 = new Appointment { Name = "Kliver", Email = "kliver@gmail.com", Message = "Pruchuna zvernennia 1", Phone = "0673840953", DateWhenAdded = DateTime.Now };
            Appointment appointment2 = new Appointment { Name = "Karpo", Email = "karpo@gmail.com", Message = "Pruchuna zvernennia 2", Phone = "0972264557", DateWhenAdded = DateTime.Now };
            Appointment appointment3 = new Appointment { Name = "Valera", Email = "valera@gmail.com", Message = "Pruchuna zvernennia 3", Phone = "0972264556", DateWhenAdded = DateTime.Now };

            efContext.Appointments.AddRange(new List<Appointment> { appointment1, appointment2, appointment3 });
            efContext.Appointments.Add(appointment1);
            efContext.Appointments.Add(appointment2);
            efContext.Appointments.Add(appointment3);
            efContext.SaveChanges();
        }
    }
}
