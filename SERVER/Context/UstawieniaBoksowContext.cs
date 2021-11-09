using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DEMO_1.Models;

namespace DEMO_1.Context
{
    public class UstawieniaBoksowContext : DbContext
    {
        public UstawieniaBoksowContext(DbContextOptions<UstawieniaBoksowContext> options)
            :base(options) { }
        public UstawieniaBoksowContext(){ }
        public DbSet<UstawieniaBoksow> WGA_USTAWIENIA_BOKSOW { get; set; }
    }
}