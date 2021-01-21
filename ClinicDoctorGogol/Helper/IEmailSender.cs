using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicDoctorGogol.Helper
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
