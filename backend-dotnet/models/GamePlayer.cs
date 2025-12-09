namespace SpiritlandBackend.Models
{
    public class GamePlayer
{
    public int Id { get; set; }
    public int GameId { get; set; }
    public int UserId { get; set; }

    public int? SpiritId { get; set; }
    public int? AspectId { get; set; }

    public string? Notes { get; set; }

    public Game Game { get; set; }
    public Spirit? Spirit { get; set; }
    public Aspect? Aspect { get; set; }
    public User User { get; set; }
}

}
