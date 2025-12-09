namespace SpiritlandBackend.Models
{
    public class Game
    {
        public int Id { get; set; }

        public int CreatorUserId { get; set; }
        public User CreatorUser { get; set; }

        public DateTime DatePlayed { get; set; }

        public int? AdversaryId { get; set; }
        public Adversary? Adversary { get; set; }

        public int? ScenarioId { get; set; }
        public Scenario? Scenario { get; set; }

        public int? Difficulty { get; set; }
        public string? BoardSetup { get; set; }
        public string Result { get; set; } = "win";  
        public string? EndReason { get; set; }
        public int? Turns { get; set; }
        public string? Comment { get; set; }
        public bool BlightedIsland { get; set; }

        public List<GamePlayer> Players { get; set; } = new();
        public List<GameInvite> Invites { get; set; } = new();
    }
}
