using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using WebApi.Models;

namespace WebApi.MiddleWare
{
    public class Context : DbContext
    {
        public DbSet<DbEntity> dbEntities { get; set; }

        public Context(DbContextOptions<Context> options) : base(options) 
        {
           
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

    }
}
