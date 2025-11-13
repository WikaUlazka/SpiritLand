using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpiritlandBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        public required string Username { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }

        public string? FavoriteSpirit { get; set; }  
    }
}
