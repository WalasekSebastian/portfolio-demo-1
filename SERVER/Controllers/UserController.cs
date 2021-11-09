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
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace DEMO_1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IConfiguration _config;
        private readonly LoginContext _context;

        public UserController(IConfiguration config, LoginContext context)
        {
            _config = config;
            _context = context;
        }
        
        [HttpPost("new")]
        public IActionResult CreateNewUser([FromBody]User user)
        {
            try
            {
                int us = _context.users.Where(u => u.Name == user.Name).Count();
                if (us == 0)
                {     
                    user.Password = Hasing(user.Password);
                    _context.Add(user);
                    _context.SaveChanges();
                    var ok = "ok";
                    return Ok(new {ok});
                }
                else
                    return BadRequest();
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                List<User> _allUser = _context.users.ToList();
                foreach(var x in _allUser)
                {
                    x.Password = "x";
                }
                return Ok(_allUser);
            }
            catch
            {
                return NoContent();
            }

        }

        [HttpGet("id/{id}")]
        public IActionResult GetOneUser(long id)
        {
            try
            {
                var user = _context.users.Where(u => u.Id == id).Single();
                if (user != null)
                {
                    user.Password = "x";
                    return Ok(user);
                }
                else
                    return BadRequest();
            }
            catch
            {
                Console.Error.WriteLine("Get user failed, where id: " + id);
                return NoContent();
            }
        }

        [HttpPost("update/{id}")]
        public IActionResult UpdateUser(int id, [FromBody]User user)
        {
            try
            {
                var us = _context.users.Where(u => u.Id == id).Single();
                if (us != null)
                {
                    _context.Update(user);
                    _context.SaveChanges();
                    var ok = "ok";
                    return Ok(new {ok} );
                }
                else
                    return BadRequest();
            }
            catch
            {
                Console.Error.WriteLine("Update user failed, where id: " + id);
                return NoContent();
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteUser(long id)
        {
            try
            {
                var user = _context.users.Where(u => u.Id == id).Single();
                if (user != null)
                {
                    _context.Remove(user);
                    _context.SaveChanges();
                    var ok = "ok";
                    return Ok(new {ok} );
                }
                else
                    return BadRequest();
            }
            catch
            {
                Console.Error.WriteLine("Delete user failed, where id: " + id);
                return NoContent();
            }
        }

        private string Hasing(string pass)
        {
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
    
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: pass,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return Convert.ToBase64String(salt)+"$"+hashed;                
        }
    }
}