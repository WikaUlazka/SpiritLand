namespace SpiritlandBackend.Models
{
    public class UpdateProfileDto
    {
        public string Username { get; set; } = string.Empty;

        public int? FavoriteSpiritId { get; set; }
        public int? FavoriteAspectId { get; set; }
    }
}
