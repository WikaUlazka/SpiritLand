using System.Text.Json.Serialization;

namespace SpiritlandBackend.Models
{
    public class Aspect
    {
        public int Id { get; set; }

        public int SpiritId { get; set; }

        [JsonIgnore]
        public Spirit Spirit { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }
    }
}
