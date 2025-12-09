namespace SpiritlandBackend.Models
{
    public class CreateAdversaryLevelDto
    {
        public int Level { get; set; } 
        public int Difficulty { get; set; } 
        public string? Description { get; set; }
    }
}
