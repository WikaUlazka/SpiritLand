namespace SpiritlandBackend.Models
{
    public class Scenario
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? Difficulty { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }
    }
}
