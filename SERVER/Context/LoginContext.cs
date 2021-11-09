using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DEMO_1.Models;

namespace DEMO_1.Context
{
    public class LoginContext : DbContext
    {
        public LoginContext(DbContextOptions<LoginContext> options)
            :base(options) { }
        public LoginContext(){ }
        public DbSet<User> users { get; set; }
    }
}