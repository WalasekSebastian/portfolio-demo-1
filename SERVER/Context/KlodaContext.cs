using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using DEMO_1.Models;

namespace DEMO_1.Context
{
    public class KlodaContext : DbContext
    {
        public KlodaContext(DbContextOptions<KlodaContext> options)
            :base(options) { }
        public KlodaContext(){ }
        public DbSet<Kloda> WGA_KLODA { get; set; }
    }
}