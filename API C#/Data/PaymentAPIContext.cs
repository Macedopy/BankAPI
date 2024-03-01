using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PaymentAPI.Data.Map;
using PaymentAPI.Models;

namespace PaymentAPI.Data
{
    public class PaymentAPIContext : DbContext
    {
        public PaymentAPIContext(DbContextOptions<PaymentAPIContext> options) : base(options)
        {
        }

        public DbSet<UserModel> Users {get; set;}
        public DbSet<AccountModel> Account {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserMap());
            modelBuilder.ApplyConfiguration(new AccountMap());
            base.OnModelCreating(modelBuilder);
        }
    }
}