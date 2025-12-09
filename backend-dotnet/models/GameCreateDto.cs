namespace SpiritlandBackend.Models;

public class CreateGameDto
{
    public int CreatorUserId { get; set; }
    public DateTime DatePlayed { get; set; }

    public int? AdversaryId { get; set; }
    public int? ScenarioId { get; set; }

    public int? Difficulty { get; set; }
    public string? BoardSetup { get; set; }
    public string Result { get; set; }
    public string? EndReason { get; set; }
    public int? Turns { get; set; }
    public string? Comment { get; set; }
    public bool BlightedIsland { get; set; }

    public List<CreateGamePlayerDto> Players { get; set; }
}

public class CreateGamePlayerDto
{
    public int UserId { get; set; }
    public int? SpiritId { get; set; }
    public int? AspectId { get; set; }
    public string? Notes { get; set; }
}
