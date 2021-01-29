using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class FoodContext : DbContext
    {
        public FoodContext(DbContextOptions<FoodContext> options): base(options)
        { 

        }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands{ get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
       
        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }

}
