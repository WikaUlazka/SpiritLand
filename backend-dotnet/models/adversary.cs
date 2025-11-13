namespace SpiritlandBackend.Models
{
    public class Adversary
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        // np. "Level 1–6" lub "Easy/Medium/Hard"
        public string? Difficulty { get; set; }

        public string? Description { get; set; }

        public string? ImageUrl { get; set; }
    }
}
