using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Spirit> Spirits { get; set; }
        public DbSet<Adversary> Adversaries { get; set; }
        public DbSet<Scenario> Scenarios { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // === Mapowanie tabeli Spirits ===
            modelBuilder.Entity<Spirit>(entity =>
            {
                entity.ToTable("Spirits");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Complexity).HasColumnName("complexity");
                entity.Property(e => e.ImageUrl).HasColumnName("imageurl");
            });

            // === Mapowanie tabeli Adversaries ===
            modelBuilder.Entity<Adversary>(entity =>
            {
                entity.ToTable("Adversaries");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Difficulty).HasColumnName("difficulty");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.ImageUrl).HasColumnName("imageurl");
            });

            // === Mapowanie tabeli Scenarios ===
            modelBuilder.Entity<Scenario>(entity =>
            {
                entity.ToTable("Scenarios");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Difficulty).HasColumnName("difficulty");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.ImageUrl).HasColumnName("imageurl");
            });
            // === Mapowanie tabeli Users ===
            modelBuilder.Entity<User>(entity =>
{
    entity.ToTable("Users");
    entity.Property(e => e.Id).HasColumnName("id");
    entity.Property(e => e.Username).HasColumnName("username");
    entity.Property(e => e.Email).HasColumnName("email");
    entity.Property(e => e.Password).HasColumnName("password");
    entity.Property(e => e.FavoriteSpirit).HasColumnName("favoritespirit");
});

        }
    }
}
