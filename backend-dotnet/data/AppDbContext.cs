using Microsoft.EntityFrameworkCore;
using SpiritlandBackend.Models;

namespace SpiritlandBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) {}

        public DbSet<User> Users => Set<User>();
        public DbSet<Spirit> Spirits => Set<Spirit>();
        public DbSet<Aspect> Aspects => Set<Aspect>();
        public DbSet<Adversary> Adversaries => Set<Adversary>();
        public DbSet<AdversaryLevel> AdversaryLevels => Set<AdversaryLevel>();
        public DbSet<Scenario> Scenarios { get; set; }

        public DbSet<Game> Games => Set<Game>();
        public DbSet<GamePlayer> GamePlayers => Set<GamePlayer>();
        public DbSet<GameInvite> GameInvites => Set<GameInvite>();
        public DbSet<Notification> Notifications => Set<Notification>();

        protected override void OnModelCreating(ModelBuilder model)
        {
            base.OnModelCreating(model);

            model.Entity<User>()
                .HasIndex(x => x.Email)
                .IsUnique();

            model.Entity<User>()
                .HasMany(x => x.PlayedGames)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);

            model.Entity<User>()
                .HasMany(x => x.CreatedGames)
                .WithOne(x => x.CreatorUser)
                .HasForeignKey(x => x.CreatorUserId)
                .OnDelete(DeleteBehavior.Restrict);

            model.Entity<Spirit>()
                .HasMany(x => x.Aspects)
                .WithOne(x => x.Spirit)
                .HasForeignKey(x => x.SpiritId);

            model.Entity<Aspect>()
                .HasOne(x => x.Spirit)
                .WithMany(x => x.Aspects)
                .HasForeignKey(x => x.SpiritId);

            model.Entity<GamePlayer>()
                .HasOne(x => x.Game)
                .WithMany(x => x.Players)
                .HasForeignKey(x => x.GameId);

            model.Entity<GamePlayer>()
                .HasOne(x => x.Spirit)
                .WithMany(x => x.GamePlayers)
                .HasForeignKey(x => x.SpiritId);

            model.Entity<GameInvite>()
                .HasOne(x => x.SenderUser)
                .WithMany(x => x.SentInvites)
                .HasForeignKey(x => x.SenderUserId)
                .OnDelete(DeleteBehavior.Restrict);

            model.Entity<GameInvite>()
                .HasOne(x => x.ReceiverUser)
                .WithMany(x => x.ReceivedInvites)
                .HasForeignKey(x => x.ReceiverUserId)
                .OnDelete(DeleteBehavior.Restrict);

            model.Entity<Notification>()
                .HasOne(x => x.User)
                .WithMany(x => x.Notifications)
                .HasForeignKey(x => x.UserId);
        }
    }
}
