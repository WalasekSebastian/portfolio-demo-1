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

namespace DEMO_1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UstawieniaBoksowController : Controller
    {
        private IConfiguration _config;
        private readonly UstawieniaBoksowContext _context;
        public UstawieniaBoksowController(IConfiguration config, UstawieniaBoksowContext context)
        {
            _config = config;
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var ust = _context.WGA_USTAWIENIA_BOKSOW.ToList();
                return Ok(ust);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("last", Name="Last")]
        public IActionResult GetLast()
        {
            try
            {
                var ust = _context.WGA_USTAWIENIA_BOKSOW.OrderByDescending(u => u.id).Take(1);
                return Ok(ust);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("{id}", Name="GetById")]
        public IActionResult GetById(long id)
        {
            try
            {
                var ust = _context.WGA_USTAWIENIA_BOKSOW.Where(u=> u.id == id).Take(1);
                return Ok(ust);
            }
            catch
            {
                return NoContent();
            }
        }

        [HttpGet("last5", Name="GetLast5")]
        public IActionResult GetLast5()
        {
            try
            {
                var ust = _context.WGA_USTAWIENIA_BOKSOW.OrderByDescending(u => u.id).Take(5);
                return Ok(ust);
            }
            catch
            {
                return NoContent();
            }
        }
    }
}