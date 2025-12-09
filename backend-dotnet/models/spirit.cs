using SpiritlandBackend.Models;
public class Spirit
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public string Complexity { get; set; } = string.Empty;

    public string? ImageUrl { get; set; }

    public List<Aspect> Aspects { get; set; } = new();
    public List<GamePlayer> GamePlayers { get; set; } = new();
}
