using System.ComponentModel.DataAnnotations.Schema;

namespace SpiritlandBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public int? FavoriteSpiritId { get; set; }
        public Spirit? FavoriteSpirit { get; set; }

        public int? FavoriteAspectId { get; set; }
        public Aspect? FavoriteAspect { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Game> CreatedGames { get; set; } = new();
        public List<GamePlayer> PlayedGames { get; set; } = new();
        public List<GameInvite> SentInvites { get; set; } = new();
        public List<GameInvite> ReceivedInvites { get; set; } = new();
        public List<Notification> Notifications { get; set; } = new();
    }
}
