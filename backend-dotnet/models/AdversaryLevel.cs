namespace SpiritlandBackend.Models
{
    public class AdversaryLevel
    {
        public int Id { get; set; }

        public int AdversaryId { get; set; }
        public Adversary Adversary { get; set; }

        public int Level { get; set; }      
        public int Difficulty { get; set; }  
        public string? Description { get; set; }
    }
}
