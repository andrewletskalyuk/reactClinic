using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using ClinicDoctorGogol.Helper;
using ClinicDoctorGogol.Model;
using ClinicDoctorGogol.Services;
using ClinicDoctorGogolDAL;
using ClinicDoctorGogolDAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;


namespace ClinicDoctorGogol.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class AccountController : ControllerBase
    {
        private readonly EFContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IJwtTokenService _IJwtTokenService;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        private readonly IWebHostEnvironment _env;
        private bool confirmedEmail { get; set; }

        public AccountController(EFContext context,
            UserManager<DbUser> userManager,
            SignInManager<DbUser> signInManager,
            IJwtTokenService IJwtTokenService,
            IConfiguration configuration,
            IEmailSender emailSender,
            IWebHostEnvironment env)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _IJwtTokenService = IJwtTokenService;
            _configuration = configuration;
            _emailSender = emailSender;
            _env = env;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest(new { invalid = "Даний користувач не знайденний" });
            }

            var result = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;

            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Невірно введений пароль" });
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(
                new
                {
                    user = user,
                    token = _IJwtTokenService.CreateToken(user)
                });
        }

        //реєстрація користувача
        [HttpPost("register")]
        [Obsolete]
        public async Task<IActionResult> Register([FromBody] UserRegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = CustomValidator.GetErrorsByModel(ModelState);
                return BadRequest(errors);
            }

            #region Photo for User
            //якщо потрібно фото для користувача
            //var base64 = model.photo;
            //if (base64.contains(","))
            //{
            //    base64 = base64.split(',')[1];
            //}
            //var bmp = frombase64stringtoimage(base64); 
            #endregion

            var serverPath = _env.ContentRootPath;

            var path = Path.Combine(serverPath, "Uploads");
            if (!Directory.Exists(path))
            {
                Directory.Exists(path);
            }

            #region Photo for User
            //якщо потрібно фото користувача
            //var fileName = Path.GetRandomFileName() + ".jpg";
            //var filePathSave = Path.Combine(path, fileName);
            //bmp.Save(filePathSave, ImageFormat.Jpeg); 
            #endregion

            var user = new DbUser
            {
                Email = model.Email,
                UserName = model.Email,
                //Image = fileName, //"https://cdn.pixabay.com/photo/2017/07/28/23/34/fantasy-picture-2550222_960_720.jpg",
                Age = 30,
                Phone = model.Phone,
                Description = "Andrii programmer"
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Х'юстон у нас проблеми!" });
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var domain = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            //var frontEndURL = _configuration.GetValue<string>("FrontEndURL");

            var callbackUrl =
                $"{domain}/confirm-email?email={user.Email}&" +
                $"token={WebUtility.UrlEncode(token)}";

            //var confirmationLink = Url.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, 
            //    Request.Scheme);

            var message = new Message(new string[] { user.Email }, "Підтвердження електронної пошти",
                $"Клікніть по посиланню для підтвердження: " +
                $"<a href='{callbackUrl}'>click here</a>");

            //var message = new Message(new string[] { user.Email }, "Confirmation email link", confirmationLink);
            _emailSender.SendEmail(message);

            return Ok();
        }

        #region Method for save User image
        //private static Bitmap FromBase64StringToImage(string base64String)
        //{
        //    byte[] byteBuffer = Convert.FromBase64String(base64String);
        //    try
        //    {
        //        using (MemoryStream memoryStream = new MemoryStream(byteBuffer))
        //        {
        //            memoryStream.Position = 0;
        //            using (Image imgReturn = Image.FromStream(memoryStream))
        //            {
        //                memoryStream.Close();
        //                byteBuffer = null;
        //                return new Bitmap(imgReturn);
        //            }
        //        }
        //    }
        //    catch { return null; }
        //} 
        #endregion

        //підтвердження пошти 
        [HttpPost("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromBody] UserModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Ok("Селен требует помощи");
            }
            else
            {
                var result = await _userManager.ConfirmEmailAsync(user, model.Token);
                if (result.Succeeded)
                {
                    //await _context.SaveChangesAsync();
                    return Ok(new { email = user.Email, confirmedEmail = user.EmailConfirmed });
                }
                else
                {
                    return BadRequest(new { error = result.Errors });
                }
            }
        }

        //відновлення паролю
        [HttpPost("restorepassword")]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [Obsolete]
        public async Task<IActionResult> RestorePassword([FromBody] ForgotPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null || !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    //це була перевірка чи юзер існує в БД і чи його електронна пошта була підтверджена
                    //смалимо відповідь для того, щоб в нас була його пошта
                    return Ok(new { email = user.Email, confirmedEmail = user.EmailConfirmed });
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                //далі формуємо домен і колбек посилання
                var domain = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";

                var callbackUrl =
                $"{domain}/restorepassword?email={user.Email}&" +
                $"token={WebUtility.UrlEncode(token)}";

                var message = new Message(new string[] { user.Email }, "Відновлення паролю до облікового запису",
                $"Клікніть по посиланню для переходу на сторінку і створення нового паролю облікового запису: " +
                $"<a href='{callbackUrl}'>click here</a>");

                _emailSender.SendEmail(message);
            }
            return Ok();
            //після цього гатимо реактор, коли буде зроблений клік на посиланню в пошті
        }
    }
}
