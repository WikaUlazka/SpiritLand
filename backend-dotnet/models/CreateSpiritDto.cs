namespace SpiritlandBackend.Models
{
    public class CreateSpiritDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        
        public string Complexity { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }
    }
}
