using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DEMO_1.Models;
using DEMO_1.Context;
using System.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace DEMO_1.Controllers
{
    [Route("api/[controller]")]
    public class loginController : Controller
    {
        private IConfiguration _config;
        private readonly LoginContext _context;
        private User _user = null;

        public loginController(IConfiguration config, LoginContext context)
        {
            _config = config;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            //var user = LoginUser(login.Name, login.Password);

            if (LoginUser(login.Name, login.Password))
            {
                var tokenString = BuildToken(_user);
                var userName = _user.Name;
                var userIsAdmin = _user.IsAdmin;
                response = Ok(new { token = tokenString, name = userName, isAdmin = userIsAdmin});
            }

            return response;
        }

        private string BuildToken(User user)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(JwtRegisteredClaimNames.Email, user.Password),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.AuthTime, DateTime.Now.ToString())
               };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("alelalamanochala"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken("",
              "",
              claims,
              expires: DateTime.Now.AddDays(1),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool LoginUser(string login, string password)
        {
            try
            {
                _user  =_context.users.Where(x=> x.Name == login && x.Active == 1).Single();
                if (_user != null)
                {
                    string ps = PassHash(login, password);
                    if (ps.Equals(_user.Password))
                    {
                        Console.WriteLine("Succesfull login User: " + _user.Name);
                        return true;
                    }
                    else
                    {
                        Console.Error.WriteLine("Error login User: " + login + " - wrong password");
                        return false;
                    }
                    
                }
                else
                {
                    Console.Error.WriteLine("Error login User: " + login);
                    return false;
                }
            } 
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error login User: " + login + " ex: " + ex.StackTrace);
                return false;
            }
        }

        private string PassHash(string login, string password)
        {
            User user = _context.users.Where(x => x.Name == login).Single();
            string PassFromDB = user.Password;

            string[] pass = PassFromDB.Split('$');
            byte[] salt = Convert.FromBase64String(pass[0]);

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256/8));

            return pass[0]+"$"+hashed;
        }
    }
}