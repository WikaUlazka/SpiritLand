namespace SpiritlandBackend.Models
{
    public class GameInvite
    {
        public int Id { get; set; }

        public int SenderUserId { get; set; }
        public User SenderUser { get; set; }

        public int ReceiverUserId { get; set; }
        public User ReceiverUser { get; set; }

        public int? GameId { get; set; }
        public Game? Game { get; set; }

        public string Status { get; set; } = "pending";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
